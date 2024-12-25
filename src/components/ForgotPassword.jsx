import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // useNavigate for React Router v6

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // For showing response message
  const [errorMessage, setErrorMessage] = useState(""); // For showing error message
  const navigate = useNavigate(); // React Router hook for navigation

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    setMessage(""); // Reset the success message before attempting the reset
    setErrorMessage(""); // Reset the error message before attempting the reset

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/forgot-password", {
        email: email,
      });

      // Show success message if email is valid
      setMessage("A password reset link has been sent to your email.");

      // Redirect to the Sign In page after a short delay
      setTimeout(() => {
        navigate("/signin");
      }, 3000);
    } catch (error) {
      console.error("Error during password reset:", error.response?.data || error.message);
      setErrorMessage("Failed to send password reset link. Please try again.");
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
        <h2 className="text-2xl font-bold text-center text-black dark:text-white">
          Forgot Password
        </h2>

        {message && (
          <div className="text-green-600 text-center mb-4">{message}</div>
        )}

        {errorMessage && (
          <div className="text-red-600 text-center mb-4">{errorMessage}</div>
        )}

        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Enter your Email
            </label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-4 py-2 mt-1 border rounded-md bg-white text-black focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              placeholder="Enter your email"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none"
          >
            Reset Password
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Remember your password?{" "}
          <a href="/signin" className="text-indigo-600 hover:underline">
            Sign In
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
