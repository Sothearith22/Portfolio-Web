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
        <ol className="relative border-l border-border/80 pl-6 sm:pl-8 space-y-10">
          {experience.map((item) => (
            <li key={`${item.company}-${item.period}`} className="relative group">
              {/* Timeline marker */}
              <span
                className="absolute -left-[31px] sm:-left-[39px] mt-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-4 ring-background shadow-sm transition-transform group-hover:scale-125"
                aria-hidden
              />

              <Card className="border-border/80 bg-card/90 p-6 sm:p-7 shadow-card transition-smooth hover:border-primary/50 hover:shadow-elegant">
                {/* Header info */}
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/50 pb-4">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-foreground">
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

                  <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary font-mono text-xs">
                    Internship
                  </Badge>
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
                        <li key={highlight} className="flex items-start gap-2 text-xs text-foreground/90 leading-relaxed">
                          <CheckCircle className="h-3.5 w-3.5 flex-shrink-0 text-primary mt-0.5" />
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
                      className="rounded-md border border-border/70 bg-secondary/70 px-2.5 py-0.5 font-mono text-xs text-foreground/90"
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
            <Card className="border-border/80 bg-card/80 p-5 shadow-card space-y-3">
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
          <Card className="border border-primary/25 bg-gradient-to-r from-primary/10 via-card to-primary/5 p-5 shadow-card flex flex-col justify-between space-y-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" /> Available for Hire
              </div>
              <h4 className="text-base font-bold text-foreground">
                Seeking Junior Web Developer Roles
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Open to junior full-time positions, internships, or full-stack projects in Phnom Penh or remote.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <Button size="sm" asChild className="shadow-elegant">
                <Link to="/contact">Get in Touch</Link>
              </Button>
              <Button size="sm" variant="outline" asChild>
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
