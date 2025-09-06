import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("Logging in with:", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <div className="text-center mb-4">
          <h1 className="text-xl font-bold text-green-600">EcoShop</h1>
          <p className="text-sm text-gray-500">Login to your account</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-1.5 text-sm rounded-md hover:bg-green-700 transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="mt-3 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-green-600 hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
