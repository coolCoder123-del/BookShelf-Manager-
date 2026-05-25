import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/library-bg.jpg";

const Login = () => {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      navigate("/"); // DASHBOARD
    }
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "user",
      JSON.stringify({
        email: email.trim(),
        password: password.trim(),
      })
    );

    alert("Registered ✅ Now login");

    setIsRegister(false);
    setEmail("");
    setPassword("");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (
      savedUser &&
      savedUser.email === email.trim() &&
      savedUser.password === password.trim()
    ) {
      localStorage.setItem("isLoggedIn", "true");

      alert("Login Successful ✅");

      navigate("/"); // DASHBOARD ROUTE FIXED
    } else {
      alert("Invalid credentials ❌");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-black/60 p-10 rounded-2xl w-[400px]">

        <h1 className="text-white text-3xl text-center mb-6">
          Library Login
        </h1>

        <form onSubmit={isRegister ? handleRegister : handleLogin}>

          <input
            className="w-full p-2 mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="w-full p-2 mb-3"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="w-full bg-blue-600 text-white p-2">
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <p className="text-white mt-4 text-center">
          {isRegister ? "Already user?" : "New user?"}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-300 ml-2"
          >
            Switch
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;