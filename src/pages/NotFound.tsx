import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Compass, Home, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-16">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-20 h-[450px] w-[450px] rounded-full bg-primary/15 blur-[140px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute bottom-1/4 -right-20 h-[450px] w-[450px] rounded-full bg-primary-glow/15 blur-[150px] pointer-events-none -z-10 animate-pulse-slow" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[20%] left-[15%] h-1.5 w-1.5 rounded-full bg-primary/40 blur-[0.5px] animate-ping" />
        <div className="absolute top-[30%] right-[20%] h-2 w-2 rounded-full bg-primary-glow/40 blur-[0.5px] animate-pulse" />
        <div className="absolute bottom-[25%] left-[25%] h-1 w-1 rounded-full bg-white/40 blur-[0.5px]" />
        <div className="absolute bottom-[20%] right-[30%] h-1.5 w-1.5 rounded-full bg-primary/30 blur-[0.5px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-md w-full text-center animate-fade-in-up">
        {/* Floating 404 Visual Card */}
        <div className="inline-flex items-center justify-center mb-6">
          <div className="relative p-1 rounded-3xl bg-gradient-to-tr from-primary/40 via-primary-glow to-primary shadow-[0_0_50px_hsl(var(--primary)/0.3)] animate-float">
            <div className="flex flex-col items-center justify-center rounded-[22px] bg-card/90 px-8 py-6 backdrop-blur-xl border border-border/80">
              <Compass className="h-10 w-10 text-primary mb-2 animate-spin-slow" />
              <span className="font-mono text-6xl sm:text-7xl font-black tracking-tight text-foreground drop-shadow-[0_0_24px_hsl(var(--primary)/0.4)]">
                404
              </span>
              <span className="inline-flex items-center gap-1.5 mt-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary">
                <Sparkles className="h-3 w-3 animate-pulse" /> Route Not Found
              </span>
            </div>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Lost in Cyberspace?
        </h1>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
          The page or resource you are looking for at <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-primary">{location.pathname}</code> does not exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" asChild className="rounded-xl shadow-elegant transition-all duration-300 hover:scale-105 active:scale-95">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" /> Return to Home
            </Link>
          </Button>

          <Button size="lg" variant="outline" asChild className="rounded-xl border-border/80 bg-secondary/50 hover:bg-secondary hover:border-primary/50 text-foreground hover:text-primary transition-all duration-300 hover:scale-105 active:scale-95">
            <Link to="/contact">
              <Mail className="mr-2 h-4 w-4 text-primary" /> Contact Support
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
