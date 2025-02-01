import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Cookies from "js-cookie";

const HostingProfileDetail = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const [image, setImage] = useState(null);
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [companyURL, setCompanyURL] = useState("");
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
        setCompanyURL(data.companyURL || "");
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
      companyURL,
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
        
        navigate("/hosting-profile-form"); // Navigate after successful update
      })
      .catch((err) => console.error(err));
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-4xl font-bold text-black mb-6 text-center bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text">
        Hoster Details
      </h2>
      <form className="space-y-6 p-4" onSubmit={handleHostData}>
        {/* Input Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files)}
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-1 px-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State
          </label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pincode
          </label>
          <input
            type="number"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white py-3 px-4 rounded-md hover:bg-indigo-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default HostingProfileDetail;
