import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  BriefcaseBusiness,
  Clock,
  Wallet,
  MapPin,
  Calendar,
  Mail,
  Globe,
  PhoneCall,
  Users,
  Building,
} from "lucide-react";
import Header from "../../../jobSeeker/commonSeeker/Header";
import Footer from "../../../jobSeeker/commonSeeker/Footer";
import Cookies from "js-cookie";
import axios from "axios";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profile, setProfile] = useState(null);
  const [modalMessage, setModalMessage] = useState("");

  // Use the same cookie names as in code 1
  const token = Cookies.get("Token") || Cookies.get("JwtToken");
  const userId = Cookies.get("Id") || Cookies.get("userID");

  // API endpoints from code 1
  const jobDetailsAPI = `https://jobquick.onrender.com/job/${id}`;
  const jobApplyAPI = `https://jobquick.onrender.com/applicants`;
  const userProfileApi = `https://jobquick.onrender.com/seekuser/${userId}`;
  const checkApplyApi = `https://jobquick.onrender.com/applicants/check?jobId=${id}&applicantId=${userId}`;

  useEffect(() => {
    const fetchAllData = async () => {
      if (!token) {
        setError("User authentication failed. Please log in.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        // Check if user has already applied
        const appliedResponse = await axios.get(checkApplyApi, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (appliedResponse.data && appliedResponse.data.applied) {
          setHasApplied(true);
        }
        
        // Fetch job details
        const response = await axios.get(jobDetailsAPI, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          setJob(response.data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load job details.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchAllData();
    }
  }, [id, token, checkApplyApi, jobDetailsAPI]);

  // Fetch user profile for profile completeness check
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(userProfileApi, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          setProfile(response.data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchUserProfile();
  }, [userProfileApi, token]);

  // Check if profile is complete
  const isProfileComplete = () => {
    if (!profile) return false;

    const requiredFields = ["fullName", "city", "phoneNumber", "gender"];
    const missingFields = requiredFields.filter((field) => !profile[field]);

    if (missingFields.length > 0) {
      const formattedFields = missingFields
        .map((field) => field.replace(/([A-Z])/g, " $1").toLowerCase())
        .join(", ");
      setModalMessage(
        `Please complete your profile. Missing fields: ${formattedFields}`
      );
      return false;
    }
    return true;
  };

  // Handle apply button click
  const handleApplyNow = async () => {
    // Check if profile is complete first
    if (!isProfileComplete()) {
      setShowProfileModal(true);
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        jobApplyAPI,
        {
          jobId: id,
          applicantId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        setHasApplied(true);
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error("Error applying for job:", error);
      if (error.response?.status === 400) {
        setHasApplied(true);
        setShowModal(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const KeyMetric = ({ icon: Icon, label, value }) => (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-teal-600" />
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="font-medium text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600 animate-pulse">
          Loading job details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600 font-semibold">Job not found</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-[80vh] bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl sm:max-w-3xl lg:max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6 relative">
            <div className="p-6 sm:p-8">
              {/* Apply Button Positioned at Top Right */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                <button
                  onClick={handleApplyNow}
                  disabled={hasApplied || isLoading}
                  className={`py-2 px-4 rounded-lg font-semibold shadow-sm transition-colors duration-200 
                  ${
                    hasApplied
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : isLoading
                      ? "bg-gray-300 cursor-wait text-white"
                      : "bg-teal-600 text-white hover:bg-teal-700"
                  }`}
                >
                  {hasApplied ? "Applied" : isLoading ? "Processing..." : "Apply Now"}
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-6">
                <img
                  src="https://www.pngkey.com/png/full/191-1911374_company-building-png-office-building-png.png"
                  alt={job?.companyName}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover bg-gray-100"
                />
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    {job?.title}
                  </h1>
                  <p className="text-lg sm:text-xl text-teal-600 font-semibold mb-4">
                    {job?.companyName}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                    <KeyMetric
                      icon={Wallet}
                      label="Salary Range"
                      value={
                        job?.minPackage
                          ? `${job.minPackage} - ${job.maxPackage}`
                          : "Not disclosed"
                      }
                    />
                    <KeyMetric
                      icon={MapPin}
                      label="Location"
                      value={job?.location || "Remote"}
                    />
                    <KeyMetric
                      icon={Clock}
                      label="Job Type"
                      value={job?.jobType || "Not specified"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Job Description */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                  Job Description
                </h2>
                <p className="text-gray-600 whitespace-pre-line">
                  {job?.jobDescription}
                </p>
              </div>

              {/* Requirements */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                  Requirements
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-md sm:text-lg font-medium text-gray-900 mb-2">
                      Education
                    </h3>
                    <p className="text-gray-600">
                      {job?.minEducation || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-md sm:text-lg font-medium text-gray-900 mb-2">
                      Experience
                    </h3>
                    <p className="text-gray-600">
                      {job?.experience || "Not specified"}
                    </p>
                  </div>
                  {job?.skills && (
                    <div>
                      <h3 className="text-md sm:text-lg font-medium text-gray-900 mb-2">
                        Required Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-teal-50 text-teal-600 px-3 py-1 rounded text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar with Company Info */}
            <div className="space-y-6">
              {/* Company Info */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Company Details
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Building className="w-5 h-5 text-teal-600" />
                    <div>
                      <p className="text-sm text-gray-500">
                        Number of employees
                      </p>
                      <p className="font-medium text-gray-900">
                        {job?.numOfEmployee || "Not specified"} employees
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-teal-600" />
                    <div>
                      <p className="text-sm text-gray-500">Website</p>
                      <a
                        href={job?.companyURL}
                        className="font-medium text-blue-700 hover:text-blue-700 hover:underline"
                      >
                        {job?.companyURL || "Not available"}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-teal-600" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">
                        {job?.companyEmail || "Not available"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <PhoneCall className="w-5 h-5 text-teal-600" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium text-gray-900">
                        {job?.phoneNo || "Not available"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Details */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Additional Details
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-teal-600" />
                    <div>
                      <p className="text-sm text-gray-500">
                        Application Deadline
                      </p>
                      <p className="font-medium text-gray-900">
                        {job?.applicationDeadline || "Not specified"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-teal-600" />
                    <div>
                      <p className="text-sm text-gray-500">
                        Number of Openings
                      </p>
                      <p className="font-medium text-gray-900">
                        {job?.noOfOpeaning || "Not specified"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <BriefcaseBusiness className="w-5 h-5 text-teal-600" />
                    <div>
                      <p className="text-sm text-gray-500">Work Type</p>
                      <p className="font-medium text-gray-900">
                        {job?.workType || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Already Applied Modal */}
      {/* {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl w-11/12 sm:w-96 mx-auto">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
              Application Status
            </h2>
            <p className="text-gray-600">
              You have already submitted your application for this position.
            </p>
            <button
              className="mt-6 w-full py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )} */}

      {/* Success Modal */}
      {showSuccessModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Application Submitted Successfully!
        </h2>
        <p className="text-gray-600">
          Thank you for applying. We will review your application and get back to you soon.
        </p>
        <button
          className="mt-6 w-full py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200"
          onClick={() => setShowSuccessModal(false)}
        >
          Close
        </button>
      </div>
    </div>
    
      )}

      {/* Profile Incomplete Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-red-600 mb-4">
              Incomplete Profile
            </h2>
            <p className="text-gray-700">{modalMessage}</p>
            <div className="mt-6 flex justify-between">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                onClick={() => setShowProfileModal(false)}
              >
                Close
              </button>
              <Link
                to="/user-profile"
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              >
                Complete Profile
              </Link>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default JobDetails;