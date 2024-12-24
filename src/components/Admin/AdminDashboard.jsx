import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi"; // Icons for responsive menu

const AdminDashboard = () => {
  const [theme, setTheme] = useState(localStorage.getItem("adminTheme") || "dark");
  const [menuOpen, setMenuOpen] = useState(false); // State for responsive menu
  const navigate = useNavigate();

  // Update the theme in localStorage and apply the class
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const handleLogout = () => {
    // Clear token and role from localStorage
    localStorage.removeItem("auth_token");
    localStorage.removeItem("role");

    // Redirect to the login page
    navigate("/signin");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div
      className={`dashboard-layout ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } min-h-screen`}
    >
      <header
        className={`p-4 ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"} flex justify-between items-center`}
      >
        {/* Logo */}
        <h1 className="text-3xl font-extrabold text-primary font-sans tracking-tight">
          Admin <span className="text-secondary">Dashboard</span>
        </h1>

        <div className="flex items-center gap-4">
          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            {menuOpen ? (
              <HiMenuAlt1 onClick={toggleMenu} className="text-3xl cursor-pointer" />
            ) : (
              <HiMenuAlt3 onClick={toggleMenu} className="text-3xl cursor-pointer" />
            )}
          </div>

          {/* Theme Toggle and Logout for Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {theme === "dark" ? (
              <BiSolidSun
                onClick={toggleTheme}
                className="text-2xl cursor-pointer"
                title="Switch to Light Mode"
              />
            ) : (
              <BiSolidMoon
                onClick={toggleTheme}
                className="text-2xl cursor-pointer"
                title="Switch to Dark Mode"
              />
            )}
            <button
              onClick={handleLogout}
              className={`px-4 py-2 rounded ${
                theme === "dark" ? "bg-red-600 hover:bg-red-500 text-white" : "bg-red-400 hover:bg-red-300 text-black"
              }`}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Responsive Menu */}
      {menuOpen && (
        <div
          className={`p-4 ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"} md:hidden flex flex-col items-start gap-4`}
        >
          <div
            onClick={toggleTheme}
            className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded"
          >
            {theme === "dark" ? (
              <BiSolidSun className={`text-2xl ${theme === "dark" ? "text-white" : "text-black"}`} title="Switch to Light Mode" />
            ) : (
              <BiSolidMoon className={`text-2xl ${theme === "dark" ? "text-white" : "text-black"}`} title="Switch to Dark Mode" />
            )}
            <span className={`${theme === "dark" ? "text-white" : "text-black"}`}>
              Toggle Theme
            </span>
          </div>
          <button
            onClick={handleLogout}
            className={`px-4 py-2 rounded ${
              theme === "dark" ? "bg-red-600 hover:bg-red-500 text-white" : "bg-red-400 hover:bg-red-300 text-black"
            }`}
          >
            Logout
          </button>
        </div>
      )}

      <main className="p-6">
        {/* Admin Dashboard Content */}
        <h2 className="text-2xl font-semibold">Welcome to the Admin Dashboard</h2>
        <button
          onClick={() => navigate("/manage-cars")}
          className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400"
        >
          Manage Cars
        </button>
      </main>
    </div>
  );
};

export default AdminDashboard;
