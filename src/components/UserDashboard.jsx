// src/components/UserDashboard.jsx
import React from "react";

const UserDashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center">User Dashboard</h1>
      <div className="mt-6">
        <p>Welcome to your User Dashboard!</p>
        {/* Add user-specific content here */}
        <ul>
          <li>View Cars</li>
          <li>Track Orders</li>
          <li>Update Profile</li>
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;
