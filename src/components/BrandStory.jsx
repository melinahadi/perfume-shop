import { motion } from "motion/react";
import brandStoryImage from "../assets/images/story/brand-story4.png";
import { Link } from "react-router-dom";

function BrandStory() {
  return (
    <section
      id="story"
      className="relative scroll-mt-24 min-h-[650px] overflow-hidden bg-lux-black text-lux-cream lg:min-h-[700px]"
    >
      {/* Background Image */}
      <motion.img
        src={brandStoryImage}
        alt="The art of perfumery"
        initial={{ opacity: 0, scale: 1.04 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          object-[42%_center]
          lg:object-center
        "
      />

      {/* Very subtle overlay */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-black/5
          via-black/10
          to-black/55
        "
      />

      {/* Content */}
      <div
        className="
          relative
          z-10
          flex
          min-h-[650px]
          items-start
          lg:min-h-[700px]
          lg:items-center
        "
      >
        <div
          className="
            mx-auto
            flex
            w-full
            max-w-[1600px]
            justify-start
            px-6
            pt-12
            pb-14
            sm:px-10
            sm:pt-16
            lg:justify-end
            lg:px-20
            lg:py-20
            xl:px-28
          "
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              max-w-[78%]
              lg:max-w-xl
              lg:translate-x-12
              xl:translate-x-30
            "
          >
            {/* Eyebrow */}
            <p className="mb-5 text-[9px] font-medium uppercase tracking-[0.35em] text-lux-gold sm:mb-6 sm:text-[10px]">
              Our Philosophy
            </p>

            {/* Heading */}
            <h2 className="font-display text-[2.7rem] leading-[0.92] sm:text-6xl lg:text-7xl">
              Scent
              <br />
              <span className="italic">as art.</span>
            </h2>

            {/* Divider */}
            <div className="my-6 h-px w-10 bg-lux-gold/60 sm:my-8 sm:w-12" />

            {/* Description */}
            <p className="text-[11px] font-light leading-5 text-lux-cream/75 sm:text-base sm:leading-8">
              We believe fragrance is more than a scent. It is a memory, a
              feeling, and an expression of who you are.
            </p>

            {/* Description 2 */}
            <p className="mt-4 text-[11px] font-light leading-5 text-lux-cream/75 sm:mt-5 sm:text-base sm:leading-8">
              At LUXÉE, every composition is created with rare ingredients,
              thoughtful craftsmanship, and a respect for the timeless art of
              perfumery.
            </p>

            {/* CTA */}
            <Link
              to="/story"
              className="
    group
    inline-flex
    items-center
    gap-3
    border-b
    border-lux-cream/40
    pb-2
    pt-12
    text-[9px]
    uppercase
    tracking-[0.3em]
    text-lux-cream
    transition-all
    duration-500
    hover:border-lux-gold
    hover:text-lux-gold
  "
            >
              Discover Our Story
              <span className="text-base transition-transform duration-500 group-hover:translate-x-2">
                →
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default BrandStory;
