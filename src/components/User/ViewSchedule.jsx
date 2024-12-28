import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi"; // Icons for theme toggle

const ViewSchedule = () => {
  const [testDrives, setTestDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem("userTheme") || "light");
  const [editData, setEditData] = useState({ date: "", time: "", note: "" });
  const [editingDrive, setEditingDrive] = useState(null); // Track the drive being edited
  const navigate = useNavigate();

  // Toggle theme (light/dark)
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("userTheme", newTheme);
  };

  // Fetch test drives
  useEffect(() => {
    const fetchTestDrives = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await fetch("http://127.0.0.1:8000/api/test-drives", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTestDrives(data);
        } else {
          alert("Failed to fetch test drive appointments");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while fetching test drive appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchTestDrives();
  }, []);

  // Handle Edit - Fill data for editing
  const handleEdit = (drive) => {
    setEditingDrive(drive.id); // Set the drive being edited
    setEditData({
      date: drive.test_drive_date,
      time: drive.test_drive_time,
      note: drive.note || "", // Ensure note is not undefined
    });
  };

  // Handle saving the updated data
  const handleSave = async () => {
    const token = localStorage.getItem("auth_token");
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/test-drives/${editingDrive}`, {
        method: "PUT", // Use PUT for update
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          test_drive_date: editData.date,
          test_drive_time: editData.time,
          note: editData.note,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Error response:", errorResponse);
        alert(`Failed to update test drive: ${errorResponse.message}`);
        return;
      }

      const updatedDrive = await response.json();
      // Update state to reflect the changes
      const updatedTestDrives = testDrives.map((drive) =>
        drive.id === editingDrive ? { ...drive, ...updatedDrive.testDrive } : drive
      );
      setTestDrives(updatedTestDrives);
      setEditingDrive(null); // Clear the edit mode
      alert("Test drive updated successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating the test drive.");
    }
  };

  // Cancel test drive
  const handleCancel = async (id) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this appointment?");
    if (confirmCancel) {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await fetch(`http://127.0.0.1:8000/api/test-drives/${id}/cancel`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "cancelled" }),
        });

        if (response.ok) {
          const updatedTestDrives = testDrives.map((drive) =>
            drive.id === id ? { ...drive, status: "cancelled" } : drive
          );
          setTestDrives(updatedTestDrives);
        } else {
          alert("Failed to cancel test drive appointment.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while canceling the test drive appointment.");
      }
    }
  };

  // Delete test drive
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this appointment?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await fetch(`http://127.0.0.1:8000/api/test-drives/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const updatedTestDrives = testDrives.filter((drive) => drive.id !== id);
          setTestDrives(updatedTestDrives);
        } else {
          alert("Failed to delete test drive appointment.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while deleting the test drive appointment.");
      }
    }
  };

  if (loading) {
    return <div>Loading test drives...</div>;
  }

  return (
    <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      {/* Navigation Bar */}
      <nav className={`flex items-center justify-between p-4 ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}>
        <h1 className="text-3xl font-extrabold text-primary tracking-tight">
          Your <span className="text-secondary">Test Drives</span>
        </h1>

        {/* Theme Toggle */}
        {theme === "dark" ? (
          <BiSolidSun onClick={toggleTheme} className="text-2xl cursor-pointer" title="Switch to Light Mode" />
        ) : (
          <BiSolidMoon onClick={toggleTheme} className="text-2xl cursor-pointer" title="Switch to Dark Mode" />
        )}
      </nav>

      {/* Main Content */}
      <div className="container mx-auto p-6 flex-1">
        <button
          onClick={() => navigate("/user-dashboard")}
          className="text-blue-500 hover:text-blue-700 mb-4 inline-block"
        >
          &larr; Back to Dashboard
        </button>

        <h1 className="text-2xl font-bold mb-4">Your Test Drive Appointments</h1>

        {testDrives.length === 0 ? (
          <div>No test drive appointments found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testDrives.map((drive) => (
              <div
                key={drive.id}
                className={`border p-4 rounded-lg shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
              >
                <h2 className="text-xl font-semibold">
                  {drive.vehicle.make} {drive.vehicle.model}
                </h2>
                <p>
                  <strong>Date:</strong> {drive.test_drive_date}
                </p>
                <p>
                  <strong>Time:</strong> {drive.test_drive_time}
                </p>
                <p>
                  <strong>Status:</strong> {drive.status}
                </p>
                {drive.note && (
                  <p>
                    <strong>Note:</strong> {drive.note}
                  </p>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEdit(drive)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleCancel(drive.id)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => handleDelete(drive.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Test Drive Form */}
        {editingDrive && (
          <div className="mt-8 p-6 border rounded-lg bg-gray-200">
            <h2 className="text-2xl font-semibold mb-4">Edit Test Drive</h2>

            <label>
              Date:
              <input
                type="date"
                value={editData.date}
                onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                className="block w-full mb-4"
              />
            </label>

            <label>
              Time:
              <input
                type="time"
                value={editData.time}
                onChange={(e) => setEditData({ ...editData, time: e.target.value })}
                className="block w-full mb-4"
              />
            </label>

            <label>
              Note:
              <textarea
                value={editData.note}
                onChange={(e) => setEditData({ ...editData, note: e.target.value })}
                className="block w-full mb-4"
              />
            </label>

            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewSchedule;
