import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";

const ViewVehicle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("adminTheme") || "dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/vehicles");
        if (response.ok) {
          const data = await response.json();
          setVehicles(data);
        } else {
          alert("Failed to fetch vehicles");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while fetching vehicles");
      }
    };
    fetchVehicles();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("adminTheme", newTheme);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("role");
    navigate("/signin");
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const filteredVehicles = selectedFilter === "All"
    ? vehicles
    : vehicles.filter((vehicle) => vehicle.make === selectedFilter);

  if (vehicles.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`dashboard-layout ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen`}>
      <nav className={`flex items-center justify-between p-4 ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"} shadow-lg`}>
        <h1 className="text-3xl font-extrabold text-primary tracking-tight">
          Admin <span className="text-secondary">Dashboard</span>
        </h1>
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => navigate("/admin-dashboard")} className={`py-2 px-4 text-lg rounded-full transition-all duration-300 ${theme === "dark" ? "text-white bg-blue-600 hover:bg-blue-500" : "text-black bg-blue-400 hover:bg-blue-300"}`}>Home</button>
          <div className="relative">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className={`py-2 px-6 text-lg rounded-full transition-all duration-300 ${theme === "dark" ? "text-white bg-blue-600 hover:bg-blue-500" : "text-black bg-blue-400 hover:bg-blue-300"} flex items-center gap-2`}>
              <span>Manage Vehicle</span>
              <span className={`text-lg ${dropdownOpen ? "rotate-180" : "rotate-0"} transition-all`}>▼</span>
            </button>
            {dropdownOpen && (
              <div className="absolute top-8 right-0 bg-white border border-gray-300 rounded shadow-md z-10">
                <div className="flex flex-col items-center space-y-2">
                  <button onClick={() => navigate("/Admin/AddVehicle")} className={`py-2 px-4 text-gray-700 hover:bg-gray-200 ${theme === "dark" ? "bg-blue-600 text-white" : "bg-blue-400 text-black"} rounded-md`}>Add Vehicle</button>
                  <button onClick={() => navigate("/Admin/ViewVehicle")} className={`py-2 px-4 text-gray-700 hover:bg-gray-200 ${theme === "dark" ? "bg-blue-600 text-white" : "bg-blue-400 text-black"} rounded-md`}>View Vehicle</button>
                </div>
              </div>
            )}
          </div>
          <button onClick={() => navigate("/Admin/ManageUsers")} className={`py-2 px-4 text-lg rounded-full transition-all duration-300 ${theme === "dark" ? "text-white bg-blue-600 hover:bg-blue-500" : "text-black bg-blue-400 hover:bg-blue-300"}`}>Manage Users</button>
          <button onClick={() => navigate("/reports")} className={`py-2 px-4 text-lg rounded-full transition-all duration-300 ${theme === "dark" ? "text-white bg-blue-600 hover:bg-blue-500" : "text-black bg-blue-400 hover:bg-blue-300"}`}>Reports</button>
          {theme === "dark" ? (
            <BiSolidSun onClick={toggleTheme} className="text-2xl cursor-pointer transition-all duration-300 hover:text-gray-300" title="Switch to Light Mode" />
          ) : (
            <BiSolidMoon onClick={toggleTheme} className="text-2xl cursor-pointer transition-all duration-300 hover:text-gray-300" title="Switch to Dark Mode" />
          )}
          <button onClick={handleLogout} className={`px-4 py-2 rounded-full text-white ${theme === "dark" ? "bg-red-600 hover:bg-red-500" : "bg-red-400 hover:bg-red-300"}`}>Logout</button>
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
          <button onClick={() => navigate("/admin-dashboard")} className="py-2 text-lg">Home</button>
          <button onClick={() => navigate("/vehicle")} className="py-2 text-lg">Manage Vehicle</button>
          <button onClick={() => navigate("/Admin/ManageUsers")} className="py-2 text-lg">Manage Users</button>
          <button onClick={() => navigate("/reports")} className="py-2 text-lg">Reports</button>
          <div onClick={toggleTheme} className="flex items-center gap-2 py-2 cursor-pointer">
            {theme === "dark" ? <BiSolidSun className="text-2xl" title="Switch to Light Mode" /> : <BiSolidMoon className="text-2xl" title="Switch to Dark Mode" />}
          </div>
          <button onClick={handleLogout} className={`py-2 mt-2 rounded ${theme === "dark" ? "bg-red-600 hover:bg-red-500 text-white" : "bg-red-400 hover:bg-red-300 text-black"}`}>Logout</button>
        </div>
      )}

      <main className="p-6">
        <h2 className="text-2xl font-semibold">View All Vehicles</h2>

        <div className="mb-6">
          <label htmlFor="filter" className="font-medium mr-4">Filter by Make:</label>
          <select id="filter" value={selectedFilter} onChange={handleFilterChange} className={`p-2 border rounded ${theme === "dark" ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}>
            <option value="All">All</option>
            {[...new Set(vehicles.map((vehicle) => vehicle.make))].map((make) => (
              <option key={make} value={make}>{make}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVehicles.map((vehicle) => (
            <div key={vehicle.id} className="border p-4 rounded hover:shadow-lg transition-shadow duration-300 transform hover:scale-105">
              <h3 className="text-xl font-semibold">{vehicle.make} {vehicle.model}</h3>
              <p><strong>Year:</strong> {vehicle.year}</p>
              <p><strong>Price:</strong> Lkr.{vehicle.price}</p>
              <p><strong>Mileage:</strong> {vehicle.mileage} miles</p>
              {vehicle.image && (
                <div className="mt-2 overflow-hidden rounded-lg shadow-md">
                  <img src={`http://127.0.0.1:8000/storage/${vehicle.image}`} alt={`${vehicle.make} ${vehicle.model}`} className="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-300" />
                </div>
              )}
              <button onClick={() => navigate(`/vehicle/${vehicle.id}`)} className="mt-2 text-blue-500 hover:text-blue-700">View Details</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ViewVehicle;
