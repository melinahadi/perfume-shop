import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { signUp } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    // Check passwords
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const data = await signUp({
        email: form.email,
        password: form.password,
      });

      console.log("Registration successful:", data);

      // =====================================================
      // Email confirmation is disabled in Supabase,
      // so a session should be created immediately.
      // =====================================================

      if (data?.session) {
        // User is already signed in
        navigate("/");
        return;
      }

      // =====================================================
      // If there is no session, Supabase is still requiring
      // email confirmation.
      // =====================================================

      setError(
        "Account created, but email confirmation is still required. Please check your Supabase Auth settings.",
      );
    } catch (error) {
      console.error("Registration error:", error);

      setError(error.message || "Unable to create your account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-lux-black px-6 text-lux-cream">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-[9px] uppercase tracking-[0.4em] text-lux-gold">
            Join LUXÉE
          </p>

          <h1 className="mt-5 font-display text-5xl">Create account.</h1>

          <p className="mt-5 text-sm font-light text-lux-cream/40">
            Create your account and begin your LUXÉE experience.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-7">
          {/* Email */}
          <div>
            <label className="mb-3 block text-[9px] uppercase tracking-[0.3em] text-lux-cream/40">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="
                w-full
                border-b
                border-lux-cream/20
                bg-transparent
                py-3
                text-sm
                outline-none
                transition-colors
                focus:border-lux-gold
              "
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-3 block text-[9px] uppercase tracking-[0.3em] text-lux-cream/40">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              autoComplete="new-password"
              className="
                w-full
                border-b
                border-lux-cream/20
                bg-transparent
                py-3
                text-sm
                outline-none
                transition-colors
                focus:border-lux-gold
              "
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-3 block text-[9px] uppercase tracking-[0.3em] text-lux-cream/40">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              minLength={6}
              autoComplete="new-password"
              className="
                w-full
                border-b
                border-lux-cream/20
                bg-transparent
                py-3
                text-sm
                outline-none
                transition-colors
                focus:border-lux-gold
              "
            />
          </div>

          {/* Error */}
          {error && <p className="text-xs leading-6 text-red-400">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="
              flex
              w-full
              items-center
              justify-center
              border
              border-lux-cream/25
              py-4
              text-[9px]
              uppercase
              tracking-[0.3em]
              transition-all
              duration-300
              hover:border-lux-gold
              hover:text-lux-gold
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Login */}
        <p className="mt-10 text-center text-xs text-lux-cream/40">
          Already have an account?{" "}
          <Link
            to="/login"
            className="
              text-lux-cream
              transition-colors
              hover:text-lux-gold
            "
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </main>
  );
}

export default Register;
