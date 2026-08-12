import { Hero } from "@/components/business/Hero";
import { UspBar } from "@/components/business/UspBar";
import { ProductSpotlight } from "@/components/business/ProductSpotlight";
import { HowToUse } from "@/components/business/HowToUse";
import { Newsletter } from "@/components/business/Newsletter";
import { InstagramGrid } from "@/components/business/InstagramGrid";

export default function Home() {
  return (
    <>
      <Hero />
      <UspBar />
      <ProductSpotlight />
      <HowToUse />
      <Newsletter />
      <InstagramGrid />
    </>
  );
}
