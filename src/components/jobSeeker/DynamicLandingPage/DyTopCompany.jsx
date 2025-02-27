import React from "react";
import { MapPin, ExternalLink } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import { IoIosLink } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";

const DyTopCompany = ({ companies }) => {
  console.log("Top Company", companies);
  const navigate = useNavigate();

  // Function to handle company click and navigate to Jobs page
  const handleCompanyClick = (companyName) => {
    navigate(`/jobs?title=${encodeURIComponent(companyName)}`);
  };

  // Default logo images for companies if not provided in the data
  const defaultLogos = {
    "Google": "https://www.pngmart.com/files/22/Google-PNG-Pic.png",
    "Amazon": "https://pngteam.com/images/amazon-logo-png-2400x2001_abf78dd4_transparent_202878.png.png",
    "Microsoft": "https://www.freepnglogos.com/uploads/microsoft-windows-logo-png-images-30.png",
    "Apple": "https://www.pngall.com/wp-content/uploads/11/Apple-Logo-PNG-HD-Image.png",
    "Meta": "https://www.buscopng.com/wp-content/uploads/Meta-logo-6cbf608d.png",
    "Netflix": "https://i.pinimg.com/originals/56/51/14/5651147964cb73f605089b47df4fe70f.png"
  };


  // Check if companies data exists and has items
  if (!companies || companies.length === 0) {
    return (
      <div className="py-20 px-6 md:px-[10%] bg-gray-50 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Top Companies
        </h2>
        <p className="text-gray-600">Loading company data...</p>
      </div>
    );
  }

  return (
    <div className="py-20 px-6 md:px-[10%] bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Top Companies
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Discover opportunities at the world's leading technology companies
        </p>
      </div>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={32}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {companies.map((company, index) => (
          <SwiperSlide key={company._id || index}>
            <div
              onClick={() => handleCompanyClick(company.companyName)}
              className="cursor-pointer bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-200 flex flex-col h-full"
            >
              {/* Company header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <img
                    src={company.companyLogo || defaultLogos[company.companyName] || "https://via.placeholder.com/150"}
                    alt={`${company.companyName} logo`}
                    className="h-12 w-12 object-contain"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {company.companyName}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Company details */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-auto">

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MdOutlineEmail className="w-5 h-5 text-teal-600 flex-shrink-0" />
                      <span> {company.companyEmail || ""}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600">
                      <IoIosLink className="w-5 h-5 text-teal-600 flex-shrink-0" />
                      <span>
                        <a href={company.companyURL} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">
                          Visit Website
                        </a>
                      </span>
                    </div>
                  </div>

                  <div className="bg-teal-50 p-4 rounded-lg mb-6">
                    <p className="text-teal-800 font-medium mb-1">
                      About
                    </p>
                    <p className="text-gray-700 line-clamp-3">{company.companyDescription || "Leading technology company"}</p>
                  </div>
                </div>

                <a
                  href={`/jobs?title=${encodeURIComponent(company.companyName)}`}
                  className="flex items-center justify-center w-full bg-teal-600 hover:bg-teal-700 text-white py-3 px-4 rounded-lg font-medium transition-colors gap-2 mt-auto"
                >
                  View Jobs
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DyTopCompany;