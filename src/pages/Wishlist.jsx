import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

import { getProductImage } from "../data/productImages";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

import CartDrawer from "../components/CartDrawer";
import Footer from "../components/Footer";

function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist();

console.log("WISHLIST PAGE:", wishlist);  
const { addToCart, cartCount } = useCart();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);

  // Group products by category
  const groupedWishlist = wishlist.reduce((groups, product) => {
    const category = product.category || "Other";

    if (!groups[category]) {
      groups[category] = [];
    }

    groups[category].push(product);

    return groups;
  }, {});

  // Add product to cart
  const handleAddToBag = (product) => {
    addToCart(product);

    setAddedProduct(product.slug);

    setTimeout(() => {
      setAddedProduct(null);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-lux-black text-lux-cream">
      {/* =========================
          HEADER
      ========================== */}

      <section className="border-b border-lux-cream/10 px-6 pb-14 pt-14 sm:px-10 sm:pb-16 lg:px-20">
        <div className="mx-auto max-w-[1600px]">
          {/* Top Row */}
          <div className="flex items-center justify-between">
            {/* Back to Home */}
            <Link
              to="/"
              className="
                inline-flex
                items-center
                gap-3
                text-[9px]
                uppercase
                tracking-[0.3em]
                text-lux-cream/40
                transition-colors
                duration-300
                hover:text-lux-gold
              "
            >
              <span className="text-sm">←</span>
              Back to Home
            </Link>

            {/* Shopping Bag */}
            <button
              type="button"
              aria-label="Shopping bag"
              onClick={() => setIsCartOpen(true)}
              className="
                relative
                mr-2
                flex
                items-center
                justify-center
                text-lux-cream
                transition-colors
                duration-300
                hover:text-lux-gold
                cursor-pointer
                sm:mr-4
                lg:mr-0
              "
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M6 8h12l1 13H5L6 8Z" />
                <path d="M9 8a3 3 0 0 1 6 0" />
              </svg>

              {/* Cart Count */}
              {cartCount > 0 && (
                <span
                  className="
                    absolute
                    -right-2
                    -top-2
                    flex
                    h-3.5
                    min-w-3.5
                    items-center
                    justify-center
                    rounded-full
                    bg-lux-gold
                    px-1
                    text-[7px]
                    leading-none
                    text-lux-black
                  "
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-10"
          >
            <p className="mb-4 text-[9px] uppercase tracking-[0.35em] text-lux-gold">
              Your Selection
            </p>

            <h1 className="font-display text-4xl leading-none sm:text-5xl lg:text-6xl">
              My
              <br />
              <span className="italic">Wishlist.</span>
            </h1>

            <p className="mt-5 max-w-md text-[10px] leading-5 tracking-wide text-lux-cream/40">
              A collection of fragrances you've chosen to keep close.
            </p>
          </motion.div>
        </div>
      </section>

      {/* =========================
          EMPTY WISHLIST
      ========================== */}

      {wishlist.length === 0 ? (
        <section className="flex min-h-[500px] items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Heart Icon */}
            <div
              className="
                mx-auto
                mb-6
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                border
                border-lux-cream/10
              "
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                className="text-lux-cream/40"
              >
                <path d="M20.8 8.6c0 5.5-8.8 10.2-8.8 10.2S3.2 14.1 3.2 8.6A4.6 4.6 0 0 1 12 6.1a4.6 4.6 0 0 1 8.8 2.5Z" />
              </svg>
            </div>

            <p className="font-display text-2xl text-lux-cream/70">
              Your wishlist is empty.
            </p>

            <p className="mt-3 text-[9px] uppercase tracking-[0.25em] text-lux-cream/30">
              Discover a fragrance worth remembering
            </p>

            <Link
              to="/shop"
              className="
                mt-8
                inline-flex
                border
                border-lux-cream/30
                px-7
                py-3
                text-[8px]
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
            </Link>
          </motion.div>
        </section>
      ) : (
        <>
          {/* =========================
              WISHLIST TOOLBAR
          ========================== */}

          <section className="border-b border-lux-cream/10 px-6 sm:px-10 lg:px-20">
            <div className="mx-auto flex max-w-[1600px] items-center justify-between py-5">
              <p className="text-[9px] uppercase tracking-[0.25em] text-lux-cream/40">
                {wishlist.length}{" "}
                {wishlist.length === 1 ? "Fragrance" : "Fragrances"}
              </p>

              <Link
                to="/shop"
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.25em]
                  text-lux-cream/50
                  transition-colors
                  hover:text-lux-gold
                "
              >
                Continue Shopping →
              </Link>
            </div>
          </section>

          {/* =========================
              WISHLIST PRODUCTS
          ========================== */}

          <section className="px-6 py-14 sm:px-10 sm:py-16 lg:px-20 lg:py-20">
            <div className="mx-auto max-w-[1600px]">
              {Object.entries(groupedWishlist).map(([category, products]) => (
                <div key={category} className="mb-20 last:mb-0">
                  {/* Category Header */}
                  <div
                    className="
                        mb-8
                        flex
                        items-end
                        justify-between
                        border-b
                        border-lux-cream/10
                        pb-4
                      "
                  >
                    <div>
                      <p className="text-[8px] uppercase tracking-[0.3em] text-lux-gold">
                        Collection
                      </p>

                      <h2 className="mt-2 font-display text-2xl sm:text-3xl">
                        {category}
                      </h2>
                    </div>

                    <span className="text-[8px] uppercase tracking-[0.2em] text-lux-cream/30">
                      {products.length}{" "}
                      {products.length === 1 ? "fragrance" : "fragrances"}
                    </span>
                  </div>

                  {/* Products */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-6 lg:grid-cols-4">
                    {products.map((product, index) => {
                      const isAdded = addedProduct === product.slug;

                      return (
                        <motion.article
                          key={product.id}
                          initial={{
                            opacity: 0,
                            y: 30,
                          }}
                          whileInView={{
                            opacity: 1,
                            y: 0,
                          }}
                          viewport={{
                            once: true,
                            amount: 0.15,
                          }}
                          transition={{
                            duration: 0.7,
                            delay: index * 0.08,
                          }}
                          className="group"
                        >
                          {/* Product Image */}
                          <div
                            className="
                                relative
                                aspect-[4/5]
                                overflow-hidden
                                bg-lux-dark
                              "
                          >
                            {/* Product Link */}
                            <Link
                              to={`/product/${product.slug}`}
                              className="block h-full w-full"
                            >
                              <img
                                src={getProductImage(product.image_url)}
                                alt={product.name}
                                className="
                                    h-full
                                    w-full
                                    object-cover
                                    transition-transform
                                    duration-[1200ms]
                                    ease-[cubic-bezier(0.22,1,0.36,1)]
                                    group-hover:scale-[1.04]
                                  "
                              />
                            </Link>

                            {/* Gradient */}
                            <div
                              className="
                                  pointer-events-none
                                  absolute
                                  inset-0
                                  bg-gradient-to-t
                                  from-black/40
                                  via-transparent
                                  to-transparent
                                "
                            />

                            {/* =========================
                                  REMOVE FROM WISHLIST
                              ========================== */}

                            <button
                              type="button"
                              aria-label={`Remove ${product.name} from wishlist`}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleWishlist(product);
                              }}
                              className="
                                  absolute
                                  right-3
                                  top-3
                                  z-20
                                  flex
                                  h-8
                                  w-8
                                  items-center
                                  justify-center
                                  rounded-full
                                  border
                                  border-lux-gold/60
                                  bg-black/30
                                  text-lux-gold
                                  backdrop-blur-md
                                  transition-all
                                  duration-300
                                  hover:border-lux-gold
                                  hover:bg-lux-gold
                                  hover:text-lux-black
                                  cursor-pointer
                                "
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M20.8 8.6c0 5.5-8.8 10.2-8.8 10.2S3.2 14.1 3.2 8.6A4.6 4.6 0 0 1 12 6.1a4.6 4.6 0 0 1 8.8 2.5Z" />
                              </svg>
                            </button>

                            {/* =========================
                                  ADD TO BAG
                              ========================== */}

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToBag(product);
                              }}
                              className={`
                                  absolute
                                  bottom-3
                                  left-1/2
                                  z-20
                                  flex
                                  -translate-x-1/2
                                  items-center
                                  justify-center
                                  gap-2
                                  border
                                  py-2
                                  text-[6px]
                                  uppercase
                                  tracking-[0.2em]
                                  backdrop-blur-md
                                  transition-all
                                  duration-300
                                  cursor-pointer
                                  w-[calc(100%-1.5rem)]

                                  sm:bottom-4
                                  sm:w-[calc(100%-2rem)]
                                  sm:translate-y-3
                                  sm:py-2.5
                                  sm:text-[7px]
                                  sm:tracking-[0.25em]
                                  sm:opacity-0
                                  sm:group-hover:translate-y-0
                                  sm:group-hover:opacity-100

                                  ${
                                    isAdded
                                      ? "border-lux-gold bg-lux-gold text-lux-black opacity-100"
                                      : "border-lux-cream/50 bg-black/45 text-lux-cream"
                                  }

                                  hover:border-lux-gold
                                  hover:bg-lux-gold
                                  hover:text-lux-black
                                `}
                            >
                              <span>
                                {isAdded ? "Added to Bag" : "Add to Bag"}
                              </span>

                              <span>
                                {isAdded ? (
                                  <svg
                                    width="11"
                                    height="11"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <path
                                      d="M5 12.5l4.5 4.5L19 7.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                ) : (
                                  "+"
                                )}
                              </span>
                            </button>
                          </div>

                          {/* =========================
                                PRODUCT INFO
                            ========================== */}

                          <div className="pt-5 text-center">
                            <Link
                              to={`/product/${product.slug}`}
                              className="
                                  font-display
                                  text-xl
                                  transition-colors
                                  duration-300
                                  hover:text-lux-gold
                                  sm:text-2xl
                                "
                            >
                              {product.name}
                            </Link>

                            <p className="mt-1 text-[8px] uppercase tracking-[0.18em] text-lux-cream/40">
                              {product.type}
                            </p>

                            <div className="mx-auto mt-3 h-px w-5 bg-lux-gold/60" />

                            <p className="mt-3 text-[10px] tracking-[0.15em] text-lux-gold">
                              ${product.price}
                            </p>
                          </div>
                        </motion.article>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* =========================
          CART DRAWER
      ========================== */}

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Footer */}
      <Footer />
    </main>
  );
}

export default Wishlist;
