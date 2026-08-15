import type { Product } from "@/types/product";

export const hairbutter: Product = {
  id: "folea-hairbutter",
  slug: "hairbutter",
  name: "Nourishing hairbutter",
  tagline: "Inspired by nature. Created with intention.",
  description:
    "Een veelzijdige haarbutter die het haar intens voedt en beschermt. Geschikt voor iedere haartextuur: van steil en golvend tot krullend en kroeshaar. Met 100% natuurlijke ingrediënten, voor verzorging zonder compromissen.",
  price: 39.95,
  currency: "EUR",
  images: [
    {
      src: "/images/product-butter.jpg",
      alt: "Pot FOLÉA Nourishing hairbutter op een stapel verse boter",
    },
    {
      src: "/images/product-front.jpg",
      alt: "FOLÉA Nourishing hairbutter recht van voren met het etiket in beeld",
    },
    {
      src: "/images/product-trio.jpg",
      alt: "Drie potten FOLÉA Nourishing hairbutter naast elkaar",
    },
    {
      src: "/images/product-drip.jpg",
      alt: "Gouden olie die over twee potten FOLÉA Nourishing hairbutter loopt",
    },
    {
      src: "/images/product-top.jpg",
      alt: "FOLÉA Nourishing hairbutter van bovenaf met het logo op de deksel en de ingrediëntenlijst",
    },
  ],
  highlights: [
    "Leave-in conditioner",
    "Deep mask",
    "Scalp treatment",
    "Styling butter",
  ],
  // Twee methodes, letterlijk aangeleverd door de klant (14 aug). Leave-in en
  // scalp treatment zijn op hun verzoek vervallen.
  usageMethods: [
    {
      id: "deep-treatment",
      title: "Deep treatment",
      hairType: "Voor intensieve verzorging",
      description:
        "Breng de Nourishing Hairbutter aan op vochtig haar. Verdeel de hairbutter over de haarlengtes en breng het eventueel ook aan op de hoofdhuid. Laat het product minimaal 2 uur intrekken. Je kunt tijdens het intrekken een haarcap dragen. Was je haar daarna grondig met shampoo en herhaal dit meerdere keren totdat alle resten van de hairbutter zijn verwijderd.",
    },
    {
      id: "styling",
      title: "Styling butter",
      hairType: "Voor glans en definitie",
      description:
        "Gebruik de Hairbutter voor extra glans en verzorging wanneer je je haar in een haarstijl draagt, zoals vlechten, een knot of een staart. Breng een kleine hoeveelheid aan op je haar en verdeel het gelijkmatig.",
    },
  ],
  // Namen en omschrijvingen komen letterlijk van de klant (14 aug). Er zit
  // geen kokosolie in, wat eerder wel op de site stond. De formule bevat meer
  // dan deze vier werkstoffen; dit zijn de vier die uitgelicht worden.
  ingredients: [
    {
      name: "Butyrospermum parkii",
      description: "Sheaboter voedt en verzegelt de haarschub.",
    },
    {
      name: "Chebe seed (lavandula stoechas)",
      description:
        "Chebe olie ondersteunt de haarsterkte, vermindert haarbreuk en draagt bij aan een gezonde haargroei.",
    },
    {
      name: "Simmondsia Chinensis Seed Oil",
      description:
        "Jojoba olie hydrateert het haar, voedt de hoofdhuid en helpt het haar zacht, glanzend en gezond te houden.",
    },
    {
      name: "Tocopherol (E)",
      description:
        "Vitamine E olie voedt en hydrateert het haar, helpt haarbreuk te verminderen en ondersteunt een gezonde hoofdhuid.",
    },
  ],
};

export const products: Product[] = [hairbutter];
