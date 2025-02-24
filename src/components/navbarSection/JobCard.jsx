import React from "react";
import { TbCategory } from "react-icons/tb";
import { GrUserWorker } from "react-icons/gr";
import { BsPersonWorkspace } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { FaUserClock } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <div className="p-6 max-w-xl w-full bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex w-full mb-8">
        <img
          src="https://www.pngkey.com/png/full/191-1911374_company-building-png-office-building-png.png"
          alt={`${job.companyName} logo`}
          className="w-14 h-14 rounded-lg object-cover mr-4 shadow-sm"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-800 mb-1">
            {job.title}
          </h3>
          <p className="text-teal-600 font-semibold mb-1">{job.companyName}</p>
          <span className="text-sm text-gray-500">
            Posted on {new Date(job.dateCreated).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div className="grid grid-cols-2 sm:grid-cols-2  gap-4">
          <div>
            <div className="flex items-center mb-4">
              <TbCategory className="w-5 h-5 text-teal-500 mr-2" />
              <span className="text-gray-700 font-semibold">
                {job.category?.title || "Uncategorized"}
              </span>
            </div>
            <div className="flex items-center mb-4">
              <FaUserClock className="w-5 h-5 text-teal-500 mr-2" />
              <span className="text-gray-700 font-semibold">{job.jobType}</span>
            </div>
            <div className="flex items-center mb-4">
              <GiWallet className="w-5 h-5 text-teal-500 mr-2" />
              <span className="text-gray-700 font-semibold">
                {job.minPackage} - {job.maxPackage}
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center mb-4">
              <IoLocationOutline className="w-5 h-5 text-teal-500 mr-2" />
              <span className="text-gray-700 font-semibold">
                {job.location}
              </span>
            </div>
            <div className="flex items-center mb-4">
              <GrUserWorker className="w-5 h-5 text-teal-500 mr-2" />
              <span className="text-gray-700 font-semibold">
                {job.experience}
              </span>
            </div>
            <div className="flex items-center mb-4">
              <BsPersonWorkspace className="w-5 h-5 text-teal-500 mr-2" />
              <span className="text-gray-700 font-semibold">
                {job.workType}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Link to={`/jobs/${job._id}`} className="block w-full mt-4">
        <button className="w-full h-10 bg-teal-600 text-white rounded-lg text-base font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400">
          View Job Details
        </button>
      </Link>
    </div>
  );
};

export default JobCard;