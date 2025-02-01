import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HostingSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const signupApi = "https://jobquick.onrender.com/hostuser/signup";

  const parseResponse = (data) => {
    try {
      // If data is already an object, return it
      if (typeof data === 'object' && data !== null) {
        return data;
      }
      
      // If data is a string, try to decode it first in case it's URL encoded
      if (typeof data === 'string') {
        try {
          data = decodeURIComponent(data);
        } catch (e) {
          // If decoding fails, use the original string
          console.log("URL decoding failed, using original string");
        }
        
        // Parse the JSON string
        return JSON.parse(data);
      }
      
      throw new Error("Invalid response format");
    } catch (e) {
      console.error("Response parsing error:", e);
      throw new Error("Failed to parse server response");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const person = {
        email: email,
        password: password,
      };

      const response = await fetch(signupApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });

      const rawData = await response.text(); // Get response as text first
      console.log("Raw response:", rawData);

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      const data = parseResponse(rawData);
      console.log("Parsed response:", data);

      // Set success message from response or default
      setSuccess(data.message || "Signup successful!");
      setError(null);

      // Navigate to login page after delay
      setTimeout(() => {
        navigate("/host-login");
      }, 1000);
    } catch (error) {
      console.error("Signup Error:", error);
      setError(error.message || "Signup failed. Please try again.");
      setSuccess(null);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-8">
      <div className="flex flex-col lg:flex-row items-center lg:space-x-16">
        <div className="bg-white p-12 rounded-lg shadow-lg max-w-lg w-full relative">
          <h2 className="text-2xl font-semibold mb-6 text-center">Create Account</h2>
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
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="remember" className="text-sm text-gray-700">
                  Show Password
                </label>
              </div>
              <a href="#" className="text-sm text-teal-500">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-teal-700 text-white py-2 rounded hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-6 text-center text-gray-500">OR</div>
          <div className="flex space-x-4 mt-4">
            <button className="w-1/2 bg-teal-950 text-white py-2 rounded hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-300">
              FACEBOOK
            </button>
            <button className="w-1/2 bg-teal-500 text-white py-2 rounded hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300">
              TWITTER
            </button>
          </div>
          {error && (
            <div className="text-red-500 text-center mt-4">{error}</div>
          )}
          {success && (
            <div className="text-green-500 text-center mt-4">{success}</div>
          )}
          <div className="mt-6 text-center">
            Already have an account?{" "}
            <a href="/host-login" className="text-teal-500">
              Sign In
            </a>
          </div>
        </div>

        <div className="hidden lg:block w-1/2">
          <div className="w-158 h-158">
            <img
              src="/api/placeholder/800/600"
              alt="Signup Illustration"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostingSignup;