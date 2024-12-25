import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // useNavigate for React Router v6

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // For showing error message
  const navigate = useNavigate(); // React Router hook for navigation

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    setErrorMessage(""); // Reset the error message before attempting to sign in

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email: formData.email,
        password: formData.password,
      });

      // Save token and role to localStorage
      localStorage.setItem("auth_token", response.data.token);
      localStorage.setItem("role", response.data.role);  // Save role to localStorage

      // Redirect to the appropriate dashboard based on the user's role
      if (response.data.role === "admin") {
        navigate("/admin-dashboard");  // Admin dashboard route
      } else {
        navigate("/user-dashboard");  // User dashboard route
      }

    } catch (error) {
      // Handle error and show error message
      console.error("Error during sign-in:", error.response?.data || error.message);
      setErrorMessage("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-black">
      <motion.div
        className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg dark:bg-gray-900"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center text-black dark:text-white">Sign In</h2>

        {errorMessage && (
          <div className="text-red-600 text-center mb-4">{errorMessage}</div>
        )}

        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-1 border rounded-md bg-white text-black focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-1 border rounded-md bg-white text-black focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <a href="/signup" className="text-indigo-600 hover:underline">
            Sign Up
          </a>
        </p>

        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-2">
          <a href="/forgot-password" className="text-indigo-600 hover:underline">
            Forgot Password?
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default SignIn;
