import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Import statements remain the same

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await axios.post(
        "https://web3-world.onrender.com/signin",
        {
          email,
          password,
        }
      );

      if (response.data) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("lastInteraction", Date.now().toString());
        navigate("/admin");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error signing in");
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("lastInteraction");
    navigate("/signin");
  };

  const checkSessionTimeout = () => {
    const sessionTimeout = 1 * 60 * 1000; // 30 minutes in milliseconds
    const lastInteraction = localStorage.getItem("lastInteraction");

    if (
      lastInteraction &&
      Date.now() - parseInt(lastInteraction) > sessionTimeout
    ) {
      handleSignOut();
    }
  };

  // useEffect with checkSessionTimeout dependency
  React.useEffect(() => {
    checkSessionTimeout(); // Check initially

    const interval = setInterval(() => {
      checkSessionTimeout(); // Check every minute
    }, 60000);

    return () => clearInterval(interval); // Clear interval on unmount
  }, [checkSessionTimeout]); // Include checkSessionTimeout in the dependency array

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignIn();
        }}
        className="max-w-lg w-full bg-white p-8 rounded shadow-md"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Sign In</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="block w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="block w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-200"
        >
          Sign In
        </button>

        <div className="mt-4 text-center">
          <p>
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
