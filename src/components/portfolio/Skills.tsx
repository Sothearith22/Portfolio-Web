import { CheckCircle2, Code2, Cpu, Database, HeartHandshake, Layers, Server, Terminal, Wrench } from "lucide-react";
import { Section } from "./Section";
import { Card } from "@/components/ui/card";
import { skills, softSkills } from "@/data/portfolio";

const CATEGORY_META: Record<
  string,
  { icon: typeof Code2; description: string; badge: string }
> = {
  "ERP Development": {
    icon: Cpu,
    description: "Odoo framework, Python architecture, XML views, and business workflows.",
    badge: "Enterprise ERP",
  },
  "Backend Development": {
    icon: Server,
    description: "RESTful APIs, Spring Boot & Laravel, Spring Security JWT, and error handling.",
    badge: "Server-side",
  },
  "Frontend Development": {
    icon: Layers,
    description: "Responsive, component-driven UI with React.js, TypeScript, and Tailwind CSS.",
    badge: "Client-side",
  },
  Databases: {
    icon: Database,
    description: "Relational database modeling, schema design, and query optimization.",
    badge: "Databases",
  },
  "Developer Tools": {
    icon: Terminal,
    description: "Git workflows, Docker containerization, CI/CD pipelines, and API documentation.",
    badge: "DevOps & Tools",
  },
};

export const Skills = () => {
  return (
    <Section
      id="skills"
      eyebrow="02 — Skills"
      title="Technical & Core Capabilities"
      description="The technical foundation, frameworks, and developer workflows I use to build scalable web applications."
    >
      {/* Hard Skills Categories Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((group) => {
          const meta = CATEGORY_META[group.category] || {
            icon: Wrench,
            description: "Core technical tools and workflow technologies.",
            badge: "Skill",
          };
          const Icon = meta.icon;

          return (
            <Card
              key={group.category}
              className="group relative flex flex-col justify-between overflow-hidden border-border/80 bg-card/90 p-5 sm:p-6 shadow-card transition-all duration-300 hover:-translate-y-2 hover:border-primary/60 hover:shadow-2xl"
            >
              {/* Neon accent top border on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-all duration-300 group-hover:scale-120 group-hover:rotate-12 group-hover:bg-primary/25 group-hover:shadow-[0_0_15px_hsl(var(--primary)/0.5)] shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-border/80 bg-secondary/80 px-2.5 py-0.5 text-[11px] font-mono text-foreground/80 transition-all duration-300 group-hover:border-primary/50 group-hover:bg-primary/10 group-hover:text-primary group-hover:scale-105">
                    {meta.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-mono text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                    {group.category}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    {meta.description}
                  </p>
                </div>

                <ul className="flex flex-wrap gap-2 pt-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-border/80 bg-secondary/60 px-3 py-1.5 text-xs font-mono text-foreground/90 transition-all duration-200 hover:scale-110 hover:-translate-y-1 hover:border-primary hover:bg-primary/20 hover:text-primary hover:shadow-[0_0_15px_hsl(var(--primary)/0.3)] cursor-default"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border-t border-border/50 pt-3">
                <p className="text-[11px] font-mono text-muted-foreground">
                  {group.items.length} skills listed
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Soft Skills & Working Principles */}
      <div className="mt-8 rounded-2xl border border-border/80 bg-secondary/40 p-4 xs:p-6 backdrop-blur shadow-sm transition-all duration-300 hover:border-primary/40">
        <div className="mb-4 flex items-center gap-2">
          <HeartHandshake className="h-4 w-4 text-primary animate-pulse" />
          <h4 className="text-sm font-semibold text-foreground">
            Soft Skills & Collaboration Strengths
          </h4>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {softSkills.map((item) => (
            <div
              key={item}
              className="group/item flex items-center gap-2.5 text-xs font-medium text-foreground/90 transition-transform duration-200 hover:translate-x-1.5 cursor-default"
            >
              <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-primary transition-transform duration-200 group-hover/item:scale-125" />
              <span className="transition-colors group-hover/item:text-primary">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
