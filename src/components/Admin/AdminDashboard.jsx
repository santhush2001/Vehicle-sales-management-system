// src/components/Admin/AdminDashboard.jsx
import React from "react";



const AdminDashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center">Admin Dashboard</h1>

      

      {/* Admin Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Statistics Section */}
        <div className="bg-white shadow-md p-4 rounded text-center">
          <h2 className="text-xl font-bold">Total Users</h2>
          <p className="text-2xl mt-2">150</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded text-center">
          <h2 className="text-xl font-bold">Total Vehicles</h2>
          <p className="text-2xl mt-2">75</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded text-center">
          <h2 className="text-xl font-bold">Total Revenue</h2>
          <p className="text-2xl mt-2">$120,000</p>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="bg-gray-100 mt-6 p-4 rounded shadow-md">
        <h3 className="text-3xl font-semibold mb-4">Quick Links</h3>
        <ul className="space-y-2">
          <li className="p-2 bg-gray-200 rounded hover:bg-gray-300">
            Approve Pending Listings
          </li>
          <li className="p-2 bg-gray-200 rounded hover:bg-gray-300">
            Generate Sales Reports
          </li>
          <li className="p-2 bg-gray-200 rounded hover:bg-gray-300">
            Monitor User Feedback
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
