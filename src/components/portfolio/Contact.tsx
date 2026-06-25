import { useEffect, useState } from "react";
import { z } from "zod";
import { Send } from "lucide-react";
import { Section } from "./Section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be under 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Enter a valid email" })
    .max(255, { message: "Email must be under 255 characters" }),
  message: z
    .string()
    .trim()
    .min(4, { message: "Message must be at least 4 characters" })
    .max(1000, { message: "Message must be under 1000 characters" }),
});

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;
type ContactValues = z.infer<typeof contactSchema>;

const sendContactMessage = async (values: ContactValues) => {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  const data = (await response.json().catch(() => null)) as
    | { ok?: boolean; error?: string }
    | null;

  if (!response.ok) {
    throw new Error(data?.error || "Failed to send message");
  }

  return data;
};

export const Contact = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((current) => current - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const handleChange =
    (field: keyof typeof values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((current) => ({ ...current, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = contactSchema.safeParse(values);

    if (!result.success) {
      const next: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    if (cooldown > 0) {
      toast.error(`Please wait ${cooldown}s before sending again`);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      await sendContactMessage(result.data);
      toast.success("Message sent to Telegram");
      setValues({ name: "", email: "", message: "" });
      setCooldown(10);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Section
      id="contact"
      eyebrow="05 - Contact"
      title="Let's build something"
      description="Got a project in mind, or just want to say hi? Drop a note."
    >
      <Card className="mx-auto max-w-xl p-6 shadow-card sm:p-8">
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={values.name}
              onChange={handleChange("name")}
              maxLength={100}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={values.email}
              onChange={handleChange("email")}
              maxLength={255}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              rows={5}
              value={values.message}
              onChange={handleChange("message")}
              maxLength={1000}
            />
            {errors.message && (
              <p className="text-xs text-destructive">{errors.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={submitting || cooldown > 0}
          >
            {submitting ? (
              "Sending..."
            ) : cooldown > 0 ? (
              `Wait ${cooldown}s`
            ) : (
              <>
                Send message <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </Card>
    </Section>
  );
};
