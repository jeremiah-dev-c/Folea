import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { BlogGrid } from "@/components/business/BlogGrid";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Redactionele artikelen over natuurlijke haarverzorging, ingrediënten en het ambacht achter FOLÉA.",
};

export default function BlogPage() {
  return (
    <div className="py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-earth">
            Haircare Advies
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl text-berry">Blog</h1>
          <p className="mt-4 text-charcoal-soft leading-relaxed">
            Verhalen over natuurlijke haarverzorging, onze ingrediënten en het
            ambacht achter elk potje FOLÉA.
          </p>
        </div>

        <div className="mt-14">
          <BlogGrid />
        </div>
      </Container>
    </div>
  );
}
