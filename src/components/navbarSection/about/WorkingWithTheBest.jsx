import React from "react";

const WorkingWithTheBest = () => (
  <section className="py-12 px-[10%] flex flex-col md:flex-row items-center">
    {/* Left Section - Image Grid */}
    <div className="grid grid-cols-2 gap-8 w-full md:w-1/2 space-y-6">
      <div className="rounded-lg h-48">
        <img
          src="/assets/about2.avif"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="rounded-lg h-48">
        <img
          src="/assets/about3.avif"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="rounded-lg h-48">
        <img
          src="/assets/about4.avif"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="rounded-lg h-48">
        <img
          src="/assets/about6.avif"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>

    {/* Right Section - Text and Features */}
    <div className="w-full md:w-1/2 mt-8 md:mt-0 md:ml-8 text-center md:text-left">
      <h2 className="text-3xl font-bold mb-4">
        We’re Only Working With The Best
      </h2>
      <p className="text-gray-600 mb-6">
        Ultrices purus dolor viverra mi laoreet at cursus justo. Ultrices purus
        diam egestas amet faucibus tempor blandit.
      </p>
      <div className="grid grid-cols-2 gap-4">
        {["Quality Job", "Resume Builder", "Top Companies", "Top Talents"].map(
          (feature, index) => (
            <div key={index} className="flex items-center">
              <span className="bg-teal-100 text-teal-500 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
              <span className="ml-3 font-medium">{feature}</span>
            </div>
          )
        )}
      </div>
    </div>
  </section>
);

export default WorkingWithTheBest;
