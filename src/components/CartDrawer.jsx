import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function CartDrawer({ isOpen, onClose }) {
  const {
    cartItems,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  // Prevent body scrolling while drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-[2px]"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              fixed
              right-0
              top-0
              z-[100]
              flex
              h-screen
              w-full
              max-w-[430px]
              flex-col
              bg-lux-black
              text-lux-cream
              shadow-2xl
            "
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-lux-cream/10 px-6 py-6">
              <div>
                <p className="text-[9px] uppercase tracking-[0.35em] text-lux-gold">
                  Your Selection
                </p>

                <h2 className="mt-2 font-display text-2xl">Your Bag</h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close cart"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  border
                  border-lux-cream/15
                  text-lux-cream/60
                  transition-all
                  hover:border-lux-gold
                  hover:text-lux-gold
                  cursor-pointer
                "
              >
                ×
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {cartItems.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="font-display text-3xl italic text-lux-cream/70">
                    Your bag is empty.
                  </p>

                  <p className="mt-4 max-w-[250px] text-[9px] uppercase leading-5 tracking-[0.2em] text-lux-cream/30">
                    Discover a fragrance crafted for your story.
                  </p>

                  <button
                    type="button"
                    onClick={onClose}
                    className="
                      mt-8
                      border
                      border-lux-cream/25
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
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 border-b border-lux-cream/10 pb-6"
                    >
                      {/* Image */}
                      <div className="h-28 w-24 shrink-0 overflow-hidden bg-lux-dark">
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-display text-lg">
                              {item.name}
                            </h3>

                            <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-lux-cream/35">
                              {item.type}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Remove ${item.name}`}
                            className="text-lg leading-none text-lux-cream/30 transition-colors hover:text-lux-gold cursor-pointer"
                          >
                            ×
                          </button>
                        </div>

                        <div className="mt-auto flex items-end justify-between">
                          <div className="flex items-center border border-lux-cream/15">
                            <button
                              type="button"
                              onClick={() => decreaseQuantity(item.id)}
                              className="flex h-7 w-7 items-center justify-center text-lux-cream/50 transition-colors hover:text-lux-gold cursor-pointer"
                            >
                              −
                            </button>

                            <span className="w-7 text-center text-[9px]">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() => increaseQuantity(item.id)}
                              className="flex h-7 w-7 items-center justify-center text-lux-cream/50 transition-colors hover:text-lux-gold cursor-pointer"
                            >
                              +
                            </button>
                          </div>

                          <p className="text-[10px] tracking-[0.12em] text-lux-gold">
                            ${(Number(item.price) * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-lux-cream/10 px-6 py-6">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-lux-cream/40">
                    Subtotal
                  </span>

                  <span className="text-lg tracking-[0.12em] text-lux-gold">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>

                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="
    flex
    w-full
    items-center
    justify-center
    gap-3
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
                  Checkout
                  <span className="text-base">→</span>
                </Link>

                <p className="mt-4 text-center text-[8px] leading-5 tracking-[0.1em] text-lux-cream/25">
                  Taxes and shipping calculated at checkout.
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default CartDrawer;
