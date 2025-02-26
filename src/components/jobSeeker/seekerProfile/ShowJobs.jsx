import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Briefcase, Building, MapPin, Clock, Award, DollarSign, Code, Users } from "lucide-react";

const ShowJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    showJobs();
  }, []);

  const showJobs = async (pageNumber = 1) => {
    const userId = Cookies.get("userID");
    const userToken = Cookies.get("JwtToken");
    setLoading(true);

    try {
      const response = await fetch(
        `https://jobquick.onrender.com/applicants?applicantId=${userId}&page=${pageNumber}&limit=2`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          `Failed to fetch jobs. Status: ${response.status}, Message: ${
            result.message || "Unknown error"
          }`
        );
      }

      if (result.success) {
        const jobDetails = result.applicants.map((application) => application.jobId);
        
        if (pageNumber === 1) {
          setJobs(jobDetails);
        } else {
          setJobs((prevJobs) => [...prevJobs, ...jobDetails]);
        }
        
        setHasMore(result.pagination.hasNextPage);
      } else {
        setJobs([]);
        setHasMore(false);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    showJobs(nextPage);
  };

  if (error) {
    return (
      <div className="p-6 bg-red-50 rounded-lg mt-8">
        <p className="text-red-600 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="mt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Your Job Applications
          <span className="block h-1 w-24 bg-teal-600 mx-auto mt-2"></span>
        </h2>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-xl shadow-sm">
          <Briefcase className="w-12 h-12 text-teal-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">No job applications found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {job.title}
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Building className="w-5 h-5 text-teal-600 flex-shrink-0" />
                    <span className="text-gray-600">{job.companyName}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-teal-600 flex-shrink-0" />
                    <span className="text-gray-600">{job.location}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-teal-600 flex-shrink-0" />
                    <span className="text-gray-600">{job.jobType}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-teal-600 flex-shrink-0" />
                    <span className="text-gray-600">{job.experience}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-teal-600 flex-shrink-0" />
                    <span className="text-gray-600">
                      {job.minPackage} - {job.maxPackage}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <Code className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                    <div className="flex flex-wrap gap-2">
                      {job.skills?.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-teal-600 flex-shrink-0" />
                    <span className="text-gray-600">
                      {job.noOfOpeaning} openings
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Load More Jobs"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowJobs;
