import { Container } from "@/components/ui/Container";
import { InstagramIcon } from "@/components/ui/SocialIcons";

const tiles = Array.from({ length: 6 });

export function InstagramGrid() {
  return (
    <section className="pb-24 md:pb-32">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-earth">
            @folea
          </p>
          <h2 className="mt-3 text-4xl md:text-5xl text-forest">
            Volg ons op Instagram
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {tiles.map((_, i) => (
            <a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-md bg-blush transition-colors hover:bg-blush-deep"
              aria-label="Bekijk op Instagram"
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-40 transition-opacity group-hover:opacity-70">
                <InstagramIcon
                  width={24}
                  height={24}
                  strokeWidth={1.25}
                  className="text-earth"
                />
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
