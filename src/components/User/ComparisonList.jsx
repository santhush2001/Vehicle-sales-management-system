import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi"; // Ensure these imports are correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendar } from '@fortawesome/free-solid-svg-icons'; // Check if these icons are imported
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";


const ComparisonList = () => {
  const { state } = useLocation(); // Get comparison list from the previous page
  const [theme, setTheme] = useState(localStorage.getItem("userTheme") || "light");
  const navigate = useNavigate();

  // Debugging state to see if it's being passed correctly
  useEffect(() => {
    console.log("ComparisonList state:", state);
  }, [state]);

  // Toggle theme (light/dark)
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("userTheme", newTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('role');
    navigate('/signin');
  };

  // Check if comparisonList is available and has at least 2 vehicles
  if (!state || !state.comparisonList || state.comparisonList.length < 2) {
    return <div className="p-6">Please select at least two vehicles to compare.</div>;
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <header className={`sticky top-0 z-50 ${theme === "dark" ? "bg-gray-800" : "bg-white"} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                DriveLine
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/user-dashboard")}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
              >
                <FontAwesomeIcon icon={faHome} className="text-xl text-blue-500" />

              </button>
              <button
                onClick={() => navigate("/profile")}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <FontAwesomeIcon icon={faUser} className="text-xl text-blue-500" />
              </button>

              <button
                onClick={() => navigate("/ViewSchedule")}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <FontAwesomeIcon icon={faCalendar} className="text-xl text-purple-500" />
              </button>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
              >
                {theme === "dark" ? (
                  <BiSolidSun className="text-xl text-yellow-400" />
                ) : (
                  <BiSolidMoon className="text-xl text-gray-600" />
                )}
              </button>

              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6">


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {state.comparisonList.map((vehicle) => (
            <div key={vehicle.id} className="border p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 hover:shadow-2xl transition-all">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                {vehicle.make} {vehicle.model}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-900 dark:text-gray-300"><strong>Year:</strong> {vehicle.year}</p>
                  <p className="text-gray-900 dark:text-gray-300"><strong>Price:</strong> Rs: {vehicle.price}</p>
                  <p className="text-gray-900 dark:text-gray-300"><strong>Mileage:</strong> {vehicle.mileage} miles</p>
                  <p className="text-gray-900 dark:text-gray-300"><strong>Condition:</strong> {vehicle.condition}</p>
                  <p className="text-gray-900 dark:text-gray-300"><strong>Engine Type:</strong> {vehicle.engine_type}</p>
                  <p className="text-gray-900 dark:text-gray-300"><strong>Transmission:</strong> {vehicle.transmission}</p>
                  <p className="text-gray-900 dark:text-gray-300"><strong>Fuel Type:</strong> {vehicle.fuel_type}</p>
                  <p className="text-gray-900 dark:text-gray-300"><strong>Seating Capacity:</strong> {vehicle.seating_capacity}</p>
                  <p className="text-gray-900 dark:text-gray-300"><strong>Description:</strong> {vehicle.description || "N/A"}</p>
                </div>

                <div className="flex justify-center">
                  {vehicle.image && (
                    <div className="mt-4">
                      <img
                        src={`http://127.0.0.1:8000/storage/${vehicle.image}`}
                        alt={`${vehicle.make} ${vehicle.model}`}
                        className="w-full h-64 object-contain rounded-lg shadow-md transition-all transform hover:scale-105"
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
