import React from 'react';
import { Link } from 'react-router';

const HiringSecond = () => {
  return (
    <div className="max-w-3xl mx-auto my-8">
      <h1 className="text-2xl font-bold mb-4">Post a new job</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-medium mb-4">Job details</h2>
        <label htmlFor="company" className="block font-medium mb-2">Company you're hiring for *</label>
        <input type="text" id="company" className="border border-gray-300 rounded-md px-3 py-2 w-full" />
        <label htmlFor="title" className="block font-medium mt-4 mb-2">Job title / Designation *</label>
        <input type="text" id="title" className="border border-gray-300 rounded-md px-3 py-2 w-full" />
        <div className="mt-4">
          <span className="font-medium">Type of Job *</span>
          <div className="flex items-center mt-2">
            <label className="mr-4">
              <input type="radio" name="jobType" value="fullTime" className="mr-2" />
              Full Time
            </label>
            <label className="mr-4">
              <input type="radio" name="jobType" value="partTime" className="mr-2" />
              Part Time
            </label>
            <label className="mr-4">
              <input type="radio" name="jobType" value="both" className="mr-2" />
              Both (Full-Time And Part-Time)
            </label>
            <div className="flex items-center">
              <input type="checkbox" id="nightShift" className="mr-2" />
              <label htmlFor="nightShift">This is a night shift job</label>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="location" className="block font-medium mb-2">Location</label>
          <input type="text" id="location" className="border border-gray-300 rounded-md px-3 py-2 w-full" />
        </div>
        <div className="mt-4">
          <span className="font-medium">Work location type *</span>
          <div className="flex items-center mt-2">
            <label className="mr-4">
              <input type="radio" name="workLocationType" value="workFromOffice" className="mr-2" />
              Work From Office
            </label>
            <label className="mr-4">
              <input type="radio" name="workLocationType" value="workFromHome" className="mr-2" />
              Work From Home
            </label>
            <label className="mr-4">
              <input type="radio" name="workLocationType" value="fullJob" className="mr-2" />
              Full Job
            </label>
          </div>
        </div>
        <div className="mt-4">
          <span className="font-medium">What is the pay type? *</span>
          <div className="flex items-center mt-2">
            <label className="mr-4">
              <input type="radio" name="payType" value="fixedOnly" className="mr-2" />
              Fixed Only
            </label>
            <label className="mr-4">
              <input type="radio" name="payType" value="fixedIncentive" className="mr-2" />
              Fixed + Incentive
            </label>
            <label className="mr-4">
              <input type="radio" name="payType" value="incentiveOnly" className="mr-2" />
              Incentive Only
            </label>
          </div>
        </div>
        <div className="mt-4">
          <span className="font-medium">Do you offer any additional perks?</span>
          {/* Perks checkboxes */}
        </div>
        <div className="mt-4">
          <span className="font-medium">Is there any joining fee or deposit required from the candidate? *</span>
          <div className="flex items-center mt-2">
            <label className="mr-4">
              <input type="radio" name="joiningFee" value="yes" className="mr-2" />
              Yes
            </label>
            <label className="mr-4">
              <input type="radio" name="joiningFee" value="no" className="mr-2" />
              No
            </label>
          </div>
        </div>
        <div className="mt-6">
            <Link to='/hiring-three'>
          <button className="bg-green-600 text-white rounded-md px-6 py-3 hover:bg-green-700">
            Continue
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HiringSecond;