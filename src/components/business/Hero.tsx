"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const WORDMARK = ["F", "O", "L", "É", "A", "."];

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // De video schuift langzamer weg dan de pagina, wat diepte geeft zodra je
  // begint te scrollen.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Autoplay wordt op mobiel regelmatig geweigerd: iOS in energiebesparings-
  // modus doet dat altijd, en de in-app browsers van WhatsApp en Instagram
  // vaak ook. Drie pogingen achter elkaar: direct na hydratie, zodra het
  // tabblad weer zichtbaar wordt, en bij de eerste aanraking of scroll. Die
  // laatste is de betrouwbaarste, want na een gebruikersgebaar staat elke
  // browser afspelen toe. Lukt het geen van allen, dan blijft de poster staan.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    let done = false;
    const attempt = () => {
      if (done) return;
      video.play().then(
        () => {
          done = true;
          cleanupGestures();
        },
        () => {},
      );
    };

    const gestures = ["touchstart", "pointerdown", "keydown", "scroll"] as const;
    const cleanupGestures = () => {
      gestures.forEach((type) => window.removeEventListener(type, attempt));
    };

    attempt();
    document.addEventListener("visibilitychange", attempt);
    gestures.forEach((type) =>
      window.addEventListener(type, attempt, { passive: true }),
    );

    return () => {
      document.removeEventListener("visibilitychange", attempt);
      cleanupGestures();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[100svh] min-h-[600px] w-full items-center justify-center overflow-hidden bg-ink"
    >
      <motion.video
        ref={videoRef}
        style={{ y: videoY }}
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 3.5, ease: EASE }}
        className="absolute inset-0 h-[115%] w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/video/hero-poster.jpg"
      >
        {/* Volgorde telt: de browser pakt de eerste bron die matcht. De
            mobiele versie is 1280px in plaats van 1920px en 569 KB in plaats
            van 4,3 MB, wat op mobiele data het verschil maakt tussen meteen
            spelen en seconden wachten. */}
        <source
          src="/video/hero-mobile.mp4"
          type="video/mp4"
          media="(max-width: 767px)"
        />
        <source src="/video/hero.mp4" type="video/mp4" />
      </motion.video>

      {/* Zo licht mogelijk gehouden zodat de video zelf goed te zien blijft:
          een dunne egale laag, een band bovenaan voor de transparante header,
          en een kern in het midden die alleen de tekst leesbaar maakt. */}
      <div className="absolute inset-0 bg-ink/22" />
      <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-ink/50 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_center,rgba(10,10,10,0.42)_0%,transparent_72%)]" />

      {/* Let op: geen motion-wrapper met scroll-transforms om dit blok heen.
          Kinderen met een eigen initial/animate blijven dan op hun beginwaarde
          hangen, waardoor de hele hero-tekst onzichtbaar bleef. */}
      <div className="relative z-10 flex w-full max-w-[var(--container-page)] flex-col items-center px-6 text-center text-white">
        <h1
          aria-label="FOLÉA"
          // Op telefoon mag de wordmark het scherm vullen; het was alleen op
          // desktop te groot. Vandaar een royale ondergrens met een lage vw.
          className="font-display text-[clamp(3.5rem,9vw,6rem)] uppercase leading-[0.9] tracking-[0.02em]"
        >
          <span aria-hidden="true" className="inline-flex">
            {WORDMARK.map((letter, i) => (
              <motion.span
                key={`${letter}-${i}`}
                initial={{ opacity: 0, y: 44 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.1 + i * 0.07,
                  ease: EASE,
                }}
                // Speels detail: elke letter wipt los omhoog onder de cursor.
                className="inline-block transition-transform duration-300 ease-[var(--ease-elegant)] hover:-translate-y-2"
              >
                {letter}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65, ease: EASE }}
          className="mt-5 max-w-md text-balance text-sm leading-relaxed text-blush sm:text-base"
        >
          Inspired by nature, created with intention.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8, ease: EASE }}
          className="mt-10"
        >
          <Link
            href="/producten"
            className="group inline-flex flex-col items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-white"
          >
            Shop the collection
            <span className="block h-px w-full origin-center scale-x-100 bg-white/60 transition-transform duration-500 ease-[var(--ease-elegant)] group-hover:scale-x-0" />
          </Link>
        </motion.div>
      </div>

      {/* Scrollhint: verdwijnt zodra je begint te scrollen. */}
      <motion.div
        style={{ opacity: hintOpacity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-10 w-6 rounded-full border border-white/40 p-1"
        >
          <span className="mx-auto block h-1.5 w-1.5 rounded-full bg-white/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
