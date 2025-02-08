import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { IoEllipsisHorizontal } from "react-icons/io5";
import HostSidebar from "./jobHostingSidebar";
import Statistics from "./Statistics";

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
      <div className="p-2 sm:w-3/4 ml-auto sm:p-10">
        <div className="flex justify-between items-center">
          <h1 className="mt-2 text-4xl font-bold text-gray-800 bg-clip-text mb-6">
            Dashboard
          </h1>
          <Link to="/post-job">
            <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2 cursor-pointer rounded-lg shadow-md border border-teal-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
              Post Job
            </button>
          </Link>
        </div>
        <Statistics stats={stats} />{" "}
        <h2 className="text-2xl font-bold text-gray-800 mt-6">Posted Jobs</h2>
        {loading ? (
          <p className="text-gray-500 mt-4">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-gray-500 mt-4">No jobs found.</p>
        ) : (
          <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobs.map((job, index) => (
              <div
                key={job._id}
                className=" bg-gray-100 p-5 rounded-lg flex items-center justify-between shadow-md mb-4 border border-gray-200 hover:shadow-lg transition duration-300"
              >
                <div className=" flex items-center">
                  <div className="w-12 h-12 bg-gray-300 text-black font-bold flex items-center justify-center rounded-lg text-xl uppercase ">
                    {job.title.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-gray-800 text-lg">
                      {job.title}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Full-time • {job.location}
                    </p>
                  </div>
                </div>
                <IoEllipsisHorizontal className="text-black text-xl cursor-pointer hover:text-gray-700 transition duration-200" />{" "}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobHostingDashboard;