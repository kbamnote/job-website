import React from "react";
import { Bookmark, Clock, MapPin, Briefcase, DollarSign } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

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
      logo: "https://tse3.mm.bing.net/th?id=OIP.pe59OwO5sCqGITfl8azm8AHaGK&pid=Api&P=0&h=180",
    },
    {
      id: 2,
      title: "Front End Developer",
      company: "Flipcart",
      category: "Media",
      type: "Part time",
      salary: "4LPA - 9LPA",
      location: "Los Angeles",
      logo: "https://tse3.mm.bing.net/th?id=OIP.pe59OwO5sCqGITfl8azm8AHaGK&pid=Api&P=0&h=180",
    },
    {
      id: 3,
      title: "Data Science",
      company: "Mraz, Quigley and Feest Inc.",
      category: "Construction",
      type: "Full time",
      salary: "4LPA - 12LPA",
      location: "Pune",
      logo: "https://tse3.mm.bing.net/th?id=OIP.pe59OwO5sCqGITfl8azm8AHaGK&pid=Api&P=0&h=180",
    },
    {
      id: 4,
      title: "AI & Research",
      company: "VonRueden - Weber Co",
      category: "Commerce",
      type: "Full time",
      salary: "10LPA - 14LPA",
      location: "Noida",
      logo: "https://tse3.mm.bing.net/th?id=OIP.pe59OwO5sCqGITfl8azm8AHaGK&pid=Api&P=0&h=180",
    },
    {
      id: 5,
      title: "Assistant Manager",
      company: "Cormier, Turner and Flatley Inc",
      category: "Commerce",
      type: "Full time",
      salary: "16LPA - 20LPA",
      location: "Aurangabad",
      logo: "https://tse3.mm.bing.net/th?id=OIP.pe59OwO5sCqGITfl8azm8AHaGK&pid=Api&P=0&h=180",
    },
  ];

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Recent Job Openings
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              Discover your next career opportunity
            </p>
          </div>
          <Link
            to="/jobs"
            className="group flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium transition-colors duration-200"
          >
            View all jobs
            <span className="transform group-hover:translate-x-1 transition-transform duration-200">
              →
            </span>
          </Link>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={32}
          slidesPerView={1}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          pagination={{ 
            clickable: true, 
            el: ".swiper-pagination",
            bulletClass: 'w-2 h-2 mx-1 rounded-full bg-gray-300 cursor-pointer transition-all duration-200',
            bulletActiveClass: 'w-3 h-2 bg-teal-600'
          }}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 16 },
            768: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 32 },
          }}
          className="pb-12"
        >
          {jobs.map((job) => (
            <SwiperSlide key={job.id}>
              <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col min-h-[28rem] p-8 hover:-translate-y-1">
                <div className="flex items-start gap-6 relative">
                  <button className="absolute right-0 top-0 text-gray-300 hover:text-teal-600 transition-colors duration-200">
                    <Bookmark className="w-6 h-6" />
                  </button>
                  <div className="relative">
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center">
                      <img
                        src={job.logo}
                        alt={job.company}
                        className="w-16 h-16 object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors duration-200">
                      {job.title}
                    </h3>
                    <p className="text-gray-500 text-base">
                      {job.company}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-12 text-gray-600 text-base">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-teal-600" />
                    </div>
                    <span className="truncate">{job.category}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-teal-600" />
                    </div>
                    <span className="truncate">{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-teal-600" />
                    </div>
                    <span className="truncate">{job.type}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-teal-600" />
                    </div>
                    <span className="truncate">{job.location}</span>
                  </div>
                </div>

                <div className="mt-auto pt-12">
                  <Link to="/jobs" className="block">
                    <button className="relative overflow-hidden w-full px-8 py-4 text-base font-medium text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-all duration-200 shadow-sm group-hover:shadow-md">
                      View Details
                      <div className="absolute inset-0 w-full h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    </button>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-pagination mt-8 flex justify-center"></div>
      </div>
    </div>
  );
};

export default RecentJobs;