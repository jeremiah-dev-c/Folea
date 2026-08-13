import type { Product } from "@/types/product";

export const hairbutter: Product = {
  id: "folea-hairbutter",
  slug: "hairbutter",
  name: "FOLÉA Hairbutter",
  tagline: "Eén butter. Oneindig veel mogelijkheden.",
  description:
    "Een multifunctionele haarbutter die voedt, beschermt en stylt, geschikt voor steil, slag, krullend en kroeshaar. Gemaakt met 100% natuurlijke ingrediënten, zonder compromis.",
  price: 39.95,
  currency: "EUR",
  images: [
    {
      src: "/images/product-front.jpg",
      alt: "FOLÉA Hairbutter potje recht van voren met het etiket in beeld",
    },
    {
      src: "/images/product-top.jpg",
      alt: "FOLÉA Hairbutter van bovenaf met het logo op de deksel en de ingrediëntenlijst",
    },
    {
      src: "/images/product-duo.jpg",
      alt: "Twee potten FOLÉA Hairbutter met waterdruppels op een lichte achtergrond",
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
