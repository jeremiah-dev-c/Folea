import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { LookbookGrid } from "@/components/business/LookbookGrid";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Een visueel lookbook van textuur en ritueel. Ontdek hoe FOLÉA Hairbutter zich aanpast aan elke toepassing.",
};

export default function PortfolioPage() {
  return (
    <div className="py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-earth">
            Portfolio
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl text-berry">
            Textuur & Ritueel
          </h1>
          <p className="mt-4 text-charcoal-soft leading-relaxed">
            Een lookbook van sfeer en gevoel. Elk beeld staat voor een manier
            waarop FOLÉA Hairbutter zich aanpast aan jouw routine. Filter op
            toepassing en klik voor het verhaal erachter.
          </p>
        </div>

        <div className="mt-14">
          <LookbookGrid />
        </div>
      </Container>
    </div>
  );
}
