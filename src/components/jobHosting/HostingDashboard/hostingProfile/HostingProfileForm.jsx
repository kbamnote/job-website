import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobHostingSidebar from "../jobHostingSidebar";
import Cookies from "js-cookie";
import { Pencil } from "lucide-react"; // Importing Pencil icon

const HostingProfileForm = () => {
  const [hoster, setHoster] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const HostId = Cookies.get("user");
  const HostToken = Cookies.get("token");
  const hostProfileApi = `https://jobquick.onrender.com/hostuser/${HostId}`;

  useEffect(() => {
    const fetchHostProfile = async () => {
      try {
        const response = await fetch(hostProfileApi, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${HostToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setHoster(data);
      } catch (error) {
        console.error("Error fetching host profile:", error);
        setError("Failed to load hoster details.");
      }
    };

    fetchHostProfile();
  }, [hostProfileApi, HostToken]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  if (!hoster) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading hoster details...</p>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Sidebar - Fixed on Left */}
      <JobHostingSidebar />

      {/* Profile Container - Right Side & Centered */}
      <div className="w-3/4 ml-auto flex justify-center items-center min-h-screen">
        <div className="w-9/10 bg-white shadow-xl rounded-2xl overflow-hidden p-6 sm:p-8 md:p-10 border border-gray-200 relative">
          {/* Edit Profile Button with Icon at Top-Right */}
          <div className="absolute top-4 right-4">
            <button
              onClick={() => navigate("/profile-hoster")}
              className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200 "
            >
              <Pencil size={18} /> {/* Pencil Icon */}
              Edit Profile
            </button>
          </div>

          {/* Profile Image & Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Profile"
                className="w-full h-full object-cover rounded-full border-4 border-teal-400 shadow-lg"
              />
            </div>

            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
                {hoster.fullName}
              </h2>
              <p className="text-gray-500 text-sm mt-1">Web Developer</p>
            </div>
          </div>

          {/* Profile Details */}
          <div className="mt-6 border-t border-gray-200 pt-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800">
              My Profile
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {[
                { label: "Full Name", value: hoster.fullName },
                { label: "City", value: hoster.city },
                { label: "State", value: hoster.state },
                { label: "Address", value: hoster.address },
                { label: "Phone Number", value: hoster.phoneNumber },

                { label: "Gender", value: hoster.gender },
                { label: "Pincode", value: hoster.pincode },
              ].map(({ label, value }, index) => (
                <div key={index}>
                  <p className="text-sm font-semibold text-gray-600">{label}</p>
                  <p className="text-base font-medium text-gray-800">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostingProfileForm;