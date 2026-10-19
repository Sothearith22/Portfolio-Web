import { useEffect, useState } from "react";
import { z } from "zod";
import { Check, Clock, Copy, Github, Mail, MapPin, Phone, Send, Sparkles } from "lucide-react";
import { Section } from "./Section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { env } from "@/config/env";
import { profile } from "@/data/portfolio";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  message: z.string().trim().min(4, "Message should be at least 4 characters").max(1000),
});

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;
type ContactValues = z.infer<typeof contactSchema>;

const sendContactMessage = async (values: ContactValues) => {
  if (!env.BOT_TOKEN || !env.CHAT_ID) {
    throw new Error("Telegram environment configuration is missing.");
  }

  const text = `
📩 <b>New Contact Message from Portfolio</b>

👤 <b>Name:</b> ${values.name}
📧 <b>Email:</b> ${values.email}
💬 <b>Message:</b>
${values.message}
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
    throw new Error(data.description || "Telegram notification failed to send.");
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
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((c) => c - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      toast.success("Email copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy email");
    }
  };

  const handleChange =
    (field: keyof typeof values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
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
      toast.success("Message sent successfully! 🚀 I will get back to you soon.");

      setValues({ name: "", email: "", message: "" });
      setCooldown(15);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong sending the message"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Section
      id="contact"
      eyebrow="06 — Contact"
      title="Let's Build Together"
      description="Whether you have an open role, a project in mind, or just want to connect, feel free to reach out."
    >
      <div className="mx-auto max-w-5xl grid gap-8 lg:grid-cols-[1fr_1.3fr] items-start">
        {/* Contact Info Sidebar */}
        <div className="space-y-4">
          <Card className="border-border/70 bg-card/90 p-5 sm:p-6 shadow-card transition-all duration-300 hover:border-primary/40 hover:shadow-elegant">
            <h3 className="text-lg font-bold tracking-tight text-foreground">
              Contact Information
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Prefer direct communication? Reach out via email or GitHub.
            </p>

            <div className="mt-6 space-y-4">
              {/* Email */}
              <div className="group/item rounded-xl border border-border/70 bg-secondary/50 p-3.5 transition-all duration-200 hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-primary">
                    <Mail className="h-4 w-4 transition-transform duration-200 group-hover/item:scale-110" />
                    Email
                  </div>
                  <button
                    onClick={copyEmail}
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-105 active:scale-95"
                    title="Copy email"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3 w-3 text-primary animate-scale-in" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" /> Copy
                      </>
                    )}
                  </button>
                </div>
                <a
                  href={`mailto:${profile.email}`}
                  className="mt-2 block text-sm font-medium text-foreground hover:text-primary transition-colors truncate"
                >
                  {profile.email}
                </a>
              </div>

              {/* GitHub */}
              <div className="group/item rounded-xl border border-border/70 bg-secondary/50 p-3.5 transition-all duration-200 hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-xs">
                <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-primary">
                  <Github className="h-4 w-4 transition-transform duration-200 group-hover/item:scale-110" />
                  GitHub Profile
                </div>
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 block text-sm font-medium text-foreground hover:text-primary transition-colors truncate"
                >
                  github.com/Sothearith22
                </a>
              </div>

              {/* Phone */}
              {profile.phone && (
                <div className="group/item rounded-xl border border-border/70 bg-secondary/50 p-3.5 transition-all duration-200 hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-xs">
                  <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-primary">
                    <Phone className="h-4 w-4 transition-transform duration-200 group-hover/item:scale-110" />
                    Phone
                  </div>
                  <a
                    href={`tel:${profile.phone}`}
                    className="mt-2 block text-sm font-medium text-foreground hover:text-primary transition-colors truncate"
                  >
                    {profile.phone}
                  </a>
                </div>
              )}

              {/* Location */}
              <div className="group/item rounded-xl border border-border/70 bg-secondary/50 p-3.5 transition-all duration-200 hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-xs">
                <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-primary">
                  <MapPin className="h-4 w-4 transition-transform duration-200 group-hover/item:scale-110" />
                  Location
                </div>
                <p className="mt-2 text-sm font-medium text-foreground">
                  Phnom Penh, Cambodia (ICT, UTC+7)
                </p>
              </div>
            </div>
          </Card>

          {/* Availability Card */}
          <Card className="border-primary/20 bg-primary/5 p-5 shadow-card">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              Current Status
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Actively seeking Web developer or backend opportunities in Phnom Penh or remote.
            </p>
            <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-primary">
              <Clock className="h-3.5 w-3.5" />
              Typically responds within 24 hours
            </div>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="border-border/70 bg-card/90 p-5 sm:p-8 shadow-card">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Your Name <span className="text-primary">*</span>
              </Label>
              <Input
                id="name"
                placeholder="e.g. Sokha Chen"
                value={values.name}
                onChange={handleChange("name")}
                className="transition-smooth focus-visible:ring-primary"
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address <span className="text-primary">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="e.g. sothearith@example.com"
                value={values.email}
                onChange={handleChange("email")}
                className="transition-smooth focus-visible:ring-primary"
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium">
                Message <span className="text-primary">*</span>
              </Label>
              <Textarea
                id="message"
                rows={5}
                placeholder="Tell me about your project, team, or opportunity..."
                value={values.message}
                onChange={handleChange("message")}
                className="transition-smooth focus-visible:ring-primary"
              />
              {errors.message && (
                <p className="text-xs text-destructive">{errors.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="group w-full shadow-elegant transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
              disabled={submitting || cooldown > 0}
            >
              {submitting ? (
                "Sending message..."
              ) : cooldown > 0 ? (
                `Wait ${cooldown}s`
              ) : (
                <>
                  Send Message{" "}
                  <Send className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                </>
              )}
            </Button>
          </form>
        </Card>
      </div>
    </Section>
  );
};
