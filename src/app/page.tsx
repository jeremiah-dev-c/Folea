import { Hero } from "@/components/business/Hero";
import { ProductSpotlight } from "@/components/business/ProductSpotlight";
import { StatementSplit } from "@/components/business/StatementSplit";
import { PhotoMarquee } from "@/components/business/PhotoMarquee";
import { Ingredients } from "@/components/business/Ingredients";
import { InstagramGrid } from "@/components/business/InstagramGrid";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductSpotlight />
      <StatementSplit />
      {/* PhotoMarquee en Ingredients delen dezelfde zwarte achtergrond en
          lopen bewust in elkaar over: eerst beweging, dan inhoud. */}
      <PhotoMarquee />
      <Ingredients />
      <InstagramGrid />
    </>
  );
}
