import React, { useState, useEffect, useRef } from "react";
import { BriefcaseBusiness, ChevronDown, CircleUserRound, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = () => {
  const [isAIToolsOpen, setIsAIToolsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("JwtToken"); // Check for token in cookies
    setIsLoggedIn(!!token); // Set login state based on token presence
  }, []);
  

  const handleLogout = () => {
    Cookies.remove("JwtToken");
    Cookies.remove("userID");
    console.log("JwtToken:", Cookies.get("JwtToken")); // Should be undefined
    console.log("userID:", Cookies.get("userID")); // Should be undefined
    setIsLoggedIn(false);
    setIsMobileMenuOpen(false);
    navigate("/");
  };
  

  const toggleAIToolsDropdown = () => {
    setIsAIToolsOpen(!isAIToolsOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isAIToolsOpen) setIsAIToolsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAIToolsOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const NavLinks = ({ isMobile = false }) => (
    <>
      <Link to="/" className={isMobile ? "w-full" : ""}>
        <li className="hover:text-teal-400 transition-colors">Home</li>
      </Link>
      <Link to="/jobs" className={isMobile ? "w-full" : ""}>
        <li className="hover:text-teal-400 transition-colors">Jobs</li>
      </Link>
      <Link to="/salaries" className={isMobile ? "w-full" : ""}>
        <li className="hover:text-teal-400 transition-colors">Salaries</li>
      </Link>
      <li className={`relative ${isMobile ? "w-full" : ""}`} ref={dropdownRef}>
        <div
          className="flex items-center cursor-pointer hover:text-teal-400 transition-colors"
          onClick={toggleAIToolsDropdown}
        >
          AI Tools <ChevronDown className="ml-1" size={16} />
        </div>
        {isAIToolsOpen && (
          <ul className={`${
            isMobile 
              ? "relative bg-gray-900 w-full mt-2" 
              : "absolute top-full left-0 bg-gray-800 w-48 mt-2 rounded shadow-lg"
          } py-2 z-10`}>
            <Link to="/ats-score-checker">
              <li className="px-4 py-2 hover:bg-gray-700">ATS Score Checker</li>
            </Link>
            <Link to="/ai-resume-builder">
              <li className="px-4 py-2 hover:bg-gray-700">AI Resume Builder</li>
            </Link>

            <Link to="/mock" className={isMobile ? "w-full" : ""}>
              <li className="px-4 py-2 hover:bg-gray-700">
                {" "}
                Ai Mock Interview
              </li>
            </Link>
          </ul>
        )}
      </li>
      <Link to="/about" className={isMobile ? "w-full" : ""}>
        <li className="hover:text-teal-400 transition-colors">About Us</li>
      </Link>
      <Link to="/contact" className={isMobile ? "w-full" : ""}>
        <li className="hover:text-teal-400 transition-colors">Contact Us</li>
      </Link>
    </>
  );

  const AuthButtons = ({ isMobile = false }) => (
    <div className={`flex ${isMobile ? "flex-col w-full space-y-2" : "items-center space-x-4"}`}>
      {isLoggedIn ? (
        <>
          <button
            onClick={handleLogout}
            className="bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded transition-colors w-full cursor-pointer"
          >
            Logout
          </button>
          <Link to="/user-profile" className={isMobile ? "w-full" : ""}>
            <button className="hover:text-teal-400 transition-colors w-full flex justify-center cursor-pointer">
         <div className="items-center flex space-x-1"><span>User</span>     <CircleUserRound className="w-6 h-6" /></div> 
            </button>
          </Link>
        </>
      ) : (
        <>
          <Link to="/login" className={isMobile ? "w-full" : ""}>
            <button className="hover:text-teal-400 transition-colors w-full px-4 py-2 cursor-pointer">
              Login
            </button>
          </Link>
          <Link to="/host-login" className={isMobile ? "w-full" : ""}>
            <button className="bg-teal-500 cursor-pointer hover:bg-teal-600 px-4 py-2 rounded transition-colors w-full">
              Job Hosting
            </button>
          </Link>
        </>
      )}
    </div>
  );
  

  return (
    <header className="w-full bg-black text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <BriefcaseBusiness className="text-teal-500" />
            <h1 className="text-2xl font-bold">Job Quick</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8 items-center">
              <NavLinks />
            </ul>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:block">
            <AuthButtons />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-gray-800 rounded transition-colors"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div 
            ref={mobileMenuRef}
            className="md:hidden mt-4 py-4 border-t border-gray-800"
          >
            <nav className="flex flex-col space-y-4">
              <ul className="flex flex-col space-y-4">
                <NavLinks isMobile />
              </ul>
              <div className="pt-4 border-t border-gray-800">
                <AuthButtons isMobile />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;