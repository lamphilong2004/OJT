"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [status, setStatus] = useState("Checking...");

  useEffect(() => {
    const checkBackend = async () => {
      try {
        // Sử dụng localhost:5234 khi gọi từ trình duyệt
        const response = await axios.get("http://localhost:5234/health");
        if (response.data.status === "ok") {
          setStatus("Backend is connected!");
        } else {
          setStatus("Backend is connected but returned unexpected response.");
        }
      } catch (error) {
        console.error("Error connecting to backend:", error);
        setStatus("Failed to connect to backend.");
      }
    };

    checkBackend();
  }, []);

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">Welcome to Login System</h1>
        <p className="text-center text-gray-600">Please login to access your account</p>
        <div className="mt-4 flex justify-center">
          <a
            href="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </a>
        </div>
        <p className="text-center text-gray-600">Backend Status: {status}</p>
      </div>
    </div>
  );
}
