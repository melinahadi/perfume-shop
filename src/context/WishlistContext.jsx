import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem("luxee-wishlist");

      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (error) {
      console.error("Failed to load wishlist:", error);
      return [];
    }
  });

  // Save wishlist whenever it changes
  useEffect(() => {
    localStorage.setItem("luxee-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Add / Remove wishlist
  const toggleWishlist = (product) => {
    setWishlist((current) => {
      const exists = current.some((item) => item.slug === product.slug);

      if (exists) {
        return current.filter((item) => item.slug !== product.slug);
      }

      return [...current, product];
    });
  };

  // Add only
  const addToWishlist = (product) => {
    setWishlist((current) => {
      const exists = current.some((item) => item.slug === product.slug);

      if (exists) {
        return current;
      }

      return [...current, product];
    });
  };

  // Remove
  const removeFromWishlist = (productSlug) => {
    setWishlist((current) =>
      current.filter((item) => item.slug !== productSlug),
    );
  };

  // Check wishlist
  const isInWishlist = (productSlug) => {
    return wishlist.some((item) => item.slug === productSlug);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }

  return context;
}
