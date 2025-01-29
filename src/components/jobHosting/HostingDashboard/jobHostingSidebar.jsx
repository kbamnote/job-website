import React from "react";
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
  return (
    <aside className="h-screen flex flex-col bg-teal-900 p-4 lg:p-6 w-62 lg:w-80">
      {/* Logo */}
      <div className="flex items-center mb-6 lg:mb-8">
        <BriefcaseBusiness className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
        <span className="ml-2 text-xl lg:text-2xl font-bold text-white">Job Quick</span>
      </div>

      {/* Profile Section with online indicator */}
      <div className="flex items-center mb-6">
        <div className="relative">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
            <User className="w-6 h-6 lg:w-8 lg:h-8" />
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-teal-400 border-2 border-teal-900 rounded-full"></div>
        </div>
        <div className="ml-3">
          <div className="font-medium text-white text-sm lg:text-base">John Singh</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        <div className="space-y-1">
          <div className="flex items-center space-x-3 p-2 lg:p-3 bg-teal-700 text-white rounded-lg">
            <Users className="w-4 h-4 lg:w-5 lg:h-5" />
            <span className="text-sm lg:text-base">Dashboard</span>
          </div>

          {[
            { icon: <User className="w-4 h-4 lg:w-5 lg:h-5" />, label: "My Profile" },
            { icon: <Briefcase className="w-4 h-4 lg:w-5 lg:h-5" />, label: "My Jobs" },
            { icon: <MessageSquare className="w-4 h-4 lg:w-5 lg:h-5" />, label: "Messages" },
            { icon: <FileText className="w-4 h-4 lg:w-5 lg:h-5" />, label: "Submit Job" },
            { icon: <Bookmark className="w-4 h-4 lg:w-5 lg:h-5" />, label: "Save Candidate" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-2 lg:p-3 text-white hover:bg-teal-100 hover:text-black rounded-lg cursor-pointer transition-colors duration-200"
            >
              {item.icon}
              <span className="text-sm lg:text-base">{item.label}</span>
            </div>
          ))}
        </div>
      </nav>

      {/* Logout Button */}
      <div className="mt-4">
        <div className="flex items-center space-x-2 p-2 lg:p-3 text-white hover:bg-teal-100 hover:text-black rounded-lg cursor-pointer transition-colors duration-200">
          <LogOut className="w-4 h-4 lg:w-5 lg:h-5" />
          <span className="text-sm lg:text-base">Logout</span>
        </div>
      </div>
    </aside>
  );
};

export default JobHostingSidebar;