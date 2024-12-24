import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";

const MyCars = () => {
  const [theme, setTheme] = useState(localStorage.getItem("userTheme") || "light");
  const [menuOpen, setMenuOpen] = useState(false); // State for responsive menu
  const navigate = useNavigate();

  // Dummy data for cars
  const cars = [
    { id: 1, make: "Toyota", model: "Camry", year: 2020, color: "Blue" },
    { id: 2, make: "Honda", model: "Civic", year: 2021, color: "Red" },
    { id: 3, make: "Ford", model: "Mustang", year: 2019, color: "Black" },
  ];

  // Toggle theme and store in localStorage
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("userTheme", newTheme);
  };

  const goBackToDashboard = () => {
    // Navigate back to the user dashboard
    navigate("/user-dashboard");
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
        className={`p-4 ${
          theme === "dark" ? "bg-gray-800" : "bg-gray-200"
        } flex justify-between items-center`}
      >
        {/* Logo */}
        <h1 className="text-3xl font-extrabold text-primary font-sans tracking-tight">
          My <span className="text-secondary">Cars</span>
        </h1>

        <div className="flex items-center gap-4">
          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            {menuOpen ? (
              <HiMenuAlt1
                onClick={toggleMenu}
                className="text-3xl cursor-pointer"
              />
            ) : (
              <HiMenuAlt3
                onClick={toggleMenu}
                className="text-3xl cursor-pointer"
              />
            )}
          </div>

          {/* Theme Toggle and Back to Dashboard for Desktop */}
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
              onClick={goBackToDashboard}
              className={`px-4 py-2 rounded ${
                theme === "dark"
                  ? "bg-blue-600 hover:bg-blue-500 text-white"
                  : "bg-blue-400 hover:bg-blue-300 text-black"
              }`}
            >
              Back to User Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Responsive Menu */}
      {menuOpen && (
        <div
          className={`p-4 ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-100"
          } md:hidden flex flex-col items-start gap-4`}
        >
          <div
            onClick={toggleTheme}
            className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded"
          >
            {theme === "dark" ? (
              <BiSolidSun
                className={`text-2xl ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
                title="Switch to Light Mode"
              />
            ) : (
              <BiSolidMoon
                className={`text-2xl ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
                title="Switch to Dark Mode"
              />
            )}
            <span className={`${theme === "dark" ? "text-white" : "text-black"}`}>
              Toggle Theme
            </span>
          </div>
          <button
            onClick={goBackToDashboard}
            className={`px-4 py-2 rounded ${
              theme === "dark"
                ? "bg-blue-600 hover:bg-blue-500 text-white"
                : "bg-blue-400 hover:bg-blue-300 text-black"
            }`}
          >
            Back to User Dashboard
          </button>
        </div>
      )}

      <main className="p-6">
        <h2 className="text-2xl font-semibold">Your Cars</h2>

        {/* Cars List */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div
              key={car.id}
              className="p-4 bg-white shadow-lg rounded-lg dark:bg-gray-800 dark:text-white"
            >
              <h3 className="text-xl font-semibold">{`${car.year} ${car.make} ${car.model}`}</h3>
              <p className="mt-2">Color: {car.color}</p>
              <button
                onClick={() => alert(`Viewing details for ${car.make} ${car.model}`)}
                className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400"
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

export default MyCars;
