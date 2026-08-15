import type { Metadata } from "next";
import { products } from "@/lib/data/products";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/business/ProductCard";
import { ProductShowcase } from "@/components/business/ProductShowcase";

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
      <section className="bg-blush pt-14 pb-16 md:pt-20 md:pb-24">
        <Container>
          <h1 className="text-[11px] font-medium uppercase tracking-[0.3em] text-ink/60">
            De collectie
          </h1>

          <div className="mt-10 md:mt-12">
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
    </>
  );
}
