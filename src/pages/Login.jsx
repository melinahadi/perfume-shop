import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { signIn } from "../services/authService";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  // Where the user wanted to go before being redirected to login
  const from = location.state?.from || "/";

  const [form, setForm] = useState({
    email: "",
    password: "",
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
    setLoading(true);

    try {
      await signIn(form);

      // Return to the page the user originally wanted
      navigate(from, {
        replace: true,
      });
    } catch (error) {
      console.error("Login error:", error);

      setError(error.message || "Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-lux-black px-6 text-lux-cream">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="mb-12 text-center">
          <p className="text-[9px] uppercase tracking-[0.4em] text-lux-gold">
            Welcome Back
          </p>

          <h1 className="mt-5 font-display text-5xl">Sign in.</h1>

          <p className="mt-5 text-sm font-light text-lux-cream/40">
            Enter your details to access your LUXÉE account.
          </p>
        </div>

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
              autoComplete="current-password"
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

          {error && <p className="text-xs leading-6 text-red-400">{error}</p>}

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
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="mt-10 text-center text-xs text-lux-cream/40">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-lux-cream transition-colors hover:text-lux-gold"
          >
            Create one
          </Link>
        </p>
      </motion.div>
    </main>
  );
}

export default Login;
