import React from "react";
import {
  Bookmark,
  UserCheck,
  Clock,
  MapPin,
  Briefcase,
  Laptop,
  DollarSign,
} from "lucide-react";
import { GiWallet } from "react-icons/gi";
import { TbCategory } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

const RecentJobs = () => {
  const navigate = useNavigate();

  const jobs = [
    {
      id: 1,
      title: "DevOps Engineer",
      company: "DevOps Edge Solutions",
      category: "IT & Networking",
      type: "Full time",
      salary: "8 LPA - 10 LPA",
      location: "Seattle, USA",
      worktype: "Hybrid",
      experience: "1 to 3 year",
      logo: "https://builtin.com/sites/www.builtin.com/files/2022-08/devops-engineer.png",
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "TechVerse Solution",
      category: "IT & Networking",
      type: " Fulltime",
      salary: "5LPA - 13LPA",
      location: "Bengaluru",
      worktype: "Hybrid",
      experience: "1 to 3 year",
      logo: "https://cdn4.vectorstock.com/i/1000x1000/32/78/white-web-design-and-front-end-development-icon-vector-36723278.jpg",
    },
    {
      id: 3,
      title: "Data Analyst",
      company: "Data Insight Ltd.",
      category: "Data Science",
      type: "Fulltime",
      salary: "11LPA - 12LPA",
      location: "Chicago, USA",
      worktype: "Hybrid",
      experience: "1 to 3 year",
      logo: "https://cdn-icons-png.flaticon.com/512/1643/1643996.png",
    },
    {
      id: 4,
      title: "Tax Analyst",
      company: " TaxMaster Consultants",
      category: "Accounting ",
      type: "Fulltime",
      salary: "5LPA - 12LPA",
      location: "New Delhi, India",
      worktype: "Hybrid",
      experience: "1 to 3 year",
      logo: "https://img.freepik.com/premium-vector/concept-tax-payment-data-analysis-paperwork-financial-research-report-calculation-tax-return-payment-debt-government-state-taxes-vector-illustration-flat-style_662353-803.jpg",
    },
    {
      id: 5,
      title: "B2B Sales Manager",
      company: " GrowthHive Marketing",
      category: "Sales & Marketing",
      type: "Fulltime",
      salary: "7LPA - 14LPA",
      location: "Mumbai",
      worktype: "Hybrid",
      experience: "1 to 3 year",
      logo: "https://png.pngtree.com/png-vector/20220819/ourmid/pngtree-b2b-or-business-to-business-marketing-vector-illustration-png-image_6039137.png",
    },
  ];

  // Function to handle job card click
  const handleJobClick = (job) => {
    navigate(`/jobs?title=${encodeURIComponent(job.title)}&company=${encodeURIComponent(job.company)}`);
  };

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white h-[70%]">
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
          modules={[Autoplay]}
          spaceBetween={32}
          slidesPerView={1}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 16 },
            768: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 32 },
          }}
          className="pb-12"
        >
          {jobs.map((job) => (
            <SwiperSlide key={job.id}>
              <div 
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col min-h-[25rem] p-8 hover:-translate-y-1 cursor-pointer"
                onClick={() => handleJobClick(job)}
              >
                <div className="flex items-start gap-6 relative">
                  <button 
                    className="absolute right-0 top-0 text-gray-300 hover:text-teal-600 transition-colors duration-200"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click when clicking bookmark
                    }}
                  >
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
                    <p className="text-gray-500 text-base">{job.company}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-12 text-gray-600 text-base">
                  <div className="flex items-center gap-3">
                    <TbCategory className="w-5 h-5 text-teal-600" />
                    <span className="truncate">{job.category}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <GiWallet className="w-5 h-5 text-teal-600" />
                    <span className="truncate">{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-teal-600" />
                    <span className="truncate">{job.type}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Laptop className="w-5 h-5 text-teal-600" />
                    <span className="truncate">{job.worktype}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <UserCheck className="w-5 h-5 text-teal-600" />
                    <span className="truncate">{job.experience}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-teal-600" />
                    <span className="truncate">{job.location}</span>
                  </div>
                </div>

                <div className="mt-auto pt-3">
                  <button 
                    className="w-full px-8 py-4 text-base font-medium text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-all duration-200 shadow-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleJobClick(job);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RecentJobs;