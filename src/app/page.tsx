import { Hero } from "@/components/business/Hero";
import { ProductSpotlight } from "@/components/business/ProductSpotlight";
import { Marquee } from "@/components/business/Marquee";
import { Lookbook } from "@/components/business/Lookbook";
import { StatementSplit } from "@/components/business/StatementSplit";
import { PhotoMarquee } from "@/components/business/PhotoMarquee";
import { Ingredients } from "@/components/business/Ingredients";
import { InstagramGrid } from "@/components/business/InstagramGrid";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductSpotlight />
      <Marquee
        items={["FOLÉA.", "100% natuurlijk", "FOLÉA.", "Voor elke textuur"]}
        baseVelocity={2}
        className="border-y border-ink/10 bg-cream-deep py-5 text-ink"
      />
      <Lookbook />
      <StatementSplit />
      {/* PhotoMarquee en Ingredients delen dezelfde zwarte achtergrond en
          lopen bewust in elkaar over: eerst beweging, dan inhoud. */}
      <PhotoMarquee />
      <Ingredients />
      <InstagramGrid />
    </>
  );
}
