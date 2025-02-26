import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import JobHostingSidebar from "../commonHost/jobHostingSidebar";
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
 const [loadingMore, setLoadingMore] = useState(false);
 const [error, setError] = useState(null);
 const [selectedJob, setSelectedJob] = useState(null);
 const [showDeletePopup, setShowDeletePopup] = useState(false);
 const [pagination, setPagination] = useState({
 page: 1,
 limit: 10,
 total: 0,
 totalPages: 0
 });
 const navigate = useNavigate();

 useEffect(() => {
 fetchJobs();
 }, []);

 const fetchJobs = async (page = 1, loadMore = false) => {
 const userId = Cookies.get("user");
 const token = Cookies.get("token");

 if (!userId || !token) {
 setError("User not authenticated. Please log in.");
 setLoading(false);
 return;
 }

 try {
 if (loadMore) {
 setLoadingMore(true);
 }

 const response = await fetch(`https://jobquick.onrender.com/job/createdby/${userId}?page=${page}&limit=10`, {
 headers: { Authorization: `Bearer ${token}` },
 });

 const result = await response.json();

 if (!response.ok) {
 throw new Error(`Failed to fetch jobs. Status: ${response.status}`);
 }

 setPagination({
 page: result.pagination.page,
 limit: result.pagination.limit,
 total: result.pagination.total,
 totalPages: result.pagination.totalPages
 });

 if (loadMore) {
 setJobs(prevJobs => [...prevJobs, ...result.jobs]);
 } else {
 setJobs(result.jobs || []);
 }
 } catch (error) {
 setError(error.message);
 } finally {
 setLoading(false);
 setLoadingMore(false);
 }
 };

 const handleLoadMore = () => {
 if (pagination.page < pagination.totalPages) {
 fetchJobs(pagination.page + 1, true);
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
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
    {/* Sidebar */}
    <div className="w-[10px] lg:w-1/4 h-screen fixed top-0 left-0">
      <JobHostingSidebar />
    </div>
  
    {/* Main content */}
    <main className="w-full lg:ml-72 xl:ml-80 p-3 sm:p-4 lg:p-6 xl:p-4 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        <header className="text-center px-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-600">My Job Listings</h1>
          <p className="text-gray-600 mt-2">Manage and track your posted job opportunities</p>
        </header>
  
        <div className="sm:p-6 p-2">
          {jobs.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-6 sm:p-12 text-center max-w-2xl mx-auto">
              <Briefcase className="w-12 h-12 sm:w-16 sm:h-16 text-teal-600 mx-auto mb-4 sm:mb-6" />
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">No Jobs Posted Yet</h2>
              <p className="text-gray-600 mb-6 sm:mb-8">Start creating job listings to find the perfect candidates.</p>
              <button
                onClick={() => navigate('/post-job')}
                className="bg-teal-600 text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors duration-200"
              >
                Post Your First Job
              </button>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                {jobs.map((job) => (
                  <div
                    key={job._id}
                    className="bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 flex flex-col h-full"
                  >
                    <div className="p-4 sm:p-6 flex flex-col flex-grow">
                      <div className="flex items-start justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">{job.title}</h2>
                        <span className="ml-4 px-3 py-1 text-sm font-medium bg-teal-50 text-teal-700 rounded-full">
                          {job.jobType}
                        </span>
                      </div>
  
                      <div className="space-y-4 mb-8 flex-grow">
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
                            <span 
                              key={index}
                              className="px-3 py-1 text-sm bg-gray-50 text-gray-700 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
  
                      <div className="flex items-center gap-4 pt-6 border-t border-gray-100 mt-auto">
                        <button
                          onClick={() => handleViewApplicants(job._id)}
                          className="flex-1 flex items-center justify-center gap-2 bg-teal-600 text-white px-6 py-2.5 rounded-lg hover:bg-teal-700 transition-colors duration-200 font-medium shadow-sm hover:shadow-md"
                        >
                          <UserCheck className="w-5 h-5" />
                          View Applicants
                        </button>
  
                        <button
                          onClick={() => {
                            setSelectedJob(job._id);
                            setShowDeletePopup(true);
                          }}
                          className="p-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 border border-red-200 hover:border-red-300"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
  
              {pagination.page < pagination.totalPages && (
                <div className="mt-8 sm:mt-12 text-center">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="bg-white text-teal-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg border border-teal-600 hover:bg-teal-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    {loadingMore ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Loading...
                      </span>
                    ) : (
                      `Load More (${jobs.length} of ${pagination.total})`
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  
    {/* Delete Popup */}
    {showDeletePopup && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 z-50">
        <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 max-w-md w-full mx-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Delete Job Listing</h2>
          <p className="text-gray-600 mb-6 sm:mb-8">Are you sure you want to delete this job listing? This action cannot be undone.</p>
          <div className="flex gap-3 sm:gap-4">
            <button
              onClick={handleDeleteJob}
              className="flex-1 bg-red-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
            >
              Delete
            </button>
            <button
              onClick={() => setShowDeletePopup(false)}
              className="flex-1 bg-gray-100 text-gray-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
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