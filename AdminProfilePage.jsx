import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSolidSun, BiSolidMoon } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';
import { HiMenuAlt1, HiMenuAlt3 } from 'react-icons/hi';

const AdminProfilePage = () => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('userTheme') || 'light');
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ name: '', email: '', password: '', password_confirmation: '' });
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const response = await fetch('http://127.0.0.1:8000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setUpdatedUser({ name: data.name, email: data.email, password: '', password_confirmation: '' });
        } else {
          alert('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        alert('An error occurred while fetching user data');
      }
    };

    fetchUserProfile();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('userTheme', newTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('role');
    navigate('/signin');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('http://127.0.0.1:8000/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user); // Update the user state with the new data
        setIsEditing(false);
        alert(data.message);
      } else {
        const errorData = await response.json();
        alert(`Failed to update profile: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred while updating the profile');
    }
  };

  const handleAdminBack = () => {
    navigate('/admin-dashboard');
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  if (!user) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  return (
    <div className={`profile-page ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Navbar */}
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

            {/* User Profile Icon */}
            <FaUser
              onClick={handleAdminBack}
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

      {/* Profile Content */}
      <main className="p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Profile Details</h2>
        <div className="border p-6 rounded-lg shadow-md">
          <div className="space-y-4">
            <div>
              <strong>Name:</strong>
              <input
                type="text"
                value={updatedUser.name}
                onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
                disabled={!isEditing}
                className={`border rounded-lg px-4 py-2 mt-2 w-full ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-900'} ${isEditing ? '' : 'cursor-not-allowed'} transition-all`}
              />
            </div>
            <div>
              <strong>Email:</strong>
              <input
                type="email"
                value={updatedUser.email}
                onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
                disabled={!isEditing}
                className={`border rounded-lg px-4 py-2 mt-2 w-full ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-900'} ${isEditing ? '' : 'cursor-not-allowed'} transition-all`}
              />
            </div>
            <div>
              <strong>Password:</strong>
              <input
                type="password"
                value={updatedUser.password}
                onChange={(e) =>
                  setUpdatedUser({
                    ...updatedUser,
                    password: e.target.value,
                    password_confirmation: e.target.value,
                  })
                }
                disabled={!isEditing}
                placeholder="Enter your password"
                className={`border rounded-lg px-4 py-2 mt-2 w-full ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-900'} ${isEditing ? '' : 'cursor-not-allowed'} transition-all`}
              />
            </div>
          </div>

          <div className="mt-6 flex gap-4 justify-end">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-400 transition-all"
              >
                Save
              </button>
            ) : (
              <button
                onClick={handleEdit}
                className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-400 transition-all"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`p-6 text-center ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} DriveLine. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default AdminProfilePage;
