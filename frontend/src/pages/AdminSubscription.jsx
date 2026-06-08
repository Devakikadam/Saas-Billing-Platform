import { useEffect, useState } from "react";
import axios from "axios";

function AdminSubscriptions({ setPage }) {
  const [subscriptionsData, setSubscriptionsData] = useState([]);
 const[search,setSearch]=useState("");
 const [planFilter, setPlanFilter] = useState("All");
 const[currentPage,setCurrentPage]=useState(1);
 const recordsPerPage=5;
 
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/admin/subscriptions")
      .then((res) => {
        setSubscriptionsData(res.data);
      });
  }, []);
       const cancelSubscription = async (email) => {
  try {
    await axios.put(
      "http://127.0.0.1:5000/admin/cancel-subscription",
      {
        user_email: email,
      }
    );

    alert("Subscription cancelled");

    setSubscriptionsData(
      subscriptionsData.map((sub) =>
        sub.user_email === email
          ? { ...sub, status: "Cancelled" }
          : sub
      )
    );
  } catch (error) {
    console.log(error);
    alert("Error cancelling subscription");
  }
};
      const filteredSubscriptions = subscriptionsData.filter((sub) => {
  const emailMatch = (sub.user_email || "")
    .toLowerCase()
    .includes(search.toLowerCase());

  const planMatch =
    planFilter === "All" || sub.plan === planFilter;

  return emailMatch && planMatch;
});
   const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const currentRecords =
    filteredSubscriptions.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(
  filteredSubscriptions.length / recordsPerPage
);
  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold text-center mb-6">
        Subscriptions
      </h1>
      <input
  type="text"
  placeholder="Search by Email"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="border p-2 rounded mb-4 w-full"
/>
    <select
  value={planFilter}
  onChange={(e) => setPlanFilter(e.target.value)}
  className="border p-2 rounded mb-4"
>
  <option value="All">All Plans</option>
  <option value="Basic">Basic</option>
  <option value="Premium">Premium</option>
  <option value="Enterprise">Enterprise</option>
</select>

      
      <div className="flex justify-between mb-4"> 
  <button
    onClick={() => setPage("adminDashboard")}
    className="bg-gray-700 text-white px-4 py-2 rounded"
  >
    Back
  </button>

  <button
    onClick={() => setPage("login")}
    className="bg-red-600 text-white px-4 py-2 rounded"
  >
    Logout
  </button>
</div>
      <table className="w-full border bg-white">
        <thead>
          <tr>
            <th className="border p-2">Email</th>
            <th className="border p-2">Plan</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {currentRecords.map((sub, index) => (
            <tr key={index}>
              <td className="border p-2">{sub.user_email}</td>
              <td className="border p-2">{sub.plan}</td>
              <td className="border p-2">₹{sub.price}</td>
              <td className="border p-2">{sub.status}</td>
              <td className="border p-2">
  <button
    onClick={() => cancelSubscription(sub.user_email)}
    className="bg-red-500 text-white px-2 py-1 rounded"
  >
    Cancel
  </button>
</td>
            </tr>
          ))}
        </tbody>
      </table>
          <div className="flex justify-center gap-2 mt-4">
  <button
    onClick={() => setCurrentPage(currentPage - 1)}
    disabled={currentPage === 1}
    className="bg-gray-500 text-white px-3 py-1 rounded"
  >
    Prev
  </button>

  <span>
    Page {currentPage} of {totalPages}
  </span>

  <button
    onClick={() => setCurrentPage(currentPage + 1)}
    disabled={currentPage === totalPages}
    className="bg-blue-500 text-white px-3 py-1 rounded"
  >
    Next
  </button>
</div>
    </div>
  );
}

export default AdminSubscriptions;