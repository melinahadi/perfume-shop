import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "luxee-cart";

function getStoredCart() {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);

    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error("Failed to load cart:", error);

    return [];
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(getStoredCart);

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  // Listen for cart changes from other browser tabs
  useEffect(() => {
    function handleStorageChange(event) {
      if (event.key !== CART_STORAGE_KEY) {
        return;
      }

      try {
        const updatedCart = event.newValue ? JSON.parse(event.newValue) : [];

        setCartItems(updatedCart);
      } catch (error) {
        console.error("Failed to sync cart between tabs:", error);
      }
    }

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Add product to cart
  function addToCart(product) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...currentItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  }

  // Remove product completely
  function removeFromCart(productId) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    );
  }

  // Increase quantity
  function increaseQuantity(productId) {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  }

  // Decrease quantity
  function decreaseQuantity(productId) {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  // Clear cart
  function clearCart() {
    setCartItems([]);
  }

  // Total quantity
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Total price
  const cartTotal = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0,
  );

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
