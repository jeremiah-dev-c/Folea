import type { Metadata } from "next";
import { hairbutter } from "@/lib/data/products";
import { ProductDetail } from "@/components/business/ProductDetail";

export const metadata: Metadata = {
  title: hairbutter.name,
  description: hairbutter.description,
};

export default function HairbutterPage() {
  return <ProductDetail product={hairbutter} />;
}
