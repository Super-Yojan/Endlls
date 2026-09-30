"use client";

import { Vortex } from "@/components/ui/vortex";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export type HeroProduct = {
  title: string;
  link: string;
  thumbnail: string;
  kind: "Work" | "Knowledge";
  code: string;
};

const spring = { stiffness: 260, damping: 32, bounce: 0 };
const ease = [0.16, 1, 0.3, 1] as const;

export function HeroParallax({ products }: { products: HeroProduct[] }) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]), spring);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1000]), spring);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [12, 0]), spring);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [8, 0]), spring);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-24, 280]), spring);
  const planeOpacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.45, 1]), spring);

  const padded = padProducts(products, 15);
  const rows = [padded.slice(0, 5), padded.slice(5, 10), padded.slice(10, 15)];

  return (
    <section
      ref={sectionRef}
      aria-label="Endlls universes"
      className="hero-parallax relative h-[300vh] overflow-hidden bg-ivory text-ink antialiased [perspective:1000px] [transform-style:preserve-3d] dark:bg-ink dark:text-ivory"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-screen overflow-hidden">
        <Vortex />
      </div>
      <Header />
      <motion.div
        style={
          reduce
            ? undefined
            : {
                rotateX,
                rotateZ,
                translateY,
                opacity: planeOpacity,
              }
        }
        className="hero-parallax-plane relative z-10 -mt-8 md:-mt-20"
      >
        {rows.map((row, index) => (
          <motion.div
            key={row.map((product) => product.link).join("-")}
            className={`hero-parallax-row mb-10 flex gap-8 md:mb-16 md:gap-16 lg:mb-20 lg:gap-20 ${
              index === 1 ? "flex-row" : "flex-row-reverse"
            }`}
          >
            {row.map((product) => (
              <ProductCard
                key={product.link}
                product={product}
                translate={index === 1 ? translateXReverse : translateX}
                reduce={Boolean(reduce)}
              />
            ))}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export function Header() {
  const reduce = useReducedMotion();
  const hidden = reduce ? false : { opacity: 0, y: 28 };

  return (
    <div className="relative z-10 mx-auto w-full max-w-[90rem] px-[clamp(1.25rem,4.6vw,4.75rem)] pb-6 pt-10 md:pt-14">
      <motion.p
        className="m-0 font-mono text-[0.72rem] font-medium uppercase tracking-[0.22em] text-copper-deep dark:text-gold"
        initial={hidden}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.7, ease }}
      >
        Endlls Creative Studio
      </motion.p>
      <motion.h1
        id="hero-heading"
        className="m-0 mt-5 max-w-[12ch] font-sans text-[clamp(3.1rem,6.2vw,6rem)] font-medium leading-[1.02] tracking-[-0.035em]"
        initial={hidden}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.85, delay: reduce ? 0 : 0.08, ease }}
      >
        Creativity
        <br />
        Never Ends
      </motion.h1>
      <motion.p
        className="m-0 mt-6 max-w-xl font-sans text-[clamp(1.05rem,1.7vw,1.35rem)] font-normal leading-snug tracking-[-0.011em] text-ink/80 dark:text-ivory/80"
        initial={hidden}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.18, ease }}
      >
        A studio and engineering multiverse — flight, field systems, silicon, and stories, held in
        one continuous practice.
      </motion.p>
      <motion.div
        initial={hidden}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.28, ease }}
      >
        <Link className="text-link mt-6" href="/work">
          View all work <span aria-hidden="true" />
        </Link>
      </motion.div>
    </div>
  );
}

export function ProductCard({
  product,
  translate,
  reduce,
}: {
  product: HeroProduct;
  translate: MotionValue<number>;
  reduce: boolean;
}) {
  return (
    <motion.article
      style={{ x: reduce ? 0 : translate }}
      whileHover={reduce ? undefined : { y: -16 }}
      className="hero-parallax-card group relative h-52 w-[78vw] shrink-0 shadow-[0_22px_50px_rgba(29,31,33,0.14)] md:h-60 md:w-[26rem] lg:h-64 lg:w-[30rem]"
    >
      <Link
        href={product.link}
        className="absolute inset-0 block overflow-hidden border border-ink/15 bg-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper dark:border-ivory/20 dark:bg-ink"
      >
        <Image
          src={product.thumbnail}
          alt=""
          fill
          sizes="(max-width: 768px) 78vw, 512px"
          className="object-cover"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />
        <span className="absolute inset-x-0 bottom-0 p-5 text-ivory md:p-6">
          <span className="inline-flex border border-ivory/35 px-2 py-1 font-mono text-[0.62rem] font-medium uppercase tracking-[0.22em] text-sand">
            {product.kind}
          </span>
          <span className="mt-3 block font-sans text-[clamp(1.25rem,1.8vw,1.7rem)] font-medium leading-none tracking-[-0.03em]">
            {product.title}
          </span>
          <span
            aria-hidden="true"
            className="mt-2 block translate-y-1 font-mono text-[0.62rem] font-medium uppercase tracking-[0.18em] text-ivory/80 opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
          >
            {product.code}
          </span>
        </span>
      </Link>
    </motion.article>
  );
}

function padProducts(products: HeroProduct[], count: number) {
  if (products.length === 0) return [];
  const padded = products.slice(0, count);
  let index = 0;
  while (padded.length < count) {
    const source = products[index % products.length];
    padded.push({
      ...source,
      link: `${source.link}#plate-${padded.length}`,
      code: `${source.code}·${padded.length}`,
    });
    index += 1;
  }
  return padded;
}
