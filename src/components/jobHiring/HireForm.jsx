import React from 'react';

const HireForm = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <h2 className="text-lg font-medium mb-4">Job Posting</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="companyName" className="block font-medium mb-2">Company Name:</label>
          <input type="text" id="companyName" value="sales ref" className="border border-gray-300 rounded-md px-3 py-2 w-full" disabled />
        </div>
        <div>
          <label htmlFor="jobTitle" className="block font-medium mb-2">Job Title:</label>
          <input type="text" id="jobTitle" value="Software Developer" className="border border-gray-300 rounded-md px-3 py-2 w-full" disabled />
        </div>
        <div>
          <label htmlFor="jobCategory" className="block font-medium mb-2">Job Role Category:</label>
          <input type="text" id="jobCategory" value="Software Development" className="border border-gray-300 rounded-md px-3 py-2 w-full" disabled />
        </div>
        <div>
          <label htmlFor="jobType" className="block font-medium mb-2">Job Type:</label>
          <input type="text" id="jobType" value="Full Time | Day shift" className="border border-gray-300 rounded-md px-3 py-2 w-full" disabled />
        </div>
        <div>
          <label htmlFor="workType" className="block font-medium mb-2">Work Type:</label>
          <input type="text" id="workType" value="Work from office" className="border border-gray-300 rounded-md px-3 py-2 w-full" disabled />
        </div>
        <div>
          <label htmlFor="jobLocation" className="block font-medium mb-2">Job Location:</label>
          <div className="flex flex-col">
            <input type="text" id="jobLocation" value="Nagpur" className="border border-gray-300 rounded-md px-3 py-2 w-full" disabled />
            <div className="text-blue-500 mt-1">You will be receiving applications from Nagpur Region</div>
          </div>
        </div>
        <div>
          <label htmlFor="salary" className="block font-medium mb-2">Salary:</label>
          <input type="text" id="salary" value="₹16,000 - ₹18,000 per month (Fixed only)" className="border border-gray-300 rounded-md px-3 py-2 w-full" disabled />
        </div>
        <div>
          <label htmlFor="additionalPerks" className="block font-medium mb-2">Additional Perks:</label>
          <input type="text" id="additionalPerks" value="None" className="border border-gray-300 rounded-md px-3 py-2 w-full" disabled />
        </div>
        <div>
          <label htmlFor="joiningFee" className="block font-medium mb-2">Joining Fee:</label>
          <input type="text" id="joiningFee" value="No" className="border border-gray-300 rounded-md px-3 py-2 w-full" disabled />
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-4">Candidate Requirements</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="minEducation" className="block font-medium mb-2">Minimum Education:</label>
            <input type="text" id="minEducation" value="12th Pass" className="border border-gray-300 rounded-md px-3 py-2 w-full" disabled />
          </div>
          <div>
            <label htmlFor="experience" className="block font-medium mb-2">Experience Required:</label>
            <input type="text" id="experience" value="Any" className="border border-gray-300 rounded-md px-3 py-2 w-full" disabled />
          </div>
          <div>
            <label htmlFor="englishLevel" className="block font-medium mb-2">English Level:</label>
            <input type="text" id="englishLevel" value="Basic English" className="border border-gray-300 rounded-md px-3 py-2 w-full" disabled />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-4">Preferred Requirements</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="age" className="block font-medium mb-2">Age:</label>
            <input type="text" id="age" value="18 - 60 yrs" className="border border-gray-300 rounded-md px-3 py-2 w-full" disabled />
          </div>
          <div>
            <label htmlFor="preferredRegion" className="block font-medium mb-2">Preferred Region:</label>
            <input type="text" id="preferredRegion" value="Entire Nagpur Region" className="border border-gray-300 rounded-md px-3 py-2 w-full" disabled />
          </div>
          <div>
            <label htmlFor="gender" className="block font-medium mb-2">Gender:</label>
            <input type="text" id="gender" value="Both genders allowed" className="border border-gray-300 rounded-md px-3 py-2 w-full" disabled />
          </div>
          <div>
            <label htmlFor="candidateRoles" className="block font-medium mb-2">Candidate Roles:</label>
            <input type="text" id="candidateRoles" value="None" className="border border-gray-300 rounded-md px-3 py-2 w-full" disabled />
          </div>
          <div>
            <label htmlFor="industry" className="block font-medium mb-2">Industry:</label>
            <input type="text" id="industry" value="None" className="border border-gray-300 rounded-md px-3 py-2 w-full" disabled />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <label htmlFor="jobDescription" className="block font-medium mb-2">Job Description:</label>
        <textarea id="jobDescription" value="software developer" className="border border-gray-300 rounded-md px-3 py-2 w-full h-32" disabled />
      </div>
      <div className="flex justify-between mt-6">
        <button className="bg-gray-200 text-gray-700 rounded-md px-6 py-3 hover:bg-gray-300">
          Back
        </button>
        <button className="bg-green-600 text-white rounded-md px-6 py-3 hover:bg-green-700">
          Continue
        </button>
      </div>
    </div>
  );
};

export default HireForm;