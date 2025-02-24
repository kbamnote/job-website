import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const stats = [
    {
      number: "12k+",
      title: "Clients Worldwide",
      description:
        "We have successfully built a global network of satisfied clients, expanding our reach across multiple countries and industries.",
    },
    {
      number: "20k+",
      title: "Active Resumes",
      description:
        "Thousands of job seekers trust our platform to keep their resumes updated and ready for new opportunities.",
    },
    {
      number: "18k+",
      title: "Partner Companies",
      description:
        "We collaborate with top-tier companies to offer diverse job opportunities across various industries.",
    },
  ];

  return (
    <div className="px-6 md:px-[10%] py-12 bg-gray-50">
      <div className="flex flex-col lg:flex-row gap-12 mb-16 items-center">
        {/* Left side - Image */}
        <div className="lg:w-1/2">
          <div className="rounded-3xl overflow-hidden shadow-lg">
            <img
              src="https://plus.unsplash.com/premium_photo-1727730015669-aac64afb50ad?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Hero"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
            Good Life Begins With
            <br className="hidden md:inline" /> A Good Company
          </h1>
          <p className="text-gray-600 mt-6 text-lg">
          A good company provides more than just opportunities; it empowers individuals to reach their potential, fosters creativity, and encourages growth. By surrounding yourself with positive, like-minded people, you're not just building a career you're shaping a better future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
            <Link to="/jobs">
              <button className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-teal-700 transition-all">
                Search Job
              </button>
            </Link>
            <button className="text-teal-600 font-semibold hover:text-teal-700 transition-all">
              Learn more
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="text-4xl font-bold text-teal-600 mb-4">
              {stat.number}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {stat.title}
            </h3>
            <p className="text-gray-600 text-lg">{stat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;