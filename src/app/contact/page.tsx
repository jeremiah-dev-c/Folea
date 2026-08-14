import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ContactHero } from "@/components/business/ContactHero";
import { ContactForm } from "@/components/business/ContactForm";
import { ContactInfo } from "@/components/business/ContactInfo";
import { ContactFaqCta } from "@/components/business/ContactFaqCta";
import { Marquee } from "@/components/business/Marquee";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Neem contact op met FOLÉA. We reageren binnen één tot twee werkdagen.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-cream pt-14 pb-16 md:pt-20 md:pb-24">
        <Container>
          <ContactHero />

          <div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-blush/40">
                <Image
                  src="/images/product-duo.jpg"
                  alt="Twee potten FOLÉA Nourishing hairbutter"
                  fill
                  sizes="(min-width: 1024px) 38vw, 90vw"
                  className="object-cover"
                />
              </div>

              <div className="mt-10">
                <ContactInfo />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ContactFaqCta />

      <Marquee
        items={["FOLÉA.", "100% natuurlijk", "FOLÉA.", "Voor elke textuur"]}
        baseVelocity={2}
        className="border-y border-ink/10 bg-cream-deep py-5 text-ink"
      />
    </>
  );
}
