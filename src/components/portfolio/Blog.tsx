import { ArrowUpRight, BookOpen, Calendar, Clock, Sparkles, Tag } from "lucide-react";
import { Section } from "./Section";
import { Card } from "@/components/ui/card";
import { blogPosts } from "@/data/portfolio";
import { TiltCard } from "./TiltCard";

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
          <TiltCard key={post.title} className="h-full rounded-2xl">
            <Card
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-card/90 p-5 sm:p-6 shadow-card transition-all duration-300 hover:border-primary/50 hover:shadow-2xl"
            >
              {/* Glowing gradient hover background overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              {/* Neon accent top border on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

              <div className="relative z-10">
                {/* Category & Read Time */}
                <div className="flex items-center justify-between gap-2 text-xs font-mono text-muted-foreground mb-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 font-semibold text-primary transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-105 shadow-xs">
                    <BookOpen className="h-3 w-3 transition-transform duration-300 group-hover:rotate-12" /> {post.category}
                  </span>
                  <span className="inline-flex items-center gap-1 transition-colors group-hover:text-foreground">
                    <Clock className="h-3 w-3 text-primary/80 transition-transform duration-300 group-hover:scale-110" /> {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed transition-colors duration-300 group-hover:text-foreground/90">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-secondary/50 px-2 py-0.5 font-mono text-[11px] text-muted-foreground transition-all duration-200 hover:scale-110 hover:border-primary/60 hover:bg-primary/15 hover:text-primary hover:shadow-xs cursor-default"
                    >
                      <Tag className="h-2.5 w-2.5 text-primary/70" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Meta & Action */}
              <div className="relative z-10 mt-6 pt-4 border-t border-border/50">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground font-mono transition-colors group-hover:text-foreground">
                    <Calendar className="h-3.5 w-3.5 text-primary/70 transition-transform duration-300 group-hover:scale-110" /> {post.date}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-all duration-300 group-hover:translate-x-1.5 cursor-pointer">
                    Read Article <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </div>
              </div>
            </Card>
          </TiltCard>
        ))}
      </div>
    </Section>
  );
};

export default Blog;


