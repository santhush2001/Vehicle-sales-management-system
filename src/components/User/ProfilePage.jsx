import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSolidSun, BiSolidMoon } from 'react-icons/bi';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('userTheme') || 'light');
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ name: '', email: '', password: '', password_confirmation: '' });
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

  const handleBack = () => {
    navigate('/user-dashboard');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`profile-page ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <header className={`p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} flex justify-between items-center`}>
        <button
          onClick={handleBack}
          className="text-lg font-semibold text-primary hover:text-secondary"
        >
          &lt; Back to Dashboard
        </button>
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
          <p>
            <strong>Name:</strong>{' '}
            <input
              type="text"
              value={updatedUser.name}
              disabled={!isEditing}
              onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
              className={`border rounded px-2 w-full ${
                theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-900'
              } ${isEditing ? '' : 'cursor-not-allowed'}`}
            />
          </p>
          <p>
            <strong>Email:</strong>{' '}
            <input
              type="email"
              value={updatedUser.email}
              disabled={!isEditing}
              onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
              className={`border rounded px-2 w-full ${
                theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-900'
              } ${isEditing ? '' : 'cursor-not-allowed'}`}
            />
          </p>
          <p>
            <strong>Password:</strong>{' '}
            <input
              type="password"
              value={updatedUser.password}
              disabled={!isEditing}
              onChange={(e) =>
                setUpdatedUser({
                  ...updatedUser,
                  password: e.target.value,
                  password_confirmation: e.target.value,
                })
              }
              placeholder="Enter your password"
              className={`border rounded px-2 w-full ${
                theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-900'
              } ${isEditing ? '' : 'cursor-not-allowed'}`}
            />
          </p>
          <div className="mt-4">
            {isEditing ? (
              <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                Save
              </button>
            ) : (
              <button onClick={handleEdit} className="bg-yellow-500 text-white px-4 py-2 rounded">
                Edit
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
