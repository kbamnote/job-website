import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  CalendarDays,
  Trophy,
} from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();
  const loginApi = "https://jobquick.onrender.com/seekuser/login";

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);

    const person = {
      email: email,
      password: password,
    };

    fetch(loginApi, {
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
        console.log("Login Response:", data);
        setSuccess("Login successful!");
        setError(null);
        localStorage.setItem("token", data.token); // Save the token to localStorage
        navigate("/"); // Redirect to the home page
      })
      .catch((error) => {
        console.error("Login Error:", error);
        setError("Login failed. Please try again.");
        setSuccess(null);
      });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://plus.unsplash.com/premium_photo-1675448891100-3dbf439d2db3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="flex justify-center items-center h-full w-full backdrop-blur-sm p-20">
        <div className="bg-white p-12 rounded-lg shadow-lg max-w-lg w-full relative">
          <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-teal-700 text-white py-2 rounded hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300"
            >
              LOG IN
            </button>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            {success && <div className="text-green-500 text-sm">{success}</div>}
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
          <div className="mt-6 text-center">
            Don't have an account?{" "}
            <a href="/register" className="text-teal-500">
              Sign Up
            </a>
          </div>
        </div>
        <div className="hidden lg:block w-1/2 ml-16 text-black">
          <h2 className="text-3xl font-bold mb-4">
            Become the best you can be and have fun
          </h2>
          <p className="mb-4 text-teal-500">
            Join the group of more than 300 clients that love us.
          </p>
          <div className="mb-4 flex items-center">
            <div className="bg-white rounded-full flex items-center justify-center w-10 h-10 mr-4 ">
              <BriefcaseBusiness className="text-teal-500 flex items-center" />
            </div>
            Something about businesses that makes it special and different from everything else
          </div>
          <div className="mb-4 flex items-center">
            <div className="bg-white rounded-full flex items-center justify-center w-10 h-10 mr-4 ">
              <CalendarDays className="text-teal-500" />
            </div>
            There is this saying about the business and entrepreneurship, but who remembers it anyway
          </div>
          <div className="mb-4 flex items-center">
            <div className="bg-white rounded-full flex items-center justify-center w-10 h-10 mr-4 ">
              <Trophy className="text-teal-500 flex items-center justify-center" />
            </div>
            If only there was a template for all your needs wait a second there is and it is called this
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
