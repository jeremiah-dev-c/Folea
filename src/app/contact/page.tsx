import type { Metadata } from "next";
import { ContactHero } from "@/components/business/ContactHero";
import { ContactForm } from "@/components/business/ContactForm";
import { ContactFaqCta } from "@/components/business/ContactFaqCta";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Neem contact op met FOLÉA. We reageren binnen één tot twee werkdagen.",
};

/**
 * Beige, roze, zwart: dezelfde kleurwisseling als de andere pagina's. De pagina
 * stond eerder volledig op één beige vlak en viel daardoor dood naast de rest.
 */
export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />
      <ContactFaqCta />
    </>
  );
}
