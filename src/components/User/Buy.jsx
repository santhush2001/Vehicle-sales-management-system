import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi"; // Icons for theme toggle
import Modal from "react-modal"; // React Modal Library

// Bind modal to app root (required by react-modal)
Modal.setAppElement("#root");

const Buy = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem("userTheme") || "light");
  const [modalOpen, setModalOpen] = useState(false); // Modal state
  const [testDriveDate, setTestDriveDate] = useState("");
  const [testDriveTime, setTestDriveTime] = useState("");
  const navigate = useNavigate();

  // Toggle theme (light/dark)
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("userTheme", newTheme);
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

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleTestDriveSubmit = async () => {
    if (testDriveDate && testDriveTime) {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/test-drives", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: 1, // Replace with the logged-in user's ID
            vehicle_id: vehicle.id,
            test_drive_date: testDriveDate,
            test_drive_time: testDriveTime,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          alert(data.message);
          closeModal();
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while scheduling the test drive.");
      }
    } else {
      alert("Please select a date and time for the test drive.");
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
          <BiSolidSun onClick={toggleTheme} className="text-2xl cursor-pointer" title="Switch to Light Mode" />
        ) : (
          <BiSolidMoon onClick={toggleTheme} className="text-2xl cursor-pointer" title="Switch to Dark Mode" />
        )}
      </nav>

      <main className="p-6">
        <button onClick={() => navigate("/user-dashboard")} className="text-blue-500 hover:text-blue-700 mb-4 inline-block">
          &larr; Back to Dashboard
        </button>

        <div className="border p-6 rounded-lg shadow-lg mt-4 bg-white dark:bg-gray-800">
          <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
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

          <div className="mt-6 flex gap-4">
            <button
              onClick={openModal}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Schedule Test Drive
            </button>

            {vehicle.media && vehicle.media.length > 0 && (
              <button
                onClick={() =>
                  navigate("/user-media-viewer", {
                    state: {
                      mediaItem: vehicle.media[0],
                      mediaList: vehicle.media,
                      vehicleId: vehicle.id,
                    },
                  })
                }
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
              >
                View Media
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Test Drive Modal */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel="Schedule Test Drive"
        className="modal bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
        overlayClassName="modal-overlay bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-2xl font-bold mb-4">Schedule a Test Drive</h2>
        <label className="block mb-2 text-gray-700 dark:text-gray-300">
          Select Date:
          <input
            type="date"
            className="block w-full mt-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={testDriveDate}
            onChange={(e) => setTestDriveDate(e.target.value)}
          />
        </label>
        <label className="block mb-4 text-gray-700 dark:text-gray-300">
          Select Time:
          <input
            type="time"
            className="block w-full mt-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={testDriveTime}
            onChange={(e) => setTestDriveTime(e.target.value)}
          />
        </label>
        <div className="flex justify-end gap-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-300 text-gray-900 rounded hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleTestDriveSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Buy;
