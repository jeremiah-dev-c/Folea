import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ContactHero } from "@/components/business/ContactHero";
import { ContactForm } from "@/components/business/ContactForm";
import { ContactInfo } from "@/components/business/ContactInfo";
import { FaqSection } from "@/components/business/FaqSection";

export const metadata: Metadata = {
  title: "Contact & FAQ",
  description:
    "Neem contact op met FOLÉA of bekijk de veelgestelde vragen over onze producten, verzending en retourneren.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-cream pt-16 pb-20 md:pt-24 md:pb-28">
        <Container>
          <ContactHero />

          <div className="mx-auto mt-16 grid max-w-4xl gap-10 md:grid-cols-5 md:gap-12">
            <div className="md:col-span-3">
              <ContactForm />
            </div>
            <div className="md:col-span-2">
              <ContactInfo />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-cream-deep/60 py-20 md:py-28">
        <Container>
          <FaqSection />
        </Container>
      </section>
    </>
  );
}
