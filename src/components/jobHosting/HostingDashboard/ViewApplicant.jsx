import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  MapPin,
  Star,
  GraduationCap,
  Briefcase,
  Download,
} from "lucide-react";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import JobHostingSidebar from "./jobHostingSidebar";

const ViewApplicant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = Cookies.get("token");

  useEffect(() => {
    const fetchApplicants = async () => {
      if (!token) {
        setError("Authentication required");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://jobquick.onrender.com/applicants?jobId=${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch applicants");
        }

        const data = await response.json();
        console.log(data);

        if (Array.isArray(data)) {
          setApplicants(data); // Store the entire application object
        } else {
          setApplicants([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchApplicants();
    }
  }, [id, token]);

  const handleViewProfile = (application) => {
    navigate(`/applicant/${application._id}`, { state: { application } });
  };

  const handleExportAll = () => {
    console.log("Exporting all applicants...");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-xl text-teal-700">Loading applicants...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50">
        <div className="bg-white p-8 rounded-xl shadow-2xl text-center">
          <p className="text-2xl text-red-500 mb-4">{error}</p>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 w-62 lg:w-80 h-screen">
        <JobHostingSidebar />
      </div>

      {/* Main Content */}
      <div className="ml-62 lg:ml-80 flex-1 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-y-auto">
        <div className="p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header Section */}
              <div className="bg-gradient-to-r from-teal-600 to-teal-600 px-8 py-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                    <User className="w-8 h-8" />
                    Job Applicants
                  </h2>
                  <button
                    onClick={handleExportAll}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center gap-2 transition-all duration-200"
                  >
                    <Download className="w-4 h-4" />
                    Export All
                  </button>
                </div>
              </div>

              <div className="p-8">
                {applicants?.length === 0 ? (
                  <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                    <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-xl font-semibold text-gray-600 mb-2">
                      No applicants yet
                    </p>
                    <p className="text-gray-500">
                      Applications will appear here when candidates apply
                    </p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-8">
                    {applicants?.map((application) => (
                      <div
                        key={application?._id}
                        className="group bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
                      >
                        <div className="p-6 flex-1 space-y-5">
                          {/* Header */}
                          <div className="flex items-center gap-4">
                            <div className="bg-gradient-to-br from-teal-100 to-blue-100 p-4 rounded-xl">
                              <User className="w-8 h-8 text-teal-600" />
                            </div>
                            <div>
                              <div className="flex items-center gap-20">
                                <h3 className="font-bold text-xl text-gray-900 group-hover:text-teal-600 transition-colors">
                                  {application?.applicantId?.fullName || "N/A"}
                                </h3>
                                <button
                                  onClick={() => handleViewProfile(application)}
                                  className="px-4 py-2 bg-teal-600 hover:bg-teal-800 text-white rounded-lg flex items-center gap-2 transition-all duration-200"
                                >
                                  View Full Profile
                                </button>
                              </div>
                              <p className="text-sm text-gray-500">
                                Applicant Profile
                              </p>
                            </div>
                          </div>

                          {/* Contact Information */}
                          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-3">
                              <Mail className="w-5 h-5 text-teal-600" />
                              <div>
                                <p className="text-xs text-gray-500">Email</p>
                                <p className="font-medium text-gray-900 truncate">
                                  {application?.applicantId?.email || "N/A"}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <MapPin className="w-5 h-5 text-teal-600" />
                              <div>
                                <p className="text-xs text-gray-500">City</p>
                                <p className="font-medium text-gray-900">
                                  {application?.applicantId?.city || "N/A"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewApplicant;
