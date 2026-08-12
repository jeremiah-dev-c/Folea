import { Leaf, Sparkles, Hand, HeartHandshake } from "lucide-react";
import { Container } from "@/components/ui/Container";

const usps = [
  { icon: Leaf, label: "100% Natuurlijk" },
  { icon: Sparkles, label: "Alle Haartypes" },
  { icon: Hand, label: "Ambachtelijk" },
  { icon: HeartHandshake, label: "Vegan" },
];

export function UspBar() {
  return (
    <section className="border-y border-charcoal/10 bg-cream-deep/60 py-8">
      <Container>
        <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 sm:justify-between">
          {usps.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-3 text-charcoal-soft"
            >
              <Icon size={20} strokeWidth={1.5} className="text-forest" />
              <span className="text-sm font-medium tracking-wide">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
