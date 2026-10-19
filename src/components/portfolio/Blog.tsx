import { ArrowUpRight, BookOpen, Calendar, Clock, Tag } from "lucide-react";
import { Section } from "./Section";
import { Card } from "@/components/ui/card";
import { blogPosts } from "@/data/portfolio";

export const Blog = () => {
  return (
    <Section
      id="blog"
      eyebrow="05 — Technical Blog"
      title="Articles & Engineering Notes"
      description="Practical guides, system architecture breakdowns, and notes on Odoo ERP, backend security, and full-stack engineering."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Card
            key={post.title}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-card/90 p-5 sm:p-6 shadow-card transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-2xl"
          >
            <div>
              {/* Category & Read Time */}
              <div className="flex items-center justify-between gap-2 text-xs font-mono text-muted-foreground mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 font-semibold text-primary transition-colors group-hover:bg-primary/20 shadow-xs">
                  <BookOpen className="h-3 w-3 transition-transform duration-200 group-hover:scale-110" /> {post.category}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3 text-primary/80" /> {post.readTime}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-secondary/50 px-2 py-0.5 font-mono text-[11px] text-muted-foreground transition-all duration-200 hover:scale-105 hover:border-primary/50 hover:bg-primary/15 hover:text-primary cursor-default"
                  >
                    <Tag className="h-2.5 w-2.5 text-primary/70" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Meta & Action */}
            <div className="mt-6 pt-4 border-t border-border/50">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground font-mono">
                  <Calendar className="h-3.5 w-3.5 text-primary/70" /> {post.date}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-all duration-200 group-hover:translate-x-1 cursor-pointer">
                  Read Article <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
};

