import type { Product } from "@/types/product";

export const hairbutter: Product = {
  id: "folea-hairbutter",
  slug: "hairbutter",
  name: "Nourishing hairbutter",
  tagline: "Eén butter. Oneindig veel mogelijkheden.",
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
  usageMethods: [
    {
      id: "leave-in",
      title: "Leave-in Conditioner",
      hairType: "Alle haartypes",
      description:
        "Breng een kleine hoeveelheid aan op vochtig haar voor langdurige hydratatie zonder verzwaring.",
    },
    {
      id: "deep-mask",
      title: "Deep Mask",
      hairType: "Droog & poreus haar",
      description:
        "Smeer royaal in, laat 20 minuten intrekken onder een warme handdoek en spoel uit voor diepe voeding.",
    },
    {
      id: "scalp",
      title: "Scalp Treatment",
      hairType: "Gevoelige hoofdhuid",
      description:
        "Masseer een kleine hoeveelheid in de hoofdhuid om irritatie te kalmeren en de haarwortels te versterken.",
    },
    {
      id: "styling",
      title: "Styling Butter",
      hairType: "Krullend & kroeshaar",
      description:
        "Gebruik op handdoekdroog haar om krullen te definiëren en pluis te bestrijden, de hele dag door.",
    },
  ],
  ingredients: [
    {
      name: "Shea Butter",
      description: "Rijk aan vetzuren, diep voedend en herstellend voor droog haar.",
    },
    {
      name: "Kokosolie",
      description: "Dringt diep door in de haarschacht voor langdurige hydratatie.",
    },
    {
      name: "Jojoba-olie",
      description: "Lijkt op de natuurlijke talg van de hoofdhuid en balanceert zonder te verzwaren.",
    },
    {
      name: "Arganolie",
      description: "Vol antioxidanten, geeft glans en beschermt tegen hitteschade.",
    },
  ],
};

export const products: Product[] = [hairbutter];
