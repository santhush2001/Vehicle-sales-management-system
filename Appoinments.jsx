import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import { FaUser } from "react-icons/fa";

const Appointments = () => {
    const [testDrives, setTestDrives] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem("adminTheme") || "light");
    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchTestDrives();
    }, []);

    // Fetch test drives data from the API
    const fetchTestDrives = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("http://127.0.0.1:8000/api/testdrives");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setTestDrives(data);
        } catch (err) {
            console.error("Error fetching test drives:", err.message);
            setError("Failed to fetch test drives. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    // Delete a test drive using the API
    const deleteTestDrive = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this test drive?");
        if (!isConfirmed) {
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/testdrives/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setTestDrives(testDrives.filter((drive) => drive.id !== id));
                console.log("Test drive deleted successfully");
            } else if (response.status === 404) {
                console.error("Test drive not found");
            } else {
                console.error("Failed to delete test drive");
            }
        } catch (error) {
            console.error("Error deleting test drive:", error);
        }
    };

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("adminTheme", newTheme);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Logout functionality
    const handleLogout = () => {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("role");
        navigate("/signin");
    };

    const handleAdminProfileClick = () => {
        navigate("/Adminprofile");
    };

    return (
        <div
            className={`dashboard-layout ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen`}
        >
            {/* Navigation Bar */}
            <nav className={`flex items-center justify-between p-4 ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"} shadow-lg`}>
                <h1 className="text-3xl font-extrabold text-primary tracking-tight">
                    Admin <span className="text-secondary">Dashboard</span>
                </h1>
                <div className="hidden md:flex items-center gap-8">
                    <button
                        onClick={() => navigate("/admin-dashboard")}
                        className={`py-2 px-4 text-lg rounded-full transition-all duration-300 ${theme === "dark"
                            ? "text-white bg-blue-600 hover:bg-blue-500"
                            : "text-black bg-blue-400 hover:bg-blue-300"
                            }`}
                    >
                        Home
                    </button>
                    <button
                        onClick={() => navigate("/Admin/ViewVehicle")}
                        className={`py-2 px-4 text-lg rounded-full transition-all duration-300 ${theme === "dark"
                            ? "text-white bg-blue-600 hover:bg-blue-500"
                            : "text-black bg-blue-400 hover:bg-blue-300"
                            }`}
                    >
                        View Vehicles
                    </button>
                    <button
                        onClick={() => navigate("/Admin/ManageUsers")}
                        className={`py-2 px-4 text-lg rounded-full transition-all duration-300 ${theme === "dark"
                            ? "text-white bg-blue-600 hover:bg-blue-500"
                            : "text-black bg-blue-400 hover:bg-blue-300"
                            }`}
                    >
                        Manage Users
                    </button>
                    <button
                        onClick={() => navigate("/Admin/Appointments")}
                        className={`py-2 px-4 text-lg rounded-full transition-all duration-300 ${theme === "dark"
                            ? "text-white bg-blue-600 hover:bg-blue-500"
                            : "text-black bg-blue-400 hover:bg-blue-300"
                            }`}
                    >
                        Appointments
                    </button>
                    <FaUser
                        onClick={handleAdminProfileClick}
                        className="text-2xl cursor-pointer transition-all duration-300 hover:text-gray-300"
                        title="Profile"
                    />
                    {theme === "dark" ? (
                        <BiSolidSun
                            onClick={toggleTheme}
                            className="text-2xl cursor-pointer transition-all duration-300 hover:text-gray-300"
                            title="Switch to Light Mode"
                        />
                    ) : (
                        <BiSolidMoon
                            onClick={toggleTheme}
                            className="text-2xl cursor-pointer transition-all duration-300 hover:text-gray-300"
                            title="Switch to Dark Mode"
                        />
                    )}
                    <button
                        onClick={handleLogout}
                        className={`px-4 py-2 rounded-full text-white ${theme === "dark" ? "bg-red-600 hover:bg-red-500" : "bg-red-400 hover:bg-red-300"
                            }`}
                    >
                        Logout
                    </button>
                </div>
                <div className="md:hidden">
                    {menuOpen ? (
                        <HiMenuAlt1 onClick={toggleMenu} className="text-3xl cursor-pointer" />
                    ) : (
                        <HiMenuAlt3 onClick={toggleMenu} className="text-3xl cursor-pointer" />
                    )}
                </div>
            </nav>

            <main className="p-6">
                <h2 className="text-2xl font-semibold">Manage Test Drives</h2>
                {loading ? (
                    <div className="flex justify-center items-center mt-4">
                        <div className="w-16 h-16 border-4 border-t-4 border-blue-600 rounded-full animate-spin"></div>
                    </div>
                ) : error ? (
                    <p className="text-red-600">{error}</p>
                ) : (
                    <table className="min-w-full mt-4 border-collapse border border-gray-300 rounded-lg text-center">
                        <thead className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-blue-400 text-black"}`}>
                            <tr>
                                <th className="px-4 py-2 border-b border-gray-300">User</th>
                                <th className="px-4 py-2 border-b border-gray-300">Vehicle</th>
                                <th className="px-4 py-2 border-b border-gray-300">Date</th>
                                <th className="px-4 py-2 border-b border-gray-300">Time</th>
                                <th className="px-4 py-2 border-b border-gray-300">Status</th>
                                <th className="px-4 py-2 border-b border-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {testDrives.map((drive) => (
                                <tr
                                    key={drive.id}
                                    className={`${theme === "dark" ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-white hover:bg-gray-200 text-black"} transition-all`}
                                >
                                    <td className="px-4 py-2 border-b border-gray-300">{drive.user_id}</td>
                                    <td className="px-4 py-2 border-b border-gray-300">{drive.vehicle_id}</td>
                                    <td className="px-4 py-2 border-b border-gray-300">{drive.test_drive_date}</td>
                                    <td className="px-4 py-2 border-b border-gray-300">{drive.test_drive_time}</td>
                                    <td className="px-4 py-2 border-b border-gray-300">{drive.status}</td>
                                    <td className="px-4 py-2 border-b border-gray-300 flex justify-center gap-4">
                                        <button
                                            onClick={() => deleteTestDrive(drive.id)}
                                            className="text-red-600 hover:text-red-800 transition-all"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </main>
        </div>
    );
};

export default Appointments;
