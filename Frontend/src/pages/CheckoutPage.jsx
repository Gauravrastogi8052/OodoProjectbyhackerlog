import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cartItems") || "[]");
  });
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // Totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + tax + shipping;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      if (paymentMethod === "cod") {
        // ✅ Clear cart
        setCartItems([]); // instead of undefined
        localStorage.removeItem("cartItems");

        // ✅ Success toast
        toast.success("🎉 Order placed successfully with Cash on Delivery!", {
          position: "top-right",
          autoClose: 3000,
        });

        // ✅ Redirect after 2s
        setTimeout(() => navigate("/"), 2000);
      } else {
        toast.info("Redirecting to online payment gateway...", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-green-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-green-800">Checkout</h1>
          <p className="text-green-600 mt-2">
            Enter your details and complete the order
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Shipping */}
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={userData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-green-300 rounded-lg"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={userData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-green-300 rounded-lg"
                  required
                />

                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={userData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-green-300 rounded-lg"
                  required
                />

                {/* Payment */}
                <h2 className="text-xl font-semibold text-green-800 mt-6">
                  Payment Method
                </h2>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                    />
                    <span>Cash on Delivery</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      value="online"
                      checked={paymentMethod === "online"}
                      onChange={() => setPaymentMethod("online")}
                    />
                    <span>Online Payment</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing || cartItems.length === 0}
                  className="w-full py-3 px-6 rounded-lg font-semibold bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 mt-6"
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </button>
              </form>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-green-800 mb-4">
                Order Summary
              </h2>

              {/* Cart items list */}
              <div className="space-y-3 mb-4">
                {cartItems.length > 0 ? (
                  cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border-b pb-2"
                    >
                      <div>
                        <p className="text-gray-800 font-medium">
                          {item.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.quantity} × ₹{item.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="font-semibold text-gray-800">
                        ₹{(item.quantity * item.price).toFixed(2)}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No items in cart</p>
                )}
              </div>

              {/* Subtotal, tax, shipping, total */}
              <div className="text-sm text-gray-700 space-y-1">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>₹{shipping.toFixed(2)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-bold text-green-800 text-lg">
                  <span>Total:</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
