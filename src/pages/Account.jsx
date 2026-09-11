import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Storynavbar from "../components/StoryNavbar";
import Footer from "../components/Footer";

import { useAuth } from "../context/AuthContext";
import { signOut } from "../services/authService";

function Account() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Redirect only AFTER Supabase finishes checking the session
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login", {
        replace: true,
        state: {
          from: "/account",
        },
      });
    }
  }, [loading, user, navigate]);

  // While authentication state is being checked
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-lux-black text-lux-cream">
        <div className="text-center">
          <div className="mx-auto mb-5 h-5 w-5 animate-spin rounded-full border border-lux-cream/20 border-t-lux-gold" />

          <p className="text-[9px] uppercase tracking-[0.3em] text-lux-cream/40">
            Loading Account
          </p>
        </div>
      </main>
    );
  }

  // If not authenticated, redirect is already being handled above
  if (!user) {
    return null;
  }

  async function handleSignOut() {
    try {
      setIsLoggingOut(true);

      await signOut();

      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggingOut(false);
    }
  }

  return (
    <main className="min-h-screen bg-lux-black text-lux-cream">
      <Storynavbar />

      {/* Header */}
      <section className="px-6 pb-16 pt-36 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-[9px] font-semibold uppercase tracking-[0.4em] text-lux-gold">
            Your Account
          </p>

          <h1 className="mt-5 font-display text-5xl leading-none sm:text-6xl lg:text-8xl">
            Welcome
            <br />
            <span className="italic">back.</span>
          </h1>

          <div className="mt-8 h-px w-12 bg-lux-gold/60" />
        </div>
      </section>

      {/* Account Content */}
      <section className="border-t border-lux-cream/10 px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-[1400px] gap-px bg-lux-cream/10 lg:grid-cols-3">
          {/* Account Information */}
          <div className="bg-lux-black p-8 sm:p-10">
            <p className="text-[8px] uppercase tracking-[0.35em] text-lux-gold">
              Account Information
            </p>

            <div className="mt-10">
              <p className="text-[8px] uppercase tracking-[0.25em] text-lux-cream/40">
                Email
              </p>

              <p className="mt-3 break-all text-sm text-lux-cream/80">
                {user.email}
              </p>
            </div>

            <div className="mt-8">
              <p className="text-[8px] uppercase tracking-[0.25em] text-lux-cream/40">
                Account ID
              </p>

              <p className="mt-3 break-all text-[10px] text-lux-cream/50">
                {user.id}
              </p>
            </div>

            <div className="mt-8">
              <p className="text-[8px] uppercase tracking-[0.25em] text-lux-cream/40">
                Member Since
              </p>

              <p className="mt-3 text-sm text-lux-cream/80">
                {new Date(user.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Orders */}
          <div className="bg-lux-black p-8 sm:p-10">
            <p className="text-[8px] uppercase tracking-[0.35em] text-lux-gold">
              Orders
            </p>

            <h2 className="mt-6 font-display text-3xl sm:text-4xl">
              Your purchases.
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-7 text-lux-cream/40">
              View your previous orders, track their status, and see the
              fragrances you've chosen.
            </p>

            <Link
              to="/orders"
              className="
                group
                mt-8
                inline-flex
                items-center
                gap-4
                border-b
                border-lux-cream/30
                pb-2
                text-[8px]
                uppercase
                tracking-[0.3em]
                text-lux-cream/80
                transition-all
                duration-300
                hover:border-lux-gold
                hover:text-lux-gold
              "
            >
              View My Orders
              <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          {/* Account Actions */}
          <div className="bg-lux-black p-8 sm:p-10">
            <p className="text-[8px] uppercase tracking-[0.35em] text-lux-gold">
              Account
            </p>

            <h2 className="mt-6 font-display text-3xl sm:text-4xl">
              Manage your account.
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-7 text-lux-cream/40">
              Your LUXÉE account keeps your orders and shopping experience
              connected in one place.
            </p>

            <button
              type="button"
              onClick={handleSignOut}
              disabled={isLoggingOut}
              className="
                mt-8
                border
                border-lux-cream/20
                px-6
                py-3
                text-[8px]
                uppercase
                tracking-[0.3em]
                text-lux-cream/70
                transition-all
                duration-300
                hover:border-lux-gold
                hover:bg-lux-gold
                hover:text-lux-black
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              {isLoggingOut ? "Signing Out..." : "Sign Out"}
            </button>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 py-24 text-center sm:py-32">
        <p className="text-[8px] uppercase tracking-[0.4em] text-lux-gold">
          Continue Exploring
        </p>

        <h2 className="mx-auto mt-5 max-w-2xl font-display text-4xl sm:text-5xl lg:text-6xl">
          Discover your next
          <span className="italic"> signature scent.</span>
        </h2>

        <Link
          to="/shop"
          className="
            group
            mt-8
            inline-flex
            items-center
            gap-5
            border
            border-lux-gold/60
            px-7
            py-4
            text-[9px]
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
          Explore Collection
          <span className="text-base transition-transform duration-500 group-hover:translate-x-2">
            →
          </span>
        </Link>
      </section>

      <Footer />
    </main>
  );
}

export default Account;
