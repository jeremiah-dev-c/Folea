import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FaqList } from "@/components/business/FaqList";
import { faqAlsPlatteTekst, faqItems } from "@/lib/data/faq";

export const metadata: Metadata = {
  title: "Veelgestelde vragen",
  description:
    "Antwoorden op veelgestelde vragen over de FOLÉA Nourishing hairbutter, verzending en retourneren.",
};

// FAQPage structured data: hiermee kan Google de vragen en antwoorden direct
// in de zoekresultaten tonen. De antwoorden staan daarnaast gewoon in de HTML.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faqAlsPlatteTekst(item),
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="bg-blush pt-14 pb-16 md:pt-20 md:pb-24">
        <Container>
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-ink/60">
            FAQ
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-2xl uppercase leading-[1.15] tracking-[0.02em] text-ink sm:text-3xl lg:text-4xl">
            Veelgestelde vragen
          </h1>
          <p className="mt-5 max-w-md leading-relaxed text-charcoal-soft">
            Alles over de hairbutter, verzending en retourneren op één plek.
          </p>

          <div className="mt-12 md:mt-16">
            <FaqList items={faqItems} />
          </div>
        </Container>
      </section>

      <section className="bg-ink py-14 text-white md:py-20">
        <Container>
          <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-blush">
                Nog een vraag
              </p>
              <h2 className="mt-4 max-w-md font-display text-xl uppercase leading-[1.2] tracking-[0.02em] sm:text-2xl lg:text-3xl">
                Staat je vraag er niet tussen?
              </h2>
            </div>

            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center self-start rounded-full bg-blush px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-transform duration-300 ease-[var(--ease-elegant)] hover:scale-105 hover:bg-blush-deep sm:self-auto"
            >
              Naar contact
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
