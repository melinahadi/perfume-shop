import { useState } from "react";
import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";

function StoryNavbar() {
  const { cartCount } = useCart();

  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className="absolute left-0 top-0 z-50 w-full">
        <nav
          className="
            mx-auto
            flex
            h-24
            max-w-[1600px]
            items-center
            justify-between
            px-6
            sm:px-8
            lg:px-12
          "
        >
          {/* =========================
              BACK TO HOME
          ========================== */}
          <Link
            to="/"
            className="
              group
              flex
              items-center
              gap-3
              text-[9px]
              uppercase
              tracking-[0.25em]
              text-lux-cream/70
              transition-colors
              duration-300
              hover:text-lux-gold
            "
          >
            <span
              className="
                text-base
                transition-transform
                duration-300
                group-hover:-translate-x-1
              "
            >
              ←
            </span>

            <span className="hidden sm:inline">Back to Home</span>
          </Link>

          {/* =========================
              LOGO
          ========================== */}
          <Link
            to="/"
            className="
              absolute
              left-1/2
              -translate-x-1/2
              font-display
              text-2xl
              tracking-[0.2em]
              text-lux-cream
              transition-colors
              duration-300
              hover:text-lux-gold
            "
          >
            LUXÉE
          </Link>

          {/* =========================
              SHOPPING BAG
          ========================== */}
          <button
            type="button"
            aria-label="Shopping bag"
            onClick={() => setIsCartOpen(true)}
            className="
              relative
              ml-auto
              flex
              items-center
              justify-center
              text-lux-cream
              transition-colors
              duration-300
              hover:text-lux-gold
              cursor-pointer
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

            {/* =========================
                CART COUNT
            ========================== */}
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
        </nav>
      </header>

      {/* =========================
          CART DRAWER
      ========================== */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

export default StoryNavbar;
