import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";

// Horizon Bold: het displaylettertype van het FOLÉA-etiket. Alleen hoofdletters
// en cijfers, dus uitsluitend voor koppen en labels, nooit voor lopende tekst.
const horizon = localFont({
  src: "./fonts/Horizon.woff2",
  variable: "--font-horizon",
  display: "swap",
  weight: "700",
});

// De outline-variant van hetzelfde font: alleen voor grote displaymomenten,
// waar een kop van omtrek naar vlak wordt gevuld tijdens het scrollen.
const horizonOutlined = localFont({
  src: "./fonts/HorizonOutlined.woff2",
  variable: "--font-horizon-outline",
  display: "swap",
  weight: "700",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FOLÉA: Inspired by nature, created with intention",
    template: "%s | FOLÉA",
  },
  description:
    "FOLÉA Nourishing hairbutter: een zorgvuldig gemaakte, 100% natuurlijke haarbutter voor alle haartypes. Voeding, bescherming en styling in één multifunctioneel product.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="nl"
      className={`${horizon.variable} ${horizonOutlined.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-charcoal">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
