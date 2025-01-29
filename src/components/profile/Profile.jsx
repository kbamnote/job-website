import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Briefcase,
  Activity,
  GraduationCap,
} from "lucide-react";
import Header from "../common/Header";
import Footer from "../common/Footer";

const Profile = () => {
  const userApi = `http://jobquick.onrender.com/seekuser/update/${localStorage.getItem(
    "userId"
  )}`;

  const initialFormState = {
    fullName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    designation: "",
    skills: [],
    education: {
      degree: "",
      institution: "",
      startYear: "",
      endYear: "",
    },
    workExperience: [
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
      },
    ],
    // profileImg: "",
  };

  const [userData, setUserData] = useState(() => {
    const savedData = localStorage.getItem("userProfile");
    return savedData ? JSON.parse(savedData) : null;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (userData) {
      setFormData(userData);
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSkillsChange = (e) => {
    const skillsArray = e.target.value
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill !== "");
    setFormData((prev) => ({
      ...prev,
      skills: skillsArray,
    }));
  };

  const handleWorkExperienceChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedExperience = [...prev.workExperience];
      updatedExperience[index] = {
        ...updatedExperience[index],
        [field]: value,
      };
      return { ...prev, workExperience: updatedExperience };
    });
  };

  const addWorkExperience = () => {
    setFormData((prev) => ({
      ...prev,
      workExperience: [
        ...prev.workExperience,
        { company: "", position: "", startDate: "", endDate: "" },
      ],
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          profileImg: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const requiredFields = ["fullName", "email", "phoneNumber"];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      alert(
        `Please fill in the following required fields: ${missingFields.join(
          ", "
        )}`
      );
      return false;
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      alert("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(userApi, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUserData(updatedUser);
        localStorage.setItem("userProfile", JSON.stringify(updatedUser));
        setIsEditing(false);
        alert("Profile updated successfully!");
      } else {
        const error = await response.json();
        alert(`Failed to update profile: ${error.message}`);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("An error occurred while updating your profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const InfoItem = ({ icon: Icon, label, value }) => (
    <div className="bg-gray-100 rounded-xl p-4 hover:shadow-lg transition-transform transform hover:scale-105">
      <div className="flex items-center gap-3">
        <Icon className="w-6 h-6 text-teal-600" />
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="font-semibold text-gray-900">
            {value || "Not Provided"}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-r from-purple-50 to-indigo-50 p-6">
        <div className="bg-white shadow-2xl rounded-3xl p-8 max-w-5xl mx-auto">
          {!isEditing ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col lg:flex-row items-center lg:items-start gap-10"
            >
              {/* Profile Section */}
              <div className="w-full lg:w-1/3 text-center">
                <div className="relative inline-block">
                  <div className="w-44 h-44 rounded-full overflow-hidden ring-4 ring-teal-600 ring-offset-4">
                    <img
                      src={formData.profileImg || "/api/placeholder/160/160"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mt-6 text-gray-800">
                  {formData.fullName}
                </h2>
                <p className="text-lg text-teal-500 font-medium mt-2">
                  {formData.designation}
                </p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-6 px-6 py-2 bg-teal-600 text-white font-medium rounded-full shadow-md hover:bg-teal-700 transform hover:scale-105 transition-transform"
                >
                  Edit Profile
                </button>
              </div>

              {/* Details Section */}
              <div className="w-full lg:w-2/3 space-y-8">
                {/* Personal Details */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-teal-600" />
                    Personal Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <InfoItem
                      icon={Calendar}
                      label="Date of Birth"
                      value={formData.dateOfBirth}
                    />
                    <InfoItem
                      icon={Mail}
                      label="Email"
                      value={formData.email}
                    />
                    <InfoItem
                      icon={MapPin}
                      label="Location"
                      value={`${formData.city}, ${formData.state}, ${formData.country}`}
                    />
                    <InfoItem
                      icon={Phone}
                      label="Phone"
                      value={formData.phoneNumber}
                    />
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <GraduationCap className="w-6 h-6 text-teal-600" />
                    Education
                  </h3>
                  <div className="bg-gray-100 rounded-xl p-4">
                    <p className="font-medium">{formData.education.degree}</p>
                    <p className="text-gray-600">
                      {formData.education.institution}
                    </p>
                    <p className="text-gray-500">
                      {formData.education.startYear} -{" "}
                      {formData.education.endYear}
                    </p>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Award className="w-6 h-6 text-teal-600" />
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Work Experience */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Briefcase className="w-6 h-6 text-teal-600" />
                    Work Experience
                  </h3>
                  <div className="space-y-4">
                    {formData.workExperience.map((exp, index) => (
                      <div key={index} className="bg-gray-100 rounded-xl p-4">
                        <p className="font-medium">{exp.position}</p>
                        <p className="text-gray-600">{exp.company}</p>
                        <p className="text-gray-500">
                          {exp.startDate} - {exp.endDate || "Present"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              {/* Personal Information */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Designation
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Profile Photo
                  </label>
                  <input
                    type="file"
                    onChange={handlePhotoChange}
                    accept="image/*"
                    className="mt-1 block w-full"
                  />
                </div> */}
              </div>

              {/* Address Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Education */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700">Education</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Degree
                    </label>
                    <input
                      type="text"
                      name="education.degree"
                      value={formData.education.degree}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Institution
                    </label>
                    <input
                      type="text"
                      name="education.institution"
                      value={formData.education.institution}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Start Year
                    </label>
                    <input
                      type="text"
                      name="education.startYear"
                      value={formData.education.startYear}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      End Year
                    </label>
                    <input
                      type="text"
                      name="education.endYear"
                      value={formData.education.endYear}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Skills (comma-separated)
                </label>
                <textarea
                  value={formData.skills.join(", ")}
                  onChange={handleSkillsChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  rows="3"
                  placeholder="e.g., JavaScript, React, Node.js"
                />
              </div>

              {/* Work Experience */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700">
                  Work Experience
                </h3>
                {formData.workExperience.map((exp, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 border rounded-lg"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Company
                      </label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) =>
                          handleWorkExperienceChange(
                            index,
                            "company",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Position
                      </label>
                      <input
                        type="text"
                        value={exp.position}
                        onChange={(e) =>
                          handleWorkExperienceChange(
                            index,
                            "position",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={exp.startDate}
                        onChange={(e) =>
                          handleWorkExperienceChange(
                            index,
                            "startDate",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={exp.endDate}
                        onChange={(e) =>
                          handleWorkExperienceChange(
                            index,
                            "endDate",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addWorkExperience}
                  className="mt-2 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                >
                  Add Work Experience
                </button>
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors disabled:bg-teal-300"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </motion.form>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
