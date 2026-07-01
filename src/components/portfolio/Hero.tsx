import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/portfolio";
import profileImage from "@/assets/profile.png";

export const Hero = () => {
  return (
    <section id="top" className="bg-hero relative overflow-hidden">
      <div className="container grid items-center gap-12 py-20 md:py-32 lg:grid-cols-2">
        <div className="animate-fade-in-up space-y-6">
          <p className="font-mono text-sm text-primary">Hi, I'm</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-gradient">{profile.name}</span>
          </h1>
          <p className="text-xl text-muted-foreground sm:text-2xl">
            {profile.title} · <span className="font-mono text-base">{profile.location}</span>
          </p>
          <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
            {profile.tagline} {profile.intro}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button size="lg" asChild>
              <Link to="/projects">
                View Project <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={profile.resume} target="_blank" rel="noreferrer">
                View CV
              </a>
            </Button>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-muted-foreground transition-smooth hover:text-foreground"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="text-muted-foreground transition-smooth hover:text-foreground"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="relative mx-auto animate-scale-in lg:ml-auto">
          <div className="absolute inset-0 -z-10 rounded-full bg-primary/20 blur-3xl" aria-hidden />
          <img
            src={profileImage}
            alt={`Stylized portrait of ${profile.name}`}
            className="h-64 w-64 rounded-full border border-border/60 bg-card object-cover shadow-elegant sm:h-80 sm:w-80 lg:h-96 lg:w-96"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
};
