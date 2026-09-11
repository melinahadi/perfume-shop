import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

import { getBestSellers } from "../services/productService";
// import { getProductImage } from "../data/productImages";
// import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

function BestSellers() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
//   const [activeProduct, setActiveProduct] = useState(null);
// const { addToCart } = useCart();

  useEffect(() => {
    async function loadBestSellers() {
      try {
        const data = await getBestSellers();

        setProducts(data);
      } catch (err) {
        console.error("Failed to load best sellers:", err);

        setError("Unable to load best sellers.");
      } finally {
        setLoading(false);
      }
    }

    loadBestSellers();
  }, []);

  if (loading) {
    return (
      <section
        id="best-sellers"
        className="flex min-h-[500px] items-center justify-center bg-lux-black text-lux-cream"
      >
        <div className="text-center">
          <div className="mx-auto mb-5 h-5 w-5 animate-spin rounded-full border border-lux-cream/20 border-t-lux-gold" />

          <p className="text-[9px] uppercase tracking-[0.3em] text-lux-cream/40">
            Loading Best Sellers
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="best-sellers"
        className="flex min-h-[500px] items-center justify-center bg-lux-black px-6 text-lux-cream"
      >
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-lux-gold">
            Something went wrong
          </p>

          <p className="mt-4 text-sm text-lux-cream/50">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="best-sellers"
      className="bg-lux-black py-20 text-lux-cream sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* Header */}
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-[9px] uppercase tracking-[0.35em] text-lux-gold"
          >
            Best Sellers
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl"
          >
            Loved by many. <span className="italic">Chosen by you.</span>
          </motion.h2>
        </div>

        {/* Products */}
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-6 lg:mt-16 lg:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>

        {/* View All */}
        <div className="mt-14 text-center">
          <Link
            to="/shop"
            className="
              inline-flex
              border
              border-lux-cream/30
              px-8
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
            View All Fragrances
          </Link>
        </div>
      </div>
    </section>
  );
}

export default BestSellers;
