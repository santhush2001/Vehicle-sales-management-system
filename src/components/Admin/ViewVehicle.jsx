import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi"; // Icons for responsive menu

const ViewVehicle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("adminTheme") || "dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [vehicles, setVehicles] = useState([]); // State to store all vehicles
  const navigate = useNavigate();

  // Fetch all vehicles from API
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/vehicles");
        if (response.ok) {
          const data = await response.json();
          setVehicles(data); // Set the vehicles data to state
        } else {
          alert("Failed to fetch vehicles");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred");
      }
    };

    fetchVehicles();
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    localStorage.setItem("adminTheme", theme === "dark" ? "light" : "dark");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("role");
    navigate("/signin");
  };

  if (vehicles.length === 0) {
    return <div>Loading...</div>; // Show loading message until the vehicles data is fetched
  }

  return (
    <div
      className={`dashboard-layout ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } min-h-screen`}
    >
      {/* Navigation Bar */}
      <nav
        className={`flex items-center justify-between p-4 ${
          theme === "dark" ? "bg-gray-800" : "bg-gray-200"
        }`}
      >
        <h1 className="text-3xl font-extrabold text-primary tracking-tight">
          Admin <span className="text-secondary">Dashboard</span>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => navigate("/admin-dashboard")}
            className={`${
              theme === "dark" ? "text-white hover:text-gray-300" : "text-black hover:text-gray-700"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => navigate("/Admin/AddVehicle")}
            className={`${
              theme === "dark" ? "text-white hover:text-gray-300" : "text-black hover:text-gray-700"
            }`}
          >
            Manage Vehicle
          </button>
          <button
            onClick={() => navigate("/manage-users")}
            className={`${
              theme === "dark" ? "text-white hover:text-gray-300" : "text-black hover:text-gray-700"
            }`}
          >
            Manage Users
          </button>
          <button
            onClick={() => navigate("/reports")}
            className={`${
              theme === "dark" ? "text-white hover:text-gray-300" : "text-black hover:text-gray-700"
            }`}
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
          className={`flex flex-col p-4 ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-100"
          } md:hidden`}
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
<main className="p-6">
  <h2 className="text-2xl font-semibold">View All Vehicles</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {vehicles.map((vehicle) => (
      <div key={vehicle.id} className="border p-4 rounded">
        <h3 className="text-xl font-semibold">{vehicle.make} {vehicle.model}</h3>
        <p><strong>Year:</strong> {vehicle.year}</p>
        <p><strong>Price:</strong> ${vehicle.price}</p>
        <p><strong>Mileage:</strong> {vehicle.mileage} miles</p>
        
        {/* Image display */}
        {vehicle.image && (
          <div className="mt-2">
            <img
              src={`http://127.0.0.1:8000/store/${vehicle.image}`}
              alt={`${vehicle.make} ${vehicle.model}`}
              className="w-full h-auto"
            />
          </div>
        )}

        <button
          onClick={() => navigate(`/vehicle/${vehicle.id}`)}
          className="mt-2 text-blue-500 hover:text-blue-700"
        >
          View Details
        </button>
      </div>
    ))}
  </div>
</main>

    </div>
  );
};

export default ViewVehicle;
