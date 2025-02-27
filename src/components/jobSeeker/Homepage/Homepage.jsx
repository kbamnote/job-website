import React, { useEffect, useState } from "react";
import Home from "../LandingPage/Home";
import Cookies from "js-cookie";
import DyHome from "../DynamicLandingPage/DyHome";

const Homepage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get("JwtToken"));

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!Cookies.get("JwtToken"));
    };

    // Listen for storage changes (works across tabs)
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  return isAuthenticated ? <DyHome /> : <Home />;
};

export default Homepage;
