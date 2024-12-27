import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi"; // Icons for theme toggle

const VehicleDetails = () => {
  const { id } = useParams(); // Get the vehicle ID from the route
  const [vehicle, setVehicle] = useState(null);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem("adminTheme") || "dark");
  const [viewMedia, setViewMedia] = useState(false); // State to control media visibility
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

  // Handle media file upload
  const handleMediaChange = (e) => {
    setMedia([...media, ...e.target.files]);
  };

  const handleMediaUpload = async () => {
    const formData = new FormData();
    media.forEach((file) => {
      formData.append("media[]", file);
    });

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/vehicles/${id}/media`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
        },
        body: formData,
      });
      if (response.ok) {
        alert("Media uploaded successfully!");
        const data = await response.json();
        setVehicle((prevVehicle) => ({
          ...prevVehicle,
          media: [...prevVehicle.media, ...data.media],
        }));

        // Redirect to vehicle details page after successful upload
        navigate(`/Vehicle-details/${id}`);
      } else {
        alert("Failed to upload media");
      }
    } catch (error) {
      console.error("Error uploading media:", error);
      alert("An error occurred while uploading media");
    }
  };

  const toggleMediaVisibility = () => {
    setViewMedia(!viewMedia);
  };

  // Handle vehicle deletion
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this vehicle?");

    if (confirmDelete) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/vehicles/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Vehicle deleted successfully");
          navigate("/Admin/ViewVehicle"); // Redirect to the vehicle list after deletion
        } else {
          alert("Failed to delete vehicle");
        }
      } catch (error) {
        console.error("Error deleting vehicle:", error);
        alert("An error occurred while deleting the vehicle");
      }
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
          Vehicle <span className="text-secondary">Details</span>
        </h1>

        {/* Theme Toggle */}
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
            {vehicle.make} {vehicle.model}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-900 dark:text-gray-300">
                <strong>Year:</strong> {vehicle.year}
              </p>
              <p className="text-gray-900 dark:text-gray-300">
                <strong>Price:</strong> Lkr.{vehicle.price}
              </p>
              <p className="text-gray-900 dark:text-gray-300">
                <strong>Mileage:</strong> {vehicle.mileage} miles
              </p>
              <p className="text-gray-900 dark:text-gray-300">
                <strong>Condition:</strong> {vehicle.condition}
              </p>
              <p className="text-gray-900 dark:text-gray-300">
                <strong>Engine Type:</strong> {vehicle.engine_type}
              </p>
              <p className="text-gray-900 dark:text-gray-300">
                <strong>Transmission:</strong> {vehicle.transmission}
              </p>
              <p className="text-gray-900 dark:text-gray-300">
                <strong>Fuel Type:</strong> {vehicle.fuel_type}
              </p>
              <p className="text-gray-900 dark:text-gray-300">
                <strong>Seating Capacity:</strong> {vehicle.seating_capacity}
              </p>
              <p className="text-gray-900 dark:text-gray-300">
                <strong>Description:</strong> {vehicle.description || "N/A"}
              </p>
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

              {/* Media Upload Section */}
              <div className="mt-6">
                <input
                  type="file"
                  multiple
                  onChange={handleMediaChange}
                  className="border p-2 rounded"
                />
                <button
                  onClick={handleMediaUpload}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-2"
                >
                  Upload Media
                </button>
              </div>

              {/* View Media Button */}
              {vehicle.media && vehicle.media.length > 0 && (
                <button
                  onClick={toggleMediaVisibility}
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  {viewMedia ? "Hide Media" : "View Media"}
                </button>
              )}

              {/* Display uploaded media if visible */}
              {viewMedia && vehicle.media && (
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {vehicle.media.map((mediaItem) => (
                    <div
                      key={mediaItem.id}
                      className="cursor-pointer group relative overflow-hidden rounded-lg"
                      onClick={() => navigate("/media-viewer", { state: { mediaItem, mediaList: vehicle.media, vehicleId: vehicle.id } })}
                    >
                      <img
                        src={`http://127.0.0.1:8000/storage/${mediaItem.file_path}`}
                        alt={`Media for ${vehicle.make} ${vehicle.model}`}
                        className="w-full h-40 object-cover transform transition duration-300 group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            {/* Edit Button */}
            <button
              onClick={() => navigate(`/edit-vehicle/${vehicle.id}`)} // navigate to the edit page
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            {/* Delete Button */}
            <button
              onClick={handleDelete} // Trigger delete action
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VehicleDetails;
