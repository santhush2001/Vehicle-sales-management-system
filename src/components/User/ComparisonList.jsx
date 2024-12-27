import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";

const ComparisonList = () => {
  const { state } = useLocation(); // Get comparison list from the previous page
  const [theme, setTheme] = useState(localStorage.getItem("userTheme") || "light");
  const navigate = useNavigate();

  // Toggle theme (light/dark)
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("userTheme", newTheme);
  };

  if (!state || !state.comparisonList || state.comparisonList.length < 2) {
    return <div className="p-6">Please select at least two vehicles to compare.</div>;
  }

  return (
    <div className={`dashboard-layout ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen`}>
      {/* Navigation Bar */}
      <nav className={`flex items-center justify-between p-4 ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}>
        <h1 className="text-3xl font-extrabold text-primary tracking-tight">
          Vehicle <span className="text-secondary">Comparison</span>
        </h1>

        {/* Theme Toggle */}
        {theme === "dark" ? (
          <BiSolidSun onClick={toggleTheme} className="text-2xl cursor-pointer" title="Switch to Light Mode" />
        ) : (
          <BiSolidMoon onClick={toggleTheme} className="text-2xl cursor-pointer" title="Switch to Dark Mode" />
        )}
      </nav>

      <main className="p-6">
        <button
          onClick={() => navigate("/user-dashboard")}
          className="text-blue-500 hover:text-blue-700 mb-4 inline-block"
        >
          &larr; Back to Dashboard
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {state.comparisonList.map((vehicle) => (
            <div key={vehicle.id} className="border p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                {vehicle.make} {vehicle.model}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-900 dark:text-gray-300"><strong>Year:</strong> {vehicle.year}</p>
                  <p className="text-gray-900 dark:text-gray-300"><strong>Price:</strong> ${vehicle.price}</p>
                  <p className="text-gray-900 dark:text-gray-300"><strong>Mileage:</strong> {vehicle.mileage} miles</p>
                  <p className="text-gray-900 dark:text-gray-300"><strong>Condition:</strong> {vehicle.condition}</p>
                  <p className="text-gray-900 dark:text-gray-300"><strong>Engine Type:</strong> {vehicle.engine_type}</p>
                  <p className="text-gray-900 dark:text-gray-300"><strong>Transmission:</strong> {vehicle.transmission}</p>
                  <p className="text-gray-900 dark:text-gray-300"><strong>Fuel Type:</strong> {vehicle.fuel_type}</p>
                  <p className="text-gray-900 dark:text-gray-300"><strong>Seating Capacity:</strong> {vehicle.seating_capacity}</p>
                  <p className="text-gray-900 dark:text-gray-300"><strong>Description:</strong> {vehicle.description || "N/A"}</p>
                </div>

                <div>
                  {vehicle.image && (
                    <div className="mt-4">
                      <img
                        src={`http://127.0.0.1:8000/storage/${vehicle.image}`}
                        alt={`${vehicle.make} ${vehicle.model}`}
                        className="w-full h-64 object-contain rounded-lg shadow-md"
                      />
                    </div>
                  )}
                </div>
              </div>

             
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ComparisonList;
