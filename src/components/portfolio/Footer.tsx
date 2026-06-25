import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/portfolio";

export const Footer = () => {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="container flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}. Built with React + Tailwind.
        </p>
        <div className="flex items-center gap-4">
          <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-muted-foreground transition-smooth hover:text-foreground">
            <Github className="h-4 w-4" />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className="text-muted-foreground transition-smooth hover:text-foreground">
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};
