"use client";
import { useState, useEffect } from "react";

export default function DeleteUser() {
  const [message, setMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("UserEmail");
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  const handleDelete = async () => {
    if (!userEmail) {
      setMessage("No user email found.");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail }),
      });

      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      console.error("Error deleting user:", error);
      setMessage("Failed to delete user");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6">
      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={handleDelete}
      >
        Delete Account
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
