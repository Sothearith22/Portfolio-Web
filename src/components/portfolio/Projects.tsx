import { useState } from "react";
import { Code2, ExternalLink, Github, Layers, Sparkles } from "lucide-react";
import { Section } from "./Section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/portfolio";

type CategoryFilter = "All" | "Full-Stack" | "Frontend";

export const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("All");

  const categories: { label: CategoryFilter; count: number }[] = [
    { label: "All", count: projects.length },
    {
      label: "Full-Stack",
      count: projects.filter((p) => p.category === "Full-Stack").length,
    },
    {
      label: "Frontend",
      count: projects.filter((p) => p.category === "Frontend").length,
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
      title="Featured Work"
      description="A selection of web applications and digital products I've built, spanning frontend interfaces to full-stack systems."
    >
      {/* Category Filter Pills */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.label;
          return (
            <button
              key={cat.label}
              onClick={() => setSelectedCategory(cat.label)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-smooth ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-elegant scale-105 font-semibold"
                  : "bg-secondary/70 text-muted-foreground hover:bg-secondary hover:text-foreground border border-border/70"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-mono font-bold ${
                  isActive
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-muted text-foreground/80"
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {filteredProjects.map((project) => (
          <Card
            key={project.title}
            className="group flex flex-col overflow-hidden border-border/80 bg-card/90 shadow-card transition-smooth hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-elegant"
          >
            {/* Image Banner */}
            {project.image && (
              <div className="relative h-52 sm:h-60 w-full overflow-hidden border-b border-border/50 bg-muted">
                <img
                  src={project.image}
                  alt={`Screenshot of ${project.title}`}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />

                {/* Category Pill Tag */}
                <div className="absolute top-3 right-3">
                  <Badge
                    variant="outline"
                    className="border-primary/40 bg-background/90 backdrop-blur font-mono text-[11px] font-semibold text-primary shadow-sm"
                  >
                    {project.category}
                  </Badge>
                </div>
              </div>
            )}

            {/* Project Content */}
            <div className="flex flex-1 flex-col p-6 sm:p-7">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
              </div>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="mt-5 space-y-2">
                <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                  Technologies
                </p>
                <ul className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md border border-border/60 bg-secondary/70 px-2.5 py-1 font-mono text-xs text-foreground/90 transition-colors group-hover:border-primary/20"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-border/50">
                {project.github && (
                  <Button size="sm" variant="outline" asChild className="hover:border-primary/40 transition-smooth">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} on GitHub`}
                    >
                      <Github className="mr-1.5 h-4 w-4" /> View Code
                    </a>
                  </Button>
                )}

                {project.demo ? (
                  <Button size="sm" asChild className="shadow-sm transition-smooth hover:scale-[1.02]">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} demo`}
                    >
                      <ExternalLink className="mr-1.5 h-4 w-4" /> Live Demo
                    </a>
                  </Button>
                ) : (
                  <span className="text-xs font-mono text-muted-foreground inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary/40 border border-border/40">
                    <Sparkles className="h-3 w-3 text-primary" /> Full-Stack System
                  </span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
};