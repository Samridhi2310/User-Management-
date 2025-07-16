"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

function LoginUser() {
    const [hydrated, setHydrated] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const router = useRouter();
    useEffect(() => {
        setHydrated(true);
    }, []);

    if (!hydrated) {
        return null;
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
        setError("");
        setMessage("");

        if (!formData.email || !formData.password) {
            setError("Email and password are required.");
            return;
        }

        setLoading(true);
        try {
            

            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password, // Sending hashed password
                }),
                credentials:"include"
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || "Login failed");
            }

            // Store JWT Token correctly
            localStorage.setItem("jwtToken", responseData.token);
            setMessage("Login successful!");

            // Redirect to user details page after successful login
            router.push("/login/userDetail");
        } catch (error) {
            setError(error.message || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
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
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            type="password"
                            placeholder="Enter your password"
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg shadow-lg font-semibold hover:from-purple-600 hover:to-blue-500 transition-all duration-300 disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                {/* Error Display */}
                {error && <p className="mt-4 text-center text-sm font-medium text-red-600">{error}</p>}
                {/* Success Message */}
                {message && <p className="mt-4 text-center text-sm font-medium text-green-600">{message}</p>}
            </div>
        </div>
    );
}

export default LoginUser;
