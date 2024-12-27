import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi"; // Icons for theme toggle

const EditVehicle = () => {
  const { id } = useParams(); // Get the vehicle ID from the route
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem("adminTheme") || "dark");
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
  });

  const navigate = useNavigate();

  // Update the theme in localStorage and apply the class
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    localStorage.setItem("adminTheme", theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/vehicles/${id}`);
        if (response.ok) {
          const data = await response.json();
          setVehicle(data);
          setFormData({
            make: data.make,
            model: data.model,
            year: data.year,
            price: data.price,
            mileage: data.mileage,
            condition: data.condition,
            engine_type: data.engine_type,
            transmission: data.transmission,
            fuel_type: data.fuel_type,
            seating_capacity: data.seating_capacity,
            description: data.description || "",
          });
        } else {
          alert("Failed to fetch vehicle details");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while fetching vehicle details");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/vehicles/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Vehicle details updated successfully!");
        navigate(`/Vehicle/${id}`);
      } else {
        alert("Failed to update vehicle details");
      }
    } catch (error) {
      console.error("Error updating vehicle:", error);
      alert("An error occurred while updating the vehicle");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!vehicle) {
    return <div>Vehicle not found</div>;
  }

  return (
    <div className={`dashboard-layout ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen`}>
      {/* Navigation Bar */}
      <nav className={`flex items-center justify-between p-4 ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}>
        <h1 className="text-3xl font-extrabold text-primary tracking-tight">
          Edit <span className="text-secondary">Vehicle</span>
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
          onClick={() => navigate("/Admin/ViewVehicle")}
          className="text-blue-500 hover:text-blue-700 mb-4 inline-block"
        >
          &larr; Back
        </button>

        <div className="border p-6 rounded-lg shadow-lg mt-4 bg-white dark:bg-gray-800">
          <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
            Edit {vehicle.make} {vehicle.model}
          </h2>

          {/* Edit Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300">Make</label>
                <input
                  type="text"
                  name="make"
                  value={formData.make}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300">Model</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300">Year</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300">Mileage</label>
                <input
                  type="number"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300">Condition</label>
                <input
                  type="text"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300">Engine Type</label>
                <input
                  type="text"
                  name="engine_type"
                  value={formData.engine_type}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300">Transmission</label>
                <input
                  type="text"
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300">Fuel Type</label>
                <input
                  type="text"
                  name="fuel_type"
                  value={formData.fuel_type}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300">Seating Capacity</label>
                <input
                  type="number"
                  name="seating_capacity"
                  value={formData.seating_capacity}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows="4"
              />
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Update Vehicle
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditVehicle;
