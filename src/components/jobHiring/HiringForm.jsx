import React from 'react';
import { Link } from 'react-router';
import Footer from '../common/Footer';
import Header from '../common/Header';

const HiringForm = () => {
  return (
    <>
    <Header/>
    <div className="flex">
      <div className="w-1/3 bg-gray-900 text-white p-8">
        <h2 className="text-2xl font-bold mb-4">What does Job Quick offer 👋</h2>
        <div className="flex items-center mb-4">
          <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
            <img src="/images/paper-plane.svg" alt="Job Posting" className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-medium">Job Posting</h3>
        </div>
        <p className="mb-4">A comprehensive platform for your hiring needs</p>
        <ul className="list-disc pl-6 mb-4">
          <li>AI-powered classic and premium job postings to get candidates at desired speed</li>
          <li>Unlimited applications with 15 days job visibility on the platform</li>
        </ul>
      </div>
      <div className="w-2/3 p-8">
        <h2 className="text-2xl font-bold mb-4">Let's get you started!</h2>
        <div className="mb-4">
          <label htmlFor="fullName" className="block font-medium mb-1">
            Your full name
          </label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter your full name"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="companyName" className="block font-medium mb-1">
            Enter the name of your company
          </label>
          <input
            type="text"
            id="companyName"
            placeholder="e.g. Swiggy"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
          <div className="flex items-center mt-2">
            <input type="checkbox" id="consultancy" className="mr-2" />
            <label htmlFor="consultancy">This is a consultancy (Hiring or staffing agency)</label>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="employeeCount" className="block font-medium mb-1">
            Number of employees in your company
          </label>
          <div className="flex">
            <label className="mr-2">
              <input type="radio" name="employeeCount" value="0-50" className="mr-1" />
              0-50
            </label>
            <label className="mr-2">
              <input type="radio" name="employeeCount" value="51-100" className="mr-1" />
              51-100
            </label>
            <label className="mr-2">
              <input type="radio" name="employeeCount" value="101-300" className="mr-1" />
              101-300
            </label>
            <label className="mr-2">
              <input type="radio" name="employeeCount" value="301-500" className="mr-1" />
              301-500
            </label>
            <label className="mr-2">
              <input type="radio" name="employeeCount" value="501-1000" className="mr-1" />
              501-1000
            </label>
            <label className="mr-2">
              <input type="radio" name="employeeCount" value="1000+" className="mr-1" />
              1000 above
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="workEmail" className="block font-medium mb-1">
            Work email (Optional)
          </label>
          <input
            type="email"
            id="workEmail"
            placeholder="Enter your work email address"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div className="flex items-center mb-4">
          <input type="checkbox" id="termsAgreement" className="mr-2" />
          <label htmlFor="termsAgreement">
            I agree to Apna's{' '}
            <a href="#" className="text-blue-500 underline">
              Terms of Services
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-500 underline">
              Privacy policy
            </a>
          </label>
        </div>
        <Link to="/hire-second">
        <button className="bg-green-600 text-white rounded-md px-6 py-3 hover:bg-green-700">
          Post a job
        </button>
        </Link>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default HiringForm;