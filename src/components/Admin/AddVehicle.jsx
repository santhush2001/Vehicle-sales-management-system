import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi"; // Icons for responsive menu

const AddVehicle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("adminTheme") || "dark");
  const [menuOpen, setMenuOpen] = useState(false); // State for responsive menu
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown menu
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    condition: "",
    engine_type: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    try {
      const response = await fetch("http://127.0.0.1:8000/api/vehicles", {
        method: "POST",
        body: form,
      });
      if (response.ok) {
        alert("Vehicle added successfully");
      } else {
        alert("Failed to add vehicle");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    localStorage.setItem("adminTheme", theme === "dark" ? "light" : "dark");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("role");
    navigate("/signin");
  };

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

          {/* Manage Vehicle Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className={`${
                theme === "dark" ? "text-white hover:text-gray-300" : "text-black hover:text-gray-700"
              }`}
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
          <button onClick={() => navigate("/admin-dashboard")} className="py-2 text-lg">
            Home
          </button>
          <button onClick={() => navigate("/vehicle")} className="py-2 text-lg">
            Manage Vehicle
          </button>
          <button onClick={() => navigate("/manage-users")} className="py-2 text-lg">
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
        <h2 className="text-2xl font-semibold">Add a New Vehicle</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="make"
              placeholder="Make"
              value={formData.make}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="model"
              placeholder="Model"
              value={formData.model}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <input
              type="number"
              name="year"
              placeholder="Year"
              value={formData.year}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <input
              type="number"
              name="mileage"
              placeholder="Mileage"
              value={formData.mileage}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="p-2 border rounded"
            >
              <option value="">Condition</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
            </select>
            <input
              type="text"
              name="engine_type"
              placeholder="Engine Type"
              value={formData.engine_type}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="transmission"
              placeholder="Transmission"
              value={formData.transmission}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="fuel_type"
              placeholder="Fuel Type"
              value={formData.fuel_type}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <input
              type="number"
              name="seating_capacity"
              placeholder="Seating Capacity"
              value={formData.seating_capacity}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="p-2 border rounded col-span-2"
            />
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400"
          >
            Add Vehicle
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddVehicle;
