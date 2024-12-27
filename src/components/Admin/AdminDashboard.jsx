import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi"; // Icons for responsive menu
import { FaCar, FaUsers, FaChartLine, FaExclamationCircle } from "react-icons/fa"; // For dashboard icons

const AdminDashboard = () => {
  const [theme, setTheme] = useState(localStorage.getItem("adminTheme") || "dark");
  const [menuOpen, setMenuOpen] = useState(false); // State for responsive menu
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown menu
  const navigate = useNavigate();

  // Update the theme in localStorage and apply the class
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    localStorage.setItem("adminTheme", theme === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("role");
    navigate("/signin");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div
      className={`dashboard-layout ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen`}
    >
      {/* Navigation Bar */}
      <nav className={`flex items-center justify-between p-4 ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}>
        {/* Logo */}
        <h1 className="text-3xl font-extrabold text-primary tracking-tight">
          Admin <span className="text-secondary">Dashboard</span>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => navigate("/admin-dashboard")}
            className={`${theme === "dark" ? "text-white hover:text-gray-300" : "text-black hover:text-gray-700"}`}
          >
            Home
          </button>

          {/* Manage Vehicle Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className={`${theme === "dark" ? "text-white hover:text-gray-300" : "text-black hover:text-gray-700"}`}
            >
              Manage Vehicle
            </button>
            {dropdownOpen && (
              <div className="absolute top-8 left-0 bg-white border border-gray-300 rounded shadow-md z-10">
                <button
                  onClick={() => navigate("/Admin/AddVehicle")}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                  Add Vehicle
                </button>
                <button
                  onClick={() => navigate("/Admin/ViewVehicle")}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                  View Vehicle
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => navigate("/manage-users")}
            className={`${theme === "dark" ? "text-white hover:text-gray-300" : "text-black hover:text-gray-700"}`}
          >
            Manage Users
          </button>
          <button
            onClick={() => navigate("/reports")}
            className={`${theme === "dark" ? "text-white hover:text-gray-300" : "text-black hover:text-gray-700"}`}
          >
            Reports
          </button>
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

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          {menuOpen ? (
            <HiMenuAlt1 onClick={toggleMenu} className="text-3xl cursor-pointer" />
          ) : (
            <HiMenuAlt3 onClick={toggleMenu} className="text-3xl cursor-pointer" />
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className={`flex flex-col p-4 ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"} md:hidden`}
        >
          <button
            onClick={() => navigate("/admin-dashboard")}
            className="py-2 text-lg"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/vehicle")}
            className="py-2 text-lg"
          >
            Manage Vehicle
          </button>
          <button
            onClick={() => navigate("/manage-users")}
            className="py-2 text-lg"
          >
            Manage Users
          </button>
          <button
            onClick={() => navigate("/reports")}
            className="py-2 text-lg"
          >
            Reports
          </button>
          <div
            onClick={toggleTheme}
            className="flex items-center gap-2 py-2 cursor-pointer"
          >
            {theme === "dark" ? (
              <BiSolidSun className="text-2xl" title="Switch to Light Mode" />
            ) : (
              <BiSolidMoon className="text-2xl" title="Switch to Dark Mode" />
            )}
          </div>
          <button
            onClick={handleLogout}
            className={`py-2 mt-2 rounded ${
              theme === "dark" ? "bg-red-600 hover:bg-red-500 text-white" : "bg-red-400 hover:bg-red-300 text-black"
            }`}
          >
            Logout
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="p-6">
        <h2 className="text-2xl font-semibold">Welcome to the Admin Dashboard</h2>

        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {/* Total Vehicles */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-4">
              <FaCar className="text-4xl text-blue-500" />
              <div>
                <h3 className="text-xl font-semibold">Total Vehicles</h3>
                <p className="text-gray-700 dark:text-gray-300">120</p>
              </div>
            </div>
          </div>

          {/* Total Users */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-4">
              <FaUsers className="text-4xl text-green-500" />
              <div>
                <h3 className="text-xl font-semibold">Total Users</h3>
                <p className="text-gray-700 dark:text-gray-300">500</p>
              </div>
            </div>
          </div>

          {/* Reports */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-4">
              <FaChartLine className="text-4xl text-yellow-500" />
              <div>
                <h3 className="text-xl font-semibold">Reports</h3>
                <p className="text-gray-700 dark:text-gray-300">View your reports</p>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="mt-6">
          <div className="bg-red-100 p-4 rounded-lg flex items-center gap-4">
            <FaExclamationCircle className="text-3xl text-red-500" />
            <div>
              <p className="text-lg font-semibold">System Alert</p>
              <p className="text-gray-700">There are pending vehicle updates that need your attention.</p>
            </div>
          </div>
        </div>
     {/* Recent Activity Section */}
     <div className="mt-8">
          <h3 className="text-xl font-semibold">Recent Activity</h3>
          <ul className="list-disc pl-5 mt-4 text-gray-900 dark:text-gray-100">
            <li>Vehicle ID 12345 added successfully.</li>
            <li>User John Doe updated their profile.</li>
            <li>Vehicle ID 67890 price updated.</li>
            <li>New user registration: Alice Smith.</li>
            <li>Vehicle ID 45678 deleted.</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
