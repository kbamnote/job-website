import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import LineChart from "./graphs/LineChart";
import PieChart from "./graphs/PieChart";
import JobApplications from "./table/JobApplications";
import HostSidebar from "../commonHost/jobHostingSidebar";
import {
  Building2,
  Users,
  UserCheck,
  CirclePlus,
  TrendingUp,
  PieChartIcon,
  Search,
  Menu,
} from "lucide-react";

const JobHostingDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [searchTerm, jobs]);

  const fetchJobs = async () => {
    const userId = Cookies.get("user");
    const token = Cookies.get("token");

    if (!userId || !token) {
      setError("User not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://jobquick.onrender.com/job/createdby/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const result = await response.json();
      console.log("Response:", result);

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch jobs");
      }

      setJobs(result.success && result.jobs ? result.jobs : []);
      setFilteredJobs(result.success && result.jobs ? result.jobs : []);
      setStats(result.statistics);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
    {/* Sidebar */}
    <div className="w-[10px] lg:w-1/4 h-screen fixed top-0 left-0 z-50">
      <HostSidebar />
    </div>
  
    {/* Overlay for mobile sidebar */}
    {isSidebarOpen && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
        onClick={() => setIsSidebarOpen(false)}
      />
    )}
  
    {/* Main Content */}
    <main className="w-full lg:ml-80 xl:ml-80 p-3 sm:p-4 lg:p-6 xl:p-4 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6">
          <h1 className="text-2xl text-center lg:text-left w-full sm:text-3xl lg:text-4xl font-bold text-gray-800">Dashboard</h1>
          <Link to="/post-job">
            <button className="hidden lg:w-[178px] sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-semibold px-2 sm:px-6 py-2 rounded-lg shadow-md border border-teal-700 transition duration-300 lg:flex items-center justify-center gap-2">
              <CirclePlus className="w-5 h-5" />
              <span>Post New Job</span>
            </button>
          </Link>
        </div>
  
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* Total Jobs */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 p-3 bg-teal-50 rounded-lg">
                <Building2 className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Jobs</p>
                <h3 className="text-xl font-bold text-gray-900">{jobs.length}</h3>
              </div>
            </div>
          </div>
  
          {/* Total Applicants */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 p-3 bg-teal-50 rounded-lg">
                <Users className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Applicants</p>
                <h3 className="text-xl font-bold text-gray-900">{stats?.totalApplicants || 0}</h3>
              </div>
            </div>
          </div>
  
          {/* Shortlisted */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 p-3 bg-teal-50 rounded-lg">
                <UserCheck className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Shortlisted</p>
                <h3 className="text-xl font-bold text-gray-900">{stats?.totalShortlisted || 0}</h3>
              </div>
            </div>
          </div>
        </div>
  
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 mb-6">
  {/* Line Chart */}
  <div className="lg:col-span-8">
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-auto lg:h-[550px] flex flex-col">
      <div className="p-3 md:p-4 border-b border-gray-100">
        <h2 className="text-base md:text-lg font-semibold text-gray-900">Applications Trend</h2>
      </div>
      <div className="p-3 md:p-4 flex-grow">
        <LineChart jobs={jobs} />
      </div>
    </div>
  </div>

  {/* Pie Chart */}
  <div className="lg:col-span-4">
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-auto lg:h-[550px] flex flex-col">
      <div className="p-3 md:p-4 border-b border-gray-100">
        <h2 className="text-base md:text-lg font-semibold text-gray-900">Applications by Company</h2>
      </div>
      <div className="p-3 md:p-4 flex-grow">
        <PieChart jobs={jobs} />
      </div>
    </div>
  </div>
</div>
  
        {/* Recent Jobs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Job Postings</h2>
            <div className="w-full sm:w-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search jobs..."
                className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="p-4">
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600" />
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No jobs posted yet</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredJobs.map((job) => (
                  <div
                    key={job._id}
                    className="flex items-center p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 font-semibold">
                      {job.title.charAt(0)}
                    </div>
                    <div className="ml-4 flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{job.title}</h3>
                      <p className="text-sm text-gray-500 truncate">
                        {job.jobType} • {job.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
  
        {/* Job Applications */}
        <JobApplications />
      </div>
    </main>
  </div>
  );
};

export default JobHostingDashboard;