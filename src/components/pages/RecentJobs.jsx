import React from "react";
import { Bookmark, Clock, MapPin, Briefcase, DollarSign } from "lucide-react";

const RecentJobs = () => {
  const jobs = [
    {
      id: 1,
      title: "Forward Security Director",
      company: "Bauch, Schuppe and Schulist Co",
      category: "Hotels & Tourism",
      type: "Full time",
      salary: "$40,000 - $42,000",
      location: "New-York, USA",
      logo: "/assets/one.png",
      timeAgo: "10 min ago",
    },
    {
      id: 2,
      title: "Regional Creative Facilitator",
      company: "Wisozk - Becker Co",
      category: "Media",
      type: "Part time",
      salary: "$28,000 - $32,000",
      location: "Los Angeles, USA",
      logo: "/assets/two.png",
      timeAgo: "12 min ago",
    },
    {
      id: 3,
      title: "Internal Integration Planner",
      company: "Mraz, Quigley and Feest Inc.",
      category: "Construction",
      type: "Full time",
      salary: "$48,000 - $50,000",
      location: "Texas, USA",
      logo: "/assets/three.png",
      timeAgo: "15 min ago",
    },
    {
      id: 4,
      title: "District Intranet Director",
      company: "VonRueden - Weber Co",
      category: "Commerce",
      type: "Full time",
      salary: "$42,000 - $48,000",
      location: "Florida, USA",
      logo: "/assets/four.png",
      timeAgo: "24 min ago",
    },
    {
      id: 5,
      title: "Corporate Tactics Facilitator",
      company: "Cormier, Turner and Flatley Inc",
      category: "Commerce",
      type: "Full time",
      salary: "$38,000 - $40,000",
      location: "Boston, USA",
      logo: "/assets/five.png",
      timeAgo: "26 min ago",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 bg-gray-50">
      <div className="flex justify-between items-start mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Recent Job Openings</h2>
        <a href="#" className="text-teal-600 hover:text-teal-700 text-sm font-medium">
          View all
        </a>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200"
          >
            <div className="flex items-start gap-4 p-6 relative">
              <button className="absolute right-6 top-6 text-gray-300 hover:text-gray-400">
                <Bookmark className="w-5 h-5" />
              </button>

              <div className="flex-shrink-0">
                <img
                  src={job.logo}
                  alt={job.company}
                  className="w-14 h-14 rounded-lg object-cover shadow-sm"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
                    <p className="text-gray-500 text-sm">{job.company}</p>
                  </div>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    {job.timeAgo}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-4 text-gray-600 text-sm">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-gray-500" />
                    {job.category}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    {job.type}
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    {job.salary}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    {job.location}
                  </div>
                </div>

                <div className="mt-4">
                  <button className="px-5 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-all duration-200 shadow-md">
                    Job Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentJobs;
