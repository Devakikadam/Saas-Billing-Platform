

import { useState, useEffect } from "react";
const handleLogout = () => {

  localStorage.removeItem("email");

  setPage("login");

};

function Dashboard({ setPage }) {
 

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">
          SaaS Billing Platform
        </h1>

        <button
          onClick={() => setPage("plans")}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          view plans
        </button>
        <button
          onClick={() => setPage("subscriptions")}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          My Subscriptions
        </button>
         <button
          onClick={() => setPage("invoices")}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
        Invoices
        </button>
         <button
          onClick={() => setPage("handleLogout")}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
        Logout
        </button>
        
      </nav>

      <div className="p-8">

        
         

      </div>
    </div>
  );
}

export default Dashboard;