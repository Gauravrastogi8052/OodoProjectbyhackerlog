import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/CartContext";
import LandingPage from "./pages/LandingPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetails from "./pages/ProductDeatilsPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EcommerceAdminDashboard from "./pages/Admin/AddProducts";
export default function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/admin/" element={<EcommerceAdminDashboard />} />
        </Routes>
        {/* ✅ Toast Container must be outside Routes */}
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </CartProvider>
  );
}
