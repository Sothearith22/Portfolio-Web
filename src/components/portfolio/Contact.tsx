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
import { env } from "@/config/env";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(4).max(1000),
});

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;
type ContactValues = z.infer<typeof contactSchema>;

// ✅ FIX: send to backend API instead of Telegram directly
// const sendContactMessage = async (values: ContactValues) => {
//   const response = await fetch("/api/contact", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(values),
//   });

//   const data = await response.json().catch(() => null);

//   if (!response.ok) {
//     throw new Error(data?.error || "Failed to send message");
//   }

//   return data;
// };

const sendContactMessage = async (values: ContactValues) => {
  if (!env.BOT_TOKEN || !env.CHAT_ID) {
    throw new Error("Telegram env values are missing.");
  }

  const text = `
📩 New Contact Message

👤 Name: ${values.name}
📧 Email: ${values.email}
💬 Message: ${values.message}
`;

  const response = await fetch(
    `https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: env.CHAT_ID,
        text,
        parse_mode: "HTML",
      }),
    }
  );

  const data = await response.json();

  if (!data.ok) {
    throw new Error(data.description || "Telegram send failed");
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
      setCooldown((c) => c - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const handleChange =
    (field: keyof typeof values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
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
      toast.success("Message sent successfully 🚀");

      setValues({ name: "", email: "", message: "" });
      setCooldown(10);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
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
