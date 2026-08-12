import type { Metadata } from "next";
import { products } from "@/lib/data/products";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/business/ProductCard";

export const metadata: Metadata = {
  title: "Producten",
  description:
    "Ontdek de FOLÉA-collectie: ambachtelijke, natuurlijke haarverzorging voor alle haartypes.",
};

export default function ProductenPage() {
  return (
    <div className="py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-earth">
            De collectie
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl text-forest">Producten</h1>
          <p className="mt-4 text-charcoal-soft">
            Elk FOLÉA-product wordt ambachtelijk gemaakt met 100% natuurlijke
            ingrediënten — geschikt voor alle haartypes.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
}
