import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, Code2, Database, GraduationCap, Layers3, MapPin, Rocket, Sparkles } from "lucide-react";

import { Section } from "./Section";
import { Card } from "@/components/ui/card";
import { about, skills } from "@/data/portfolio";

type FocusCard = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const focusCards: FocusCard[] = [
  {
    icon: Code2,
    title: "Frontend",
    description: "React, TypeScript, and Tailwind for interfaces that feel fast and clear.",
  },
  {
    icon: Database,
    title: "Backend",
    description: "Laravel, Spring Boot, REST APIs, and practical data modeling.",
  },
  {
    icon: Layers3,
    title: "Systems",
    description: "Reusable patterns, component thinking, and maintainable structure.",
  },
  {
    icon: Rocket,
    title: "Delivery",
    description: "Shipping polished work, learning quickly, and iterating with care.",
  },
];

const quickFacts = [
  {
    icon: MapPin,
    label: "Location",
    value: "Phnom Penh",
  },
  {
    icon: GraduationCap,
    label: "Study",
    value: "Royal University of Phnom Penh",
  },
  {
    icon: Sparkles,
    label: "Focus",
    value: "Full-stack development",
  },
];

export const About = () => {
  return (
    <Section
      id="about"
      eyebrow="01 - About"
      title="About Me"
      description="A focused snapshot of my background, the way I like to build, and the stack I keep coming back to."
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-card/90 p-6 shadow-elegant backdrop-blur md:p-8">
        <div
          className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-primary/5 blur-3xl"
          aria-hidden
        />

        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary">
              <Sparkles className="h-4 w-4" />
              Building with a clean, practical, user-first mindset
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                I enjoy turning ideas into reliable web experiences.
              </h3>

              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                {about.bio.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {quickFacts.map((fact) => {
                const Icon = fact.icon;

                return (
                  <div
                    key={fact.label}
                    className="rounded-2xl border border-border/70 bg-secondary/50 p-4 shadow-sm transition-smooth hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card"
                  >
                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-primary">
                      <Icon className="h-4 w-4" />
                      {fact.label}
                    </div>
                    <p className="mt-3 text-sm font-medium text-foreground">{fact.value}</p>
                  </div>
                );
              })}
            </div>

            <div className="rounded-2xl border border-primary/15 bg-primary/5 p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <ArrowUpRight className="h-4 w-4 text-primary" />
                What I care about most
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {about.bio[2]}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {focusCards.map((card, index) => {
                const Icon = card.icon;

                return (
                  <Card
                    key={card.title}
                    className="group border-border/70 bg-background/70 p-5 shadow-card transition-smooth hover:-translate-y-1 hover:border-primary/30 hover:shadow-elegant animate-fade-in-up"
                    style={{ animationDelay: `${index * 90}ms` }}
                  >
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/15 bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="mt-4 text-base font-semibold">{card.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
                  </Card>
                );
              })}
            </div>

            <Card className="border-border/70 bg-gradient-to-br from-background to-primary/5 p-5 shadow-card">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Rocket className="h-4 w-4 text-primary" />
                Current toolkit
              </div>

              <div className="mt-4 space-y-4">
                {skills.map((group) => (
                  <div key={group.category} className="rounded-2xl border border-border/60 bg-card/70 p-4">
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">{group.category}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs text-muted-foreground"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Section>
  );
};
