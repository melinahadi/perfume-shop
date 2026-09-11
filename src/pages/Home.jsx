import { useEffect } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Collections from "../components/Collections";
import BestSellers from "../components/BestSellers";
import BrandStory from "../components/BrandStory";
import About from "../components/About";
import Benefits from "../components/Benefits";
import Footer from "../components/Footer";

function Home() {
  useEffect(() => {
    const hash = window.location.hash;

    if (!hash) return;

    const id = hash.substring(1);

    const scrollToSection = () => {
      const element = document.getElementById(id);

      if (!element) return;

      const navbarHeight = 96;

      const top =
        element.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    };

    // اجازه می‌دهیم Home و تمام سکشن‌ها کامل Render شوند
    const timer = setTimeout(() => {
      requestAnimationFrame(scrollToSection);
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="bg-lux-black">
      <Navbar />

      <Hero />

      <Collections />

      <BestSellers />

      <BrandStory />

      <About />

      <Benefits />

      <Footer />

      {/* Back To Top */}
      <button
        type="button"
        aria-label="Back to top"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
        className="
    fixed
    bottom-6
    left-6
    z-50
    flex
    h-10
    w-10
    items-center
    justify-center
    border
    rounded-4xl
    border-lux-cream/20
    bg-lux-black/70
    text-lux-cream/70
    backdrop-blur-md
    transition-all
    duration-300
    hover:border-lux-gold
    hover:bg-lux-gold
    hover:text-lux-black
    cursor-pointer
    sm:bottom-8
    sm:left-8
  "
      >
        <span className="text-lg leading-none">↑</span>
      </button>
    </main>
  );
}

export default Home;
