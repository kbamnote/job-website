import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import JobHostingSidebar from "./jobHostingSidebar";
import { Briefcase, MapPin, Users, Trash2, UserCheck } from "lucide-react";

const Badge = ({ children, variant = "default", className = "" }) => {
  const baseStyles =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors";

  const variantStyles = {
    default: "bg-primary-100 text-primary-800",
    secondary: "bg-gray-100 text-gray-800",
    outline: "border border-gray-200 text-gray-700 bg-transparent",
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

    const apiUrl = `https://jobquick.onrender.com/job/createdby/${userId}`;

    try {
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          `Failed to fetch jobs. Status: ${response.status}, Message: ${
            result.message || "Unknown error"
          }`
        );
      }

      if (result.success && result.jobs) {
        setJobs(result.jobs);
      } else {
        setJobs([]);
      }
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

    const deleteUrl = `https://jobquick.onrender.com/job/${selectedJob}`;

    try {
      const response = await fetch(deleteUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          `Failed to delete job. Status: ${response.status}, Message: ${
            result.message || "Unknown error"
          }`
        );
      }

      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== selectedJob));
      setShowDeletePopup(false);
      setSelectedJob(null);
    } catch (error) {
      console.error("Delete Job Error:", error);
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-center mt-5 text-xl text-gray-500 font-semibold">
          Loading...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <h1 className="text-red-500 text-lg font-semibold">Error: {error}</h1>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-500 text-white px-6 py-2 rounded mt-4 hover:bg-red-600 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-1/4 h-screen fixed top-0 left-0">
        <JobHostingSidebar />
      </div>

      <div className="p-4 sm:w-3/4 ml-auto sm:p-8 lg:p-12">
        <h1 className="text-4xl font-bold text-center mb-8">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-700">
            My Job Listings
          </span>
        </h1>

        {jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm">
            <Briefcase className="w-16 h-16 text-gray-300 mb-4" />
            <h1 className="text-xl font-semibold text-gray-600">
              No jobs posted yet
            </h1>
            <p className="text-gray-400 mt-2">
              Create your first job listing to get started
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full"
              >
                <div className="p-6 flex flex-col h-full">
                  {/* Header Section */}
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-teal-600">
                      {job.title}
                    </h2>
                    <Badge variant="secondary">{job.jobType}</Badge>
                  </div>

                  {/* Content Section */}
                  <div className="flex-grow space-y-3">
                    <div className="flex items-center text-gray-600">
                      <Briefcase className="w-4 h-4 mr-2 text-teal-600" />
                      <span className="font-medium">{job.companyName}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-teal-600" />
                      <span>{job.location}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2 text-teal-600" />
                      <span>{job.noOfOpeaning} openings</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {job.skills?.map((skill, index) => (
                        <Badge key={index} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Buttons Section */}
                  <div className="flex gap-4 mt-6 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleViewApplicants(job._id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-teal-700 hover:to-teal-700 transition-all duration-200"
                    >
                      <UserCheck className="w-4 h-4" />
                      View Applicants
                    </button>

                    <button
                      onClick={() => {
                        setSelectedJob(job._id);
                        setShowDeletePopup(true);
                      }}
                      className="flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Popup */}
      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteJob}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Yes
              </button>
              <button
                onClick={() => setShowDeletePopup(false)}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyJobs;