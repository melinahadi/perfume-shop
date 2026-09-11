import { motion } from "motion/react";

function About() {
  return (
    <section
      id="about"
      className="
        relative
        overflow-hidden
        bg-lux-black
        px-6
        py-24
        text-lux-cream
        sm:px-10
        sm:py-32
        lg:px-20
        lg:py-40
        scroll-mt-24
      "
    >
      <div className="mx-auto max-w-[1600px]">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-3xl"
        >
          <p className="mb-6 text-[9px] font-medium uppercase tracking-[0.35em] text-lux-gold">
            The House of LUXÉE
          </p>

          <h2 className="font-display text-5xl leading-[0.95] sm:text-6xl lg:text-8xl">
            More than
            <br />
            <span className="italic">fragrance.</span>
          </h2>
        </motion.div>

        {/* Content */}
        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="mb-8 h-px w-12 bg-lux-gold/60" />

            <p className="max-w-xl text-sm font-light leading-7 text-lux-cream/65 sm:text-base sm:leading-8">
              LUXÉE was born from a fascination with the invisible art of
              fragrance — the way a single note can awaken a memory, define a
              moment, or become part of who we are.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="max-w-xl text-sm font-light leading-7 text-lux-cream/65 sm:text-base sm:leading-8">
              Every LUXÉE creation is designed to feel personal. From the first
              impression to the final trace, we seek balance between modern
              elegance and the timeless craft of perfumery.
            </p>

            <p className="mt-6 max-w-xl text-sm font-light leading-7 text-lux-cream/65 sm:text-base sm:leading-8">
              We believe true luxury is never loud. It lives in the details, in
              the ingredients, and in the feeling that remains long after the
              fragrance has faded.
            </p>
          </motion.div>
        </div>

        {/* Bottom Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 1,
            delay: 0.3,
          }}
          className="
            mt-20
            border-t
            border-lux-cream/10
            pt-8
            sm:mt-28
            sm:pt-10
          "
        >
          <p className="font-display text-2xl text-lux-cream/80 sm:text-3xl lg:text-4xl">
            “Wear what words cannot express.”
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
