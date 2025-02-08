import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";
import ShowJobs from "./ShowJobs";
import { UserPen, MapPin, Briefcase, GraduationCap, User } from "lucide-react";

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="animate-spin rounded-full h-16 w-16 border-4 border-teal-500 border-t-transparent"></div>
  </div>
);

const ErrorDisplay = ({ message }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="bg-red-50 border-l-4 border-red-500 p-8 rounded-lg">
      <p className="text-xl text-red-700 font-medium">{message}</p>
    </div>
  </div>
);

const ProfileHeader = ({ fullName, email, onDelete }) => (
  <div className="relative">
    {/* Header Background */}
    <div className="h-60 bg-teal-600 rounded-t-2xl"></div>

    {/* Profile Content */}
    <div className="relative bg-white rounded-2xl shadow-xl mx-4 -mt-24 p-6">
      <div className="flex flex-col items-center">
        {/* Static Profile Image with Online Indicator */}
        <div className="relative">
          <img
            src="https://www.pngmart.com/files/21/Admin-Profile-PNG-Isolated-Pic.png"
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-white"
          />
          <div className="absolute bottom-2 right-2">
            <div className="w-4 h-4 bg-green-500 rounded-full border2 border-white"></div>
            <div className="absolute inset-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-ping"></div>
          </div>
        </div>

        {/* User Info */}
        <div className="mt-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            {fullName || "Admin"}
          </h1>
          <p className="text-gray-600">{email}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <Link to="/user-detail">
            <button className="flex cursor-pointer items-center gap-2 px-6 py-2 bg-indigo-50 text-blue-600 rounded-lg hover:bg-indigo-100 transition-colors duration-200">
              <UserPen size={18} />
              <span>Edit Profile</span>
            </button>
          </Link>
          <button
            onClick={onDelete}
            className="flex items-center  cursor-pointer gap-2 px-6 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>Delete Account</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

const InfoCard = ({ title, children, icon: Icon }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 bg-indigo-50 rounded-lg">
        <Icon className="w-6 h-6 text-teal-600" />
      </div>
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  </div>
);

const DetailField = ({ label, value, isLink = false }) => (
  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
    <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
    {isLink ? (
      <a
        href={value}
        className="text-blue-800 hover:text-blue-800 hover:underline font-medium break-all"
      >
        {value}
      </a>
    ) : (
      <p className="text-gray-900 font-medium">{value || "Not specified"}</p>
    )}
  </div>
);

const Skills = ({ skills }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
    <h2 className="text-xl font-bold text-gray-800 mb-6">Skills</h2>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <span
          key={index}
          className="px-4 py-2 bg-indigo-50 text-teal-600 rounded-lg font-medium"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const Profile = () => {
  const [seeker, setSeeker] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const userId = Cookies.get("userID");
  const userToken = Cookies.get("JwtToken");
  const userProfileApi = `https://jobquick.onrender.com/seekuser/${userId}`;
  

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(userProfileApi, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setSeeker(data);
      } catch (error) {
        console.error("Error fetching host profile:", error);
        setError("Failed to load profile details.");
      }
    };

    fetchUserProfile();
  }, [userProfileApi, userToken]);

  const handleDeleteProfile = async (userId) => {
    if (!userId || !userToken) {
      setError("Missing user ID or authentication token");
      return;
    }
  
    try {
      // First confirm with the user
      const confirmDelete = window.confirm("Are you sure you want to delete your profile? This action cannot be undone.");
      if (!confirmDelete) return;
  
      const deleteProfileUrl = `https://jobquick.onrender.com/seekuser/delete/${userId}`;
      
      const response = await fetch(deleteProfileUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      });
  
      const result = await response.json();
      
      if (response.ok) {
        console.log("Profile deleted successfully");
        // Clear cookies and navigate
        Cookies.remove("JwtToken");
        Cookies.remove("userID");
        navigate("/");
      } else {
        // Handle specific error cases
        if (response.status === 401) {
          throw new Error("Unauthorized. Please log in again.");
        } else if (response.status === 404) {
          throw new Error("Profile not found.");
        } else {
          throw new Error(result.message || "Failed to delete profile");
        }
      }
    } catch (error) {
      console.error("Delete profile Error:", error);
      setError(error.message || "Failed to delete profile. Please try again.");
      
      // If it's an authentication error, redirect to login
      if (error.message.includes("Unauthorized")) {
        Cookies.remove("JwtToken");
        Cookies.remove("userID");
        navigate("/login");
      }
    }
  };

  if (error) return <ErrorDisplay message={error} />;
  if (!seeker) return <LoadingSpinner />;

  if (error) return <ErrorDisplay message={error} />;
  if (!seeker) return <LoadingSpinner />;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-8">
          <ProfileHeader
            fullName={seeker.fullName}
            email={seeker.email}
            onDelete={() => handleDeleteProfile(userId)}
          />

          <div className="grid grid-cols-1 gap-8 px-4 mt-8">
            <InfoCard title="Personal Details" icon={User}>
              <DetailField label="Gender" value={seeker.gender} />
              <DetailField label="Date of Birth" value={seeker.dateOfBirth} />
              <DetailField label="Phone Number" value={seeker.phoneNumber} />
              <DetailField
                label="Github Profile"
                value={seeker.projectUrl}
                isLink={true}
              />
            </InfoCard>

            <InfoCard title="About Me" icon={User}>
              <div className="col-span-2">
                <DetailField label="Summary" value={seeker.summary} />
              </div>
            </InfoCard>

            <InfoCard title="Location" icon={MapPin}>
              <DetailField label="Address" value={seeker.address} />
              <DetailField label="City" value={seeker.city} />
              <DetailField label="State" value={seeker.state} />
              <DetailField label="Country" value={seeker.country} />
              <DetailField label="Pincode" value={seeker.pincode} />
            </InfoCard>

            <InfoCard title="Education" icon={GraduationCap}>
              <DetailField label="Degree" value={seeker.eduDegree} />
              <DetailField label="University" value={seeker.eduInstitution} />
              <DetailField
                label="Specialization"
                value={seeker.eduSpecialisation}
              />
              <DetailField label="Start Year" value={seeker.eduStartYear} />
              <DetailField label="End Year" value={seeker.eduEndYear} />
            </InfoCard>

            <InfoCard title="Work Experience" icon={Briefcase}>
              <DetailField label="Company" value={seeker.expCompany} />
              <DetailField label="Position" value={seeker.expPosition} />
              <DetailField label="Start Date" value={seeker.expStartYear} />
              <DetailField label="End Date" value={seeker.expEndYear} />
            </InfoCard>

            <Skills skills={seeker.skills} />

            <div className="bg-white rounded-xl shadow-lg p-6">
              <ShowJobs />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;