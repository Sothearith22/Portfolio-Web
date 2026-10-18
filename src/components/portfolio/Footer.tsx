import { ArrowUp, Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { profile } from "@/data/portfolio";

const FOOTER_LINKS = [
  { to: "/about", label: "About" },
  { to: "/skills", label: "Skills" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/contact", label: "Contact" },
];

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border/60 py-12 bg-background/50">
      <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex flex-col items-center sm:items-start gap-2">
          <Link to="/" className="font-mono text-sm font-semibold tracking-tight">
            <span className="text-primary">{"<"}</span>Rith<span className="text-primary">{"/>"}</span>
          </Link>
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} {profile.name}. Designed & Built with React + Tailwind.
          </p>
        </div>

        {/* Quick Nav Links */}
        <nav className="flex flex-wrap items-center justify-center gap-6" aria-label="Footer Navigation">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions & Socials */}
        <div className="flex items-center gap-4">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="rounded-lg p-2 text-muted-foreground transition-smooth hover:bg-secondary hover:text-foreground"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="rounded-lg p-2 text-muted-foreground transition-smooth hover:bg-secondary hover:text-foreground"
          >
            <Mail className="h-4 w-4" />
          </a>

          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-secondary/60 px-3 py-1.5 text-xs font-mono text-muted-foreground hover:border-primary/40 hover:bg-primary/10 hover:text-primary transition-smooth"
          >
            <span>Top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
