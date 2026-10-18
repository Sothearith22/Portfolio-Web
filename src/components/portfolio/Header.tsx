import { Moon, Sun, Menu, X, FileText } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";
import { profile } from "@/data/portfolio";

const NAV_ITEMS = [
  { to: "/about", label: "About" },
  { to: "/skills", label: "Skills" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/contact", label: "Contact" },
];

export const Header = () => {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="container flex h-16 items-center justify-between">
        <Link
          to="/"
          className="group font-mono text-base font-bold tracking-tight transition-smooth hover:scale-105"
        >
          <span className="text-primary transition-colors group-hover:text-primary-glow">{"<"}</span>
          <span>Rith</span>
          <span className="text-primary transition-colors group-hover:text-primary-glow">{"/>"}</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-smooth",
                  isActive
                    ? "bg-primary/10 font-semibold text-primary"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            asChild
            className="hidden sm:inline-flex h-8 gap-1.5 rounded-full border-primary/30 px-3 text-xs font-mono text-primary transition-smooth hover:bg-primary hover:text-primary-foreground"
          >
            <a href={profile.resume} target="_blank" rel="noreferrer">
              <FileText className="h-3.5 w-3.5" /> Resume
            </a>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className="rounded-full"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun className="h-4 w-4 text-primary" /> : <Moon className="h-4 w-4" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {open && (
        <nav className="border-t border-border/60 bg-background/95 backdrop-blur-lg md:hidden animate-fade-in" aria-label="Mobile">
          <div className="container flex flex-col py-3 space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-xl px-4 py-2.5 text-sm font-medium transition-smooth",
                    isActive
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-2">
              <Button
                size="sm"
                variant="outline"
                asChild
                className="w-full gap-2 rounded-xl border-primary/30 text-primary"
              >
                <a href={profile.resume} target="_blank" rel="noreferrer">
                  <FileText className="h-4 w-4" /> View Resume
                </a>
              </Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};
