import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Invoices({ setPage }) {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem("email");

    console.log("Email:", email);

    axios
      .get(`http://127.0.0.1:5000/invoices/${email}`)
      .then((res) => {
        console.log("Invoices:", res.data);
        setInvoices(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
      

const downloadInvoice = (invoice) => {
  console.log( invoice);
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Invoice", 20, 20);

 doc.text(`Email: ${invoice.user_email}`, 20, 40);
doc.text(`Plan: ${invoice.plan}`, 20, 55);
doc.text(`Amount: Rs. ${invoice.amount}`, 20, 70);
doc.text(`Status: ${invoice.status}`, 20, 85);
  doc.save(`invoice-${invoice.user_email}.pdf`);
};
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        My Invoices
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <table className="w-full text-center">
          <thead>
            <tr className="text-xl font-bold border-b">
              <th className="py-4">Plan</th>
              <th className="py-4">Amount</th>
              <th className="py-4">Status</th>
              <th className="py-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((invoice, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-4">{invoice.plan}</td>
                <td className="py-4">₹{invoice.amount}</td>
                <td className="py-4">
                  <span className="text-green-600 font-semibold">
                    {invoice.status}
                  </span>
                </td>
                <td className="py-4">
                  <button
                    onClick={() => downloadInvoice(invoice)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    console.log("Date:", invoice.date);
                    Download PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {invoices.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            No invoices found
          </p>
        )}
      </div>

     < div className="text-center mt-6">
        <button
          onClick={() => setPage("dashboard")}
          className="bg-gray-600 text-white px-5 py-2 rounded-lg hover:bg-gray-700"
        >
          Back
        </button>
      </div>
       </div>
  );
}

export default Invoices;