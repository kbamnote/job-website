import React from 'react';
import { Bookmark, Clock, MapPin, Briefcase, DollarSign } from 'lucide-react';


const RecentJobs = () => {
  const jobs = [
    {
      id: 1,
      title: "Forward Security Director",
      company: "Bauch, Schuppe and Schulist Co",
      category: "Hotels & Tourism",
      type: "Full time",
      salary: "$40000-$42000",
      location: "New-York, USA",
      logo: "/assets/one.png",
      timeAgo: "10 min ago"
    },
    {
      id: 2,
      title: "Regional Creative Facilitator",
      company: "Wisozk - Becker Co",
      category: "Media",
      type: "Part time",
      salary: "$28000-$32000",
      location: "Los- Angeles, USA",
      logo: "/assets/two.png",
      timeAgo: "12 min ago"
    },
    {
      id: 3,
      title: "Internal Integration Planner",
      company: "Mraz, Quigley and Feest Inc.",
      category: "Construction",
      type: "Full time",
      salary: "$48000-$50000",
      location: "Texas, USA",
      logo: "/assets/three.png",
      timeAgo: "15 min ago"
    },
    {
      id: 4,
      title: "District Intranet Director",
      company: "VonRueden - Weber Co",
      category: "Commerce",
      type: "Full time",
      salary: "$42000-$48000",
      location: "Florida, USA",
      logo: "/assets/four.png",
      timeAgo: "24 min ago"
    },
    {
      id: 5,
      title: "Corporate Tactics Facilitator",
      company: "Cormier, Turner and Flatley Inc",
      category: "Commerce",
      type: "Full time",
      salary: "$38000-$40000",
      location: "Boston, USA",
      logo: "/assets/five.png",
      timeAgo: "26 min ago"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 bg-gray-50">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Recent Jobs Available</h2>
          
        </div>
        <a href="#" className="text-teal-600 hover:text-teal-700 text-sm font-medium">
          View all
        </a>
      </div>

      <div className="space-y-6">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <div className="flex items-start gap-4 p-6 relative">
              <div className="absolute right-6 top-6">
                <button className="text-gray-300 hover:text-gray-400">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-shrink-0">
             
                <img src={job.logo} alt={job.company} className="w-12 h-12 rounded-lg object-cover" />
              
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
                    <p className="text-gray-500 text-sm">{job.company}</p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap flex items-center gap-1">
                    {job.timeAgo}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-6 mt-4">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <div className="w-5 h-5 flex items-center justify-center text-gray-400">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    {job.category}
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <div className="w-5 h-5 flex items-center justify-center text-gray-400">
                      <Clock className="w-4 h-4" />
                    </div>
                    {job.type}
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <div className="w-5 h-5 flex items-center justify-center text-gray-400">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    {job.salary}
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <div className="w-5 h-5 flex items-center justify-center text-gray-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    {job.location}
                  </div>
                </div>

                <div className="mt-4">
                  <button className="px-5 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors">
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