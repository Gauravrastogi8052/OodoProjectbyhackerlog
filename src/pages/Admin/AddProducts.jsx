// App.jsx
import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/api/admin/products"; // backend URL

export default function App() {
  const [activePage, setActivePage] = useState("all");
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    productName: "",
    productPrice: "",
    description: "",
    category: "",
  });
  const [editProduct, setEditProduct] = useState(null);

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

  // Add product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      const data = await res.json();
      setProducts([...products, data]); // data = newly added product
      setNewProduct({
        productName: "",
        productPrice: "",
        description: "",
        category: "",
      });
      alert("✅ Product added successfully!");
      setActivePage("all");
    } catch (err) {
      console.error(err);
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setEditProduct(product);
    setActivePage("edit");
  };

  // Save edited product
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/${editProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editProduct),
      });
      const data = await res.json();
      setProducts(products.map((p) => (p.id === data.id ? data : p)));
      setEditProduct(null);
      setActivePage("all");
      alert("✅ Product updated successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        setProducts(products.filter((p) => p.id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-green-700 text-white p-6 flex flex-col space-y-4">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <button
          className={`text-left px-4 py-2 rounded ${
            activePage === "all" ? "bg-green-900" : "hover:bg-green-800"
          }`}
          onClick={() => setActivePage("all")}
        >
          All Products
        </button>
        <button
          className={`text-left px-4 py-2 rounded ${
            activePage === "add" ? "bg-green-900" : "hover:bg-green-800"
          }`}
          onClick={() => setActivePage("add")}
        >
          Add New Product
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* All Products Table */}
        {activePage === "all" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">All Products</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <thead className="bg-green-700 text-white">
                  <tr>
                    <th className="py-2 px-4">ID</th>
                    <th className="py-2 px-4">Title</th>
                    <th className="py-2 px-4">Price</th>
                    <th className="py-2 px-4">Category</th>
                    <th className="py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(products) && products.length > 0 ? (
                    products.map((product) => (
                      <tr key={product.id} className="text-center border-b">
                        <td className="py-2 px-4">{product.id}</td>
                        <td className="py-2 px-4">{product.productName}</td>
                        <td className="py-2 px-4">₹{product.productPrice}</td>
                        <td className="py-2 px-4">{product.category}</td>
                        <td className="py-2 px-4 space-x-2">
                          <button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded"
                            onClick={() => handleEdit(product)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                            onClick={() => handleDelete(product.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-4">
                        No products found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add Product */}
        {activePage === "add" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
            <form
              onSubmit={handleAddProduct}
              className="space-y-4 max-w-lg bg-white p-6 rounded-lg shadow-lg"
            >
              {["productName", "productPrice", "description", "category"].map(
                (field) => (
                  <div key={field}>
                    <label className="block mb-1 font-medium">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      type={field === "productPrice" ? "number" : "text"}
                      value={newProduct[field]}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          [field]:
                            field === "productPrice"
                              ? parseFloat(e.target.value)
                              : e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
                      required
                    />
                  </div>
                )
              )}
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Add Product
              </button>
            </form>
          </div>
        )}

        {/* Edit Product */}
        {activePage === "edit" && editProduct && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
            <form
              onSubmit={handleSaveEdit}
              className="space-y-4 max-w-lg bg-white p-6 rounded-lg shadow-lg"
            >
              {["productName", "productPrice", "description", "category"].map(
                (field) => (
                  <div key={field}>
                    <label className="block mb-1 font-medium">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      type={field === "productPrice" ? "number" : "text"}
                      value={editProduct[field]}
                      onChange={(e) =>
                        setEditProduct({
                          ...editProduct,
                          [field]:
                            field === "productPrice"
                              ? parseFloat(e.target.value)
                              : e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
                      required
                    />
                  </div>
                )
              )}
              <div className="space-x-2">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={() => setActivePage("all")}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
