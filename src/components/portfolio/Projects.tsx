import { useState } from "react";
import { ArrowUpRight, Code2, Cpu, ExternalLink, Github, Layers, Sparkles } from "lucide-react";
import { Section } from "./Section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/portfolio";
import { TiltCard } from "./TiltCard";

type CategoryFilter = "All" | "Full-Stack" | "Frontend" | "ERP";

export const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("All");

  const categories: { label: CategoryFilter; count: number; icon: typeof Layers }[] = [
    { label: "All", count: projects.length, icon: Layers },
    {
      label: "Full-Stack",
      count: projects.filter((p) => p.category === "Full-Stack").length,
      icon: Layers,
    },
    {
      label: "ERP",
      count: projects.filter((p) => p.category === "ERP").length,
      icon: Cpu,
    },
    {
      label: "Frontend",
      count: projects.filter((p) => p.category === "Frontend").length,
      icon: Code2,
    },
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <Section
      id="projects"
      eyebrow="03 — Projects"
      title="Featured Engineering Projects"
      description="Production systems, enterprise ERP modules, and modern full-stack web applications."
    >
      {/* Category Filter Tabs */}
      <div className="mb-8 sm:mb-12 flex justify-center w-full">
        <div className="inline-flex max-w-full overflow-x-auto no-scrollbar p-1 sm:p-1.5 rounded-2xl border border-border/80 bg-secondary/50 backdrop-blur-md shadow-sm">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.label;
            const Icon = cat.icon;
            return (
              <button
                key={cat.label}
                onClick={() => setSelectedCategory(cat.label)}
                className={`relative inline-flex items-center gap-1.5 sm:gap-2 whitespace-nowrap rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-background text-foreground shadow-sm font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/40"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                <span>{cat.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-mono font-bold transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {filteredProjects.map((project) => {
          const isCurrentOrActive =
            project.status?.toLowerCase().includes("active") ||
            project.status?.toLowerCase().includes("progress");

          return (
            <TiltCard key={project.title} className="h-full rounded-2xl">
              <Card
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card/90 shadow-card transition-all duration-300 hover:border-primary/50 hover:shadow-2xl"
              >
              {/* Image Preview Container */}
              {project.image ? (
                <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border/60 bg-muted/40">
                  <img
                    src={project.image}
                    alt={`Screenshot of ${project.title}`}
                    className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 pointer-events-none">
                    {/* Status Badge */}
                    {project.status ? (
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-mono font-medium shadow-sm backdrop-blur-md pointer-events-auto transition-transform duration-200 group-hover:scale-105 ${
                          isCurrentOrActive
                            ? "border border-primary/40 bg-background/90 text-primary"
                            : "border border-emerald-500/30 bg-background/90 text-emerald-600 dark:text-emerald-400"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            isCurrentOrActive ? "bg-primary animate-pulse" : "bg-emerald-500"
                          }`}
                        />
                        {project.status}
                      </span>
                    ) : (
                      <span />
                    )}

                    {/* Category Tag */}
                    <span className="inline-flex items-center gap-1 rounded-full border border-border/80 bg-background/90 px-3 py-1 text-[11px] font-mono font-semibold text-foreground/90 shadow-sm backdrop-blur-md pointer-events-auto transition-transform duration-200 group-hover:scale-105">
                      <Sparkles className="h-3 w-3 text-primary animate-pulse" />
                      {project.category}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border/60 bg-gradient-to-br from-primary/10 via-background to-secondary/30 p-6 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                      <Cpu className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-border/80 bg-background/90 px-3 py-1 text-[11px] font-mono font-semibold text-foreground/90 shadow-sm">
                      {project.category}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-primary uppercase tracking-wider font-semibold">
                      Enterprise ERP
                    </span>
                    <p className="text-base font-bold text-foreground mt-0.5">{project.title}</p>
                  </div>
                </div>
              )}

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-5 sm:p-7 justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0" />
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 space-y-5">
                  {/* Technology Tags */}
                  <div>
                    <ul className="flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-md border border-border/60 bg-secondary/50 px-2.5 py-1 font-mono text-xs text-foreground/80 transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/10 hover:text-primary cursor-default"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions / Links */}
                  <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-border/50">
                    {project.github && !project.githubFrontend && (
                      <Button size="sm" variant="outline" asChild className="hover:border-primary/50 hover:text-primary transition-all duration-200 hover:scale-105 active:scale-95 shadow-xs">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${project.title} on GitHub`}
                        >
                          <Github className="mr-1.5 h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-6" /> Source Code
                        </a>
                      </Button>
                    )}

                    {project.github && project.githubFrontend && (
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="outline" asChild className="hover:border-primary/50 hover:text-primary transition-all duration-200 hover:scale-105 active:scale-95 shadow-xs">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${project.title} Backend on GitHub`}
                          >
                            <Github className="mr-1.5 h-3.5 w-3.5" /> Backend
                          </a>
                        </Button>
                        <Button size="sm" variant="outline" asChild className="hover:border-primary/50 hover:text-primary transition-all duration-200 hover:scale-105 active:scale-95 shadow-xs">
                          <a
                            href={project.githubFrontend}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${project.title} Frontend on GitHub`}
                          >
                            <Github className="mr-1.5 h-3.5 w-3.5" /> Frontend
                          </a>
                        </Button>
                      </div>
                    )}

                    {project.demo && (
                      <Button size="sm" asChild className="shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95">
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${project.title} Live Demo`}
                        >
                          <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> Live Demo
                        </a>
                      </Button>
                    )}

                    {!project.github && !project.demo && (
                      <span className="text-xs font-mono text-muted-foreground inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border/50">
                        <Sparkles className="h-3 w-3 text-primary animate-pulse" /> Enterprise System
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </TiltCard>
        );
      })}
      </div>
    </Section>
  );
};