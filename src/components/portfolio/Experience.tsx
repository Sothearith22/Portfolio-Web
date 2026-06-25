import { Section } from "./Section";
import { experience } from "@/data/portfolio";


export const Experience = () => {
  return (
    <Section id="experience" eyebrow="04 — Experience" title="Where I've worked">
      <ol className="relative mx-auto max-w-2xl border-l border-border pl-8">
        {experience.map((item) => (
          <li key={`${item.company}-${item.period}`} className="relative mb-10 last:mb-0">
            <span
              className="absolute -left-[37px] mt-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-primary ring-4 ring-background"
              aria-hidden
            />
            <p className="font-mono text-xs text-muted-foreground">{item.period}</p>
            <h3 className="mt-1 text-lg font-semibold">
              {item.role} <span className="text-primary">@ {item.company}</span>
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
};
