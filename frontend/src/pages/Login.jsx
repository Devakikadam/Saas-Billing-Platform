import axios from "axios";
import { useState } from "react";

function Login({ setPage }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {

    try {

      const res = await axios.post(
        "http://127.0.0.1:5000/login",
        {
          email,
          password
        }
      );

      if (res.data.role === "admin") {

        setPage("adminDashboard");

      } else {

        localStorage.setItem("email", email);
        setPage("dashboard");

      }

    } catch (error) {

      alert("Invalid Credentials");

    }

  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">

        <h1 className="text-3xl font-bold text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-gray-500 text-center mb-6">
          Login to your account
        </p>

        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-2 mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            className="flex-1 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="bg-gray-500 text-white px-4 rounded-lg hover:bg-gray-600"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>
        
        <p className="text-center text-gray-500 mt-4">
          Don't have an account?
        </p>

        <button
          onClick={() => setPage("register")}
          className="w-full mt-2 border border-blue-600 text-blue-600 p-3 rounded-lg hover:bg-blue-50"
        >
          Create Account
        </button>

      </div>
    </div>
  );

}
export default Login;