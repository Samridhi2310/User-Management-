"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function UpdateUser() {
  const [hydrated, setHydrated] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [userData,setUserData]=useState(null)
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setHydrated(true);
    
    const fetchUserData = async () => {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        setMessage("⚠️ You need to log in first.");
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/userDetail`, {
          method: "GET",
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch user details.");

        const Data = await response.json();
        setUserData(Data)
        setFormData({ email: Data.Email || "", password: Data.Password || "" });
        console.log(formData)

      } catch (error) {
        setMessage(`❌ ${error.message}`);
      }
    };

    fetchUserData();
  }, []);

  if (!hydrated) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setMessage("⚠️ You need to log in first.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/update?userId=${userData?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        if (response.status === 400) throw new Error("Invalid email format.");
        if (response.status === 401) throw new Error("Unauthorized. Please log in again.");
        if (response.status === 404) throw new Error("User not found.");
        throw new Error(data.message || "Failed to update user.");
      }

      setMessage("✅ User updated successfully!");
      localStorage.setItem("jwtToken", data.token);
      router.push("/login/userDetail");

    } catch (error) {
      setMessage(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Update Details
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          {/* Password Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="Enter your new password"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-3 rounded-lg shadow-lg font-semibold transition-all duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500"
            }`}
          >
            {loading ? "Updating..." : "UPDATE"}
          </button>
        </form>
        {/* Message Display */}
        {message && (
          <p className="mt-4 text-center text-sm font-medium text-gray-700">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default UpdateUser;
