import React from "react";
import { Bookmark, Clock, MapPin, Briefcase, DollarSign } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";

const RecentJobs = () => {
  const jobs = [
    {
      id: 1,
      title: "Forward Security Director",
      company: "Bauch, Schuppe and Schulist Co",
      category: "Hotels & Tourism",
      type: "Full time",
      salary: "3LPA - 5LPA",
      location: "Nagpur",
      logo: "https://www.pngkey.com/png/full/191-1911374_company-building-png-office-building-png.png",
    },
    {
      id: 2,
      title: "Front End Developer",
      company: "Flipcart",
      category: "Media",
      type: "Part time",
      salary: "4LPA - 9LPA",
      location: "Los Angeles",
      logo: "https://www.pngkey.com/png/full/191-1911374_company-building-png-office-building-png.png",
    },
    {
      id: 3,
      title: "Data Science",
      company: "Mraz, Quigley and Feest Inc.",
      category: "Construction",
      type: "Full time",
      salary: "4LPA - 12LPA",
      location: "Pune",
      logo: "https://www.pngkey.com/png/full/191-1911374_company-building-png-office-building-png.png",
    },
    {
      id: 4,
      title: "AI & Research",
      company: "VonRueden - Weber Co",
      category: "Commerce",
      type: "Full time",
      salary: "10LPA - 14LPA",
      location: "Noida",
      logo: "https://www.pngkey.com/png/full/191-1911374_company-building-png-office-building-png.png",
    },
    {
      id: 5,
      title: "Assistant Manager",
      company: "Cormier, Turner and Flatley Inc",
      category: "Commerce",
      type: "Full time",
      salary: "16LPA - 20LPA",
      location: "Aurangabad",
      logo: "https://www.pngkey.com/png/full/191-1911374_company-building-png-office-building-png.png",
    },
  ];

  return (
    <div className="w-full mx-auto px-[10%] py-10 bg-gray-50">
      <div className="flex justify-between items-start mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Recent Job Openings
        </h2>
        <a
          href="#"
          className="text-teal-600 hover:text-teal-700 text-sm font-medium"
        >
          View all
        </a>
      </div>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={3}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        pagination={{ clickable: true, el: ".swiper-pagination" }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {jobs.map((job) => (
          <SwiperSlide key={job.id}>
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 flex flex-col h-full p-6">
              <div className="flex items-start gap-4 relative">
                <button className="absolute right-0 top-0 text-gray-300 hover:text-gray-400">
                  <Bookmark className="w-5 h-5" />
                </button>
                <img
                  src={job.logo}
                  alt={job.company}
                  className="w-16 h-16 rounded-lg object-cover shadow-sm"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {job.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{job.company}</p>
                </div>
              </div>

              {/* Job Details in Two Columns */}
              <div className="grid grid-cols-2 gap-4 mt-4 text-gray-600 text-sm">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-teal-600" />
                  {job.category}
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-teal-600" />
                  {job.salary}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-600" />
                  {job.type}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-teal-600" />
                  {job.location}
                </div>
              </div>

              <button className="mt-6 px-5 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-all duration-200 shadow-md w-full">
                View Details
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-pagination mt-4 flex justify-center"></div>
    </div>
  );
};

export default RecentJobs;