import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";

const API_URL = "http://localhost:5000/api/admin/products"; // backend URL
// backend URL

const LandingPage = () => {
  // Static product data
  const featuredProducts = [
    {
      id: 1,
      title: "Premium Wireless Headphones",
      price: 199.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    },
    {
      id: 2,
      title: "Smart Watch Series 5",
      price: 249.99,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    },
    {
      id: 3,
      title: "Wireless Charging Pad",
      price: 39.99,
      image:
        "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=500&h=500&fit=crop",
    },
    {
      id: 4,
      title: "Ergonomic Office Chair",
      price: 299.99,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop",
    },
    {
      id: 5,
      title: "Portable Bluetooth Speaker",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
    },
    {
      id: 6,
      title: "Stainless Steel Water Bottle",
      price: 24.99,
      image:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop",
    },
    {
      id: 7,
      title: "Stainless Steel Water Bottle",
      price: 24.99,
      image:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop",
    },
    {
      id: 8,
      title: "Stainless Steel Water Bottle",
      price: 24.99,
      image:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop",
    },
  ];

  const [products, setProducts] = useState([]);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProducts(data.products || []); // <- extract the products array
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const [cartCount, setCartCount] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationProduct, setNotificationProduct] = useState(null);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      const cartItems = JSON.parse(savedCart);
      const totalCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      setCartCount(totalCount);
    }
  }, []);

  // Function to add product to cart
  const addToCart = (product) => {
    // Get existing cart from localStorage
    const savedCart = localStorage.getItem("cartItems");
    let cartItems = savedCart ? JSON.parse(savedCart) : [];

    // Check if product already exists in cart
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex >= 0) {
      // If product exists, increase quantity
      cartItems[existingItemIndex].quantity += 1;
    } else {
      // If product doesn't exist, add it with quantity 1
      cartItems.push({ ...product, quantity: 1 });
    }

    // Save updated cart to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Update cart count
    const totalCount = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartCount(totalCount);

    // Show notification
    setNotificationProduct(product);
    setShowNotification(true);

    // Hide notification after 2 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer />
      {/* Cart Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fadeInOut flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          {notificationProduct?.title} added to cart!
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-green-700 flex items-center">
            <svg
              className="w-8 h-8 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            EcoShop
          </div>
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-6">
              <a
                href="#"
                className="text-gray-600 hover:text-green-700 transition-colors"
              >
                Home
              </a>
              <a
                href="/products"
                className="text-gray-600 hover:text-green-700 transition-colors"
              >
                Products
              </a>
              <a
                href="/cart"
                className="text-gray-600 hover:text-green-700 transition-colors"
              >
                Cart
              </a>
            </nav>
            <div className="relative">
              <a href="/cart">
                <button className="p-2 rounded-full hover:bg-green-100 transition-colors">
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                      {cartCount}
                    </span>
                  )}
                </button>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero/Banner Section */}
        <section className="relative bg-gradient-to-r from-green-500 to-green-700 text-white py-20 md:py-28">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeIn">
              Summer Collection 2023
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Discover our eco-friendly products designed for modern living
            </p>
            <button className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105 shadow-lg">
              Shop Now
            </button>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Carefully selected items that combine quality, sustainability, and
              style
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <div className="h-56 overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {product.productName}
                  </h3>
                  <p className="text-xl font-bold text-green-600 mb-4">
                    ₹{product.productPrice}
                  </p>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 flex items-center justify-center"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-green-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Join Our Newsletter
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Subscribe to get exclusive offers and updates on new products
            </p>
            <div className="max-w-md mx-auto flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-l-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="bg-green-600 text-white px-6 py-3 rounded-r-lg font-semibold hover:bg-green-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">EcoShop</h3>
              <p className="text-gray-400">
                Sustainable products for everyday life
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    All Products
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Best Sellers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Sale
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Press
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Sustainability
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Shipping & Returns
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 EcoShop. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          20% {
            opacity: 1;
            transform: translateY(0);
          }
          80% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(20px);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
        .animate-fadeInOut {
          animation: fadeInOut 2s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
