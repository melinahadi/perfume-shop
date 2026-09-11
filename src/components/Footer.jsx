import { motion } from "motion/react";

const columns = [
  {
    title: "Shop",
    links: ["All Perfumes", "Best Sellers", "New Arrivals", "Gift Sets"],
  },
  {
    title: "Discover",
    links: ["Our Story", "Ingredients", "Journal", "Sustainability"],
  },
  {
    title: "Customer Care",
    links: ["Contact Us", "Shipping & Delivery", "Returns & Exchanges", "FAQ"],
  },
];

function Footer() {
  return (
    <footer className="bg-lux-black text-lux-cream">
      {/* Newsletter */}
      <section className="border-b border-lux-cream/10">
        <div className="mx-auto max-w-[1600px] px-6 py-20 sm:px-10 sm:py-24 lg:px-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="mb-5 text-[9px] uppercase tracking-[0.35em] text-lux-gold">
              The LUXÉE Journal
            </p>

            <h2 className="font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Stay in the world of <span className="italic">LUXÉE.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-lg text-xs font-light leading-6 text-lux-cream/45 sm:text-sm">
              Receive new launches, private editions, and stories from our world
              of perfumery.
            </p>

            {/* Email */}
            <form className="mx-auto mt-9 flex max-w-md border-b border-lux-cream/30">
              <input
                type="email"
                placeholder="Your email address"
                className="
                  min-w-0
                  flex-1
                  bg-transparent
                  py-3
                  text-s
                  font-light
                  text-lux-cream
                  outline-none
                  placeholder:text-lux-cream/30
                "
              />

              <button
                type="submit"
                aria-label="Subscribe"
                className="
                  px-3
                  text-lg
                  text-lux-cream/60
                  transition-colors
                  duration-300
                  hover:text-lux-gold
                "
              >
                →
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Main Footer */}
      <div className="mx-auto max-w-[1600px] px-6 py-16 sm:px-10 sm:py-20 lg:px-20">
        <div className="grid gap-14 lg:grid-cols-[1.5fr_3fr]">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <a href="#home" className="font-display text-4xl tracking-[0.08em]">
              LUXÉE
            </a>

            <p className="mt-1 text-[10px] uppercase tracking-[0.45em] text-lux-gold">
              Parfums
            </p>

            <p className="mt-6 max-w-[220px] text-[14px] font-light leading-6 text-lux-cream/40">
              Timeless scents, crafted with the world's finest ingredients.
            </p>
          </motion.div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {columns.map((column, index) => (
              <motion.div
                key={column.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
              >
                <h3 className="mb-5 text-[12px] uppercase tracking-[0.3em] text-lux-gold">
                  {column.title}
                </h3>

                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="
                          text-[12px]
                          font-light
                          text-lux-cream/45
                          transition-colors
                          duration-300
                          hover:text-lux-cream
                        "
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 border-t border-lux-cream/10 pt-7">
          <div className="flex flex-col gap-5 text-[8px] uppercase tracking-[0.18em] text-lux-cream/25 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 LUXÉE PARFUMS. ALL RIGHTS RESERVED.</p>

            <div className="flex gap-6">
              <a href="#" className="transition-colors hover:text-lux-cream">
                Privacy Policy
              </a>

              <a href="#" className="transition-colors hover:text-lux-cream">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
