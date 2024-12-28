import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi"; // Icons for responsive menu

const ManageUsers = () => {
    const [theme, setTheme] = useState(localStorage.getItem("adminTheme") || "dark");
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false); // Added dropdown state
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state for API
    const navigate = useNavigate();

    // Fetch all users from API
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true); // Set loading to true before fetching
        try {
            const response = await fetch("http://127.0.0.1:8000/api/users");
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                alert("Failed to fetch users");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while fetching users");
        } finally {
            setLoading(false); // Set loading to false after the fetch is done
        }
    };

    const deleteUser = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/users/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                alert("User deleted successfully!");
                fetchUsers(); // Refresh the user list
            } else {
                alert("Failed to delete user");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("An error occurred while deleting the user");
        }
    };

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
        localStorage.setItem("adminTheme", theme === "dark" ? "light" : "dark");
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen); // Toggle dropdown menu
    };

    const handleLogout = () => {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("role");
        navigate("/signin");
    };

    return (
        <div
            className={`dashboard-layout ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
                } min-h-screen`}
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
                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className={`py-2 px-6 text-lg rounded-full transition-all duration-300 ${theme === "dark"
                                ? "text-white bg-blue-600 hover:bg-blue-500"
                                : "text-black bg-blue-400 hover:bg-blue-300"
                                } flex items-center gap-2`}
                        >
                            <span>Manage Vehicle</span>
                            <span className={`text-lg ${dropdownOpen ? "rotate-180" : "rotate-0"} transition-all`}>▼</span>
                        </button>
                        {dropdownOpen && (
                            <div className="absolute top-8 right-0 bg-white border border-gray-300 rounded shadow-md z-10">
                                <div className="flex flex-col items-center space-y-2">
                                    <button
                                        onClick={() => navigate("/Admin/AddVehicle")}
                                        className={`py-2 px-4 text-gray-700 hover:bg-gray-200 ${theme === "dark" ? "bg-blue-600 text-white" : "bg-blue-400 text-black"} rounded-md`}
                                    >
                                        Add Vehicle
                                    </button>
                                    <button
                                        onClick={() => navigate("/Admin/ViewVehicle")}
                                        className={`py-2 px-4 text-gray-700 hover:bg-gray-200 ${theme === "dark" ? "bg-blue-600 text-white" : "bg-blue-400 text-black"} rounded-md`}
                                    >
                                        View Vehicle
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
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
            {/* Mobile Menu */}
            {menuOpen && (
                <div
                    className={`flex flex-col p-4 ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                        } md:hidden`}
                >
                    <button onClick={() => navigate("/admin-dashboard")} className="py-2 text-lg">
                        Home
                    </button>
                    <button onClick={() => navigate("/Admin/AddVehicle")} className="py-2 text-lg">
                        Manage Vehicle
                    </button>
                    <button onClick={() => navigate("/Admin/ManageUsers")} className="py-2 text-lg">
                        Manage Users
                    </button>
                    <button onClick={() => navigate("/Admin/Appointments")} className="py-2 text-lg">
                        Appointments
                    </button>
                    <div onClick={toggleTheme} className="flex items-center gap-2 py-2 cursor-pointer">
                        {theme === "dark" ? (
                            <BiSolidSun className="text-2xl" title="Switch to Light Mode" />
                        ) : (
                            <BiSolidMoon className="text-2xl" title="Switch to Dark Mode" />
                        )}
                    </div>
                    <button
                        onClick={handleLogout}
                        className={`py-2 mt-2 rounded ${theme === "dark"
                            ? "bg-red-600 hover:bg-red-500 text-white"
                            : "bg-red-400 hover:bg-red-300 text-black"
                            }`}
                    >
                        Logout
                    </button>
                </div>
            )}

            <main className="p-6">
                <h2 className="text-2xl font-semibold">Manage Users</h2>

                {/* Loading Indicator */}
                {loading ? (
                    <div className="flex justify-center items-center mt-4">
                        <div className="w-16 h-16 border-4 border-t-4 border-blue-600 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <table className="min-w-full table-auto mt-4 border-collapse shadow-lg rounded-lg overflow-hidden">
                        <thead className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}>
                            <tr className="text-lg text-left">
                                <th className="border-b-2 border-gray-300 px-4 py-2">Name</th>
                                <th className="border-b-2 border-gray-300 px-4 py-2">Email</th>
                                <th className="border-b-2 border-gray-300 px-4 py-2">Role</th>
                                <th className="border-b-2 border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr
                                    key={user.id}
                                    className={`hover:${theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"} transition-all`}
                                >
                                    <td className="border-b px-4 py-2">{user.name}</td> {/* Changed username to name */}
                                    <td className="border-b px-4 py-2">{user.email}</td>
                                    <td className="border-b px-4 py-2">{user.role}</td>
                                    <td className="border-b px-4 py-2">
                                        <button
                                            onClick={() => deleteUser(user.id)}
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

export default ManageUsers;
