import { Section } from "./Section";
import { Card } from "@/components/ui/card";
import { skills } from "@/data/portfolio";

export const Skills = () => {
  return (
    <Section id="skills" eyebrow="02 — Skills" title="Tools I reach for">
      <div className="grid gap-6 md:grid-cols-3">
        {skills.map((group) => (
          <Card key={group.category} className="p-6 shadow-card transition-smooth hover:shadow-elegant">
            <h3 className="mb-4 font-mono text-sm text-primary">{group.category}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-border bg-secondary/50 px-3 py-1 text-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
};
