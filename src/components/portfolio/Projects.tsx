import { ExternalLink, Github } from "lucide-react";
import { Section } from "./Section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/portfolio";

export const Projects = () => {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="My Projects"
      description="A few things I've built recently. Click through for source or live demos."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card
            key={project.title}
            className="group flex flex-col overflow-hidden shadow-card transition-smooth hover:-translate-y-1 hover:shadow-elegant"
          >
            {/* Image Banner */}
            {project.image && (
              <div className="relative h-48 w-full overflow-hidden border-b border-border/50 bg-muted">
                <img
                  src={project.image}
                  alt={`Screenshot of ${project.title}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            )}

            {/* Project Content */}
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">
                {project.description}
              </p>

              <ul className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md bg-accent px-2 py-0.5 font-mono text-xs text-accent-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex gap-2">
                {project.github && (
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} on GitHub`}
                    >
                      <Github className="mr-1.5 h-4 w-4" /> Code
                    </a>
                  </Button>
                )}
                {project.demo && (
                  <Button size="sm" asChild>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} demo`}
                    >
                      <ExternalLink className="mr-1.5 h-4 w-4" /> Demo
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
};