import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User, Mail, MapPin, GraduationCap, Briefcase } from "lucide-react";

const ApplicantProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const applicant = location.state?.applicant;

  if (!applicant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">No applicant data found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <User className="w-8 h-8" />
          {applicant.fullName}
        </h2>
        <p className="text-gray-500">{applicant.summary || "No summary provided."}</p>

        <div className="mt-6 space-y-4">
          {/* Email & Phone */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-teal-600" />
              <span>{applicant.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-teal-600" />
              <span>{applicant.city}, {applicant.state}, {applicant.country}</span>
            </div>
          </div>

          {/* Education */}
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-teal-600" />
            <p>{applicant.eduDegree} in {applicant.eduSpecialisation} from {applicant.eduInstitution} ({applicant.eduStartYear} - {applicant.eduEndYear})</p>
          </div>

          {/* Experience */}
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-teal-600" />
            <p>{applicant.expPosition} at {applicant.expCompany} ({applicant.expStartYear} - {applicant.expEndYear})</p>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Skills</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {applicant.skills?.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-6 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-800"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ApplicantProfile;
