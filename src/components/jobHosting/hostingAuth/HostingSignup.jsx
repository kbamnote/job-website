import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const HostingSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const signupApi = "https://jobquick.onrender.com/hostuser/signup";

  const handleSignup = (e) => {
    e.preventDefault();

    const person = {
      email: email,
      password: password,
    };

    fetch(signupApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        Cookies.set("user", JSON.stringify(data), { expires: 7, secure: true });
        setSuccess("Signup successful!");
        setError(null);
        setTimeout(() => {
          navigate("/host-login");
        }, 1000);
      })
      .catch((error) => {
        setError("Signup failed. Please try again.");
        setSuccess(null);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg flex w-full max-h-max h max-w-5xl">
        {/* Left Section */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-r from-teal-700 via-teal-700 to-teal-700 text-white flex-col justify-center items-center p-8">
          <h2 className="text-3xl font-bold mb-4">Welcome back!</h2>
          <p className="text-center text-lg">
            Welcome back! We are so happy to have you here. It's great to see
            you again. We hope you had a safe and enjoyable time away.
          </p>
        </div>

        {/* Right Section */}
        <div className="w-1/2 p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center mb-6">
            Create Account
          </h2>
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-medium mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-medium mb-1"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="showPassword" className="text-sm text-gray-700">
                  Show Password
                </label>
              </div>
              <a href="#" className="text-sm text-teal-500">
                Forgot password?
              </a>
            </div>
            <br />
            <button
              type="submit"
              className="w-full bg-teal-700\ text-white py-2 rounded hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300"
            >
              Sign Up
            </button>
          </form>
          {error && (
            <div className="text-red-500 text-center mt-4">{error}</div>
          )}
          {success && (
            <div className="text-green-500 text-center mt-4">{success}</div>
          )}

          <div className="text-center text-sm text-gray-500 mt-4">
            or sign in with
          </div>
          <div className="mt-6 text-center">
            Already have an account?{" "}
            <a href="/host-login" className="text-teal-500">
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostingSignup;