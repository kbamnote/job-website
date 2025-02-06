import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import Header from "../common/Header";
import Footer from "../common/Footer";
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
  
  const token = Cookies.get("JwtToken");
  const userId = Cookies.get("userID");
  

  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!token) {
        setError("User authentication failed. Please log in.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://jobquick.onrender.com/job/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch job details. Status: ${response.status}`
          );
        }

        const data = await response.json();
        setJob(data);
      
        
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchJobDetails();
    }
  }, [id, token]);

  const handleApplyNow = async () => {
    try {
      const response = await axios.post(
        'https://jobquick.onrender.com/applicants',
        {
          jobId: id,
          applicantId: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response && response.data) {
        console.log(response.data);
        
        if (hasApplied) {
          setShowModal(true);
          return;
        }
        setShowSuccessModal(true);
        setHasApplied(true);
      } else {
        setShowModal(true);
      }
    } catch (error) {
      console.error(
        "Error applying for job:",
        error.response?.data || error.message
      );
      setShowModal(true);
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
      <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6 relative">
            <div className="p-6 sm:p-8">
              {/* Apply Button Positioned at Top Right */}
              <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
                <button 
                  onClick={handleApplyNow}
                  disabled={hasApplied}
                  className={`py-2 px-4 rounded-lg font-semibold shadow-sm transition-colors duration-200 
                    ${hasApplied 
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-teal-600 text-white hover:bg-teal-700"
                    }`}
                >
                  {hasApplied ? "Applied" : "Apply Now"}
                </button>
              </div>

              <div className="flex items-start gap-6">
                <img
                  src= "https://www.pngkey.com/png/full/191-1911374_company-building-png-office-building-png.png"
                  alt={job?.companyName}
                  className="w-24 h-24 rounded-lg object-cover bg-gray-100"
                />
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {job?.title}
                  </h1>
                  <p className="text-xl text-teal-600 font-semibold mb-4">
                    {job?.companyName}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Job Description
                </h2>
                <p className="text-gray-600 whitespace-pre-line">
                  {job?.jobDescription}
                </p>
              </div>

              {/* Requirements */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Requirements
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Education
                    </h3>
                    <p className="text-gray-600">
                      {job?.minEducation || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Experience
                    </h3>
                    <p className="text-gray-600">
                      {job?.experience || "Not specified"}
                    </p>
                  </div>
                  {job?.skills && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
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
                      <p className="text-sm text-gray-500">Number of employees</p>
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
                      <p className="text-sm text-gray-500">Application Deadline</p>
                      <p className="font-medium text-gray-900">
                        {job?.applicationDeadline || "Not specified"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-teal-600" />
                    <div>
                      <p className="text-sm text-gray-500">Number of Openings</p>
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
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
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
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
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

      <Footer />
    </>
  );
};

export default JobDetails;