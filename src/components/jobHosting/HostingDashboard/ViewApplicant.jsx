import React, { useEffect, useState } from "react";
import { User, Mail, MapPin, Star } from "lucide-react";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";

import JobHostingSidebar from "./jobHostingSidebar";

const ViewApplicant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("all");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const token = Cookies.get("token");

  const fetchApplicants = async (mode, pageNum, isLoadMore = false) => {
    if (!token) {
      setError("Authentication required");
      setIsLoading(false);
      return;
    }

    try {
      const url = `https://jobquick.onrender.com/applicants?jobId=${id}&page=${pageNum}&limit=6${
        mode === "shortlisted" ? "&shortListed=true" : ""
      }`;
      
      setIsLoadingMore(isLoadMore);
      
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch applicants");
      }

      const data = await response.json();
      
      if (isLoadMore) {
        setApplicants(prev => [...prev, ...data.applicants]);
      } else {
        setApplicants(data.applicants);
      }
      
      setHasMore(data.pagination.hasNextPage);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      setPage(1);
      fetchApplicants(viewMode, 1);
    }
  }, [id, token, viewMode]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchApplicants(viewMode, nextPage, true);
  };

  const handleViewProfile = (application) => {
    navigate(`/applicant/${application._id}`, { state: { application } });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin w-14 h-14 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 font-medium">Loading applicants...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md">
          <p className="text-red-500 text-lg font-semibold mb-2">{error}</p>
          <p className="text-gray-500">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="lg:w-1/4 w-0 h-screen fixed">
        
        <JobHostingSidebar/>
      </div>

      <div className="ml-0 lg:ml-80 flex-1 min-h-screen p-2 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="bg-white rounded-xl shadow-md lg:p-6 p-2 mb-8">
            <h1 className="lg:text-3xl text-xl lg:text-left text-center font-bold text-teal-600">
              {viewMode === 'all' ? 'Job Applicants' : 'Shortlisted Applicants'}
            </h1>

            {/* Tab Navigation */}
            <div className="flex gap-6 mt-6">
              <button
                className={`px-4 py-3 font-semibold transition-all duration-200 ${
                  viewMode === "all"
                    ? "text-teal-600 border-b-2 border-teal-600"
                    : "text-gray-500 hover:text-teal-600 cursor-pointer"
                }`}
                onClick={() => setViewMode("all")}
              >
                All Applicants
              </button>
              <button
                className={`px-4 py-3 font-semibold transition-all duration-200 ${
                  viewMode === "shortlisted"
                    ? "text-teal-600 border-b-2 border-teal-600"
                    : "text-gray-500 hover:text-teal-600 cursor-pointer"
                }`}
                onClick={() => setViewMode("shortlisted")}
              >
                Shortlisted
              </button>
            </div>
          </div>

          <div className="mt-6">
            {applicants.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <p className="text-lg text-gray-600">
                  {viewMode === "shortlisted"
                    ? "No shortlisted applicants yet."
                    : "No applicants yet."}
                </p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-6">
                  {applicants.map((application) => (
                    <div
                      key={application._id}
                      className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-teal-100 rounded-xl">
                          <User className="text-teal-600 w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">
                            {application?.applicantId?.fullName || "N/A"}
                          </h3>
                          <p className="text-gray-500">
                            {application?.applicantId?.email || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 space-y-3">
                        <div className="flex items-center gap-3 text-gray-600">
                          <Mail className="w-5 h-5 text-teal-500" />
                          <span>{application?.applicantId?.email || "N/A"}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                          <MapPin className="w-5 h-5 text-teal-500" />
                          <span>{application?.applicantId?.city || "N/A"}</span>
                        </div>
                        <div className="flex items-center gap-4 text-gray-600">
                          <Mail className="w-5 h-5 text-teal-500" />
                          <span>{application?.applicantId?.skills?.join(" ") || "N/A"}</span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="mt-6">
                        {application.shortListed ? (
                          <span className="px-4 py-2 bg-teal-50 text-teal-600 rounded-lg text-sm font-semibold inline-flex items-center gap-2">
                            <Star className="w-4 h-4" />
                            Shortlisted
                          </span>
                        ) : (
                          <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-semibold">
                            Under Review
                          </span>
                        )}
                      </div>

                      <div className="mt-6">
                        <button
                          onClick={() => handleViewProfile(application)}
                          className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-all duration-200"
                        >
                          View Profile
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Load More Button */}
                {hasMore && (
                  <div className="mt-8 text-center">
                    <button
                      onClick={handleLoadMore}
                      disabled={isLoadingMore}
                      className="px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-all duration-200 disabled:bg-teal-300"
                    >
                      {isLoadingMore ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Loading...
                        </div>
                      ) : (
                        'Load More'
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewApplicant;