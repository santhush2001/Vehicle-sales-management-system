import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserDashboard = () => {
  const [theme, setTheme] = useState(localStorage.getItem("userTheme") || "light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [filterYear, setFilterYear] = useState("All");
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [mileageRange, setMileageRange] = useState({ min: 0, max: Infinity });
  const [condition, setCondition] = useState("All");
  const [comparisonList, setComparisonList] = useState([]); // Store selected vehicles for comparison
  const [user, setUser] = useState(null);  // Store the user data
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
        alert("An error occurred");
      }
    };

    fetchVehicles();
  }, []);

   // Fetch user data from the backend API
   useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await fetch("http://127.0.0.1:8000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data); // Set the user data
        } else {
          alert("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleProfileClick = () => {
    navigate("/profile");  // Navigate to the profile page
  };


  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("userTheme", newTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("role");
    navigate("/signin");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const handleYearChange = (event) => {
    setFilterYear(event.target.value);
  };

  const handlePriceRangeChange = (min, max) => {
    setPriceRange({ min, max });
  };

  const handleMileageRangeChange = (min, max) => {
    setMileageRange({ min, max });
  };

  const handleConditionChange = (event) => {
    setCondition(event.target.value);
  };

  const handleAddToComparison = (vehicle) => {
    if (!comparisonList.some((v) => v.id === vehicle.id)) {
      setComparisonList([...comparisonList, vehicle]);
    }
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchMake = selectedFilter === "All" || vehicle.make === selectedFilter;
    const matchYear = filterYear === "All" || vehicle.year.toString() === filterYear;
    const matchPrice = vehicle.price >= priceRange.min && vehicle.price <= priceRange.max;
    const matchMileage = vehicle.mileage >= mileageRange.min && vehicle.mileage <= mileageRange.max;
    const matchCondition = condition === "All" || vehicle.condition === condition;

    return matchMake && matchYear && matchPrice && matchMileage && matchCondition;
  });

  const handleCompareClick = () => {
    if (comparisonList.length >= 2) {
      navigate("/comparison", { state: { comparisonList } }); // Pass comparison list to Comparison page
    } else {
      alert("Please select at least two vehicles to compare.");
    }
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
  <h1 className="text-3xl font-extrabold text-primary tracking-tight">
    Drive <span className="text-secondary">Line</span>
  </h1>

  <div className="flex items-center gap-4">
          <FontAwesomeIcon
            icon={faUser}
            className="text-2xl cursor-pointer"
            onClick={handleProfileClick}  // Handle profile click
            title="Profile"
          />
          {/* Menu and Theme Toggle */}
          <div className="md:hidden">
            {menuOpen ? (
              <HiMenuAlt1 onClick={toggleMenu} className="text-3xl cursor-pointer" />
            ) : (
              <HiMenuAlt3 onClick={toggleMenu} className="text-3xl cursor-pointer" />
            )}
          </div>

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
          theme === "dark"
            ? "bg-red-600 hover:bg-red-500 text-white"
            : "bg-red-400 hover:bg-red-300 text-black"
        }`}
      >
        Logout
      </button>
    </div>
  </div>
</header>
      {menuOpen && (
        <div
          className={`p-4 ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-100"
          } md:hidden flex flex-col items-start gap-4`}
        >
          <button
            onClick={handleLogout}
            className={`px-4 py-2 rounded ${
              theme === "dark"
                ? "bg-red-600 hover:bg-red-500 text-white"
                : "bg-red-400 hover:bg-red-300 text-black"
            }`}
          >
            Logout
          </button>
        </div>
      )}

      <main className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Available Vehicles</h2>

        {/* Filter Options */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="filter-make" className="font-medium block mb-2">
              Filter by Make:
            </label>
            <select
              id="filter-make"
              value={selectedFilter}
              onChange={handleFilterChange}
              className={`p-2 border rounded w-full ${
                theme === "dark"
                  ? "bg-gray-800 text-white border-gray-700"
                  : "bg-white text-gray-900 border-gray-300"
              }`}
            >
              <option value="All">All</option>
              {[...new Set(vehicles.map((vehicle) => vehicle.make))].map((make) => (
                <option key={make} value={make}>
                  {make}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filter-year" className="font-medium block mb-2">
              Filter by Year:
            </label>
            <select
              id="filter-year"
              value={filterYear}
              onChange={handleYearChange}
              className={`p-2 border rounded w-full ${
                theme === "dark"
                  ? "bg-gray-800 text-white border-gray-700"
                  : "bg-white text-gray-900 border-gray-300"
              }`}
            >
              <option value="All">All</option>
              {[...new Set(vehicles.map((vehicle) => vehicle.year.toString()))].map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filter-condition" className="font-medium block mb-2">
              Filter by Condition:
            </label>
            <select
              id="filter-condition"
              value={condition}
              onChange={handleConditionChange}
              className={`p-2 border rounded w-full ${
                theme === "dark"
                  ? "bg-gray-800 text-white border-gray-700"
                  : "bg-white text-gray-900 border-gray-300"
              }`}
            >
              <option value="All">All</option>
              {[...new Set(vehicles.map((vehicle) => vehicle.condition))].map((condition) => (
                <option key={condition} value={condition}>
                  {condition}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filter-price" className="font-medium block mb-2">
              Price Range:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                onChange={(e) => handlePriceRangeChange(e.target.value, priceRange.max)}
                className={`p-2 border rounded w-full ${
                  theme === "dark"
                    ? "bg-gray-800 text-white border-gray-700"
                    : "bg-white text-gray-900 border-gray-300"
                }`}
              />
              <input
                type="number"
                placeholder="Max"
                onChange={(e) => handlePriceRangeChange(priceRange.min, e.target.value)}
                className={`p-2 border rounded w-full ${
                  theme === "dark"
                    ? "bg-gray-800 text-white border-gray-700"
                    : "bg-white text-gray-900 border-gray-300"
                }`}
              />
            </div>
          </div>

          <div>
            <label htmlFor="filter-mileage" className="font-medium block mb-2">
              Mileage Range:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                onChange={(e) => handleMileageRangeChange(e.target.value, mileageRange.max)}
                className={`p-2 border rounded w-full ${
                  theme === "dark"
                    ? "bg-gray-800 text-white border-gray-700"
                    : "bg-white text-gray-900 border-gray-300"
                }`}
              />
              <input
                type="number"
                placeholder="Max"
                onChange={(e) => handleMileageRangeChange(mileageRange.min, e.target.value)}
                className={`p-2 border rounded w-full ${
                  theme === "dark"
                    ? "bg-gray-800 text-white border-gray-700"
                    : "bg-white text-gray-900 border-gray-300"
                }`}
              />
            </div>
          </div>
        </div>



        {/* Display filtered vehicles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVehicles.map((vehicle) => (
            <div key={vehicle.id} className="border p-4 rounded">
              <h3 className="text-xl font-semibold">
                {vehicle.make} {vehicle.model}
              </h3>
              <p>
                <strong>Year:</strong> {vehicle.year}
              </p>
              <p>
                <strong>Price:</strong> ${vehicle.price}
              </p>
              <p>
                <strong>Mileage:</strong> {vehicle.mileage} miles
              </p>
              {vehicle.image && (
                <div className="mt-2">
                  <img
                    src={`http://127.0.0.1:8000/storage/${vehicle.image}`}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    className="w-full h-48 object-cover rounded"
                  />
                </div>
              )}
              <div className="mt-2 flex justify-between">
                <button
                  onClick={() => navigate(`/buy/${vehicle.id}`)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Buy
                </button>
                <button
                  onClick={() => handleAddToComparison(vehicle)}
                  className="text-green-500 hover:text-green-700"
                >
                  Compare
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Compare Button */}
        <div className="mt-4 flex justify-center items-center">
          {comparisonList.length > 0 && (
            <button
              onClick={handleCompareClick}
              className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white"
            >
              Compare Vehicles
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
