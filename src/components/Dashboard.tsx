import React from 'react';

export const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Four Wheel Appeal Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow">Total Customers: 0</div>
        <div className="bg-white p-4 rounded shadow">Active Invoices: 0</div>
        <div className="bg-white p-4 rounded shadow">Low Inventory: 0</div>
        <div className="bg-white p-4 rounded shadow">Today's Birthdays: 0</div>
      </div>
    </div>
  );
};
