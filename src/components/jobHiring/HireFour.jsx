import React from 'react';
import { Link } from 'react-router';

const HireFour = () => {
  return (
    <div className="max-w-3xl mx-auto my-8">
      <h1 className="text-2xl font-bold mb-4">Post a new job</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-medium mb-4">Interviewer information</h2>
        <div>
          <label htmlFor="isWalkIn" className="block font-medium mb-2">
            Is this a walk-in interview?
          </label>
          <div className="flex items-center">
            <div className="mr-4">
              <input type="radio" id="isWalkIn" name="isWalkIn" value="yes" className="mr-2" />
              <label htmlFor="isWalkIn">Yes</label>
            </div>
            <div>
              <input type="radio" id="isWalkIn" name="isWalkIn" value="no" className="mr-2" />
              <label htmlFor="isWalkIn">No</label>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <span className="font-medium">Communication Preferences</span>
          <div className="flex items-center mt-2">
            <img src="/download-icon.svg" alt="Download" className="mr-2" />
            <p>
              Leads information will be accessible on Apna portal and can be downloaded in Excel format
            </p>
          </div>
          <div className="mt-2">
            <label htmlFor="contactPreference" className="block font-medium mb-2">
              Do you want candidates to contact you via Call / Whatsapp after they apply?
            </label>
            <div className="flex items-center">
              <div className="mr-4">
                <input
                  type="radio"
                  id="contactPreference"
                  name="contactPreference"
                  value="myself"
                  className="mr-2"
                />
                <label htmlFor="contactPreference">Yes, to myself</label>
              </div>
              <div className="mr-4">
                <input
                  type="radio"
                  id="contactPreference"
                  name="contactPreference"
                  value="otherRecruiter"
                  className="mr-2"
                />
                <label htmlFor="contactPreference">Yes, to other recruiter</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="contactPreference"
                  name="contactPreference"
                  value="contactFirst"
                  className="mr-2"
                />
                <label htmlFor="contactPreference">No, I will contact candidates first</label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <button className="bg-gray-200 text-gray-700 rounded-md px-6 py-3 hover:bg-gray-300">
            Back
          </button>
          <Link to='/hire-form'>
          <button className="bg-green-600 text-white rounded-md px-6 py-3 hover:bg-green-700">
            Continue
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HireFour;