import axios from "axios";
import { useEffect, useState } from "react";

function AdminDashboard({ setPage }) {

  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
  totalUsers: 0,
  activeSubscriptions: 0,
  totalRevenue: 0
});
const  [subscriptionsData, setSubscriptionsData] = useState([]);
  useEffect(() => {

    axios
      .get("http://127.0.0.1:5000/admin/users")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      });

    axios
      .get("http://127.0.0.1:5000/admin/stats")
      .then((res) => {
        console.log(res.data);
        setStats(res.data);
      });
       
      axios
  .get("http://127.0.0.1:5000/admin/subscriptions")
  .then((res) => {
    setSubscriptionsData(res.data);
  });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold text-center mb-8">
        Admin Dashboard
      </h1>
       <div className="grid grid-cols-3 gap-4 mb-8">

  <div className="bg-blue-500 text-white p-6 rounded-lg">
    <h2>Total Users</h2>
    <p className="text-3xl font-bold">
      {stats.totalUsers}
    </p>
  </div>

  <div className="bg-green-500 text-white p-6 rounded-lg">
    <h2>Active Plans</h2>
    <p className="text-3xl font-bold">
      {stats.activeSubscriptions}
    </p>
  </div>

  <div className="bg-purple-500 text-white p-6 rounded-lg">
    <h2>Total Revenue</h2>
    <p className="text-3xl font-bold">
      ₹{stats.totalRevenue}
    </p>
  </div>
  
</div>
<div className="flex justify-center gap-4 mb-6">
  <button
    onClick={() => setPage("adminSubscriptions")}
    className="bg-blue-600 text-white px-6 py-3 rounded-lg"
  >
    View Subscriptions
  </button>

  <button
    onClick={() => setPage("adminInvoices")}
    className="bg-green-600 text-white px-6 py-3 rounded-lg"
  >
    View Invoices
  </button>
</div>
      <table className="w-full border-collapse">
  <thead>
    <tr>
      <th className="border p-2">Name</th>
      <th className="border p-2">Email</th>
    </tr>
  </thead>

  <tbody>
    {users.map((user, index) => (
      <tr key={index}>
        <td className="border p-2">{user.name}</td>
        <td className="border p-2">{user.email}</td>
      </tr>
    ))}
  </tbody>
</table>
   
      

    </div>
  );
}

export default AdminDashboard;