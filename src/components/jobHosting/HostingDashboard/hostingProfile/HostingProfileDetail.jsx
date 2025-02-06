import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import JobHostingSidebar from "../jobHostingSidebar";
import Cookies from "js-cookie";

const HostingProfileDetail = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const [image, setImage] = useState(null);
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(true);

  const HostId = Cookies.get("user");
  const HostToken = Cookies.get("token");

  const hostDetailApi = `https://jobquick.onrender.com/hostuser/update/${HostId}`;
  const getHostDetailApi = `https://jobquick.onrender.com/hostuser/${HostId}`;

  // Fetch existing data
  useEffect(() => {
    fetch(getHostDetailApi, {
      headers: { Authorization: `Bearer ${HostToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setFullName(data.fullName || "");
        setCity(data.city || "");
        setAddress(data.address || "");
        setPincode(data.pincode || "");
        setState(data.state || "");
        setCountry(data.country || "");
        setGender(data.gender || "");
        setPhoneNumber(data.phoneNumber || "");
        setImage(data.image || null);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleHostData = (e) => {
    e.preventDefault();

    const details = {
      city,
      fullName,
      address,
      phoneNumber,
      gender,
      state,
      pincode,
      country,
      image,
    };

    fetch(hostDetailApi, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HostToken}`,
      },
      body: JSON.stringify(details),
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/hosting-detail-form"); // Navigate after successful update
      })
      .catch((err) => console.error(err));
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <>
      <div className="flex">
        {/* Sidebar - Fixed Left */}
        <JobHostingSidebar />

        {/* Form Section - Right Side (80% Width) */}
        <div className="w-4/5 ml-auto flex justify-center items-center min-h-screen bg-gray-100 p-6">
          <div className="w-4/5 max-w-4xl bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            {/* Title */}
            <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-teal-500 to-teal-600 bg-clip-text text-transparent mb-8">
              Hoster Details
            </h2>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleHostData}>
              {/* Upload Profile Image */}
              {/* <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files)}
                  className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500"
                />
              </div> */}

              {/* Grid Layout for Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="block w-full outline-teal-600 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="block w-full outline-teal-600 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="block w-full outline-teal-600 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="block outline-teal-600 w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="block w-full outline-teal-600 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="block w-full outline-teal-600 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                {/* Pincode */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pincode
                  </label>
                  <input
                    type="number"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="block w-full outline-teal-600 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Submit & Reset Buttons */}
              <div className="flex gap-4">
                {/* Submit Button */}

                {/* Reset Button */}
                <button
                  type="reset"
                  onClick={() => {
                    setFullName("");
                    setGender("");
                    setPhoneNumber("");
                    setCity("");
                    setAddress("");
                    setState("");
                    setCountry("");
                    setPincode("");
                    setImage(null);
                  }}
                  className=" bg-gray-400 text-white py-3 px-6 rounded-lg shadow-lg  cursor-pointer transition-transform duration-200 ease-in-out"
                >
                  Reset
                </button>

                <button
                  type="submit"
                  className=" bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 px-6 rounded-lg shadow-lg cursor-pointer transition-transform duration-200 ease-in-out"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default HostingProfileDetail;