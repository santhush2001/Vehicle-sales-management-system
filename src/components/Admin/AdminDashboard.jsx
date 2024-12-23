// src/components/AdminDashboard.jsx
import React from "react";
import DashboardLayout from "../Layouts/DashboardLayout";

const AdminDashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center">Admin Dashboard</h1>
      <div className="mt-6">
        <p>Welcome to the Admin Dashboard.</p>
        {/* Add admin-specific components or features here */}
        <ul>
          <li>Manage Users</li>
          <li>View Analytics</li>
          <li>Manage Products</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
