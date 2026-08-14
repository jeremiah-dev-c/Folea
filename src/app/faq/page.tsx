import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Accordion } from "@/components/ui/Accordion";
import { faqItems } from "@/lib/data/faq";

export const metadata: Metadata = {
  title: "Veelgestelde vragen",
  description:
    "Antwoorden op veelgestelde vragen over de FOLÉA Nourishing hairbutter, verzending en retourneren.",
};

export default function FaqPage() {
  return (
    <div className="py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-earth">
            FAQ
          </p>
          <h1 className="mt-3 text-3xl md:text-4xl text-ink">
            Veelgestelde vragen
          </h1>
          <p className="mt-4 text-charcoal-soft leading-relaxed">
            Alles over de Hairbutter, verzending en retourneren op één plek.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-2xl">
          <Accordion items={faqItems} />
        </div>

        <div className="mx-auto mt-14 max-w-2xl rounded-lg bg-blush/50 p-8 text-center">
          <h2 className="text-2xl text-ink">
            Staat je vraag er niet tussen?
          </h2>
          <p className="mt-2 text-sm text-charcoal-soft">
            Stuur ons een bericht, we reageren binnen 1 tot 2 werkdagen.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-block text-sm font-medium text-ink underline underline-offset-4 hover:text-ink-light"
          >
            Naar contact
          </Link>
        </div>
      </Container>
    </div>
  );
}
