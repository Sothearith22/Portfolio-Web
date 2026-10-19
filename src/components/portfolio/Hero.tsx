import { useEffect, useState } from "react";
import {
  ArrowRight,
  Code2,
  Github,
  Layers,
  Linkedin,
  Mail,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/portfolio";
import profileImage from "@/assets/profile.png";
import { ThreeBackground } from "./ThreeBackground";

const ROLES = [
  "Creative Coder",
  "Full-Stack Developer",
  "Odoo ERP Developer",
  "Backend Specialist",
];

const TECH_PILLS = [
  { name: "Odoo", bg: "bg-[#714B67] text-white" },
  { name: "Spring Boot", bg: "bg-emerald-500 text-white" },
  { name: "React", bg: "bg-sky-500 text-white" },
  { name: "Laravel", bg: "bg-rose-500 text-white" },
  { name: "PostgreSQL", bg: "bg-indigo-600 text-white" },
  { name: "Tailwind", bg: "bg-cyan-500 text-white" },
  { name: "Python", bg: "bg-blue-600 text-white" },
];

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
          setTimeout(() => setIsDeleting(true), 2200);
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

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", `/${targetId}`);
    }
  };

  return (
    <section id="top" className="relative min-h-[92vh] overflow-hidden py-16 sm:py-20 lg:py-24 flex items-center bg-background">
      {/* 3D Interactive Three.js Particle & Geometric Wireframe Scene */}
      <ThreeBackground />

      {/* Ambient Cosmic Lighting & Nebula Accents */}
      <div className="absolute top-1/4 -left-20 h-[500px] w-[500px] rounded-full bg-primary/15 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-20 h-[520px] w-[520px] rounded-full bg-primary-glow/15 blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 h-[380px] w-[700px] rounded-full bg-sky-500/10 blur-[150px] pointer-events-none -z-10" />

      <div className="container relative z-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        {/* LEFT COLUMN: GREETING, BIG NAME, TYPING TITLE, BIO, TECH PILLS, CTAS, SOCIALS */}
        <div className="space-y-6 lg:col-span-7 animate-fade-in-up">
          {/* 1. Status Pill Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary shadow-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
            </span>
            <span className="tracking-wide">Available for freelance work</span>
          </div>

          {/* 2. Greeting & Massive Split Name */}
          <div className="space-y-1">
            <p className="font-sans text-base xs:text-lg sm:text-xl text-muted-foreground font-normal">
              Hey there! I'm
            </p>
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.08] break-words">
              <span className="block">Kim</span>
              <span className="block">Sothearith</span>
            </h1>
          </div>

          {/* 3. Typing Subtitle with Neon Cyan Glow */}
          <div className="flex flex-wrap items-center gap-2 text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold min-h-[40px] sm:min-h-[44px]">
            <span className="text-foreground">I'm a</span>
            <span className="relative inline-block text-sky-400 font-extrabold tracking-tight drop-shadow-[0_0_20px_rgba(56,189,248,0.85)]">
              {displayText}
            </span>
            <span className="inline-block w-[3px] h-[1.15em] bg-sky-400 align-middle -ml-1 animate-pulse shadow-[0_0_12px_#38bdf8]" />
          </div>

          {/* 4. Bio Paragraph */}
          <p className="max-w-xl text-sm sm:text-base text-muted-foreground leading-relaxed font-normal">
            Creating stunning, accessible, and high-performance web experiences that bring your ideas to life. Specialized in modern frameworks, Odoo ERP customization, Spring Boot, Laravel, and cutting-edge web technologies.
          </p>

          {/* 5. Color Pill Technology Badges */}
          <div className="flex flex-wrap items-center gap-1.5 xs:gap-2 pt-1">
            {TECH_PILLS.map((pill) => (
              <span
                key={pill.name}
                className={`rounded-full px-3 xs:px-4 py-1 xs:py-1.5 text-[11px] xs:text-xs font-semibold tracking-wide shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md cursor-default ${pill.bg}`}
              >
                {pill.name}
              </span>
            ))}
          </div>

          {/* 6. Action CTA Buttons (Theme-Integrated) */}
          <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3 xs:gap-4 pt-2 w-full xs:w-auto">
            <Button
              size="lg"
              asChild
              className="group w-full xs:w-auto justify-center rounded-xl px-7 py-3.5 bg-gradient-to-r from-sky-500 via-primary to-indigo-600 hover:from-sky-400 hover:via-primary-glow hover:to-indigo-500 text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:scale-105 border-0"
            >
              <a href="#projects" onClick={(e) => handleSmoothScroll(e, "projects")}>
                View My Work{" "}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full xs:w-auto justify-center rounded-xl px-7 py-3.5 border border-border/80 bg-secondary/50 hover:bg-secondary hover:border-primary/50 text-foreground hover:text-primary font-semibold backdrop-blur-md shadow-sm transition-all duration-300 hover:scale-105"
            >
              <a href="#contact" onClick={(e) => handleSmoothScroll(e, "contact")}>
                Let's Talk <MessageCircle className="ml-2 h-4 w-4 text-primary transition-colors" />
              </a>
            </Button>
          </div>

          {/* 7. Follow Me Social Icons Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <span className="text-xs font-medium text-muted-foreground font-mono tracking-wide">
              Follow me:
            </span>
            <div className="flex items-center gap-2">
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-secondary/50 text-muted-foreground transition-all duration-200 hover:border-primary hover:text-primary hover:bg-secondary hover:scale-110"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com/in/sothearith-kim"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-secondary/50 text-muted-foreground transition-all duration-200 hover:border-primary hover:text-primary hover:bg-secondary hover:scale-110"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Send email"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-secondary/50 text-muted-foreground transition-all duration-200 hover:border-primary hover:text-primary hover:bg-secondary hover:scale-110"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CIRCULAR PORTRAIT WITH UNOBSTRUCTED VIEW & BALANCED FLOATING ELEMENTS */}
        <div className="relative mx-auto flex items-center justify-center py-10 xs:py-12 sm:py-16 lg:col-span-5 lg:py-8 animate-scale-in w-full max-w-[340px] xs:max-w-[420px] sm:max-w-none">
          {/* Subtle Glow Behind Avatar */}
          <div className="absolute h-[280px] w-[280px] xs:h-[340px] xs:w-[340px] sm:h-[400px] sm:w-[400px] rounded-full bg-gradient-to-tr from-sky-500/20 via-purple-600/25 to-pink-500/20 blur-[60px] pointer-events-none" />

          {/* Floating Glass Code Card (Positioned high and to the right so face is 100% visible) */}
          <div className="absolute -top-8 -right-1 xs:-top-10 xs:-right-2 sm:-top-14 sm:-right-6 lg:-top-16 lg:-right-8 z-30 w-44 xs:w-52 sm:w-56 rounded-2xl border border-slate-700/60 bg-[#0d131f]/95 p-2.5 xs:p-3 shadow-2xl backdrop-blur-xl animate-float font-mono text-[9.5px] xs:text-[10px] sm:text-[11px]">
            {/* macOS traffic light controls */}
            <div className="flex items-center gap-1.5 pb-1.5 xs:pb-2 mb-1.5 xs:mb-2 border-b border-slate-800/80">
              <span className="h-2 w-2 rounded-full bg-rose-500" />
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="ml-1.5 text-[8.5px] xs:text-[9px] sm:text-[10px] text-slate-400 font-mono">developer.ts</span>
            </div>
            <div className="space-y-0.5 font-mono text-slate-300 leading-snug">
              <p>
                <span className="text-purple-400 font-semibold">const</span>{" "}
                <span className="text-cyan-300 font-semibold">developer</span> = &#123;
              </p>
              <p className="pl-2 xs:pl-2.5">
                <span className="text-slate-400">name:</span>{" "}
                <span className="text-emerald-300">"Sothearith Kim"</span>,
              </p>
              <p className="pl-2 xs:pl-2.5">
                <span className="text-slate-400">skills:</span>{" "}
                <span className="text-amber-300">["Spring", "React",</span>
              </p>
              <p className="pl-2 xs:pl-2.5">
                <span className="text-amber-300">"Laravel"]</span>,
              </p>
              <p className="pl-2 xs:pl-2.5">
                <span className="text-slate-400">passion:</span>{" "}
                <span className="text-pink-400">"APIs"</span>
              </p>
              <p>&#125;;</p>
            </div>
          </div>

          {/* Central Portrait with Glowing Gradient Ring (Face completely visible) */}
          <div className="relative p-[3px] sm:p-[3.5px] rounded-full bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 shadow-[0_0_50px_rgba(168,85,247,0.35)] transition-transform duration-500 hover:scale-[1.02]">
            <div className="h-56 w-56 xs:h-64 xs:w-64 sm:h-80 sm:w-80 md:h-84 md:w-84 lg:h-88 lg:w-88 rounded-full overflow-hidden bg-slate-950 p-1">
              <img
                src={profileImage}
                alt={`Portrait of ${profile.name}`}
                className="h-full w-full rounded-full object-cover object-top"
                loading="eager"
              />
            </div>

            {/* Orbital Badge 1: Top-Left at ~10 o'clock (Emerald Green </>) */}
            <div
              title="Clean Code"
              className="absolute top-8 -left-1 xs:top-10 xs:-left-2 sm:top-14 sm:-left-4 z-20 flex h-8 w-8 xs:h-9 xs:w-9 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)] -rotate-12 transition-transform duration-200 hover:rotate-0 hover:scale-110"
            >
              <Code2 className="h-3.5 w-3.5 xs:h-4 xs:w-4 sm:h-5 sm:w-5" />
            </div>

            {/* Orbital Badge 2: Mid-Right at ~4 o'clock (Purple Stack/Layers - fully visible) */}
            <div
              title="Full-Stack & ERP Architecture"
              className="absolute top-[56%] -right-1 xs:-right-2 sm:-right-4 -translate-y-1/2 z-20 flex h-8 w-8 xs:h-9 xs:w-9 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)] rotate-12 transition-transform duration-200 hover:rotate-0 hover:scale-110"
            >
              <Layers className="h-3.5 w-3.5 xs:h-4 xs:w-4 sm:h-5 sm:w-5" />
            </div>

            {/* Orbital Badge 3: Mid-Left at ~8 o'clock (Cyan Sparkles - fully visible above stat card) */}
            <div
              title="Modern Web UI"
              className="absolute top-[56%] -left-1 xs:-left-2 sm:-left-4 -translate-y-1/2 z-20 flex h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 items-center justify-center rounded-2xl bg-cyan-400 text-white shadow-[0_0_20px_rgba(34,211,238,0.5)] -rotate-12 transition-transform duration-200 hover:rotate-0 hover:scale-110"
            >
              <Sparkles className="h-3.5 w-3.5 xs:h-4 xs:w-4 sm:h-4 sm:w-4" />
            </div>
          </div>

          {/* Floating Metric Card 1: Bottom-Left (6+ Projects) */}
          <div className="absolute -bottom-2.5 left-0 xs:-bottom-3 xs:left-1 sm:-bottom-5 sm:left-2 z-20 rounded-xl xs:rounded-2xl border border-slate-800/90 bg-[#0d131f]/95 px-3 xs:px-4 sm:px-5 py-2 xs:py-2.5 sm:py-3 text-center shadow-2xl backdrop-blur-xl min-w-[92px] xs:min-w-[105px] sm:min-w-[120px]">
            <p className="font-mono text-xl xs:text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              6<span className="text-cyan-400 font-black">+</span>
            </p>
            <p className="text-[10px] xs:text-[11px] sm:text-xs font-medium text-slate-400 mt-0.5">Projects</p>
          </div>

          {/* Floating Metric Card 2: Bottom-Right (Year 3 IT @ RUPP) */}
          <div className="absolute -bottom-2.5 right-0 xs:-bottom-3 xs:right-1 sm:-bottom-5 sm:right-2 z-20 rounded-xl xs:rounded-2xl border border-slate-800/90 bg-[#0d131f]/95 px-3 xs:px-4 sm:px-5 py-2 xs:py-2.5 sm:py-3 text-center shadow-2xl backdrop-blur-xl min-w-[92px] xs:min-w-[105px] sm:min-w-[120px]">
            <p className="font-mono text-xl xs:text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Year <span className="text-pink-500 font-black">3</span>
            </p>
            <p className="text-[10px] xs:text-[11px] sm:text-xs font-medium text-slate-400 mt-0.5">IT @ RUPP</p>
          </div>
        </div>
      </div>
    </section>
  );
};
