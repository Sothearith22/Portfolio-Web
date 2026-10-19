import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Moon, Sun, Menu, X, FileText, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";
import { profile } from "@/data/portfolio";

// ============================================================================
// NAVBAR CONFIGURATION
// Centralized config for easy editing of links, socials, and resume URL
// ============================================================================
export const NAV_CONFIG = {
  // Nav Links: Home -> About -> Projects -> Skills -> Experience -> Blog -> Contact
  links: [
    { label: "Home", to: "/", id: "top" },
    { label: "About", to: "/about", id: "about" },
    { label: "Projects", to: "/projects", id: "projects" },
    { label: "Skills", to: "/skills", id: "skills" },
    { label: "Experience", to: "/experience", id: "experience" },
    { label: "Blog", to: "/blog", id: "blog" },
    { label: "Contact", to: "/contact", id: "contact" },
  ],
  // Social profiles displayed next to Resume button (desktop) and in mobile drawer
  socials: [
    {
      name: "GitHub",
      href: profile.socials?.github || "https://github.com/Sothearith22",
      icon: Github,
      ariaLabel: "Visit GitHub profile (opens in new tab)",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/sothearith-kim", // replace with your LinkedIn URL
      icon: Linkedin,
      ariaLabel: "Visit LinkedIn profile (opens in new tab)",
    },
  ],
  // Resume document URL
  resumeUrl: profile.resume || "/assets/cv/KimSothearith-Webdeveloper-CV.pdf",
};

export const Header = () => {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("top");
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // 1. Detect scroll position to add backdrop blur, border & shadow elevation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
      if (window.scrollY < 140) {
        setActiveSection("top");
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. IntersectionObserver to dynamically highlight the section currently in view
  useEffect(() => {
    const sectionIds = NAV_CONFIG.links.map((link) => link.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (window.scrollY < 140) {
          setActiveSection("top");
          return;
        }

        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -45% 0px",
        threshold: [0.1, 0.25, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  // 3. Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  // Handle Logo click: scroll to top smoothly & close mobile menu
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveSection("top");
    if (pathname !== "/") {
      navigate("/");
    } else {
      window.history.pushState(null, "", "/");
    }
  };

  // Handle nav link click: smooth scroll to element & update route history
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: (typeof NAV_CONFIG.links)[number]
  ) => {
    e.preventDefault();
    setOpen(false);

    if (item.id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveSection("top");
      if (pathname !== "/") {
        navigate("/");
      } else {
        window.history.pushState(null, "", "/");
      }
      return;
    }

    const element = document.getElementById(item.id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", item.to);
      setActiveSection(item.id);
    } else {
      navigate(item.to);
    }
  };

  // Helper to determine active state
  const isItemActive = (item: (typeof NAV_CONFIG.links)[number]) => {
    if (activeSection) {
      return activeSection === item.id;
    }
    if (item.id === "top") {
      return pathname === "/" || pathname === "";
    }
    return pathname === item.to || pathname === `/${item.id}`;
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/80 bg-background/85 shadow-sm shadow-black/5 backdrop-blur-md supports-[backdrop-filter]:bg-background/80"
          : "border-b border-border/30 bg-background/60 backdrop-blur-sm"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* 1. Logo: Links to top of page */}
        <Link
          to="/"
          onClick={handleLogoClick}
          aria-label="Kim Sothearith — Scroll to top"
          className="group inline-flex items-center font-mono text-base font-bold tracking-tight transition-smooth hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md px-1 flex-shrink-0"
        >
          <span className="text-primary transition-colors group-hover:text-primary-glow">{"<"}</span>
          <span className="text-foreground">Rith</span>
          <span className="text-primary transition-colors group-hover:text-primary-glow">{"/>"}</span>
        </Link>

        {/* 2. Desktop Navigation: Home, About, Projects, Skills, Experience, Blog, Contact */}
        <nav
          className="hidden items-center gap-0.5 lg:gap-1 md:flex"
          aria-label="Main Navigation"
        >
          {NAV_CONFIG.links.map((item) => {
            const isActive = isItemActive(item);
            return (
              <a
                key={item.id}
                href={item.to}
                onClick={(e) => handleNavClick(e, item)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-2.5 lg:px-3 py-1.5 text-xs lg:text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isActive
                    ? "bg-primary/10 font-semibold text-primary shadow-xs"
                    : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
                )}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* 3. Desktop Actions: Social Icons + Resume + Theme Toggle */}
        <div className="hidden md:flex items-center gap-1.5 lg:gap-2 flex-shrink-0">
          {/* Social Icons (Visible on large screens, hidden on compact tablets to give nav links room) */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_CONFIG.socials.map((social) => {
              const Icon = social.icon;
              return (
                <Button
                  key={social.name}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="h-8 w-8 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </Button>
              );
            })}
          </div>

          {/* Resume Button */}
          <Button
            size="sm"
            variant="outline"
            asChild
            className="h-8 gap-1.5 rounded-full border-primary/30 px-3 text-xs font-mono text-primary transition-smooth hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary"
          >
            <a
              href={NAV_CONFIG.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open resume in new tab"
            >
              <FileText className="h-3.5 w-3.5" /> Resume
            </a>
          </Button>

          {/* Dark / Light Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className="h-8 w-8 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-primary" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Mobile Header Actions: Direct Theme Toggle + Hamburger Menu */}
        <div className="flex md:hidden items-center gap-1">
          {/* 1-Tap Theme Toggle on Mobile */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className="h-9 w-9 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-primary" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          {/* Hamburger Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full focus-visible:ring-2 focus-visible:ring-primary"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* 5. Mobile Slide-Down Panel */}
      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden border-t border-border/70 bg-background/95 backdrop-blur-xl transition-all duration-300 ease-in-out md:hidden shadow-lg",
          open ? "max-h-[550px] opacity-100 py-4" : "max-h-0 opacity-0 py-0 pointer-events-none"
        )}
      >
        <nav className="container flex flex-col space-y-1" aria-label="Mobile Navigation">
          {/* Nav Links: Home, About, Projects, Skills, Experience, Blog, Contact */}
          {NAV_CONFIG.links.map((item) => {
            const isActive = isItemActive(item);
            return (
              <a
                key={item.id}
                href={item.to}
                onClick={(e) => handleNavClick(e, item)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded-xl px-4 py-2.5 text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                {item.label}
              </a>
            );
          })}

          {/* Mobile Actions: Resume, Socials, and Theme Toggle */}
          <div className="pt-3 mt-2 border-t border-border/60 space-y-3">
            {/* View Resume Button */}
            <Button
              size="sm"
              variant="outline"
              asChild
              className="w-full gap-2 rounded-xl border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
            >
              <a
                href={NAV_CONFIG.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                aria-label="Open resume in new tab"
              >
                <FileText className="h-4 w-4" /> View Resume
              </a>
            </Button>

            {/* Bottom Row: Social Links + Theme Toggle Button */}
            <div className="flex items-center justify-between pt-1 px-1">
              {/* Social Icon Buttons */}
              <div className="flex items-center gap-2">
                {NAV_CONFIG.socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Button
                      key={social.name}
                      variant="outline"
                      size="sm"
                      asChild
                      className="h-9 gap-1.5 rounded-xl border-border/70 px-3 text-xs text-foreground/80 hover:border-primary/50 hover:text-primary"
                    >
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.ariaLabel}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{social.name}</span>
                      </a>
                    </Button>
                  );
                })}
              </div>

              {/* Theme Toggle Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={toggle}
                className="h-9 gap-1.5 rounded-xl border-border/70 px-3 text-xs text-foreground/80 hover:border-primary/50 hover:text-primary"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="h-4 w-4 text-primary" />
                    <span>Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4" />
                    <span>Dark</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
