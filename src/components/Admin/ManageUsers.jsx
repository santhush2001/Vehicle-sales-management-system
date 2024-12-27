import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi"; // Icons for responsive menu

const ManageUsers = () => {
    const [theme, setTheme] = useState(localStorage.getItem("adminTheme") || "dark");
    const [menuOpen, setMenuOpen] = useState(false);
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
            <nav
                className={`flex items-center justify-between p-4 ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"
                    }`}
            >
                <h1 className="text-3xl font-extrabold text-primary tracking-tight">
                    Admin <span className="text-secondary">Dashboard</span>
                </h1>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">
                    <button
                        onClick={() => navigate("/admin-dashboard")}
                        className={`${theme === "dark" ? "text-white hover:text-gray-300" : "text-black hover:text-gray-700"
                            }`}
                    >
                        Home
                    </button>
                    <button
                        onClick={() => navigate("/Admin/AddVehicle")}
                        className={`${theme === "dark" ? "text-white hover:text-gray-300" : "text-black hover:text-gray-700"
                            }`}
                    >
                        Manage Vehicle
                    </button>
                    <button
                        onClick={() => navigate("/users")}
                        className={`${theme === "dark" ? "text-white hover:text-gray-300" : "text-black hover:text-gray-700"
                            }`}
                    >
                        Manage Users
                    </button>
                    <button
                        onClick={() => navigate("/reports")}
                        className={`${theme === "dark" ? "text-white hover:text-gray-300" : "text-black hover:text-gray-700"
                            }`}
                    >
                        Reports
                    </button>
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
                        className={`px-4 py-2 rounded ${theme === "dark"
                            ? "bg-red-600 hover:bg-red-500 text-white"
                            : "bg-red-400 hover:bg-red-300 text-black"
                            }`}
                    >
                        Logout
                    </button>
                </div>

                {/* Hamburger Menu for Mobile */}
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
                    <button onClick={() => navigate("/users")} className="py-2 text-lg">
                        Manage Users
                    </button>
                    <button onClick={() => navigate("/reports")} className="py-2 text-lg">
                        Reports
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
                    <table className="min-w-full table-auto mt-4">
                        <thead>
                            <tr>
                                <th className="border-b px-4 py-2 text-left">Name</th>
                                <th className="border-b px-4 py-2 text-left">Email</th>
                                <th className="border-b px-4 py-2 text-left">Role</th>
                                <th className="border-b px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr
                                    key={user.id}
                                    className={`${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
                                        } ${theme === "light" ? "hover:text-dark" : "" // White text on hover for light mode
                                        }`}
                                >
                                    <td className="border-b px-4 py-2">{user.name}</td>
                                    <td className="border-b px-4 py-2">{user.email}</td>
                                    <td className="border-b px-4 py-2">{user.role}</td>
                                    <td className="border-b px-4 py-2">
                                        <button
                                            onClick={() => deleteUser(user.id)}
                                            className="text-red-500 hover:text-red-700"
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
