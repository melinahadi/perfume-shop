import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import { searchProducts } from "../services/productService";
import { getProductImage } from "../data/productImages";

function Navbar() {
  const { cartCount } = useCart();
  const { user } = useAuth();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  // Search
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mobile Menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const accountRef = useRef(null);

  const { wishlist } = useWishlist();


  // =========================
  // CLOSE ACCOUNT ON OUTSIDE CLICK
  // =========================
  useEffect(() => {
    function handleClickOutside(event) {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setIsAccountOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // =========================
  // PREVENT BODY SCROLL
  // WHEN MOBILE MENU IS OPEN
  // =========================
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // =========================
  // SEARCH
  // =========================
  const handleSearch = async (value) => {
    setSearchQuery(value);

    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);

      const results = await searchProducts(value);

      setSearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // =========================
  // CLOSE SEARCH
  // =========================
  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  // =========================
  // CLOSE MOBILE MENU
  // =========================
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* =====================================================
          NAVBAR
      ===================================================== */}
      <header className="absolute left-0 top-0 z-50 w-full">
        <nav className="relative mx-auto flex h-24 max-w-[1600px] items-center px-6 sm:px-8 lg:px-12">
          {/* Logo - Left */}
          <a
            href="/"
            className="
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
          </a>

          {/* Desktop Navigation - Center */}
          <div
            className="
        absolute
        left-1/2
        hidden
        -translate-x-1/2
        items-center
        gap-10
        md:flex
      "
          >
            <a
              href="/"
              className="text-[11px] uppercase tracking-[0.25em] text-lux-cream/80 transition-colors duration-300 hover:text-lux-gold"
            >
              Home
            </a>

            <a
              href="/shop"
              className="text-[11px] uppercase tracking-[0.25em] text-lux-cream/80 transition-colors duration-300 hover:text-lux-gold"
            >
              Shop
            </a>

            <a
              href="/#collections"
              className="text-[11px] uppercase tracking-[0.25em] text-lux-cream/80 transition-colors duration-300 hover:text-lux-gold"
            >
              Collections
            </a>

            <a
              href="/#story"
              className="text-[11px] uppercase tracking-[0.25em] text-lux-cream/80 transition-colors duration-300 hover:text-lux-gold"
            >
              Discover
            </a>

            <a
              href="/#about"
              className="text-[11px] uppercase tracking-[0.25em] text-lux-cream/80 transition-colors duration-300 hover:text-lux-gold"
            >
              About
            </a>
          </div>

          {/* Right Actions */}
          <div className="ml-auto flex items-center gap-5">
            {/* Search */}
            <button
              type="button"
              aria-label="Search"
              onClick={() => setIsSearchOpen(true)}
              className="hidden text-lux-cream transition-colors cursor-pointer duration-300 hover:text-lux-gold md:block"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
              </svg>
            </button>

            {/* Account */}
            <div ref={accountRef} className="relative hidden md:block">
              <button
                type="button"
                aria-label="Account"
                onClick={() => setIsAccountOpen((current) => !current)}
                className="
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
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c.8-4.2 3.4-6 8-6s7.2 1.8 8 6" />
                </svg>
              </button>

              {/* Account Dropdown - همون کد قبلی خودت */}
              {isAccountOpen && (
                <div className="absolute right-0 top-9 z-[100] w-64 border border-lux-cream/10 bg-lux-black p-5 text-lux-cream shadow-2xl">
                  {user ? (
                    <>
                      <div className="mb-5 border-b border-lux-cream/10 pb-4">
                        <p className="text-[9px] uppercase tracking-[0.25em] text-lux-gold">
                          Welcome Back
                        </p>

                        <p className="mt-2 break-all text-sm text-lux-cream/70">
                          {user.email}
                        </p>
                      </div>

                      <div className="flex flex-col gap-4">
                        <Link
                          to="/account"
                          onClick={() => setIsAccountOpen(false)}
                          className="text-[10px] uppercase tracking-[0.2em] text-lux-cream/70 transition-colors hover:text-lux-gold"
                        >
                          My Account
                        </Link>

                        <Link
                          to="/orders"
                          onClick={() => setIsAccountOpen(false)}
                          className="text-[10px] uppercase tracking-[0.2em] text-lux-cream/70 transition-colors hover:text-lux-gold"
                        >
                          My Orders
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mb-5 border-b border-lux-cream/10 pb-4">
                        <p className="font-display text-lg text-lux-cream">
                          Welcome to LUXÉE
                        </p>

                        <p className="mt-2 text-[9px] tracking-[0.15em] text-lux-cream/40">
                          Sign in to access your account
                        </p>
                      </div>

                      <div className="flex flex-col gap-4">
                        <Link
                          to="/login"
                          onClick={() => setIsAccountOpen(false)}
                          className="text-[10px] uppercase tracking-[0.2em] text-lux-cream/70 transition-colors hover:text-lux-gold"
                        >
                          Sign In
                        </Link>

                        <Link
                          to="/register"
                          onClick={() => setIsAccountOpen(false)}
                          className="text-[10px] uppercase tracking-[0.2em] text-lux-cream/70 transition-colors hover:text-lux-gold"
                        >
                          Create Account
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* wish list */}
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="
    relative
    text-lux-cream
    transition-colors
    duration-300
    hover:text-lux-gold
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
                <path d="M20.8 8.6c0 5.5-8.8 10.2-8.8 10.2S3.2 14.1 3.2 8.6A4.6 4.6 0 0 1 12 6.1a4.6 4.6 0 0 1 8.8 2.5Z" />
              </svg>

              {wishlist.length > 0 && (
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
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Shopping Bag */}
            <button
              type="button"
              aria-label="Shopping bag"
              onClick={() => setIsCartOpen(true)}
              className="
          relative
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

            {/* Mobile Hamburger */}
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setIsMobileMenuOpen(true)}
              className="
          flex
          items-center
          justify-center
          text-lux-cream
          transition-colors
          duration-300
          hover:text-lux-gold
          cursor-pointer
          md:hidden
        "
            >
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      {/* Overlay */}
      <div
        onClick={closeMobileMenu}
        className={`
          fixed
          inset-0
          z-[80]
          bg-black/60
          backdrop-blur-[2px]
          transition-all
          duration-500
          md:hidden
          ${isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"}
        `}
      />

      {/* Menu Panel */}
      <aside
        className={`
          fixed
          left-0
          top-0
          z-[90]
          h-full
          w-[85%]
          max-w-[380px]
          bg-lux-black
          text-lux-cream
          shadow-2xl
          transition-transform
          duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          md:hidden
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex h-full flex-col">
          {/* =========================
              MENU HEADER
          ========================== */}
          <div
            className="
              flex
              h-24
              items-center
              justify-between
              border-b
              border-lux-cream/10
              px-6
            "
          >
            <span className="font-display text-xl tracking-[0.2em]">LUXÉE</span>

            <button
              type="button"
              aria-label="Close menu"
              onClick={closeMobileMenu}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                text-lux-cream/60
                transition-colors
                hover:text-lux-gold
                cursor-pointer
              "
            >
              <span className="text-2xl font-light">×</span>
            </button>
          </div>

          {/* =========================
              NAVIGATION LINKS
          ========================== */}
          <div className="flex-1 overflow-y-auto px-6 py-10">
            <p
              className="
                mb-7
                text-[8px]
                uppercase
                tracking-[0.35em]
                text-lux-gold
              "
            >
              Explore LUXÉE
            </p>

            <nav className="flex flex-col">
              {/* Home */}
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="
                  group
                  flex
                  items-center
                  justify-between
                  border-b
                  border-lux-cream/10
                  py-5
                  text-xl
                  font-display
                  transition-colors
                  hover:text-lux-gold
                "
              >
                <span>Home</span>

                <span
                  className="
                    text-sm
                    text-lux-cream/30
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                    group-hover:text-lux-gold
                  "
                >
                  →
                </span>
              </Link>

              {/* Shop */}
              <Link
                to="/shop"
                onClick={closeMobileMenu}
                className="
                  group
                  flex
                  items-center
                  justify-between
                  border-b
                  border-lux-cream/10
                  py-5
                  text-xl
                  font-display
                  transition-colors
                  hover:text-lux-gold
                "
              >
                <span>Shop</span>

                <span
                  className="
                    text-sm
                    text-lux-cream/30
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                    group-hover:text-lux-gold
                  "
                >
                  →
                </span>
              </Link>

              {/* Collections */}
              <a
                href="/#collections"
                onClick={closeMobileMenu}
                className="
                  group
                  flex
                  items-center
                  justify-between
                  border-b
                  border-lux-cream/10
                  py-5
                  text-xl
                  font-display
                  transition-colors
                  hover:text-lux-gold
                "
              >
                <span>Collections</span>

                <span
                  className="
                    text-sm
                    text-lux-cream/30
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                    group-hover:text-lux-gold
                  "
                >
                  →
                </span>
              </a>

              {/* Discover */}
              <a
                href="/#story"
                onClick={closeMobileMenu}
                className="
                  group
                  flex
                  items-center
                  justify-between
                  border-b
                  border-lux-cream/10
                  py-5
                  text-xl
                  font-display
                  transition-colors
                  hover:text-lux-gold
                "
              >
                <span>Discover</span>

                <span
                  className="
                    text-sm
                    text-lux-cream/30
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                    group-hover:text-lux-gold
                  "
                >
                  →
                </span>
              </a>

              {/* About */}
              <a
                href="/#about"
                onClick={closeMobileMenu}
                className="
                  group
                  flex
                  items-center
                  justify-between
                  border-b
                  border-lux-cream/10
                  py-5
                  text-xl
                  font-display
                  transition-colors
                  hover:text-lux-gold
                "
              >
                <span>About</span>

                <span
                  className="
                    text-sm
                    text-lux-cream/30
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                    group-hover:text-lux-gold
                  "
                >
                  →
                </span>
              </a>
            </nav>

            {/* =========================
                MOBILE ACTIONS
            ========================== */}
            <div className="mt-10">
              <p
                className="
                  mb-5
                  text-[8px]
                  uppercase
                  tracking-[0.35em]
                  text-lux-cream/30
                "
              >
                Quick Access
              </p>

              {/* Search */}
              <button
                type="button"
                onClick={() => {
                  closeMobileMenu();
                  setIsSearchOpen(true);
                }}
                className="
                  flex
                  w-full
                  items-center
                  gap-4
                  py-4
                  text-left
                  text-[9px]
                  uppercase
                  tracking-[0.25em]
                  text-lux-cream/60
                  transition-colors
                  hover:text-lux-gold
                  cursor-pointer
                "
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-4-4" />
                </svg>
                Search Fragrances
              </button>

              {/* Account */}
              <Link
                to={user ? "/account" : "/login"}
                onClick={closeMobileMenu}
                className="
                  flex
                  items-center
                  gap-4
                  py-4
                  text-[9px]
                  uppercase
                  tracking-[0.25em]
                  text-lux-cream/60
                  transition-colors
                  hover:text-lux-gold
                "
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c.8-4.2 3.4-6 8-6s7.2 1.8 8 6" />
                </svg>

                {user ? "My Account" : "Sign In"}
              </Link>

              {/* Orders */}
              {user && (
                <Link
                  to="/orders"
                  onClick={closeMobileMenu}
                  className="
                    flex
                    items-center
                    gap-4
                    py-4
                    text-[9px]
                    uppercase
                    tracking-[0.25em]
                    text-lux-cream/60
                    transition-colors
                    hover:text-lux-gold
                  "
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M6 3h12v18H6z" />
                    <path d="M9 7h6M9 11h6M9 15h4" />
                  </svg>
                  My Orders
                </Link>
              )}
            </div>
          </div>

          {/* =========================
              MENU FOOTER
          ========================== */}
          <div
            className="
              border-t
              border-lux-cream/10
              px-6
              py-6
            "
          >
            <p className="text-[7px] uppercase tracking-[0.35em] text-lux-cream/20">
              LUXÉE — Scent as Art
            </p>
          </div>
        </div>
      </aside>

      {/* =====================================================
          SEARCH OVERLAY
      ===================================================== */}
      <div
        className={`
          fixed
          inset-0
          z-[100]
          overflow-y-auto
          bg-lux-black/95
          backdrop-blur-md
          transition-all
          duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          ${
            isSearchOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-4 opacity-0"
          }
        `}
      >
        <div
          className={`
            mx-auto
            min-h-screen
            max-w-[1100px]
            px-6
            py-8
            sm:px-10
            lg:px-16
            transition-all
            duration-500
            ease-[cubic-bezier(0.22,1,0.36,1)]
            ${
              isSearchOpen
                ? "translate-y-0 opacity-100"
                : "-translate-y-3 opacity-0"
            }
          `}
        >
          {/* Search Header */}
          <div className="flex items-center justify-between">
            <Link
              to="/"
              onClick={closeSearch}
              className="
                font-display
                text-xl
                tracking-[0.2em]
                text-lux-cream
              "
            >
              LUXÉE
            </Link>

            <button
              type="button"
              aria-label="Close search"
              onClick={closeSearch}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                text-lux-cream/60
                transition-colors
                hover:text-lux-gold
                cursor-pointer
              "
            >
              <span className="text-2xl">×</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="mt-20 border-b border-lux-cream/20 pb-5">
            <div className="flex items-center gap-4">
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                className="shrink-0 text-lux-gold"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
              </svg>

              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search fragrances..."
                className="
                  w-full
                  bg-transparent
                  font-display
                  text-2xl
                  text-lux-cream
                  outline-none
                  placeholder:text-lux-cream/20
                  sm:text-4xl
                "
              />

              {isSearching && (
                <div
                  className="
                    h-4
                    w-4
                    shrink-0
                    animate-spin
                    rounded-full
                    border
                    border-lux-cream/20
                    border-t-lux-gold
                  "
                />
              )}
            </div>
          </div>

          {/* Search Results */}
          <div className="mt-10">
            {!searchQuery.trim() && (
              <div className="py-8">
                <p className="text-[9px] uppercase tracking-[0.3em] text-lux-cream/30">
                  Search the LUXÉE collection
                </p>
              </div>
            )}

            {searchQuery.trim() &&
              !isSearching &&
              searchResults.length === 0 && (
                <div className="py-16 text-center">
                  <p className="font-display text-2xl text-lux-cream/70">
                    No fragrances found.
                  </p>

                  <p className="mt-3 text-[9px] uppercase tracking-[0.25em] text-lux-cream/30">
                    Try another fragrance or category
                  </p>
                </div>
              )}

            {searchResults.length > 0 && (
              <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.slug}`}
                    onClick={closeSearch}
                    className="group"
                  >
                    {/* Product Image */}
                    <div className="aspect-[4/5] overflow-hidden bg-lux-dark">
                      <img
                        src={getProductImage(product.image_url)}
                        alt={product.name}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-700
                          ease-[cubic-bezier(0.22,1,0.36,1)]
                          group-hover:scale-[1.04]
                        "
                      />
                    </div>

                    {/* Product Info */}
                    <div className="pt-4">
                      <p className="font-display text-lg text-lux-cream transition-colors group-hover:text-lux-gold">
                        {product.name}
                      </p>

                      <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-lux-cream/35">
                        {product.category || product.type}
                      </p>

                      <p className="mt-2 text-[9px] tracking-[0.15em] text-lux-gold">
                        ${product.price}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          CART DRAWER
      ===================================================== */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

export default Navbar;
