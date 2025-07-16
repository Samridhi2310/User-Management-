"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState(""); 
  const router = useRouter();
  useEffect(()=>{
    handleFetchDetails()
  },[])

  const handleFetchDetails = async () => {
    const token = localStorage.getItem("jwtToken");
    
    if (!token) {
      setMessage("You need to log in first.");
      return;
    }

    try {
      // Step 1: Verify Token
      const verifyToken = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-token`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        credentials:"include"
      });

      if (!verifyToken.ok) {
        setMessage("Invalid or expired token. Please log in again.");
        return;
      }

      console.log("Token Verified!");
      

      // Step 2: Fetch User Details
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/userDetail/`, {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
    

      if (!response.ok) throw new Error("Failed to fetch user details");

      const result = await response.json();
      console.log(result)
      setUserData(result);
  
      
    } catch (error) {
      console.error("Error fetching user details:", error);
      setMessage("Error fetching user details.");
    }
  };

  const handleUpdate =  () => {
  router.push(`/login/userDetail/update?userId=${userData?._id}`)
  }
    
  const handleDelete = async () => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      setMessage("You need to log in first.");
      return;
    }
    try {
      console.log(userData)
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/delete/${userData?._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setMessage("User deleted successfully!");
      localStorage.removeItem("jwtToken"); // Logout after deletion
      router.push("/login"); // Redirect to login page
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };
const handleLogOut=async ()=>{
  const data= await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`,{method:"POST",credentials:"include"}).then((res) => res.json())
  .then((data) => {
      localStorage.removeItem("jwtToken")
    
      console.log(data.message); // "Logged out successfully"
      router.push("/login")
      // Redirect or update UI after logout
  })
  .catch((err) => console.error("Logout failed", err));
  

}
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md p-4 border border-gray-300 rounded-lg shadow-md bg-white text-center">
        <h2 className="text-xl font-semibold text-gray-700">User Details</h2>

        {userData ? (
          <ul className="text-left mt-4">
            {Array.isArray(userData) ? (
              userData.map((user, index) => (
                <li key={index} className="border-b py-2">
                  <strong>Email:</strong> {user.Email}
                </li>
              ))
            ) : (
              <li className="border-b py-2">
                <strong>Email:</strong> {userData.Email}
              </li>
            )}
          </ul>
        ) : (
          <p className="text-gray-500">Click the button to fetch user details.</p>
        )}
      </div>

      <button
        type="button"
        className="mt-6 w-full max-w-md bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg shadow-lg font-semibold hover:from-purple-600 hover:to-blue-500 transition-all duration-300"
        onClick={handleFetchDetails}
      >
        Fetch User Details
      </button>

      {/* Update & Delete Buttons */}
      <div className="mt-6 flex gap-4">
        <button 
          className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-2 rounded-lg shadow-md font-semibold hover:from-teal-600 hover:to-green-500 transition-all duration-300"
          onClick={handleUpdate}
        >
          Update
        </button>
        <button
          className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-2 rounded-lg shadow-md font-semibold hover:from-pink-600 hover:to-red-500 transition-all duration-300"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
      <div className="mt-6 flex gap-4">
        <button 
          className="bg-gradient-to-r from-blue-500 to-teal-600 text-white px-6 py-2 rounded-lg shadow-md font-semibold hover:from-teal-600 hover:to-blue-500 transition-all duration-300"
          onClick={handleLogOut}
        >
          Logout
        </button>
        </div>

      {/* Message Display */}
      {message && (
        <p className="mt-4 text-lg font-semibold text-gray-700">{message}</p>
      )}
    </div>
  );
}
