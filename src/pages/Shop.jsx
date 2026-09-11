import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import { getProducts } from "../services/productService";
import CartDrawer from "../components/CartDrawer";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";


function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [sortBy, setSortBy] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Product selected on mobile
  // const [activeProduct, setActiveProduct] = useState(null);

  // Cart Drawer
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [searchParams] = useSearchParams();

  const [filterType, setFilterType] = useState(
    searchParams.get("category") || "all",
  );

  // const { addToCart, cartCount } = useCart();
const { cartCount } = useCart();

  // Sync category filter with URL
  useEffect(() => {
    setFilterType(searchParams.get("category") || "all");
  }, [searchParams]);

  // Load products
  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();

        setProducts(data);
      } catch (err) {
        console.error("Failed to load products:", err);
        setError("Unable to load fragrances.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // Filter + Sort
  const filteredProducts = products
    .filter((product) => {
      if (filterType === "all") {
        return true;
      }

      return product.category?.toLowerCase() === filterType.toLowerCase();
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return Number(a.price) - Number(b.price);

        case "price-high":
          return Number(b.price) - Number(a.price);

        case "name-az":
          return a.name.localeCompare(b.name);

        case "name-za":
          return b.name.localeCompare(a.name);

        default:
          return 0;
      }
    });

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-lux-black text-lux-cream">
        <div className="text-center">
          <div className="mx-auto mb-5 h-5 w-5 animate-spin rounded-full border border-lux-cream/20 border-t-lux-gold" />

          <p className="text-[9px] uppercase tracking-[0.3em] text-lux-cream/40">
            Loading Collection
          </p>
        </div>
      </main>
    );
  }

  // =========================
  // ERROR
  // =========================
  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-lux-black px-6 text-lux-cream">
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-lux-gold">
            Something went wrong
          </p>

          <p className="mt-4 text-sm text-lux-cream/50">{error}</p>
        </div>
      </main>
    );
  }

  // =========================
  // MAIN
  // =========================
  return (
    <main className="min-h-screen bg-lux-black text-lux-cream">
      

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
    relative=
    mr-2
    flex
    
    items-center
    justify-center
   
    text-lux-cream
    transition-all
    duration-300
    hover:border-lux-gold
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

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-10 font-display text-4xl leading-none sm:text-5xl lg:text-6xl"
          >
            The
            <br />
            <span className="italic">Collection.</span>
          </motion.h1>
        </div>
      </section>

      {/* =========================
          TOOLBAR
      ========================== */}
      <section className="border-b border-lux-cream/10 px-6 sm:px-10 lg:px-20">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between py-5">
          <p className="text-[9px] uppercase tracking-[0.25em] text-lux-cream/40">
            {filteredProducts.length} Fragrances
          </p>

          <button
            type="button"
            onClick={() => setIsFilterOpen((current) => !current)}
            className="
              flex
              items-center
              gap-3
              text-[9px]
              uppercase
              tracking-[0.25em]
              text-lux-cream/70
              transition-colors
              hover:text-lux-gold
              cursor-pointer
            "
          >
            Filter & Sort
            <span
              className={`text-sm transition-transform duration-300 ${
                isFilterOpen ? "rotate-45" : ""
              }`}
            >
              +
            </span>
          </button>
        </div>
      </section>

      {/* =========================
          FILTER & SORT PANEL
      ========================== */}
      {isFilterOpen && (
        <motion.section
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border-b border-lux-cream/10 px-6 sm:px-10 lg:px-20"
        >
          <div className="mx-auto grid max-w-[1600px] gap-10 py-8 sm:grid-cols-2">
            {/* Filter */}
            <div>
              <p className="mb-5 text-[8px] uppercase tracking-[0.3em] text-lux-cream/30">
                Filter by Type
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  { value: "all", label: "All" },
                  { value: "Floral", label: "Floral" },
                  { value: "Woody", label: "Woody" },
                  { value: "Oriental", label: "Oriental" },
                  { value: "Fresh", label: "Fresh" },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFilterType(option.value)}
                    className={`
                      border
                      px-4
                      py-2.5
                      text-[8px]
                      uppercase
                      tracking-[0.2em]
                      transition-all
                      duration-300

                      ${
                        filterType === option.value
                          ? "border-lux-gold bg-lux-gold text-lux-black"
                          : "border-lux-cream/15 text-lux-cream/50 hover:border-lux-gold/50 hover:text-lux-gold"
                      }
                    `}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <p className="mb-5 text-[8px] uppercase tracking-[0.3em] text-lux-cream/30">
                Sort by
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  { value: "featured", label: "Featured" },
                  {
                    value: "price-low",
                    label: "Price: Low to High",
                  },
                  {
                    value: "price-high",
                    label: "Price: High to Low",
                  },
                  {
                    value: "name-az",
                    label: "Name: A → Z",
                  },
                  {
                    value: "name-za",
                    label: "Name: Z → A",
                  },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSortBy(option.value)}
                    className={`
                      border
                      px-4
                      py-2.5
                      text-[8px]
                      uppercase
                      tracking-[0.15em]
                      transition-all
                      duration-300

                      ${
                        sortBy === option.value
                          ? "border-lux-gold bg-lux-gold text-lux-black"
                          : "border-lux-cream/15 text-lux-cream/50 hover:border-lux-gold/50 hover:text-lux-gold"
                      }
                    `}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* =========================
          PRODUCTS
      ========================== */}
      <section className="px-6 py-14 sm:px-10 sm:py-16 lg:px-20 lg:py-20">
        <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-x-4 gap-y-12 sm:gap-6 lg:grid-cols-4">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>

      {/* =========================
          CART DRAWER
          Same CartDrawer as Navbar
      ========================== */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Footer />
    </main>
  );
}

export default Shop;
