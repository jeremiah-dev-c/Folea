import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { InstagramIcon } from "@/components/ui/SocialIcons";

const tiles = [
  {
    src: "/images/hairbutter-front.jpg",
    alt: "FOLÉA Hairbutter potje recht van voren",
  },
  {
    src: "/images/portfolio-beweging.jpg",
    alt: "Zijden stof met minimalistische flessen",
  },
  {
    src: "/images/hairbutter-podium.jpg",
    alt: "FOLÉA Hairbutter op een roze podium",
  },
  {
    src: "/images/portfolio-voeding.jpg",
    alt: "Romige haarbutter in een houten kom",
  },
  {
    src: "/images/hairbutter-stack.jpg",
    alt: "Twee gestapelde potten FOLÉA Hairbutter",
  },
  {
    src: "/images/portfolio-structuur.jpg",
    alt: "Gekruld varenblad op een crème achtergrond",
  },
];

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
          {tiles.map((tile) => (
            <a
              key={tile.src}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-md bg-blush"
              aria-label={`Bekijk op Instagram: ${tile.alt}`}
            >
              <Image
                src={tile.src}
                alt={tile.alt}
                fill
                sizes="(min-width: 768px) 17vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-700 ease-[var(--ease-elegant)] group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-charcoal/0 transition-colors duration-300 group-hover:bg-charcoal/40">
                <InstagramIcon
                  width={22}
                  height={22}
                  className="text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
