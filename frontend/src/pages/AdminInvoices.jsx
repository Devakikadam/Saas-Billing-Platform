import { useEffect, useState } from "react";
import axios from "axios";

function AdminInvoices({ setPage }) {
  const [invoicesData, setInvoicesData] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/admin/invoices")
      .then((res) => {
        console.log(res.data);
        setInvoicesData(res.data);
      });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Admin Invoices
      </h1>

      <button
        onClick={() => setPage("adminDashboard")}
        className="bg-gray-700 text-white px-4 py-2 rounded mb-4"
      >
        Back
      </button>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Email</th>
            <th className="border p-2">Plan</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>

        <tbody>
          {invoicesData.map((invoice, index) => (
            <tr key={index}>
              <td className="border p-2">{invoice.user_email}</td>
              <td className="border p-2">{invoice.plan}</td>
              <td className="border p-2">₹{invoice.amount}</td>
              <td className="border p-2">{invoice.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminInvoices;