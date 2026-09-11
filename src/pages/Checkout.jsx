import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";

import { useCart } from "../context/CartContext";
import { createOrder } from "../services/orderService";

function Checkout() {
  const navigate = useNavigate();

  const { cartItems, cartTotal, clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

 async function handleSubmit(event) {
   event.preventDefault();

   if (cartItems.length === 0) {
     return;
   }

   setIsSubmitting(true);

   try {
     const order = await createOrder({
       customer: form,
       cartItems,
       total: cartTotal,
     });

     console.log("ORDER CREATED:", order);

     clearCart();

     navigate(`/order-success?order=${order.id}`);
   } catch (error) {
     console.error("Failed to create order:", error);

     alert("Something went wrong while placing your order.");
   } finally {
     setIsSubmitting(false);
   }
 }

  if (cartItems.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-lux-black px-6 text-lux-cream">
        <div className="text-center">
          <p className="text-[9px] uppercase tracking-[0.35em] text-lux-gold">
            Your Bag
          </p>

          <h1 className="mt-5 font-display text-5xl">Your bag is empty.</h1>

          <p className="mx-auto mt-5 max-w-md text-sm font-light leading-7 text-lux-cream/40">
            Discover a fragrance crafted especially for your story.
          </p>

          <Link
            to="/shop"
            className="
              mt-9
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
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-lux-black text-lux-cream">
      {/* Header */}
      <section className="border-b border-lux-cream/10 px-6 pb-12 pt-32 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-[1400px]">
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
              text-lux-cream/40
              transition-colors
              hover:text-lux-gold
            "
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            Continue Shopping
          </Link>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 font-display text-5xl sm:text-6xl lg:text-7xl"
          >
            Checkout.
          </motion.h1>

          <p className="mt-5 text-[9px] uppercase tracking-[0.3em] text-lux-cream/35">
            Complete your order
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="px-6 py-12 sm:px-10 sm:py-16 lg:px-20 lg:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[1fr_420px]">
          {/* =========================
              CUSTOMER INFORMATION
          ========================== */}
          <motion.form
            id="checkout-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <div>
              <p className="text-[9px] uppercase tracking-[0.35em] text-lux-gold">
                01
              </p>

              <h2 className="mt-3 font-display text-3xl">Contact & Delivery</h2>
            </div>

            <div className="mt-10 space-y-7">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-3 block text-[8px] uppercase tracking-[0.25em] text-lux-cream/40"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="
                    w-full
                    border-b
                    border-lux-cream/15
                    bg-transparent
                    px-0
                    py-3
                    text-sm
                    font-light
                    text-lux-cream
                    outline-none
                    placeholder:text-lux-cream/20
                    focus:border-lux-gold
                  "
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-3 block text-[8px] uppercase tracking-[0.25em] text-lux-cream/40"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="
                    w-full
                    border-b
                    border-lux-cream/15
                    bg-transparent
                    px-0
                    py-3
                    text-sm
                    font-light
                    text-lux-cream
                    outline-none
                    placeholder:text-lux-cream/20
                    focus:border-lux-gold
                  "
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-3 block text-[8px] uppercase tracking-[0.25em] text-lux-cream/40"
                >
                  Phone
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+1 000 000 0000"
                  className="
                    w-full
                    border-b
                    border-lux-cream/15
                    bg-transparent
                    px-0
                    py-3
                    text-sm
                    font-light
                    text-lux-cream
                    outline-none
                    placeholder:text-lux-cream/20
                    focus:border-lux-gold
                  "
                />
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="mb-3 block text-[8px] uppercase tracking-[0.25em] text-lux-cream/40"
                >
                  Delivery Address
                </label>

                <textarea
                  id="address"
                  name="address"
                  required
                  rows="4"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Your complete delivery address"
                  className="
                    w-full
                    resize-none
                    border-b
                    border-lux-cream/15
                    bg-transparent
                    px-0
                    py-3
                    text-sm
                    font-light
                    leading-7
                    text-lux-cream
                    outline-none
                    placeholder:text-lux-cream/20
                    focus:border-lux-gold
                  "
                />
              </div>
            </div>

            {/* Mobile submit */}
            <button
              type="submit"
              disabled={isSubmitting}
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
                hover:bg-lux-cream
                disabled:cursor-not-allowed
                disabled:opacity-50
                lg:hidden
              "
            >
              {isSubmitting ? "Processing..." : "Place Order"}
              {!isSubmitting && <span>→</span>}
            </button>
          </motion.form>

          {/* =========================
              ORDER SUMMARY
          ========================== */}
          <motion.aside
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="h-fit border border-lux-cream/10 p-6 sm:p-8"
          >
            <div className="flex items-center justify-between border-b border-lux-cream/10 pb-5">
              <div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-lux-gold">
                  02
                </p>

                <h2 className="mt-2 font-display text-2xl">Your Order</h2>
              </div>

              <span className="text-[9px] uppercase tracking-[0.2em] text-lux-cream/30">
                {cartItems.reduce((total, item) => total + item.quantity, 0)}{" "}
                items
              </span>
            </div>

            {/* Items */}
            <div className="divide-y divide-lux-cream/10">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 py-5">
                  <div className="h-24 w-20 shrink-0 overflow-hidden bg-lux-dark">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-lg">{item.name}</h3>

                    <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-lux-cream/30">
                      {item.type}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[9px] text-lux-cream/40">
                        Qty {item.quantity}
                      </span>

                      <span className="text-[10px] tracking-[0.12em] text-lux-gold">
                        ${(Number(item.price) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-2 space-y-4 border-t border-lux-cream/10 pt-6">
              <div className="flex justify-between">
                <span className="text-[9px] uppercase tracking-[0.2em] text-lux-cream/35">
                  Subtotal
                </span>

                <span className="text-sm">${cartTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-[9px] uppercase tracking-[0.2em] text-lux-cream/35">
                  Shipping
                </span>

                <span className="text-[9px] uppercase tracking-[0.15em] text-lux-gold">
                  Complimentary
                </span>
              </div>

              <div className="flex items-end justify-between border-t border-lux-cream/10 pt-5">
                <span className="text-[9px] uppercase tracking-[0.25em] text-lux-cream/50">
                  Total
                </span>

                <span className="font-display text-2xl text-lux-gold">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Desktop submit */}
            <button
              type="submit"
              form="checkout-form"
              disabled={isSubmitting}
              onClick={(event) => {
                const formElement = event.currentTarget.form;

                if (formElement) {
                  formElement.requestSubmit();
                }
              }}
              className="
                mt-7
                hidden
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
                hover:bg-lux-cream
                disabled:cursor-not-allowed
                disabled:opacity-50
                lg:flex
              "
            >
              {isSubmitting ? "Processing..." : "Place Order"}
              {!isSubmitting && <span>→</span>}
            </button>

            <p className="mt-5 text-center text-[8px] leading-5 tracking-[0.1em] text-lux-cream/20">
              By placing your order, you agree to our terms and conditions.
            </p>
          </motion.aside>
        </div>
      </section>
    </main>
  );
}

export default Checkout;
