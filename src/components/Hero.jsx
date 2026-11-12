import { motion } from "motion/react";
import { Link } from "react-router-dom";
import heroImage from "../assets/images/hero/hero-perfume.webp";

function Hero() {
  return (
    <section
      id="home"
      className="
        relative
        min-h-[600px]
        h-[100svh]
        w-full
        overflow-hidden
        bg-lux-black
      "
    >
      {/* HERO IMAGE */}
      <motion.img
        src={heroImage}
        alt="LUXÉE Éclat Noir perfume"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 1.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          object-center
        "
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Left gradient */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-black/85
          via-black/45
          to-transparent
        "
      />

      {/* Bottom gradient */}
      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-40
          bg-gradient-to-t
          from-black/60
          to-transparent
        "
      />

      {/* CONTENT */}
      <div className="relative z-10 flex h-full items-center">
        <div
          className="
            mx-auto
            w-full
            max-w-[1600px]
            px-8
            pt-20
            lg:px-12
          "
        >
          <motion.div
            className="
              mb-24
              max-w-[62%]
              sm:mb-8
              sm:max-w-2xl
            "
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            {/* EYEBROW */}
            <motion.p
              variants={{
                hidden: {
                  opacity: 0,
                  y: 20,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.7,
                  },
                },
              }}
              className="
                mb-6
                text-[11px]
                font-medium
                uppercase
                tracking-[0.4em]
                text-lux-gold
              "
            >
              New Exclusive
            </motion.p>

            {/* HEADING */}
            <motion.h1
              variants={{
                hidden: {
                  opacity: 0,
                  y: 35,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
              className="
                font-display
                text-[3.1rem]
                leading-[0.9]
                tracking-tight
                text-lux-cream
                sm:text-7xl
                lg:text-8xl
                xl:text-9xl
              "
            >
              The art of
              <br />
              <span className="font-normal italic">timeless scent.</span>
            </motion.h1>

            {/* DESCRIPTION */}
            <motion.p
              variants={{
                hidden: {
                  opacity: 0,
                  y: 25,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                  },
                },
              }}
              className="
                mt-6
                max-w-[250px]
                text-[11px]
                font-light
                leading-5
                tracking-wide
                text-lux-cream/65
                sm:mt-8
                sm:max-w-md
                sm:text-base
                sm:leading-7
              "
            >
              Each fragrance is a story, crafted with rare ingredients and
              designed to become part of your memory.
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: 20,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.7,
                  },
                },
              }}
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="mt-7 sm:mt-9"
            >
              <Link
                to="/shop"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  border
                  border-lux-gold/60
                  px-4
                  py-2.5
                  text-[8px]
                  font-medium
                  uppercase
                  tracking-[0.2em]
                  text-lux-cream
                  transition-all
                  duration-500
                  hover:border-lux-gold
                  hover:bg-lux-gold
                  hover:text-lux-black

                  sm:gap-5
                  sm:px-6
                  sm:py-3.5
                  sm:text-[9px]
                  sm:tracking-[0.25em]

                  lg:gap-8
                  lg:px-7
                  lg:py-4
                  lg:text-[10px]
                "
              >
                Explore Collection
                <span
                  className="
                    text-sm
                    transition-transform
                    duration-500
                    group-hover:translate-x-1.5
                    sm:text-base
                  "
                >
                  →
                </span>
              </Link>
            </motion.div>

            {/* RESPONSIVE SCROLL INDICATOR */}
            {/* Visible below xl screens */}
            <div
              className="
    mt-10
    flex
    flex-col
    items-start
    gap-3
    min-[1500px]:hidden
  "
            >
              <span className="ml-1 h-10 w-px bg-lux-cream/40" />

              <span
                className="
                  ml-0.5
                  text-[9px]
                  uppercase
                  tracking-[0.35em]
                  text-lux-cream/60
                  [writing-mode:vertical-rl]
                "
              >
                Scroll
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* DESKTOP SCROLL INDICATOR */}
      {/* Visible only on xl and larger screens */}
      <div
        className="
    absolute
    bottom-8
    left-8
    z-20
    hidden
    flex-col
    items-center
    gap-3
    min-[1500px]:flex
    min-[1500px]:left-12
  "
      >
        <span className="h-10 w-px bg-lux-cream/40" />

        <span
          className="
            text-[9px]
            uppercase
            tracking-[0.35em]
            text-lux-cream/60
            [writing-mode:vertical-rl]
          "
        >
          Scroll
        </span>
      </div>

      {/* SLIDE INDICATOR */}
      <div
        className="
          absolute
          bottom-10
          right-8
          z-20
          flex
          items-center
          gap-3
          lg:right-12
        "
      >
        <span className="text-[10px] tracking-widest text-lux-cream">01</span>

        <span className="h-px w-10 bg-lux-cream/40" />

        <span className="text-[10px] tracking-widest text-lux-cream/40">
          03
        </span>
      </div>
    </section>
  );
}

export default Hero;
