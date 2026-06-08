import { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Plans from "./pages/Plans";
import MySubscription from "./pages/MySubscription";
import Invoices from "./pages/Invoices";
import AdminDashboard from "./pages/AdminDashboard";
import AdminSubscriptions from "./pages/AdminSubscription";
import AdminInvoices from "./pages/AdminInvoices";
function App() {
  const [page, setPage] = useState("login");

  return (
    <div>
      {page === "register" && <Register setPage={setPage} />}
      {page === "login" && <Login setPage={setPage} />}
      {page === "dashboard" && <Dashboard setPage={setPage} />}
      {page === "plans" && <Plans setPage={setPage} />}
      {page === "subscriptions" && <MySubscription setPage={setPage} />}
      {page === "invoices" && <Invoices setPage={setPage} />}
      {page === "handleLogout" && <Login setPage={setPage} />}
      {page === "adminDashboard" && <AdminDashboard setPage={setPage} />}
      {page === "adminSubscriptions" && <AdminSubscriptions setPage={setPage} />}
      {page === "adminInvoices" && <AdminInvoices setPage={setPage} />}
    </div>
  );
}

export default App;

