import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ContactHero } from "@/components/business/ContactHero";
import { ContactForm } from "@/components/business/ContactForm";
import { ContactInfo } from "@/components/business/ContactInfo";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Neem contact op met FOLÉA. We reageren binnen 1 tot 2 werkdagen.",
};

export default function ContactPage() {
  return (
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
  );
}
