import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const stats = [
    {
      number: "12k+",
      title: "Clients worldwide",
      description:
        "Clients worldwide is a phrase used to describe a business or service that has customers located in various countries across the globe. It signifies a broad reach and international presence, suggesting that the company isn't limited to a local or regional market.",
    },
    {
      number: "20k+",
      title: "Active resume",
      description:
        "An active resume isn't a standard resume format, but the phrase suggests a resume that is dynamic, up-to-date, and readily available for job searching. It implies a proactive approach to job hunting and a resume that is more than just a static document.",
    },
    {
      number: "18k+",
      title: "Companies",
      description:
        "Companies are fundamental building blocks of the modern economy. They are organizations formed by individuals or groups to engage in business activities, with the primary goal of generating profit.",
    },
  ];

  return (
    <div className="px-[10%] py-12">
      <div className="flex flex-col lg:flex-row gap-12 mb-16">
        {/* Left side - Image */}
        <div className="lg:w-1/2">
          <div className="rounded-3xl overflow-hidden">
            <img
              src="https://plus.unsplash.com/premium_photo-1727730015669-aac64afb50ad?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Hero"
              className="w-full h-full mx-auto"
            />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          <h1 className="text-5xl font-bold leading-tight mb-12">
            Good Life Begins With
            <br />A Good Company
          </h1>
          <p className="text-gray-600 mb-8">
            Happiness and Contentment: Feeling positive emotions, finding joy in
            daily activities, and having a sense of purpose. Well-being:
            Physical, mental, and emotional health. A good life often involves
            feeling healthy and secure. Meaningful Connections: Strong
            relationships with family, friends, and colleagues. Feeling
            connected and supported. Personal Growth: Opportunities for
            learning, development, and self-improvement. Feeling like you are
            progressing and reaching your potential. Balance: A healthy
            equilibrium between work, personal life, and leisure. Not feeling
            overwhelmed or stressed.
          </p>
          <div className="flex gap-4">
            <Link to="/jobs">
              <button className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors cursor-pointer">
                Search Job
              </button>
            </Link>
            <button className="text-teal-500 hover:text-teal-600 transition-colors">
              Learn more
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <div key={index}>
            <div className="text-4xl font-bold text-teal-500 mb-4">
              {stat.number}
            </div>
            <h3 className="text-xl font-bold mb-3">{stat.title}</h3>
            <p className="text-gray-600">{stat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;