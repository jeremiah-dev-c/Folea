import type { Metadata } from "next";
import { products } from "@/lib/data/products";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/business/ProductCard";
import { ProductShowcase } from "@/components/business/ProductShowcase";
import { Marquee } from "@/components/business/Marquee";

export const metadata: Metadata = {
  title: "Producten",
  description:
    "Ontdek de FOLÉA-collectie: natuurlijke haarverzorging voor alle haartypes.",
};

export default function ProductenPage() {
  // Eén product krijgt de hele pagina als showcase. Zodra er een tweede
  // bijkomt schakelt de pagina vanzelf over op een raster van kaarten.
  const enkelProduct = products.length === 1;

  return (
    <>
      <section className="bg-cream pt-14 pb-16 md:pt-20 md:pb-24">
        <Container>
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-ink/50">
            De collectie
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-2xl uppercase leading-[1.15] tracking-[0.02em] text-ink sm:text-3xl lg:text-4xl">
            Eén pot, voor alles wat je haar nodig heeft
          </h1>

          <div className="mt-12 md:mt-16">
            {enkelProduct ? (
              <ProductShowcase product={products[0]} />
            ) : (
              <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
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
