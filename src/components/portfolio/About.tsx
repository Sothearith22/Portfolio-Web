import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Award,
  BookOpen,
  Calendar,
  Code2,
  Database,
  GraduationCap,
  Globe2,
  Layers3,
  MapPin,
  Rocket,
  Sparkles,
} from "lucide-react";

import { Section } from "./Section";
import { Card } from "@/components/ui/card";
import { about, achievements, education, languages } from "@/data/portfolio";

type FocusCard = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const focusCards: FocusCard[] = [
  {
    icon: Code2,
    title: "Frontend",
    description: "React.js, Tailwind CSS, and TypeScript for responsive, fast UI interfaces.",
  },
  {
    icon: Database,
    title: "Backend",
    description: "PHP/Laravel, Spring Boot, REST APIs, and relational database modeling.",
  },
  {
    icon: Layers3,
    title: "Databases",
    description: "MySQL and PostgreSQL with secure queries, schema design, and migrations.",
  },
  {
    icon: Rocket,
    title: "Delivery",
    description: "Git/GitHub team collaboration, clean code, and continuous learning.",
  },
];

const quickFacts = [
  {
    icon: MapPin,
    label: "Location",
    value: "Phnom Penh, Cambodia",
  },
  {
    icon: GraduationCap,
    label: "Degree",
    value: "IT @ RUPP",
  },
  {
    icon: Sparkles,
    label: "Role Target",
    value: "Junior Web Developer",
  },
];

export const About = () => {
  return (
    <Section
      id="about"
      eyebrow="01 — About"
      title="Background & Education"
      description="A focused snapshot of my background, academic studies at RUPP, and software engineering foundations."
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-card/90 p-6 shadow-elegant backdrop-blur md:p-8">
        <div
          className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-primary/5 blur-3xl"
          aria-hidden
        />

        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left Column: Bio & Values */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary">
              <Sparkles className="h-4 w-4" />
              Junior Web Developer — Full-Stack & Backend Focus
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl text-foreground">
                Turning ideas into reliable, scalable web applications.
              </h3>

              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                {about.bio.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Quick Facts */}
            <div className="grid gap-3 sm:grid-cols-3">
              {quickFacts.map((fact) => {
                const Icon = fact.icon;

                return (
                  <div
                    key={fact.label}
                    className="rounded-2xl border border-border/80 bg-secondary/60 p-4 shadow-sm transition-smooth hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card"
                  >
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary">
                      <Icon className="h-4 w-4" />
                      {fact.label}
                    </div>
                    <p className="mt-2 text-sm font-semibold text-foreground">{fact.value}</p>
                  </div>
                );
              })}
            </div>

            {/* Philosophy Box */}
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 transition-smooth hover:border-primary/40">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <ArrowUpRight className="h-4 w-4 text-primary" />
                Engineering Philosophy & Core Focus
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {about.coreFocus}
              </p>
            </div>
          </div>

          {/* Right Column: Focus Cards & Education from CV */}
          <div className="space-y-6">
            {/* Core Competency Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              {focusCards.map((card, index) => {
                const Icon = card.icon;

                return (
                  <Card
                    key={card.title}
                    className="group border-border/80 bg-background/80 p-5 shadow-card transition-smooth hover:-translate-y-1 hover:border-primary/40 hover:shadow-elegant animate-fade-in-up"
                    style={{ animationDelay: `${index * 90}ms` }}
                  >
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="mt-4 text-base font-semibold text-foreground">{card.title}</h4>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{card.description}</p>
                  </Card>
                );
              })}
            </div>

            {/* Education & Certifications from CV */}
            <Card className="border-border/80 bg-gradient-to-br from-background to-secondary/30 p-6 shadow-card space-y-5">
              <div className="flex items-center justify-between border-b border-border/50 pb-3">
                <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  Education & Coursework
                </div>
                <span className="font-mono text-xs text-primary">RUPP</span>
              </div>

              <div className="space-y-3.5">
                {education.map((edu) => (
                  <div key={edu.degree} className="border-l-2 border-primary/40 pl-3">
                    <p className="text-xs font-bold text-foreground">{edu.degree}</p>
                    <p className="text-xs text-muted-foreground">{edu.institution}</p>
                    <p className="font-mono text-[11px] text-primary">{edu.period}</p>
                  </div>
                ))}
              </div>

              {/* Achievements & Certifications */}
              <div className="pt-2 border-t border-border/50 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                  <Award className="h-3.5 w-3.5 text-primary" />
                  Certifications & Milestones
                </div>
                <ul className="space-y-1">
                  {achievements.map((ach) => (
                    <li key={ach} className="text-xs text-muted-foreground leading-relaxed flex items-start gap-1.5">
                      <span className="text-primary font-bold">•</span>
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Languages */}
              <div className="pt-2 border-t border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                  <Globe2 className="h-3.5 w-3.5 text-primary" />
                  Languages:
                </div>
                <div className="flex items-center gap-2">
                  {languages.map((lang) => (
                    <span
                      key={lang.name}
                      className="rounded-md border border-border/80 bg-secondary/80 px-2 py-0.5 font-mono text-xs text-foreground/90"
                    >
                      {lang.name} ({lang.level})
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Section>
  );
};
