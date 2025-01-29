import React from 'react';
import { Link } from 'react-router';

const HireThree = () => {
  return (
    <div className="max-w-3xl mx-auto my-8">
      <h1 className="text-2xl font-bold mb-4">Post a new job</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-medium mb-4">Candidate requirements</h2>
        <label htmlFor="minEducation" className="block font-medium mb-2">Minimum Education *</label>
        <select id="minEducation" className="border border-gray-300 rounded-md px-3 py-2 w-full">
          <option value="below10th">10th Or Below 10th</option>
          <option value="12thPass">12th Pass</option>
          <option value="diploma">Diploma</option>
          <option value="iti">ITI</option>
          <option value="graduate">Graduate</option>
          <option value="postGraduate">Post Graduate</option>
        </select>
        <label htmlFor="englishLevel" className="block font-medium mt-4 mb-2">English level required *</label>
        <select id="englishLevel" className="border border-gray-300 rounded-md px-3 py-2 w-full">
          <option value="noEnglish">No English</option>
          <option value="basicEnglish">Basic English</option>
          <option value="goodEnglish">Good English</option>
        </select>
        <label htmlFor="experience" className="block font-medium mt-4 mb-2">Total experience required *</label>
        <select id="experience" className="border border-gray-300 rounded-md px-3 py-2 w-full">
          <option value="any">Any</option>
          <option value="experiencedOnly">Experienced Only</option>
          <option value="fresherOnly">Fresher Only</option>
        </select>
        <div className="mt-4">
          <span className="font-medium">Additional Requirements (Optional)</span>
          <div className="flex flex-wrap gap-2 mt-2">
            <label>
              <input type="checkbox" className="mr-2" />
              Gender
            </label>
            <label>
              <input type="checkbox" className="mr-2" />
              Age
            </label>
            <label>
              <input type="checkbox" className="mr-2" />
              Distance
            </label>
            <label>
              <input type="checkbox" className="mr-2" />
              Regional Languages
            </label>
            <label>
              <input type="checkbox" className="mr-2" />
              Skills
            </label>
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="jobDescription" className="block font-medium mb-2">Job Description</label>
          <div className="border border-gray-300 rounded-md p-2">
            {/* Job description editor */}
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <button className="bg-gray-200 text-gray-700 rounded-md px-6 py-3 hover:bg-gray-300">
            Back
          </button>
          <Link to='/hiring-four'>
          <button className="bg-green-600 text-white rounded-md px-6 py-3 hover:bg-green-700">
            Continue
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HireThree;