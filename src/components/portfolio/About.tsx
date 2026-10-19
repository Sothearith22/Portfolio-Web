import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Award,
  BookOpen,
  Calendar,
  Code2,
  Cpu,
  Database,
  GraduationCap,
  Globe2,
  Layers3,
  MapPin,
  Rocket,
  Server,
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
    icon: Cpu,
    title: "ERP Development",
    description: "Odoo module development, Python business logic, XML views, and ERP customization.",
  },
  {
    icon: Server,
    title: "Backend Engineering",
    description: "Java/Spring Boot and PHP/Laravel, REST APIs, JWT security, and rate limiting.",
  },
  {
    icon: Code2,
    title: "Frontend Architecture",
    description: "React.js, TypeScript, and Tailwind CSS for responsive, modern web interfaces.",
  },
  {
    icon: Database,
    title: "Database Modeling",
    description: "PostgreSQL and MySQL schema design, relational integrity, and query optimization.",
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
    value: "IT @ RUPP (Year 3)",
  },
  {
    icon: Sparkles,
    label: "Role Target",
    value: "Odoo & Full-Stack",
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
      <div className="relative overflow-hidden rounded-2xl sm:rounded-[2rem] border border-border/80 bg-card/90 p-4 xs:p-6 shadow-elegant backdrop-blur md:p-8">
        <div
          className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-pulse-glow pointer-events-none"
          aria-hidden
        />
        <div
          className="absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-primary/5 blur-3xl animate-pulse-slow pointer-events-none"
          aria-hidden
        />

        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left Column: Bio & Values */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary shadow-xs">
              <Sparkles className="h-4 w-4 animate-pulse" />
              Odoo Developer Intern — ERP & Full-Stack Focus
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
                    className="group rounded-2xl border border-border/80 bg-secondary/60 p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-card cursor-default"
                  >
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary">
                      <Icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                      {fact.label}
                    </div>
                    <p className="mt-2 text-sm font-semibold text-foreground">{fact.value}</p>
                  </div>
                );
              })}
            </div>

            {/* Philosophy Box */}
            <div className="group rounded-2xl border border-primary/20 bg-primary/5 p-5 transition-all duration-300 hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <ArrowUpRight className="h-4 w-4 text-primary transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
                    className="group border-border/80 bg-background/80 p-5 shadow-card transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-elegant animate-fade-in-up"
                    style={{ animationDelay: `${index * 90}ms` }}
                  >
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-primary/20 shadow-xs">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="mt-4 text-base font-semibold text-foreground transition-colors group-hover:text-primary">
                      {card.title}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{card.description}</p>
                  </Card>
                );
              })}
            </div>

            {/* Education & Certifications from CV */}
            <Card className="border-border/80 bg-gradient-to-br from-background to-secondary/30 p-6 shadow-card space-y-5 transition-all duration-300 hover:border-primary/40">
              <div className="flex items-center justify-between border-b border-border/50 pb-3">
                <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <GraduationCap className="h-4 w-4 text-primary animate-pulse" />
                  Education & Coursework
                </div>
                <span className="font-mono text-xs text-primary font-semibold">RUPP</span>
              </div>

              <div className="space-y-3.5">
                {education.map((edu) => (
                  <div
                    key={edu.degree}
                    className="group/edu border-l-2 border-primary/40 pl-3 transition-all duration-200 hover:border-l-primary hover:translate-x-1.5"
                  >
                    <p className="text-xs font-bold text-foreground transition-colors group-hover/edu:text-primary">
                      {edu.degree}
                    </p>
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
                    <li
                      key={ach}
                      className="text-xs text-muted-foreground leading-relaxed flex items-start gap-1.5 transition-transform duration-200 hover:translate-x-1"
                    >
                      <span className="text-primary font-bold">•</span>
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Languages */}
              <div className="pt-2 border-t border-border/50 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                  <Globe2 className="h-3.5 w-3.5 text-primary" />
                  Languages:
                </div>
                <div className="flex flex-wrap items-center gap-1.5 xs:gap-2">
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
