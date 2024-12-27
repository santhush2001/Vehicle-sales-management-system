import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSolidSun, BiSolidMoon } from 'react-icons/bi'; // Import icons for sun and moon

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('userTheme') || 'light');
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

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`profile-page ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <header
        className={`p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} flex justify-between items-center`}
      >
        <h1 className="text-3xl font-extrabold text-primary tracking-tight">
          Profile <span className="text-secondary">Page</span>
        </h1>
        <div className="flex items-center gap-4">
          {theme === 'dark' ? (
            <BiSolidSun onClick={toggleTheme} className="text-2xl cursor-pointer" title="Switch to Light Mode" />
          ) : (
            <BiSolidMoon onClick={toggleTheme} className="text-2xl cursor-pointer" title="Switch to Dark Mode" />
          )}
          <button
            onClick={handleLogout}
            className={`px-4 py-2 rounded ${theme === 'dark' ? 'bg-red-600 hover:bg-red-500' : 'bg-red-400 hover:bg-red-300'}`}
          >
            Logout
          </button>
        </div>
      </header>

      <main className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Profile Details</h2>
        <div className="border p-4 rounded">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
