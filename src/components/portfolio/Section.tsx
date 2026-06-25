import { ReactNode } from "react";
interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export const Section = ({ id, eyebrow, title, description, children, className }: SectionProps) => {
  return (
    <section id={id} className={`py-20 md:py-28 ${className ?? ""}`}>
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center animate-fade-in">
          <p className="font-mono text-sm text-primary">{eyebrow}</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          {description && <p className="mt-4 text-muted-foreground">{description}</p>}
        </div>
        {children}
      </div>
    </section>
  );
};
