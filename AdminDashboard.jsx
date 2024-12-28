import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import axios from "axios"; // For API calls

const AdminDashboard = () => {
  const [theme, setTheme] = useState(localStorage.getItem("adminTheme") || "dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [vehicleCount, setVehicleCount] = useState(0); // State for vehicle count
  const [userCount, setUserCount] = useState(0); // State for user count
  const navigate = useNavigate();

  // Fetch counts from the backend
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const vehicleResponse = await axios.get("/api/vehicles/count");
        const userResponse = await axios.get("/api/users/count");
        setVehicleCount(vehicleResponse.data.count);
        setUserCount(userResponse.data.count);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

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
      className={`dashboard-layout ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen flex flex-col`}
    >
      <nav className={`flex items-center justify-between p-4 ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"} shadow-lg`}>
        <h1 className="text-3xl font-extrabold text-primary tracking-tight">
          Admin <span className="text-secondary">Dashboard</span>
        </h1>
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => navigate("/admin-dashboard")}
            className={`py-2 px-4 text-lg rounded-full transition-all duration-300 ${theme === "dark"
              ? "text-white bg-blue-600 hover:bg-blue-500"
              : "text-black bg-blue-400 hover:bg-blue-300"
              }`}
          >
            Home
          </button>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className={`py-2 px-6 text-lg rounded-full transition-all duration-300 ${theme === "dark"
                ? "text-white bg-blue-600 hover:bg-blue-500"
                : "text-black bg-blue-400 hover:bg-blue-300"
                } flex items-center gap-2`}
            >
              <span>Manage Vehicle</span>
              <span className={`text-lg ${dropdownOpen ? "rotate-180" : "rotate-0"} transition-all`}>▼</span>
            </button>
            {dropdownOpen && (
              <div className="absolute top-8 right-0 bg-white border border-gray-300 rounded shadow-md z-10">
                <div className="flex flex-col items-center space-y-2">
                  <button
                    onClick={() => navigate("/Admin/AddVehicle")}
                    className={`py-2 px-4 text-gray-700 hover:bg-gray-200 ${theme === "dark" ? "bg-blue-600 text-white" : "bg-blue-400 text-black"} rounded-md`}
                  >
                    Add Vehicle
                  </button>
                  <button
                    onClick={() => navigate("/Admin/ViewVehicle")}
                    className={`py-2 px-4 text-gray-700 hover:bg-gray-200 ${theme === "dark" ? "bg-blue-600 text-white" : "bg-blue-400 text-black"} rounded-md`}
                  >
                    View Vehicle
                  </button>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={() => navigate("/Admin/ManageUsers")}
            className={`py-2 px-4 text-lg rounded-full transition-all duration-300 ${theme === "dark"
              ? "text-white bg-blue-600 hover:bg-blue-500"
              : "text-black bg-blue-400 hover:bg-blue-300"
              }`}
          >
            Manage Users
          </button>
          <button
            onClick={() => navigate("/reports")}
            className={`py-2 px-4 text-lg rounded-full transition-all duration-300 ${theme === "dark"
              ? "text-white bg-blue-600 hover:bg-blue-500"
              : "text-black bg-blue-400 hover:bg-blue-300"
              }`}
          >
            Reports
          </button>
          {theme === "dark" ? (
            <BiSolidSun
              onClick={toggleTheme}
              className="text-2xl cursor-pointer transition-all duration-300 hover:text-gray-300"
              title="Switch to Light Mode"
            />
          ) : (
            <BiSolidMoon
              onClick={toggleTheme}
              className="text-2xl cursor-pointer transition-all duration-300 hover:text-gray-300"
              title="Switch to Dark Mode"
            />
          )}
          <button
            onClick={handleLogout}
            className={`px-4 py-2 rounded-full text-white ${theme === "dark" ? "bg-red-600 hover:bg-red-500" : "bg-red-400 hover:bg-red-300"
              }`}
          >
            Logout
          </button>
        </div>
        <div className="md:hidden">
          {menuOpen ? (
            <HiMenuAlt1 onClick={toggleMenu} className="text-3xl cursor-pointer" />
          ) : (
            <HiMenuAlt3 onClick={toggleMenu} className="text-3xl cursor-pointer" />
          )}
        </div>
      </nav>
      {menuOpen && (
        <div className={`flex flex-col p-4 ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"} md:hidden`}>
          <button onClick={() => navigate("/admin-dashboard")} className="py-2 text-lg">
            Home
          </button>
          <button onClick={() => navigate("/vehicle")} className="py-2 text-lg">
            Manage Vehicle
          </button>
          <button onClick={() => navigate("/Admin/ManageUsers")} className="py-2 text-lg">
            Manage Users
          </button>
          <button onClick={() => navigate("/reports")} className="py-2 text-lg">
            Reports
          </button>
          <div onClick={toggleTheme} className="flex items-center gap-2 py-2 cursor-pointer">
            {theme === "dark" ? (
              <BiSolidSun className="text-2xl" title="Switch to Light Mode" />
            ) : (
              <BiSolidMoon className="text-2xl" title="Switch to Dark Mode" />
            )}
          </div>
          <button
            onClick={handleLogout}
            className={`py-2 mt-2 rounded-full ${theme === "dark" ? "bg-red-600 hover:bg-red-500" : "bg-red-400 hover:bg-red-300"
              }`}
          >
            Logout
          </button>
        </div>
      )}
      <main className="p-6 flex-grow">
        <section className="hero bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-4xl font-extrabold mb-2">Welcome to the Admin Dashboard</h2>
          <p className="text-lg">Empowering you to manage and grow efficiently</p>
        </section>

        {/* Cards for Counts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className={`p-4 rounded shadow-md flex items-center gap-4 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-black"}`}
          >
            <div className="icon text-5xl text-primary">
              <i className="fas fa-car"></i>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Total Vehicles</h3>
              <p className="text-4xl font-bold mt-2">{vehicleCount}</p>
            </div>
          </div>
          <div
            className={`p-4 rounded shadow-md flex items-center gap-4 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-black"}`}
          >
            <div className="icon text-5xl text-green-500">
              <i className="fas fa-users"></i>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Total Users</h3>
              <p className="text-4xl font-bold mt-2">{userCount}</p>
            </div>
          </div>
        </div>

        {/* Additional Insights */}
        <section className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Trending Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className={`p-4 rounded shadow-md ${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-black"}`}
            >
              <h4 className="text-lg font-semibold">Vehicle Growth</h4>
              <div className="mt-2 h-2 bg-gray-300 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: "75%" }}></div>
              </div>
              <p className="text-sm mt-2">75% of vehicles listed this month</p>
            </div>
            <div
              className={`p-4 rounded shadow-md ${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-black"}`}
            >
              <h4 className="text-lg font-semibold">User Engagement</h4>
              <div className="mt-2 h-2 bg-gray-300 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: "85%" }}></div>
              </div>
              <p className="text-sm mt-2">85% active users this week</p>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer
        className={`p-4 text-center ${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-900"}`}
      >
        <p className="text-sm">&copy; {new Date().getFullYear()} Vehicle Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminDashboard;
