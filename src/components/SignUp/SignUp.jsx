import React from "react";
import { motion } from "framer-motion";

const SignUp = () => {
  const handleSignUp = (event) => {
    event.preventDefault();
    // Handle sign-up logic here
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
