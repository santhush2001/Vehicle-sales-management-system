import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendar } from "@fortawesome/free-solid-svg-icons";

Modal.setAppElement("#root");

const Buy = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem("userTheme") || "light");
  const [modalOpen, setModalOpen] = useState(false);
  const [testDriveDate, setTestDriveDate] = useState("");
  const [testDriveTime, setTestDriveTime] = useState("");
  const [note, setNote] = useState("");
  const navigate = useNavigate();

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

    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await fetch("http://127.0.0.1:8000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("user_id", data.id);
        } else {
          alert("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("An error occurred while fetching user data");
      }
    };

    fetchVehicleDetails();
    fetchUserProfile();
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
            user_id: localStorage.getItem("user_id"),
            vehicle_id: vehicle.id,
            test_drive_date: testDriveDate,
            test_drive_time: testDriveTime,
            note,
            status: "pending",
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
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!vehicle) {
    return <div className="min-h-screen flex items-center justify-center">Vehicle not found</div>;
  }

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();

    if (selectedDate < currentDate.setHours(0, 0, 0, 0)) {
      alert("You cannot select a past date.");
      setTestDriveDate("");
      return;
    }
    setTestDriveDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    const currentDate = new Date();
    const selectedDate = new Date(`${testDriveDate}T${e.target.value}`);

    if (testDriveDate && selectedDate < currentDate) {
      alert("You cannot select a past time.");
      setTestDriveTime("");
      return;
    }
    setTestDriveTime(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('role');
    navigate('/signin');
  };

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
                onClick={() => navigate("/profile")}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <FontAwesomeIcon icon={faUser} className="text-xl" />
              </button>

              <button
                onClick={() => navigate("/ViewSchedule")}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <FontAwesomeIcon icon={faCalendar} className="text-xl" />
              </button>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {theme === "dark" ? (
                  <BiSolidSun className="text-xl" />
                ) : (
                  <BiSolidMoon className="text-xl" />
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

      <main className={`p-6 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
  <button
    onClick={() => navigate("/user-dashboard")}
    className="text-blue-500 hover:text-blue-700 mb-4 inline-block"
  >
    &larr; <b>DASHBOARD</b>
  </button>

  <div className={`border p-6 rounded-lg shadow-lg mt-4 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
    <h2 className={`text-3xl font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
      {vehicle.make} {vehicle.model}
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <p className={`mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-900"}`}>
          <strong>Year:</strong> {vehicle.year}
        </p>
        <p className={`mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-900"}`}>
          <strong>Price:</strong> ${vehicle.price}
        </p>
        <p className={`mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-900"}`}>
          <strong>Mileage:</strong> {vehicle.mileage} miles
        </p>
        <p className={`mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-900"}`}>
          <strong>Condition:</strong> {vehicle.condition}
        </p>
        <p className={`mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-900"}`}>
          <strong>Engine Type:</strong> {vehicle.engine_type}
        </p>
        <p className={`mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-900"}`}>
          <strong>Transmission:</strong> {vehicle.transmission}
        </p>
        <p className={`mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-900"}`}>
          <strong>Fuel Type:</strong> {vehicle.fuel_type}
        </p>
        <p className={`mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-900"}`}>
          <strong>Seating Capacity:</strong> {vehicle.seating_capacity}
        </p>
        <p className={`mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-900"}`}>
          <strong>Description:</strong> {vehicle.description || "N/A"}
        </p>
      </div>

      <div>
        {vehicle.image && (
          <img
            src={`http://127.0.0.1:8000/storage/${vehicle.image}`}
            alt={`${vehicle.make} ${vehicle.model}`}
            className="w-full h-[400px] object-contain rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
          />
        )}
      </div>
    </div>

    <div className="mt-6 flex gap-4">
      <button
        onClick={openModal}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
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
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-all duration-300 transform hover:scale-105"
        >
          View Media
        </button>
      )}
    </div>
  </div>
</main>

<Modal
  isOpen={modalOpen}
  onRequestClose={closeModal}
  contentLabel="Schedule Test Drive"
  className={`modal w-full max-w-lg p-6 rounded-lg shadow-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
  overlayClassName="modal-overlay bg-black bg-opacity-50 fixed inset-0 flex items-center justify-center"
>
  <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
    Schedule a Test Drive
  </h2>
  <label className={`block mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
    Select Date:
    <input
      type="date"
      className={`block w-full mt-1 p-2 border rounded ${theme === 'dark' ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : 'bg-white border-gray-300 text-gray-900'}`}
      value={testDriveDate}
      onChange={handleDateChange}
    />
  </label>
  <label className={`block mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
    Select Time:
    <input
      type="time"
      className={`block w-full mt-1 p-2 border rounded ${theme === 'dark' ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : 'bg-white border-gray-300 text-gray-900'}`}
      value={testDriveTime}
      onChange={handleTimeChange}
    />
  </label>
  <label className={`block mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
    Add Notes:
    <textarea
      className={`block w-full mt-1 p-2 border rounded ${theme === 'dark' ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : 'bg-white border-gray-300 text-gray-900'}`}
      value={note}
      onChange={(e) => setNote(e.target.value)}
      placeholder="Add contact details or special notes"
    />
  </label>
  <div className="flex justify-end gap-4">
    <button
      onClick={closeModal}
      className={`px-4 py-2 rounded ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-300 text-gray-900'} hover:bg-gray-400`}
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
