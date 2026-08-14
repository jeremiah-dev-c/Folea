import type { Metadata } from "next";
import { hairbutter, products } from "@/lib/data/products";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/business/ProductCard";
import { Marquee } from "@/components/business/Marquee";

export const metadata: Metadata = {
  title: "Producten",
  description:
    "Ontdek de FOLÉA-collectie: natuurlijke haarverzorging voor alle haartypes.",
};

export default function ProductenPage() {
  // Met één product oogt een breed raster leeg, dus de kaart krijgt dan een
  // beperkte maat en staat gecentreerd naast het tekstblok.
  const enkelProduct = products.length === 1;

  return (
    <>
      <section className="bg-cream pt-14 pb-16 md:pt-20 md:pb-20">
        <Container>
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-ink/50">
            De collectie
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-2xl uppercase leading-[1.15] tracking-[0.02em] text-ink sm:text-3xl lg:text-4xl">
            Eén pot, voor alles wat je haar nodig heeft
          </h1>
          <p className="mt-5 max-w-md leading-relaxed text-charcoal-soft">
            We maken er liever één goed dan tien half. Alles wat we voeren
            staat hieronder.
          </p>

          <div
            className={
              enkelProduct
                ? "mt-12 grid items-center gap-12 md:mt-16 md:grid-cols-[minmax(0,26rem)_1fr] md:gap-16"
                : "mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 md:mt-16 lg:grid-cols-3"
            }
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}

            {enkelProduct && (
              <div className="border-t border-ink/10 pt-8 md:border-l md:border-t-0 md:pl-16 md:pt-0">
                <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-ink/50">
                  Vier toepassingen
                </p>
                <ul className="mt-6 space-y-4">
                  {hairbutter.highlights.map((highlight, i) => (
                    <li key={highlight} className="flex items-baseline gap-4">
                      <span className="text-xs font-semibold tracking-[0.2em] text-ink/40">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-base uppercase tracking-[0.02em] text-ink sm:text-lg">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 max-w-sm text-sm leading-relaxed text-charcoal-soft">
                  {hairbutter.description}
                </p>
              </div>
            )}
          </div>
        </Container>
      </section>

      <Marquee
        items={["FOLÉA.", "100% natuurlijk", "FOLÉA.", "Voor elke textuur"]}
        baseVelocity={2}
        className="border-y border-ink/10 bg-cream-deep py-5 text-ink"
      />
    </>
  );
}
