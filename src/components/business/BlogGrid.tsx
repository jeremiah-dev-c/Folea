"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { blogPosts } from "@/lib/data/blog";

const EASE = [0.22, 1, 0.36, 1] as const;

export function BlogGrid() {
  const categories = useMemo(
    () => ["Alle", ...Array.from(new Set(blogPosts.map((p) => p.category)))],
    [],
  );
  const [active, setActive] = useState("Alle");

  const filtered =
    active === "Alle"
      ? blogPosts
      : blogPosts.filter((post) => post.category === active);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActive(category)}
            className={cn(
              "rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-300",
              active === category
                ? "border-forest bg-forest text-white"
                : "border-charcoal/15 bg-transparent text-charcoal hover:border-forest",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((post, index) => (
            <motion.article
              key={post.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, delay: index * 0.06, ease: EASE }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-blush">
                <Image
                  src={post.image}
                  alt={post.alt}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-elegant)] group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-earth backdrop-blur-sm">
                  {post.category}
                </span>
              </div>

              <div className="mt-5">
                <div className="flex items-center gap-3 text-xs text-charcoal-soft">
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {post.readTime} leestijd
                  </span>
                </div>
                <h3 className="mt-2 flex items-start justify-between gap-2 text-xl text-forest transition-colors group-hover:text-forest-light">
                  {post.title}
                  <ArrowUpRight
                    size={18}
                    className="mt-1 shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </h3>
                <p className="mt-2 text-sm text-charcoal-soft leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
