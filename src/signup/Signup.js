import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error

    try {
      const response = await axios.post("http://localhost:5000/signup", {
        email,
        password,
      });

      // If successful, navigate to sign in
      if (response.data) {
        navigate("/signin");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error signing up");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="block w-full border p-2 mb-4"
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="block w-full border p-2 mb-4"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Sign Up
      </button>
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <a href="/signin" className="text-blue-500">
          Sign In
        </a>
      </p>
    </form>
  );
};

export default SignUp;
