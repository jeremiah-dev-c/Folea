import type { Metadata } from "next";
import { AboutStory } from "@/components/business/AboutStory";
import { AboutCraft } from "@/components/business/AboutCraft";
import { AboutValues } from "@/components/business/AboutValues";

export const metadata: Metadata = {
  title: "Over Ons",
  description:
    "Het verhaal achter FOLÉA: met zorg gemaakte, natuurlijke haarverzorging voor alle haartypes.",
};

/**
 * Begint bewust meteen in het roze: het beige openingsblok is er op verzoek
 * van de klant uit (15 aug) en de titel staat nu bovenin AboutStory.
 */
export default function OverOnsPage() {
  return (
    <>
      <AboutStory />
      <AboutCraft />
      <AboutValues />
    </>
  );
}
