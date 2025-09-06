import React, { useState } from "react";

const ProductDetails = () => {
  // Static product data
  const product = {
    id: 1,
    title: "Premium Wireless Headphones",
    description:
      "Experience crystal-clear audio with our premium wireless headphones. Featuring noise cancellation, 30-hour battery life, and comfortable over-ear design. Perfect for music lovers and professionals alike.",
    price: 199.99,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop",
    ],
  };

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [cartCount, setCartCount] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setCartCount(cartCount + quantity);
    setIsAddedToCart(true);

    // Reset animation after 2 seconds
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 2000);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-green-800 flex items-center">
            <svg
              className="w-8 h-8 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            EcoShop
          </div>
          <div className="relative">
            <a href="/cart">
              <button className="p-2 rounded-full hover:bg-green-100 transition-colors duration-300">
                <svg
                  className="w-6 h-6 text-green-700"
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
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
          <div className="flex flex-col md:flex-row">
            {/* Product Images - Left side on desktop, top on mobile */}
            <div className="md:w-1/2 p-6">
              <div className="aspect-square mb-4 overflow-hidden rounded-xl shadow-md transition-transform duration-500 hover:scale-105">
                <img
                  src={selectedImage}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-3 mt-6">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 transform hover:scale-110 ${
                      selectedImage === image
                        ? "border-green-500 ring-2 ring-green-200"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details - Right side on desktop, bottom on mobile */}
            <div className="md:w-1/2 p-6 md:border-l md:border-green-100">
              <h1 className="text-3xl font-bold text-green-900 mb-4 animate-fadeIn">
                {product.title}
              </h1>

              <div className="mb-6">
                <span className="text-2xl font-bold text-green-600">
                  ${product.price}
                </span>
                <span className="ml-3 text-green-600 text-sm font-medium bg-green-100 py-1 px-2 rounded-full">
                  In Stock
                </span>
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-semibold text-green-800 mb-3">
                  Description
                </h2>
                <p className="text-green-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-green-800 font-medium">Quantity:</span>
                  <div className="flex items-center border border-green-300 rounded-lg overflow-hidden">
                    <button
                      onClick={decreaseQuantity}
                      className="px-3 py-2 text-green-700 hover:bg-green-100 transition-colors duration-200"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 bg-green-50 text-green-800">
                      {quantity}
                    </span>
                    <button
                      onClick={increaseQuantity}
                      className="px-3 py-2 text-green-700 hover:bg-green-100 transition-colors duration-200"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg ${
                    isAddedToCart
                      ? "bg-green-700 text-white"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  {isAddedToCart ? (
                    <span className="flex items-center justify-center">
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
                      Added to Cart!
                    </span>
                  ) : (
                    "Add to Cart"
                  )}
                </button>

                <button className="w-full border border-green-300 text-green-700 py-3 px-6 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-300 flex items-center justify-center">
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  Add to Wishlist
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-green-100">
                <div className="flex items-center text-sm text-green-700 mb-3">
                  <svg
                    className="w-5 h-5 mr-2 text-green-500"
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
                  Free shipping on orders over $50
                </div>
                <div className="flex items-center text-sm text-green-700 mb-3">
                  <svg
                    className="w-5 h-5 mr-2 text-green-500"
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
                  30-day money-back guarantee
                </div>
                <div className="flex items-center text-sm text-green-700">
                  <svg
                    className="w-5 h-5 mr-2 text-green-500"
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
                  Eco-friendly packaging
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProductDetails;
