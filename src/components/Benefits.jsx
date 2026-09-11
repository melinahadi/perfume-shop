import { motion } from "motion/react";

const benefits = [
  {
    number: "01",
    title: "Free Shipping",
    description: "On all orders over $150",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <path d="M7 14h22v22H7z" />
        <path d="M29 21h7l5 6v9H29z" />
        <circle cx="15" cy="37" r="3" />
        <circle cx="35" cy="37" r="3" />
        <path d="M29 27h12" />
      </svg>
    ),
  },

  {
    number: "02",
    title: "Exclusive Samples",
    description: "Two complimentary samples",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <path d="M24 8c-3 7-9 11-9 18a9 9 0 0 0 18 0c0-7-6-11-9-18Z" />
        <path d="M20 31c1.5 2 3.5 3 6 3" />
      </svg>
    ),
  },

  {
    number: "03",
    title: "Easy Returns",
    description: "30 days hassle-free returns",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <circle cx="24" cy="24" r="16" />
        <path d="M17 25a8 8 0 0 0 14 5" />
        <path d="M31 30v-7" />
        <path d="M31 30h-7" />
      </svg>
    ),
  },

  {
    number: "04",
    title: "Secure Payments",
    description: "Encrypted & safe checkout",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <rect x="9" y="17" width="30" height="23" rx="2" />
        <path d="M15 17v-5a9 9 0 0 1 18 0v5" />
        <circle cx="24" cy="28" r="2" />
        <path d="M24 30v5" />
      </svg>
    ),
  },
];

function Benefits() {
  return (
    <section
      id="benefits"
      className="border-y border-lux-cream/10 bg-lux-black text-lux-cream my-0"
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.7,
              delay: index * 0.1,
            }}
            className={`
              group
              relative
              flex
              min-h-[190px]
              flex-col
              items-center
              justify-center
              px-5
              py-10
              text-center
              transition-colors
              duration-500
              hover:bg-lux-cream/[0.02]

              ${index % 2 !== 0 ? "border-l border-lux-cream/10" : ""}
              ${index >= 2 ? "border-t border-lux-cream/10 lg:border-t-0" : ""}
              ${index !== 0 ? "lg:border-l" : ""}
            `}
          >
            {/* Icon */}
            <div
              className="
                mb-5
                h-10
                w-10
                text-lux-gold/80
                transition-all
                duration-500
                group-hover:scale-110
                group-hover:text-lux-gold
              "
            >
              {benefit.icon}
            </div>

            {/* Title */}
            <h3 className="text-[9px] font-medium uppercase tracking-[0.25em] text-lux-cream">
              {benefit.title}
            </h3>

            {/* Description */}
            <p className="mt-2 text-[9px] font-light tracking-wide text-lux-cream/40">
              {benefit.description}
            </p>

            {/* Number */}
            <span className="absolute right-4 top-4 text-[7px] tracking-[0.2em] text-lux-cream/15">
              {benefit.number}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Benefits;
