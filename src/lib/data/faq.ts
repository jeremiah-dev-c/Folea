/**
 * Een antwoord bestaat uit blokken: een gewone alinea, of een tussenkop.
 * E-mailadressen in de tekst worden bij het renderen automatisch klikbaar.
 */
export type FaqBlok = string | { heading: string };

export interface FaqItem {
  id: string;
  question: string;
  answer: FaqBlok[];
}

export const faqItems: FaqItem[] = [
  {
    id: "haartype",
    question: "Is de hairbutter geschikt voor mijn haartype?",
    answer: [
      "Ja, de FOLÉA Nourishing hairbutter is ontwikkeld voor alle haartypes en structuren: steil, slag, krullend en kroeshaar. De formule past zich aan op basis van de hoeveelheid die je gebruikt.",
    ],
  },
  {
    id: "gebruik",
    question: "Hoe vaak kan ik de hairbutter gebruiken?",
    answer: [
      "Hoe je dit product het beste gebruikt, hangt af van het gewenste resultaat. Als treatment raden we aan om het 1 keer per week te gebruiken. Omdat het een rijk product is, is het hierbij belangrijk om het na gebruik goed uit te wassen.",
      "Wil je vooral extra shine creëren? Dan kun je het gebruiken wanneer je een bepaalde hairstyle draagt en net wat meer glans wilt.",
      "Ook je haardikte speelt een rol in de hoeveelheid die je nodig hebt. Heb je erg dik haar, dan kun je wat meer product gebruiken. Bij dunner haar is het belangrijk om niet te veel product te gebruiken, omdat het anders moeilijker uit te wassen is.",
    ],
  },
  {
    id: "verzending",
    question: "Wat zijn de verzendkosten en levertijd?",
    answer: [
      "Bestellingen boven €45 verzenden we gratis binnen Nederland en België. Onder dit bedrag rekenen we een vaste bijdrage. De levertijd is doorgaans 1 tot 3 werkdagen.",
    ],
  },
  {
    id: "retour",
    question: "Kan ik mijn bestelling retourneren?",
    answer: [
      "Bij FOLÉA kun je je bestelling binnen 14 dagen na ontvangst retourneren, zolang het product ongebruikt, ongeopend en in de originele verpakking zit.",
      "Geopende of gebruikte haarverzorgings- en cosmeticaproducten kunnen vanwege hygiëne niet worden geretourneerd. Dit geldt ook voor producten waarvan de verzegeling is verbroken.",
      { heading: "Een retour aanvragen" },
      "Neem binnen 14 dagen contact met ons op via info@folea.nl. Vermeld daarbij je naam, ordernummer en het product dat je wilt retourneren. Je ontvangt vervolgens de retourinstructies.",
      "De kosten voor het retourneren zijn voor eigen rekening. We raden aan om je retourzending met track-and-trace te versturen.",
      "Na ontvangst en controle van het geretourneerde product betalen we het aankoopbedrag binnen 14 dagen terug via dezelfde betaalmethode.",
      { heading: "Beschadigd of verkeerd ontvangen" },
      "Neem binnen 48 uur na levering contact met ons op via info@folea.nl en voeg duidelijke foto's toe.",
    ],
  },
  {
    id: "ingredienten",
    question: "Zijn de ingrediënten 100% natuurlijk en vegan?",
    answer: [
      "Ja, alle ingrediënten zijn plantaardig en 100% natuurlijk. We gebruiken geen parabenen, sulfaten of dierlijke bestanddelen. De hairbutter is volledig vegan.",
    ],
  },
];

/** Platte tekst per vraag, voor de FAQPage structured data. */
export function faqAlsPlatteTekst(item: FaqItem): string {
  return item.answer
    .map((blok) => (typeof blok === "string" ? blok : blok.heading))
    .join(" ");
}
