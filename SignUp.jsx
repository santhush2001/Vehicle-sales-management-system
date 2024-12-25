import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState(""); // To display success or error message

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      alert("All fields are required.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      });

      setMessage("User registered successfully! Welcome!");
      console.log(response.data);
    } catch (error) {
      console.error("Error during sign-up:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "Error during sign-up. Please try again.");
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
        <h2 className="text-2xl font-bold text-center text-black dark:text-white">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-1 border rounded-md bg-white text-black focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              placeholder="Enter your name"
              required
            />
          </div>
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-1 border rounded-md bg-white text-black focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              placeholder="Confirm your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none"
          >
            Sign Up
          </button>
        </form>
        {message && <p className="text-center text-sm text-gray-600 dark:text-gray-400">{message}</p>}
        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <a href="/signin" className="text-indigo-600 hover:underline">
            Sign In
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;
