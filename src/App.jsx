import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Wishlist from "./pages/Wishlist";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import Story from "./pages/Story";
import Account from "./pages/Account";

import { WishlistProvider } from "./context/WishlistContext";

function App() {
  return (
    <BrowserRouter>
      <WishlistProvider>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/shop" element={<Shop />} />

          <Route path="/wishlist" element={<Wishlist />} />

          <Route path="/product/:slug" element={<ProductDetails />} />

          <Route path="/story" element={<Story />} />

          <Route path="/checkout" element={<Checkout />} />

          <Route path="/order-success" element={<OrderSuccess />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/orders" element={<Orders />} />

          <Route path="/account" element={<Account />} />
        </Routes>
      </WishlistProvider>
    </BrowserRouter>
  );
}

export default App;
