

        import axios from "axios";
import { useState } from "react";
// import login from "./Login";

function Register({ setPage}) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async () => {


        if(!name || !email || !password){
            alert("All fields are required");
            return;
        }
        // Name validation
        if (!/^[A-Za-z ]+$/.test(name)) {
            alert("Name should contain only letters");
            return;
        }

        // Email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Enter valid email address");
            return;
        }

        // Password validation
        if (password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        const userData = {
            name,
            email,
            password
        };

        try {
            const response = await axios.post(
                "http://127.0.0.1:5000/register",
                userData
            );

            alert(response.data.message);

            if (response.data.message === "User Registered Successfully") {
                setPage("login");
            }

        } catch(error){
    console.log(error);

    if(error.response){
        alert(error.response.data.message);
    }else{
        alert(error.message);
    }
}
    };

    return (
        
  <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">

    <div className="bg-white p-8 rounded-2xl shadow-xl w-96">

      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Register
      </h1>

       <input
  type="text"
  placeholder="Enter Name"
  value={name}
  onChange={(e) => {
    const value = e.target.value;

    if (/^[A-Za-z ]*$/.test(value)) {
      setName(value);
    }
  }}
  className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

      <input
        type="email"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <div className="flex mb-4">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          className="flex-1 p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="bg-gray-200 px-4 rounded-r-lg"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      <button
        onClick={handleRegister}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
      >
        Register
      </button>

      <button
        onClick={() => setPage("login")}
        className="w-full mt-3 border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50"
      >
        Login
      </button>

    </div>
  </div>
);
}

export default Register;