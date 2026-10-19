import { Briefcase, Calendar, CheckCircle, FileText, Mail, MapPin, Phone, Sparkles, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Section } from "./Section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { experience, profile, reference } from "@/data/portfolio";

export const Experience = () => {
  return (
    <Section
      id="experience"
      eyebrow="04 — Experience"
      title="Where I've Worked"
      description="Practical software engineering experience gained through production development and teamwork."
    >
      <div className="mx-auto max-w-3xl space-y-10">
        <ol className="relative border-l-2 border-primary/25 pl-5 xs:pl-6 sm:pl-8 space-y-10">
          {experience.map((item) => (
            <li key={`${item.company}-${item.period}`} className="relative group">
              {/* Timeline marker with glow and hover pulse */}
              <span
                className="absolute -left-[27px] xs:-left-[31px] sm:-left-[39px] mt-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-4 ring-background shadow-md transition-all duration-300 group-hover:scale-125 group-hover:ring-primary/40 group-hover:shadow-[0_0_12px_hsl(var(--primary))]"
                aria-hidden
              />

              <Card className="border-border/80 bg-card/90 p-4 xs:p-6 sm:p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-elegant">
                {/* Header info */}
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/50 pb-4">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                      {item.role}{" "}
                      <span className="text-primary font-medium">@ {item.company}</span>
                    </h3>
                    {item.project && (
                      <p className="mt-0.5 text-xs font-mono font-medium text-primary">
                        Project: {item.project}
                      </p>
                    )}
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground font-mono">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-primary" />
                        {item.period}
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-primary" />
                        Phnom Penh, Cambodia
                      </span>
                    </div>
                  </div>

                  {item.isCurrent ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/15 px-3 py-1 font-mono text-xs font-bold text-primary shadow-sm transition-transform duration-200 group-hover:scale-105">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                      </span>
                      Current Role
                    </span>
                  ) : (
                    <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary font-mono text-xs transition-transform duration-200 group-hover:scale-105">
                      Completed Internship
                    </Badge>
                  )}
                </div>

                {/* Description */}
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>

                {/* Key Achievements & Highlights */}
                {item.highlights && item.highlights.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-xs font-mono font-semibold uppercase tracking-wider text-foreground/80">
                      Key Responsibilities & Contributions:
                    </p>
                    <ul className="space-y-1.5 pl-1">
                      {item.highlights.map((highlight) => (
                        <li key={highlight} className="group/hi flex items-start gap-2 text-xs text-foreground/90 leading-relaxed transition-transform duration-200 hover:translate-x-1">
                          <CheckCircle className="h-3.5 w-3.5 flex-shrink-0 text-primary mt-0.5 transition-transform duration-200 group-hover/hi:scale-125" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Stack tags */}
                <div className="mt-5 flex flex-wrap items-center gap-2 pt-4 border-t border-border/50">
                  <span className="text-xs font-mono text-muted-foreground">Technologies:</span>
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border/70 bg-secondary/70 px-2.5 py-0.5 font-mono text-xs text-foreground/90 transition-all duration-200 hover:scale-105 hover:border-primary/50 hover:bg-primary/15 hover:text-primary cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Card>
            </li>
          ))}
        </ol>

        {/* Reference & Opportunity Card Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Reference Card from CV */}
          {reference && (
            <Card className="border-border/80 bg-card/80 p-5 shadow-card space-y-3 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-elegant">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary font-semibold">
                <UserCheck className="h-4 w-4" /> Professional Reference
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{reference.name}</p>
                <p className="text-xs text-muted-foreground">{reference.role}, {reference.company}</p>
              </div>
              <div className="space-y-1 text-xs font-mono text-foreground/90 pt-1 border-t border-border/40">
                <p className="flex items-center gap-2">
                  <Phone className="h-3 w-3 text-primary" /> {reference.phone}
                </p>
                <p className="flex items-center gap-2 truncate">
                  <Mail className="h-3 w-3 text-primary" /> {reference.email}
                </p>
              </div>
            </Card>
          )}

          {/* Opportunity Callout */}
          <Card className="border border-primary/25 bg-gradient-to-r from-primary/10 via-card to-primary/5 p-5 shadow-card flex flex-col justify-between space-y-4 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-elegant">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5 animate-pulse" /> Career Focus
              </div>
              <h4 className="text-base font-bold text-foreground">
                Odoo ERP & Full-Stack Development
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Open to technical collaborations, ERP customization, backend engineering, and full-stack web roles in Phnom Penh or remote.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <Button size="sm" asChild className="shadow-elegant hover:scale-105 active:scale-95 transition-all duration-200">
                <Link to="/contact">Get in Touch</Link>
              </Button>
              <Button size="sm" variant="outline" asChild className="hover:scale-105 active:scale-95 transition-all duration-200 hover:border-primary/50 hover:text-primary">
                <a href={profile.resume} target="_blank" rel="noreferrer">
                  <FileText className="mr-1.5 h-3.5 w-3.5" /> View CV
                </a>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
};
