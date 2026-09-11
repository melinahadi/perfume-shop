import { Link, useSearchParams } from "react-router-dom";
import { motion } from "motion/react";

function OrderSuccess() {
  const [searchParams] = useSearchParams();

  const orderId = searchParams.get("order");

  return (
    <main className="flex min-h-screen items-center justify-center bg-lux-black px-6 text-lux-cream">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl text-center"
      >
        <p className="text-[9px] uppercase tracking-[0.4em] text-lux-gold">
          Order Confirmed
        </p>

        <h1 className="mt-6 font-display text-5xl sm:text-6xl">Thank you.</h1>

        <div className="mx-auto my-8 h-px w-12 bg-lux-gold/60" />

        <p className="text-sm font-light leading-7 text-lux-cream/50">
          Your order has been successfully placed. We appreciate your choice of
          LUXÉE.
        </p>

        {orderId && (
          <p className="mt-6 text-[9px] uppercase tracking-[0.25em] text-lux-cream/30">
            Order #{orderId}
          </p>
        )}

        <Link
          to="/shop"
          className="
            mt-10
            inline-flex
            border
            border-lux-cream/25
            px-8
            py-4
            text-[8px]
            uppercase
            tracking-[0.3em]
            transition-all
            duration-300
            hover:border-lux-gold
            hover:text-lux-gold
          "
        >
          Continue Shopping
        </Link>
      </motion.div>
    </main>
  );
}

export default OrderSuccess;
