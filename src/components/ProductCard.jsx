import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

import { getProductImage } from "../data/productImages";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function ProductCard({ product, index = 0 }) {
  // const [activeProduct, setActiveProduct] = useState(null);

  const { addToCart } = useCart();

  const [isAdded, setIsAdded] = useState(false);

  const { toggleWishlist, isInWishlist } = useWishlist();

const inWishlist = isInWishlist(product.slug);

  console.log(product.name, "wishlist:", isInWishlist(product.id));

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
      }}
      className="group"
    >
      {/* Product Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-lux-dark">
        {/* Product Link */}
        <Link to={`/product/${product.slug}`} className="block h-full w-full">
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

        {/* Wishlist */}
        <button
          type="button"
          aria-label={`Add ${product.name} to wishlist`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="
    absolute
    right-3
    top-3
    flex
    h-8
    w-8
    items-center
    justify-center
    rounded-full
    border
    border-lux-cream/25
    bg-black/20
    text-lux-cream/80
    backdrop-blur-md
    transition-all
    duration-300
    hover:border-lux-gold
    hover:text-lux-gold
    cursor-pointer
  "
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill={inWishlist ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.4"
          >
            <path d="M20.8 8.6c0 5.5-8.8 10.2-8.8 10.2S3.2 14.1 3.2 8.6A4.6 4.6 0 0 1 12 6.1a4.6 4.6 0 0 1 8.8 2.5Z" />
          </svg>
        </button>

        {/* Add To Bag */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();

            addToCart(product);
            setIsAdded(true);

            setTimeout(() => {
              setIsAdded(false);
            }, 1500);
          }}
          className={`
    absolute
    bottom-3
    left-1/2
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
          <span
            className="
      transition-all
      duration-300
    "
          >
            {isAdded ? "Added to Bag" : "Add to Bag"}
          </span>

          <span
            className={`
      inline-flex
      items-center
      justify-center
      transition-all
      duration-300
      ${isAdded ? "scale-100 opacity-100" : "scale-100 opacity-100"}
    `}
          >
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

      {/* Product Info */}
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
}

export default ProductCard;
