import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

import { supabase } from "../lib/supabase";
import { getMyOrders } from "../services/orderService";
import Storynavbar from "../components/StoryNavbar";


function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // LOAD ORDERS
  // =====================================================

  const loadOrders = useCallback(async () => {
    try {
      setError("");

      const data = await getMyOrders();

      setOrders(data);

      // اگر هیچ سفارشی انتخاب نشده، جدیدترین سفارش را انتخاب کن
      setSelectedOrderId((currentSelectedId) => {
        if (
          currentSelectedId &&
          data.some((order) => order.id === currentSelectedId)
        ) {
          return currentSelectedId;
        }

        return data.length > 0 ? data[0].id : null;
      });
    } catch (error) {
      console.error("Orders error:", error);

      setError(error.message || "Unable to load your orders.");
    } finally {
      setLoading(false);
    }
  }, []);

  // =====================================================
  // INITIAL LOAD + REALTIME
  // =====================================================

  useEffect(() => {
    loadOrders();

    // ---------------------------------------------------
    // Orders realtime
    // ---------------------------------------------------

    const ordersChannel = supabase
      .channel("orders-page-orders")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "orders",
        },
        () => {
          loadOrders();
        },
      )
      .subscribe();

    // ---------------------------------------------------
    // Order items realtime
    // ---------------------------------------------------

    const orderItemsChannel = supabase
      .channel("orders-page-order-items")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "order_items",
        },
        () => {
          loadOrders();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(ordersChannel);
      supabase.removeChannel(orderItemsChannel);
    };
  }, [loadOrders]);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-lux-black text-lux-cream">

        <div className="text-center">
          <div className="mx-auto mb-5 h-5 w-5 animate-spin rounded-full border border-lux-cream/20 border-t-lux-gold" />

          <p className="text-[9px] uppercase tracking-[0.3em] text-lux-cream/40">
            Loading Orders
          </p>
        </div>
      </main>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-lux-black px-6 text-lux-cream">
        <div className="text-center">
          <p className="text-[9px] uppercase tracking-[0.3em] text-red-400">
            Something went wrong
          </p>

          <p className="mt-4 text-sm text-lux-cream/40">{error}</p>

          <button
            type="button"
            onClick={loadOrders}
            className="
              mt-8
              border
              border-lux-cream/20
              px-6
              py-3
              text-[8px]
              uppercase
              tracking-[0.3em]
              transition-all
              hover:border-lux-gold
              hover:text-lux-gold
            "
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  // =====================================================
  // SELECTED ORDER
  // =====================================================

  const selectedOrder =
    orders.find((order) => order.id === selectedOrderId) || orders[0] || null;

  // =====================================================
  // EMPTY STATE
  // =====================================================

  if (orders.length === 0) {
    return (
      <main className="min-h-screen bg-lux-black text-lux-cream">
        <Storynavbar />

        {/* Header */}
        <section className="border-b border-lux-cream/10 px-6 pb-16 pt-36 sm:px-10 lg:px-20">
          {/* <div className="mx-auto max-w-[1200px]">
            
            <p className="text-[9px] uppercase tracking-[0.35em] text-lux-gold">
              Your Account
            </p>

            <h1 className="mt-5 font-display text-6xl sm:text-7xl">
              My
              <br />
              <span className="italic">Orders.</span>
            </h1>
          </div> */}
          <div className="mx-auto max-w-[1400px]">
            <p className="text-[9px] font-semibold uppercase tracking-[0.4em] text-lux-gold">
              Your Account
            </p>

            <h1 className="mt-5 font-display text-5xl leading-none sm:text-6xl lg:text-8xl">
              My
              <br />
              <span className="italic">Orders.</span>
            </h1>

            <div className="mt-8 h-px w-12 bg-lux-gold/60" />
          </div>
        </section>

        <section className="px-6 py-24 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-[1200px] py-10 text-center">
            <p className="font-display text-3xl">No orders yet.</p>

            <p className="mx-auto mt-5 max-w-md text-sm font-light leading-7 text-lux-cream/40">
              Your fragrance journey starts with your first order.
            </p>

            <Link
              to="/shop"
              className="
                mt-8
                inline-flex
                border
                border-lux-cream/20
                px-8
                py-4
                text-[9px]
                uppercase
                tracking-[0.3em]
                transition-colors
                hover:border-lux-gold
                hover:text-lux-gold
              "
            >
              Explore Collection
            </Link>
          </div>
        </section>
      </main>
    );
  }

  // =====================================================
  // MAIN
  // =====================================================

  return (
    <main className="min-h-screen bg-lux-black text-lux-cream">
      {/* =================================================
          HEADER
      ================================================= */}

      <section className="border-b border-lux-cream/10 px-6 pb-14 pt-32 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-[1400px]">
          {/* Back to Home */}

          <Link
            to="/"
            className="
              group
              mb-12
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
            <span className="text-sm transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            Back to Home
          </Link>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-[0.35em] text-lux-gold">
                Your Account
              </p>

              <h1 className="mt-5 font-display text-6xl leading-none sm:text-7xl lg:text-8xl">
                My
                <br />
                <span className="italic">Orders.</span>
              </h1>
            </div>

            <p className="text-[8px] uppercase tracking-[0.3em] text-lux-cream/30">
              {orders.length} {orders.length === 1 ? "Order" : "Orders"}
            </p>
          </div>
        </div>
      </section>

      {/* =================================================
          ORDERS + DETAILS
      ================================================= */}

      <section className="px-6 py-14 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          {/* =================================================
              LEFT — ORDER HISTORY
          ================================================= */}

          <div>
            <div className="mb-6">
              <p className="text-[8px] uppercase tracking-[0.35em] text-lux-cream/30">
                Order History
              </p>
            </div>

            <div className="space-y-4">
              {orders.map((order, index) => {
                const isSelected = selectedOrder?.id === order.id;

                return (
                  <motion.button
                    key={order.id}
                    type="button"
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: index * 0.08,
                    }}
                    onClick={() => setSelectedOrderId(order.id)}
                    className={`
                      w-full
                      border
                      p-6
                      text-left
                      transition-all
                      duration-300
                      sm:p-7
                      ${
                        isSelected
                          ? "border-lux-gold/60 bg-lux-cream/[0.035]"
                          : "border-lux-cream/10 hover:border-lux-cream/25"
                      }
                    `}
                  >
                    {/* Order top */}

                    <div className="flex items-start justify-between gap-5">
                      <div>
                        <p className="text-[8px] uppercase tracking-[0.3em] text-lux-cream/30">
                          Order
                        </p>

                        <h2 className="mt-3 font-display text-2xl">
                          #{order.id}
                        </h2>
                      </div>

                      <span
                        className={`
                          inline-flex
                          border
                          px-3
                          py-2
                          text-[8px]
                          uppercase
                          tracking-[0.2em]
                          ${
                            isSelected
                              ? "border-lux-gold/40 text-lux-gold"
                              : "border-lux-cream/15 text-lux-cream/40"
                          }
                        `}
                      >
                        {order.status}
                      </span>
                    </div>

                    {/* Divider */}

                    <div className="my-6 h-px bg-lux-cream/10" />

                    {/* Bottom */}

                    <div className="flex items-end justify-between gap-5">
                      <div>
                        <p className="text-[8px] uppercase tracking-[0.25em] text-lux-cream/25">
                          Date
                        </p>

                        <p className="mt-3 text-xs text-lux-cream/60">
                          {new Date(order.created_at).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-[8px] uppercase tracking-[0.25em] text-lux-cream/25">
                          Total
                        </p>

                        <p className="mt-3 font-display text-xl text-lux-gold">
                          ${Number(order.total).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-[8px] uppercase tracking-[0.25em] text-lux-cream/25">
                        {order.order_items?.length || 0}{" "}
                        {order.order_items?.length === 1 ? "Item" : "Items"}
                      </span>

                      <span
                        className={`
                          text-[8px]
                          uppercase
                          tracking-[0.3em]
                          transition-colors
                          ${isSelected ? "text-lux-gold" : "text-lux-cream/30"}
                        `}
                      >
                        {isSelected ? "Selected" : "View Details →"}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* =================================================
              RIGHT — ORDER DETAILS
          ================================================= */}

          {selectedOrder && (
            <motion.aside
              key={selectedOrder.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="border border-lux-cream/10 bg-lux-black"
            >
              {/* Details Header */}

              <div className="border-b border-lux-cream/10 p-7 sm:p-9">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[8px] uppercase tracking-[0.35em] text-lux-gold">
                      Order Details
                    </p>

                    <h2 className="mt-5 font-display text-4xl sm:text-5xl">
                      #{selectedOrder.id}
                    </h2>

                    <p className="mt-4 text-[9px] uppercase tracking-[0.2em] text-lux-cream/30">
                      Placed{" "}
                      {new Date(selectedOrder.created_at).toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        },
                      )}
                    </p>
                  </div>

                  <span className="border border-lux-gold/30 px-3 py-2 text-[8px] uppercase tracking-[0.2em] text-lux-gold">
                    {selectedOrder.status}
                  </span>
                </div>
              </div>

              {/* =================================================
                  PRODUCTS
              ================================================= */}

              <div className="border-b border-lux-cream/10 p-7 sm:p-9">
                <p className="text-[8px] uppercase tracking-[0.35em] text-lux-cream/30">
                  Your Fragrances
                </p>

                <div className="mt-8 divide-y divide-lux-cream/10">
                  {selectedOrder.order_items?.length > 0 ? (
                    selectedOrder.order_items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-6 py-5 first:pt-0 last:pb-0"
                      >
                        <div className="min-w-0">
                          <h3 className="font-display text-xl">
                            {item.product_name}
                          </h3>

                          <p className="mt-2 text-[8px] uppercase tracking-[0.25em] text-lux-cream/30">
                            Quantity × {item.quantity}
                          </p>
                        </div>

                        <div className="shrink-0 text-right">
                          <p className="text-sm text-lux-gold">
                            $
                            {(
                              Number(item.price) * Number(item.quantity)
                            ).toFixed(2)}
                          </p>

                          <p className="mt-2 text-[8px] text-lux-cream/25">
                            ${Number(item.price).toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="py-5 text-sm text-lux-cream/30">
                      No items found for this order.
                    </p>
                  )}
                </div>
              </div>

              {/* =================================================
                  DELIVERY INFORMATION
              ================================================= */}

              <div className="border-b border-lux-cream/10 p-7 sm:p-9">
                <p className="text-[8px] uppercase tracking-[0.35em] text-lux-cream/30">
                  Delivery Information
                </p>

                <div className="mt-8 grid gap-7 sm:grid-cols-2">
                  <div>
                    <p className="text-[8px] uppercase tracking-[0.25em] text-lux-cream/25">
                      Name
                    </p>

                    <p className="mt-3 text-sm text-lux-cream/70">
                      {selectedOrder.customer_name || "—"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[8px] uppercase tracking-[0.25em] text-lux-cream/25">
                      Email
                    </p>

                    <p className="mt-3 break-all text-sm text-lux-cream/70">
                      {selectedOrder.email || "—"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[8px] uppercase tracking-[0.25em] text-lux-cream/25">
                      Phone
                    </p>

                    <p className="mt-3 text-sm text-lux-cream/70">
                      {selectedOrder.phone || "—"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[8px] uppercase tracking-[0.25em] text-lux-cream/25">
                      Address
                    </p>

                    <p className="mt-3 text-sm leading-6 text-lux-cream/70">
                      {selectedOrder.address || "—"}
                    </p>
                  </div>
                </div>
              </div>

              {/* =================================================
                  TOTAL
              ================================================= */}

              <div className="flex items-end justify-between gap-5 p-7 sm:p-9">
                <div>
                  <p className="text-[8px] uppercase tracking-[0.35em] text-lux-cream/30">
                    Order Total
                  </p>

                  <p className="mt-3 text-[8px] uppercase tracking-[0.2em] text-lux-cream/20">
                    Including all items
                  </p>
                </div>

                <p className="font-display text-3xl text-lux-gold sm:text-4xl">
                  ${Number(selectedOrder.total).toFixed(2)}
                </p>
              </div>
            </motion.aside>
          )}
        </div>
      </section>
    </main>
  );
}

export default Orders;
