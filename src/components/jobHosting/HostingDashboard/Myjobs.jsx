import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import JobHostingSidebar from "./jobHostingSidebar";
import { Briefcase, MapPin, Users, Trash2, UserCheck } from "lucide-react";

const Badge = ({ children, variant = "default", className = "" }) => {
  const baseStyles = "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all duration-200";
  
  const variantStyles = {
    default: "bg-teal-50 text-teal-700 ring-1 ring-teal-600/10",
    secondary: "bg-purple-50 text-purple-700 ring-1 ring-purple-600/10",
    outline: "bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50",
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const navigate = useNavigate();

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
      const response = await fetch(`https://jobquick.onrender.com/job/createdby/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(`Failed to fetch jobs. Status: ${response.status}`);
      }

      setJobs(result.jobs || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewApplicants = (jobId) => {
    navigate(`/job/${jobId}/applicants`);
  };

  const handleDeleteJob = async () => {
    const token = Cookies.get("token");

    if (!token) {
      setError("User not authenticated. Please log in.");
      return;
    }

    try {
      const response = await fetch(`https://jobquick.onrender.com/job/${selectedJob}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete job. Status: ${response.status}`);
      }

      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== selectedJob));
      setShowDeletePopup(false);
      setSelectedJob(null);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="space-y-4 text-center">
          <Briefcase className="w-12 h-12 mx-auto text-teal-600 animate-pulse" />
          <p className="text-lg text-gray-600 font-medium">Loading your jobs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-gray-800 mb-2">Error Occurred</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <div className="w-1/4 h-screen fixed">
        <JobHostingSidebar />
      </div>

      <main className="w-3/4 ml-auto p-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Job Listings</h1>
          <p className="text-gray-600">Manage and track your posted job opportunities</p>
        </header>

        {jobs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center max-w-2xl mx-auto">
            <Briefcase className="w-16 h-16 text-teal-600 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Jobs Posted Yet</h2>
            <p className="text-gray-600 mb-8">Start creating job listings to find the perfect candidates.</p>
            <button 
              onClick={() => navigate('/post-job')}
              className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors duration-200"
            >
              Post Your First Job
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">{job.title}</h2>
                    <Badge variant="secondary" className="ml-4">
                      {job.jobType}
                    </Badge>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center text-gray-700">
                      <Briefcase className="w-5 h-5 mr-3 text-teal-600" />
                      <span className="font-medium">{job.companyName}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-5 h-5 mr-3 text-teal-600" />
                      <span>{job.location}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <Users className="w-5 h-5 mr-3 text-teal-600" />
                      <span>{job.noOfOpeaning} openings</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-6">
                      {job.skills?.map((skill, index) => (
                        <Badge key={index} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6 border-t border-gray-100">
                    <button
                      onClick={() => handleViewApplicants(job._id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors duration-200"
                    >
                      <UserCheck className="w-5 h-5" />
                      View Applicants
                    </button>

                    <button
                      onClick={() => {
                        setSelectedJob(job._id);
                        setShowDeletePopup(true);
                      }}
                      className="flex items-center justify-center p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Delete Job Listing</h2>
            <p className="text-gray-600 mb-8">Are you sure you want to delete this job listing? This action cannot be undone.</p>
            <div className="flex gap-4">
              <button
                onClick={handleDeleteJob}
                className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeletePopup(false)}
                className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyJobs;