import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "motion/react";

import { getProductBySlug } from "../services/productService";
import { useCart } from "../context/CartContext";
import CartDrawer from "../components/CartDrawer";

function ProductDetails() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cart
  const { addToCart, cartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load Product
  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);

        const data = await getProductBySlug(slug);

        setProduct(data);
      } catch (err) {
        console.error("Failed to load product:", err);

        setError("Product not found.");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [slug]);

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-lux-black text-lux-cream">
        <div className="text-center">
          <div className="mx-auto mb-5 h-5 w-5 animate-spin rounded-full border border-lux-cream/20 border-t-lux-gold" />

          <p className="text-[9px] uppercase tracking-[0.3em] text-lux-cream/40">
            Loading Fragrance
          </p>
        </div>
      </main>
    );
  }

  // =========================
  // ERROR
  // =========================
  if (error || !product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-lux-black px-6 text-lux-cream">
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-lux-gold">
            Fragrance Not Found
          </p>

          <Link
            to="/shop"
            className="
              mt-8
              inline-block
              border
              border-lux-cream/30
              px-7
              py-3
              text-[8px]
              uppercase
              tracking-[0.3em]
              transition-all
              hover:border-lux-gold
              hover:text-lux-gold
            "
          >
            Back To Collection
          </Link>
        </div>
      </main>
    );
  }

  // =========================
  // MAIN
  // =========================
  return (
    <main className="min-h-screen bg-lux-black text-lux-cream">
      {/* =========================
          HEADER
      ========================== */}
      <div className="px-6 pt-14 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-[1600px]">
          {/* Top Row */}
          <div className="flex items-center justify-between">
            {/* Back To Collection */}
            <Link
              to="/shop"
              className="
                group
                inline-flex
                items-center
                gap-3
                text-[8px]
                uppercase
                tracking-[0.3em]
                text-lux-cream/50
                transition-colors
                hover:text-lux-gold
              "
            >
              <span className="text-base transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>
              Back To Collection
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
                transition-all
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
        </div>
      </div>

      {/* =========================
          PRODUCT
      ========================== */}
      <section className="px-6 py-12 sm:px-10 sm:py-16 lg:px-20 lg:py-20">
        <div className="mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-2 lg:gap-20">
          {/* =========================
              IMAGE
          ========================== */}
          <motion.div
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative overflow-hidden bg-lux-dark"
          >
            <img
              src={product.image_url}
              alt={product.name}
              className="
                h-full
                min-h-[500px]
                w-full
                object-cover
                sm:min-h-[650px]
              "
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </motion.div>

          {/* =========================
              CONTENT
          ========================== */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col justify-center lg:pr-10"
          >
            {/* Category */}
            <p className="text-[9px] uppercase tracking-[0.35em] text-lux-gold">
              {product.category}
            </p>

            {/* Name */}
            <h1 className="mt-5 font-display text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
              {product.name}
            </h1>

            {/* Type */}
            <p className="mt-4 text-[9px] uppercase tracking-[0.25em] text-lux-cream/40">
              {product.type}
            </p>

            {/* Divider */}
            <div className="my-8 h-px w-12 bg-lux-gold/60" />

            {/* Description */}
            <p className="max-w-xl text-sm font-light leading-7 text-lux-cream/60 sm:text-base sm:leading-8">
              {product.description}
            </p>

            {/* Price */}
            <div className="mt-8">
              <p className="text-xl tracking-[0.15em] text-lux-gold">
                ${product.price}
              </p>

              <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-lux-cream/35">
                {product.size}
              </p>
            </div>

            {/* =========================
                NOTES
            ========================== */}
            {product.notes && (
              <div className="mt-10 grid grid-cols-3 gap-4 border-y border-lux-cream/10 py-7">
                {/* Top Notes */}
                <div>
                  <p className="mb-3 text-[8px] uppercase tracking-[0.2em] text-lux-gold">
                    Top
                  </p>

                  <div className="space-y-1.5">
                    {product.notes.top?.map((note) => (
                      <p key={note} className="text-[10px] text-lux-cream/55">
                        {note}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Heart Notes */}
                <div>
                  <p className="mb-3 text-[8px] uppercase tracking-[0.2em] text-lux-gold">
                    Heart
                  </p>

                  <div className="space-y-1.5">
                    {product.notes.heart?.map((note) => (
                      <p key={note} className="text-[10px] text-lux-cream/55">
                        {note}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Base Notes */}
                <div>
                  <p className="mb-3 text-[8px] uppercase tracking-[0.2em] text-lux-gold">
                    Base
                  </p>

                  <div className="space-y-1.5">
                    {product.notes.base?.map((note) => (
                      <p key={note} className="text-[10px] text-lux-cream/55">
                        {note}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* =========================
                ADD TO BAG
            ========================== */}
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="
                mt-10
                flex
                w-full
                items-center
                justify-center
                gap-4
                bg-lux-gold
                py-4
                text-[9px]
                uppercase
                tracking-[0.3em]
                text-lux-black
                transition-all
                duration-500
                hover:bg-lux-cream
              "
            >
              Add To Bag
              <span className="text-base">+</span>
            </button>

            {/* =========================
                WISHLIST
            ========================== */}
            <button
              type="button"
              className="
                mt-3
                flex
                w-full
                items-center
                justify-center
                gap-3
                border
                border-lux-cream/20
                py-4
                text-[8px]
                uppercase
                tracking-[0.3em]
                text-lux-cream/60
                transition-all
                hover:border-lux-gold
                hover:text-lux-gold
              "
            >
              Add To Wishlist ♡
            </button>
          </motion.div>
        </div>
      </section>

      {/* =========================
          CART DRAWER
      ========================== */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </main>
  );
}

export default ProductDetails;
