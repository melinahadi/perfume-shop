import { motion } from "motion/react";
import { Link } from "react-router-dom";

const collections = [
  {
    name: "Floral",
    description: "Delicate & Elegant",
    image: "/src/assets/images/collections/Floral.webp",
  },
  {
    name: "Woody",
    description: "Warm & Intense",
    image: "/src/assets/images/collections/Woody.webp",
  },
  {
    name: "Oriental",
    description: "Rich & Mysterious",
    image: "/src/assets/images/collections/Oriental.webp",
  },
  {
    name: "Fresh",
    description: "Clean & Vibrant",
    image: "/src/assets/images/collections/Fresh.webp",
  },
];

function Collections() {
  return (
    <section
      id="collections"
      className="bg-lux-cream px-6 py-20 text-lux-black sm:px-8 sm:py-24 lg:px-12 lg:py-32"
    >
      <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-[0.8fr_2fr] lg:items-center lg:gap-16">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="max-w-md"
        >
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.35em] text-lux-gold">
            Our Collections
          </p>

          <h2 className="font-display text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
            Find your
            <br />
            <span className="italic">signature scent.</span>
          </h2>

          <div className="mt-7 h-px w-12 bg-lux-black/30" />

          <p className="mt-7 max-w-sm text-sm font-medium leading-7 text-lux-black/60">
            From soft florals to deep orientals, explore our fragrance
            collections and discover a scent that feels uniquely yours.
          </p>

          {/* Explore Collections */}
          <Link
            to="/shop"
            className="
              mt-8
              inline-flex
              items-center
              border
              border-lux-black/30
              px-6
              py-3
              text-[9px]
              font-medium
              uppercase
              tracking-[0.25em]
              transition-all
              duration-300
              hover:bg-lux-black
              hover:text-lux-cream
            "
          >
            Explore Collections
          </Link>
        </motion.div>

        {/* Collection Cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.name}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
              }}
            >
              <Link
                to={`/shop?category=${collection.name}`}
                className="
                  group
                  relative
                  block
                  aspect-[3/4]
                  overflow-hidden
                  bg-lux-dark
                "
              >
                {/* Image */}
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-1000
                    ease-[cubic-bezier(0.22,1,0.36,1)]
                    group-hover:scale-110
                  "
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-700 group-hover:from-black/75" />

                {/* Text */}
                <div className="absolute inset-x-0 bottom-0 p-4 text-center text-lux-cream sm:p-5">
                  <h3 className="font-display text-2xl capitalize sm:text-3xl">
                    {collection.name}
                  </h3>

                  <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-lux-cream/70">
                    {collection.description}
                  </p>

                  <span
                    className="
                      mt-4
                      inline-flex
                      items-center
                      gap-2
                      border-b
                      border-lux-cream/50
                      pb-1
                      text-[8px]
                      uppercase
                      tracking-[0.25em]
                      opacity-100
                      transition-all
                      duration-500
                      sm:translate-y-2
                      sm:opacity-0
                      sm:group-hover:translate-y-0
                      sm:group-hover:border-lux-gold
                      sm:group-hover:text-lux-gold
                      sm:group-hover:opacity-100
                    "
                  >
                    Shop Now
                    <span className="text-xs">→</span>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Collections;
