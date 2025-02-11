import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { IoEllipsisHorizontal } from "react-icons/io5";
import HostSidebar from "./jobHostingSidebar";
import Statistics from "./Statistics";
import LineChart from "./LineChart";

const JobHostingDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

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

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch jobs");
      }

      setJobs(result.success && result.jobs ? result.jobs : []);
      setStats(result.statistics);
      console.log(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      <div className="w-1/4 h-screen fixed top-0 left-0">
        <HostSidebar />
      </div>
      <div className="p-2 w-full sm:w-3/4 ml-auto sm:p-10">
  <div className="flex justify-between items-center mb-8">
    <h1 className="text-4xl font-bold text-gray-800 bg-clip-text">
      Dashboard
    </h1>
    <Link to="/post-job">
      <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2 cursor-pointer rounded-lg shadow-md border border-teal-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
        Post Job
      </button>
    </Link>
  </div>

  <Statistics stats={stats} />

  <div className="flex flex-col lg:flex-row gap-6 mt-8">
    {/* Graph Section */}
    <div className="lg:w-2/3 bg-white p-6 rounded-xl shadow-sm">
      <LineChart jobs={jobs} />
    </div>

    {/* Posted Jobs Section */}
    <div className="lg:w-1/3">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Posted Jobs</h2>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
        </div>
      ) : jobs.length === 0 ? (
        <div className="bg-white p-4 rounded-lg">
          <p className="text-gray-500">No jobs found.</p>
        </div>
      ) : (
        <Link to='/jobs-hoster'>
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white p-3 rounded-lg flex items-center shadow-sm border border-gray-200 hover:shadow-md transition duration-300"
              >
                <div className="flex items-center w-full">
                  <div className="w-10 h-10 bg-teal-100 text-teal-600 font-bold flex items-center justify-center rounded-lg text-lg uppercase">
                    {job.title.charAt(0)}
                  </div>
                  <div className="ml-3 overflow-hidden">
                    <h3 className="font-bold text-gray-800 text-base truncate">
                      {job.title}
                    </h3>
                    <p className="text-gray-500 text-xs">
                      Full-time • {job.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Link>
      )}
    </div>
  </div>
</div>
    </div>
  );
};

export default JobHostingDashboard;