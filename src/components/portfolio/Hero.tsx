import { ArrowRight, ChevronDown, Github, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/portfolio";
import profileImage from "@/assets/profile.png";

const ROLES = profile.roles || [profile.title];

export const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = ROLES[roleIndex % ROLES.length];
    const typingSpeed = isDeleting ? 35 : 75;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);


  return (
    <section id="top" className="bg-hero relative overflow-hidden">
      <div className="container grid items-center gap-12 py-20 md:py-32 lg:grid-cols-2">
        <div className="animate-fade-in-up space-y-6">
          {/* Status Chip */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-primary backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span>Available for Junior & Internship roles</span>
          </div>

          <div>
            <p className="font-mono text-sm text-primary mb-2">Hi, I'm</p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="text-gradient">{profile.name}</span>
            </h1>
          </div>

          <div className="h-10 flex items-center">
            <p className="text-xl text-muted-foreground sm:text-2xl font-mono">
              <span className="text-foreground font-semibold">{displayText}</span>
              <span className="inline-block w-[2px] h-[1.1em] bg-primary align-middle ml-1 animate-pulse" />
            </p>
          </div>

          <p className="max-w-xl text-base text-muted-foreground sm:text-lg leading-relaxed">
            {profile.intro}
          </p>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-6 py-1 text-sm border-y border-border/50">
            <div>
              <p className="font-mono text-xl font-bold text-foreground">3rd Year</p>
              <p className="text-xs text-muted-foreground">IT Student @ RUPP</p>
            </div>
            <div className="h-8 w-px bg-border/60" />
            <div>
              <p className="font-mono text-xl font-bold text-foreground">4+ Projects</p>
              <p className="text-xs text-muted-foreground">Web Applications</p>
            </div>
            <div className="h-8 w-px bg-border/60" />
            <div>
              <p className="font-mono text-xl font-bold text-foreground">Internship</p>
              <p className="text-xs text-muted-foreground">Backend Completed</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button size="lg" asChild className="shadow-elegant transition-smooth hover:scale-[1.02]">
              <Link to="/projects">
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="hover:border-primary/50 transition-smooth">
              <a href={profile.resume} target="_blank" rel="noreferrer">
                View CV
              </a>
            </Button>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-muted-foreground transition-smooth hover:text-foreground hover:scale-110"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="text-muted-foreground transition-smooth hover:text-foreground hover:scale-110"
            >
              <Mail className="h-5 w-5" />
            </a>
            <span className="text-xs font-mono text-muted-foreground ml-2">
              📍 {profile.location}, Cambodia
            </span>
          </div>
        </div>

        <div className="relative mx-auto animate-scale-in lg:ml-auto">
          <div className="absolute inset-0 -z-10 rounded-full bg-primary/20 blur-3xl animate-pulse-slow" aria-hidden />

          {/* Glowing Avatar Frame */}
          <div className="relative p-1.5 rounded-full bg-gradient-to-tr from-primary via-primary/30 to-primary/80 shadow-elegant transition-transform duration-500 hover:scale-[1.02]">
            <div className="rounded-full overflow-hidden bg-background p-1">
              <img
                src={profileImage}
                alt={`Stylized portrait of ${profile.name}`}
                className="h-64 w-64 rounded-full bg-card object-cover sm:h-80 sm:w-80 lg:h-96 lg:w-96"
                loading="eager"
              />
            </div>
          </div>

          {/* Floating interactive badge */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-4 rounded-full border border-border/80 bg-background/95 px-4 py-2 shadow-card backdrop-blur flex items-center gap-2.5 animate-float">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-ping" />
            <span className="text-xs font-semibold tracking-wide text-foreground">Full-Stack Ready</span>
            <span className="text-muted-foreground text-xs font-mono">React • Laravel</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="hidden md:inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors absolute bottom-5 left-1/2 -translate-x-1/2"
        aria-label="Scroll to About section"
      >
        <span>Explore more</span>
        <ChevronDown className="h-4 w-4 animate-bounce text-primary" />
      </a>
    </section>
  );
};

