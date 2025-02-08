import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  LogOut,
  User,
  Briefcase,
  Menu,
  X,
  Users,
  BriefcaseBusiness,
} from "lucide-react";

const JobHostingSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // State for sidebar toggle

  const clearCookie = (name) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;Secure;SameSite=Strict`;
  };

  const handleLogout = () => {
    clearCookie("token");
    clearCookie("user");
    navigate("/");
  };

  const navItems = [
    { icon: <User className="w-5 h-5" />, label: "My Profile", path: "/hosting-detail-form" },
    { icon: <Briefcase className="w-5 h-5" />, label: "My Jobs", path: "/jobs-hoster" },
  ];

  const isActiveRoute = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 block md:hidden bg-teal-900 p-2 rounded text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 md:w-80 bg-teal-900 p-6 transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:flex flex-col h-screen`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center mb-6">
          <BriefcaseBusiness className="w-6 h-6 text-white" />
          <span className="ml-2 text-2xl font-bold text-white">Job Quick</span>
        </Link>

        {/* Profile Section */}
        <Link to="/profile" className="flex items-center mb-6">
          <div className="relative">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
              <User className="w-8 h-8" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-teal-900 rounded-full"></div>
          </div>
          <div className="ml-3 text-white text-base font-medium">John Singh</div>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <div className="space-y-1">
            <Link to="/hostingDashboard" className="block">
              <div
                className={`flex items-center space-x-3 p-3 ${
                  isActiveRoute("/hostingDashboard") ? "bg-teal-700" : ""
                } text-white hover:bg-teal-100 hover:text-black rounded-lg`}
              >
                <Users className="w-5 h-5" />
                <span className="text-base">Dashboard</span>
              </div>
            </Link>

            {navItems.map((item, index) => (
              <Link to={item.path} key={index} className="block">
                <div
                  className={`flex items-center space-x-3 p-3 ${
                    isActiveRoute(item.path) ? "bg-teal-700" : ""
                  } text-white hover:bg-teal-100 hover:text-black rounded-lg transition-colors duration-200`}
                >
                  {item.icon}
                  <span className="text-base">{item.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="mt-4">
          <div
            onClick={handleLogout}
            className="flex items-center space-x-2 p-3 text-white hover:bg-teal-100 hover:text-black rounded-lg cursor-pointer transition-colors duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-base">Logout</span>
          </div>
        </div>
      </aside>

      {/* Background Overlay when Sidebar is Open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default JobHostingSidebar;
