import React, { useState } from "react";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/))
      e.email = "Enter a valid email";
    if (form.password.length < 6)
      e.password = "Password must be at least 6 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    alert("Signed up successfully!");
    setForm({ name: "", email: "", password: "", confirm: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-50 p-4 sm:p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-10 border border-green-200">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-green-800">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className={`w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-400 transition ${
                errors.name ? "border-red-400" : "border-green-200"
              }`}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="Email"
              className={`w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-400 transition ${
                errors.email ? "border-red-400" : "border-green-200"
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-400 transition ${
                errors.password ? "border-red-400" : "border-green-200"
              }`}
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-green-600 font-medium"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              type="password"
              placeholder="Confirm Password"
              className={`w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-400 transition ${
                errors.confirm ? "border-red-400" : "border-green-200"
              }`}
            />
            {errors.confirm && (
              <p className="text-xs text-red-500 mt-1">{errors.confirm}</p>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="rounded border-green-300 accent-green-500"
            />
            <span>
              I agree to the <a className="text-green-600 underline">Terms</a>
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 font-bold transition-transform transform hover:scale-105"
          >
            Sign Up
          </button>
          <a href="/login">
            <p className="text-center text-sm text-green-700 mt-2">
              Already have an account? <a className="underline">Sign In</a>
            </p>
          </a>
        </form>
      </div>
    </div>
  );
}
