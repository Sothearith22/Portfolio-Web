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
    <footer className="border-t border-border/60 py-10 sm:py-12 bg-background/50">
      <div className="container flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex flex-col items-center md:items-start gap-1.5 text-center md:text-left">
          <Link to="/" className="font-mono text-sm font-semibold tracking-tight">
            <span className="text-primary">{"<"}</span>Rith<span className="text-primary">{"/>"}</span>
          </Link>
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} {profile.name}. Designed & Built with React + Tailwind.
          </p>
        </div>

        {/* Quick Nav Links */}
        <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6" aria-label="Footer Navigation">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions & Socials */}
        <div className="flex items-center gap-3">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="rounded-lg p-2 text-muted-foreground transition-all duration-200 hover:bg-secondary hover:text-primary hover:scale-110"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="rounded-lg p-2 text-muted-foreground transition-all duration-200 hover:bg-secondary hover:text-primary hover:scale-110"
          >
            <Mail className="h-4 w-4" />
          </a>

          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="group inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-secondary/60 px-3.5 py-1.5 text-xs font-mono text-muted-foreground hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all duration-200 hover:scale-105 active:scale-95 shadow-xs"
          >
            <span>Top</span>
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </footer>
  );
};
