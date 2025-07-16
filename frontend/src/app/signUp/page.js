"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import Next.js Router

function CreateUser() {
  const [hydrated, setHydrated] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const router = useRouter(); // Initialize the router

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null; // Prevents hydration mismatch
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials:"include"
        
      });
      const responseData = await response.json();
      setMessage(responseData.message);
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              name="email"
              defaultValue={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              name="password"
              defaultValue={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg shadow-lg font-semibold hover:from-purple-600 hover:to-blue-500 transition-all duration-300"
          >
            Sign Up
          </button>
        </form>
        {/* Message Display */}
        {message && (
          <p className="mt-4 text-center text-sm font-medium text-gray-700">
            {message}
          </p>
        )}
        {/* Login Button */}
        <div className="mt-4">
          <button
            onClick={() => router.push("/login")} // Navigate to the login page
            className="w-full py-3 border border-blue-500 text-blue-600 font-semibold rounded-lg shadow-sm hover:bg-blue-50 transition text-center"
          >
            Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateUser;
