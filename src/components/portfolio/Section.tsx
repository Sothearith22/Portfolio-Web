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
    <section id={id} ref={ref} className={`py-14 sm:py-20 md:py-28 ${className ?? ""}`}>
      <div className="container">
        <div className="mx-auto mb-8 sm:mb-12 max-w-2xl text-center">
          <p
            className={`font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary transition-all duration-700 ease-out ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
            }`}
          >
            {eyebrow}
          </p>
          <h2
            className={`mt-2 text-2xl xs:text-3xl sm:text-4xl font-bold tracking-tight text-foreground transition-all duration-700 delay-100 ease-out ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {title}
          </h2>
          {description && (
            <p
              className={`mt-3 sm:mt-4 text-muted-foreground text-sm sm:text-base md:text-lg transition-all duration-700 delay-200 ease-out ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {description}
            </p>
          )}
        </div>
        <div
          className={`transition-all duration-700 delay-300 ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {children}
        </div>
      </div>
    </section>
  );
};

