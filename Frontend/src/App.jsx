import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/CartContext";
import LandingPage from "./pages/LandingPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetails from "./pages/ProductDeatilsPage";
import { ToastContainer } from "react-toastify";
import LoginForm from "./pages/Login";
import SignupPage from "./pages/Signup";
import "react-toastify/dist/ReactToastify.css";
import EcommerceAdminDashboard from "./pages/Admin/AddProducts";
export default function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/products" element={<ProductDetails />} />
          <Route path="/admin/" element={<EcommerceAdminDashboard />} />
        </Routes>
        {/* ✅ Toast Container must be outside Routes */}
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </CartProvider>
  );
}
