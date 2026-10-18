import { ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export const Section = ({ id, eyebrow, title, description, children, className }: SectionProps) => {
  const { ref, isInView } = useInView({ threshold: 0.08 });

  return (
    <section id={id} ref={ref} className={`py-20 md:py-28 ${className ?? ""}`}>
      <div
        className={`container transition-all duration-700 ease-out ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary">
            {eyebrow}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            {title}
          </h2>
          {description && <p className="mt-4 text-muted-foreground text-base sm:text-lg">{description}</p>}
        </div>
        {children}
      </div>
    </section>
  );
};

