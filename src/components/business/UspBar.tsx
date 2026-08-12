import { Leaf, Sparkles, Hand, HeartHandshake } from "lucide-react";
import { Container } from "@/components/ui/Container";

const usps = [
  { icon: Leaf, label: "100% Natuurlijk" },
  { icon: Sparkles, label: "Alle Haartypes" },
  { icon: Hand, label: "Handgemaakt" },
  { icon: HeartHandshake, label: "Vegan" },
];

export function UspBar() {
  return (
    <section className="border-y border-earth/10 bg-cream-deep/60 py-10">
      <Container>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
          {usps.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex flex-col items-center gap-3 text-center"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-forest/20 bg-cream">
                <Icon size={18} strokeWidth={1.5} className="text-forest" />
              </span>
              <span className="text-sm font-medium tracking-wide text-charcoal">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
