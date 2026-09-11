import { motion } from "motion/react";
import { Link } from "react-router-dom";

import StoryNavbar from "../components/StoryNavbar";
import Footer from "../components/Footer";

function Story() {
  return (
    <main className="overflow-hidden bg-lux-black text-lux-cream">
      <StoryNavbar />
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative flex min-h-screen items-center justify-center px-6">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/src/assets/images/story/story-hero.webp"
            alt="LUXÉE fragrance"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/30 to-lux-black" />
        </div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-4xl text-center"
        >
          <p className="mb-6 text-[9px] font-semibold uppercase tracking-[0.45em] text-lux-gold">
            The Story of LUXÉE
          </p>

          <h1 className="font-display text-6xl leading-[0.9] sm:text-7xl lg:text-9xl">
            Scent
            <br />
            <span className="italic">as art.</span>
          </h1>

          <div className="mx-auto mt-8 h-px w-12 bg-lux-gold/70" />

          <p className="mx-auto mt-8 max-w-xl text-sm leading-8 text-lux-cream/70 sm:text-base">
            We believe fragrance is more than something you wear.
            <br className="hidden sm:block" />
            It is something you remember.
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-[7px] uppercase tracking-[0.4em] text-lux-cream/40">
              Discover
            </span>

            <div className="h-10 w-px bg-gradient-to-b from-lux-gold to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* =====================================================
          INTRO / PHILOSOPHY
      ===================================================== */}
      <section className="bg-lux-cream px-6 py-24 text-lux-black sm:px-10 sm:py-32 lg:px-20">
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-2 lg:items-center lg:gap-24">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9 }}
            className="relative aspect-[4/5] overflow-hidden"
          >
            <img
              src="/src/assets/images/story/story-philosophy.webp"
              alt="LUXÉE perfume"
              className="h-full w-full object-cover transition-transform duration-[1500ms] hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9 }}
            className="max-w-xl"
          >
            <p className="text-[9px] font-semibold uppercase tracking-[0.4em] text-lux-gold">
              Our Philosophy
            </p>

            <h2 className="mt-6 font-display text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
              Beyond
              <br />
              <span className="italic">fragrance.</span>
            </h2>

            <div className="mt-8 h-px w-12 bg-lux-black/30" />

            <div className="mt-8 space-y-5 text-sm leading-8 text-lux-black/60">
              <p>
                At LUXÉE, we see fragrance as a form of personal expression.
                Every composition is created to evoke something deeper than a
                beautiful scent.
              </p>

              <p>
                A memory. A feeling. A place. A moment that stays with you long
                after the fragrance has disappeared.
              </p>

              <p>
                Our philosophy is simple: luxury should feel personal,
                intentional, and timeless.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          THE ART OF PERFUMERY
      ===================================================== */}
      <section className="bg-lux-black px-6 py-28 sm:px-10 sm:py-36 lg:px-20">
        <div className="mx-auto max-w-[1100px] text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[9px] font-semibold uppercase tracking-[0.4em] text-lux-gold"
          >
            The Art of Perfumery
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 font-display text-5xl leading-[1] sm:text-6xl lg:text-8xl"
          >
            Crafted with
            <br />
            <span className="italic">intention.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-8 max-w-2xl text-sm leading-8 text-lux-cream/50"
          >
            From the first note to the final drop, every element is chosen with
            purpose. We believe the beauty of a fragrance lies not only in what
            you smell, but in what it makes you feel.
          </motion.p>
        </div>

        {/* Principles */}
        <div className="mx-auto mt-20 grid max-w-[1200px] gap-px bg-lux-cream/10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              number: "01",
              title: "Emotion",
              text: "Created to awaken memories and feelings.",
            },
            {
              number: "02",
              title: "Balance",
              text: "Every note exists in harmony with the next.",
            },
            {
              number: "03",
              title: "Character",
              text: "Distinct compositions made to feel personal.",
            },
            {
              number: "04",
              title: "Timelessness",
              text: "Scents designed to live beyond the moment.",
            },
          ].map((item, index) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
              }}
              className="bg-lux-black px-7 py-10 text-center sm:px-8"
            >
              <span className="text-[8px] tracking-[0.3em] text-lux-gold">
                {item.number}
              </span>

              <h3 className="mt-5 font-display text-3xl">{item.title}</h3>

              <p className="mt-4 text-[10px] leading-6 text-lux-cream/40">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =====================================================
          CLOSING
      ===================================================== */}
      <section className="relative overflow-hidden px-6 py-32 sm:py-40">
        <div className="absolute inset-0">
          <img
            src="/src/assets/images/story/story-ending.webp"
            alt=""
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/65" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative z-10 mx-auto max-w-3xl text-center"
        >
          <p className="text-[9px] uppercase tracking-[0.4em] text-lux-gold">
            Your Signature
          </p>

          <h2 className="mt-6 font-display text-5xl sm:text-6xl lg:text-8xl">
            Find the scent
            <br />
            <span className="italic">that becomes yours.</span>
          </h2>

          <Link
            to="/shop"
            className="
              group
              mt-10
              inline-flex
              items-center
              gap-5
              border
              border-lux-gold/60
              px-7
              py-4
              text-[9px]
              uppercase
              tracking-[0.3em]
              text-lux-cream
              transition-all
              duration-500
              hover:border-lux-gold
              hover:bg-lux-gold
              hover:text-lux-black
            "
          >
            Explore Collection
            <span className="text-base transition-transform duration-500 group-hover:translate-x-2">
              →
            </span>
          </Link>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}

export default Story;
