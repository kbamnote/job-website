import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LogOut,
  User,
  Briefcase,
  MessageSquare,
  FileText,
  Bookmark,
  Users,
  BriefcaseBusiness,
} from "lucide-react";

const JobHostingSidebar = () => {
  const navigate = useNavigate();

  const clearCookie = (name) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;Secure;SameSite=Strict`;
  };

  const handleLogout = () => {
    // Clear the authentication token
    clearCookie("token");

    // Clear any user data if stored
    clearCookie("user");

    // Navigate to home page
    navigate("/");
  };

  const navItems = [
    {
      icon: <User className="w-4 h-4 lg:w-5 lg:h-5" />,
      label: "My Profile",
      path: "/profile-hoster" // Add the appropriate path for profile
    },
    {
      icon: <Briefcase className="w-4 h-4 lg:w-5 lg:h-5" />,
      label: "My Jobs",
      path: "/jobs-hoster"
    },
    {
      icon: <MessageSquare className="w-4 h-4 lg:w-5 lg:h-5" />,
      label: "Messages",
      path: "/messages"
    },
    {
      icon: <FileText className="w-4 h-4 lg:w-5 lg:h-5" />,
      label: "Submit Job",
      path: "/submit-job"
    },
    {
      icon: <Bookmark className="w-4 h-4 lg:w-5 lg:h-5" />,
      label: "Save Candidate",
      path: "/save-candidate"
    }
  ];

  return (
    <aside className="h-screen flex flex-col bg-teal-900 p-4 lg:p-6 w-62 lg:w-80">
      {/* Logo */}
      <Link to="/" className="flex items-center mb-6 lg:mb-8">
        <BriefcaseBusiness className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
        <span className="ml-2 text-xl lg:text-2xl font-bold text-white">
          Job Quick
        </span>
      </Link>

      {/* Profile Section with online indicator */}
      <Link to="/profile" className="flex items-center mb-6">
        <div className="relative">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
            <User className="w-6 h-6 lg:w-8 lg:h-8" />
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-teal-900 rounded-full"></div>
        </div>
        <div className="ml-3">
          <div className="font-medium text-white text-sm lg:text-base">
            John Singh
          </div>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        <div className="space-y-1">
          <Link to="/dashboard" className="block">
            <div className="flex items-center space-x-3 p-2 lg:p-3 bg-teal-700 text-white rounded-lg">
              <Users className="w-4 h-4 lg:w-5 lg:h-5" />
              <span className="text-sm lg:text-base">Dashboard</span>
            </div>
          </Link>

          {navItems.map((item, index) => (
            <Link to={item.path} key={index} className="block">
              <div className="flex items-center space-x-3 p-2 lg:p-3 text-white hover:bg-teal-100 hover:text-black rounded-lg cursor-pointer transition-colors duration-200">
                {item.icon}
                <span className="text-sm lg:text-base">{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </nav>

      {/* Logout Button */}
      <div className="mt-4">
        <div
          onClick={handleLogout}
          className="flex items-center space-x-2 p-2 lg:p-3 text-white hover:bg-teal-100 hover:text-black rounded-lg cursor-pointer transition-colors duration-200"
        >
          <LogOut className="w-4 h-4 lg:w-5 lg:h-5" />
          <span className="text-sm lg:text-base">Logout</span>
        </div>
      </div>
    </aside>
  );
};

export default JobHostingSidebar;