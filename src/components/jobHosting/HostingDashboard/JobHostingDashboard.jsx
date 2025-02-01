import React from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import Sidebar from "./jobHostingSidebar";
import {
  Bell,
  Search,
  User,
  Bookmark,
  FileText,
  MoreVertical,
} from "lucide-react";
import { Link } from "react-router";

const chartData = [
  { name: "Sun", views: 70 },
  { name: "Sat", views: 120 },
  { name: "Mon", views: 60 },
  { name: "Tue", views: 250 },
  { name: "Wed", views: 220 },
  { name: "Thu", views: 230 },
  { name: "Fri", views: 180 },
  { name: "Sat", views: 90 },
];

const JobHostingDashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="p-4 lg:p-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 lg:mb-8 space-y-4 lg:space-y-0">
              <h1 className="text-xl lg:text-2xl font-bold text-gray-800">Dashboard</h1>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search here..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-start">
                  <button className="p-2 relative">
                    <Bell className="w-6 h-6 text-gray-600" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  <Link to="/post-job">
                  <button className="bg-teal-700 text-white px-4 py-2 rounded-lg hover:bg-teal-800 transition-colors w-full sm:w-auto">
                    Post a Job
                  </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
              {[
                { number: "07", label: "Posted Job", icon: <User className="w-6 h-6 text-teal-600" /> },
                { number: "03", label: "Shortlisted", icon: <Bookmark className="w-6 h-6 text-teal-600" /> },
                { number: "1.7k", label: "Application", icon: <Search className="w-6 h-6 text-teal-600" /> },
                { number: "04", label: "Save Candidate", icon: <FileText className="w-6 h-6 text-teal-600" /> },
              ].map((stat, index) => (
                <div key={index} className="bg-white p-4 lg:p-6 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-xl lg:text-2xl font-bold text-gray-800">{stat.number}</div>
                      <div className="text-sm lg:text-base text-gray-500">{stat.label}</div>
                    </div>
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-teal-50 rounded-full flex items-center justify-center">
                      {stat.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts and Jobs Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
              {/* Job Views Chart */}
              <div className="lg:col-span-2 bg-white p-4 lg:p-6 rounded-lg shadow-sm">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-800">Job Views</h2>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
                    <select className="px-4 py-2 border border-gray-200 rounded-lg bg-white">
                      <option>Web & Mobile Prototype designer...</option>
                    </select>
                    <div className="flex flex-wrap gap-2">
                      {["1h", "Day", "Week", "Month", "Year"].map((period) => (
                        <button
                          key={period}
                          className={`px-3 lg:px-4 py-2 rounded-lg text-sm lg:text-base ${
                            period === "Day"
                              ? "bg-teal-700 text-white"
                              : "text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          {period}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Line
                        type="monotone"
                        dataKey="views"
                        stroke="#16a34a"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Posted Jobs */}
              <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Posted Job</h2>
                <div className="space-y-3">
                  {[
                    { title: "Web & Mobile Prototype", type: "Fulltime", location: "Spain", logo: "A" },
                    { title: "Document Writer", type: "Part-time", location: "Italy", logo: "B" },
                    { title: "Outbound Call Service", type: "Fulltime", location: "USA", logo: "C" },
                    { title: "Product Designer", type: "Part-time", location: "Dubai", logo: "D" },
                    { title: "Marketing Specialist", type: "Part-time", location: "UK", logo: "E" },
                  ].map((job, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-200 rounded-lg flex items-center justify-center text-sm">
                          {job.logo}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 text-sm lg:text-base">
                            {job.title}
                          </div>
                          <div className="text-xs lg:text-sm text-gray-500">
                            {job.type} · {job.location}
                          </div>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-4 h-4 lg:w-5 lg:h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobHostingDashboard;