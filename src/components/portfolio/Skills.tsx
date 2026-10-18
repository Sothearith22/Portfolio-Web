import { CheckCircle2, Code2, Cpu, Database, HeartHandshake, Layers, Server, Terminal, Wrench } from "lucide-react";
import { Section } from "./Section";
import { Card } from "@/components/ui/card";
import { skills, softSkills } from "@/data/portfolio";

const CATEGORY_META: Record<
  string,
  { icon: typeof Code2; description: string; badge: string }
> = {
  Programming: {
    icon: Code2,
    description: "Core languages, object-oriented concepts, and algorithmic thinking.",
    badge: "Languages",
  },
  "Front-End": {
    icon: Layers,
    description: "Building responsive, component-driven UI with modern styling.",
    badge: "Client-side",
  },
  "Back-End": {
    icon: Server,
    description: "REST APIs, secure authentication, error handling, and business logic.",
    badge: "Server-side",
  },
  Database: {
    icon: Database,
    description: "Relational database modeling, schema design, and data storage.",
    badge: "Databases",
  },
  Tools: {
    icon: Terminal,
    description: "Version control workflows, API testing, and containerization.",
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
              className="group relative flex flex-col justify-between overflow-hidden border-border/80 bg-card/90 p-6 shadow-card transition-smooth hover:-translate-y-1 hover:border-primary/50 hover:shadow-elegant"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-smooth group-hover:scale-105 group-hover:bg-primary/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-border/80 bg-secondary/80 px-2.5 py-0.5 text-[11px] font-mono text-foreground/80">
                    {meta.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-mono text-lg font-bold text-foreground">
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
                      className="rounded-lg border border-border/80 bg-secondary/60 px-3 py-1.5 text-xs font-mono text-foreground/90 transition-smooth hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
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
      <div className="mt-8 rounded-2xl border border-border/80 bg-secondary/40 p-6 backdrop-blur">
        <div className="mb-4 flex items-center gap-2">
          <HeartHandshake className="h-4 w-4 text-primary" />
          <h4 className="text-sm font-semibold text-foreground">
            Soft Skills & Collaboration Strengths
          </h4>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {softSkills.map((item) => (
            <div key={item} className="flex items-center gap-2.5 text-xs font-medium text-foreground/90">
              <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-primary" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
