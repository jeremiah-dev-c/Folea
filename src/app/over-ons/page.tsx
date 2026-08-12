import type { Metadata } from "next";
import { AboutHero } from "@/components/business/AboutHero";
import { AboutStory } from "@/components/business/AboutStory";
import { AboutCraft } from "@/components/business/AboutCraft";
import { AboutValues } from "@/components/business/AboutValues";

export const metadata: Metadata = {
  title: "Over Ons",
  description:
    "Het verhaal achter FOLÉA: met zorg gemaakte, natuurlijke haarverzorging voor alle haartypes.",
};

export default function OverOnsPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutCraft />
      <AboutValues />
    </>
  );
}
