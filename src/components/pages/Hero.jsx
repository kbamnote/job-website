import React from 'react';
import { Search } from 'lucide-react';

const Hero = () => {
  const stats = [
    { icon: "💼", number: "25,850", label: "Jobs" },
    { icon: "👥", number: "10,250", label: "Candidates" },
    { icon: "🏢", number: "18,400", label: "Companies" },
  ];

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Navigation */}
      

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold text-white mb-4">
          Find Your Dream Job Today!
        </h1>
        <p className="text-xl text-gray-300 mb-12">
          Connecting Talent with Opportunity: Your Gateway to Career Success
        </p>

        {/* Search Section */}
        <div className="relative">
          {/* Background blur effect */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-lg"></div>
          
          {/* Search container */}
          <div className="relative bg-white/90 rounded-lg shadow-xl p-3 flex items-center space-x-3">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Job Title or Company"
                className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-shadow"
              />
            </div>
            
            <select className="w-48 py-2 px-3 rounded-md border border-gray-200 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 bg-white transition-shadow">
              <option value="">Select Location</option>
              <option value="ny">New York</option>
              <option value="sf">San Francisco</option>
              <option value="ld">London</option>
            </select>
            
            <select className="w-48 py-2 px-3 rounded-md border border-gray-200 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 bg-white transition-shadow">
              <option value="">Select Category</option>
              <option value="tech">Technology</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
            </select>
            
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-2 rounded-md flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl">
              <Search className="w-4 h-4" />
              <span>Search Job</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center transform hover:scale-105 transition duration-200 cursor-pointer">
              <span className="inline-block p-4 bg-teal-500 rounded-full mb-4 shadow-lg hover:shadow-xl transition-shadow">
                <span className="text-2xl">{stat.icon}</span>
              </span>
              <h3 className="text-3xl font-bold text-white mb-2">{stat.number}</h3>
              <p className="text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>

        
        
      </div>
    </div>
  );
};

export default Hero;