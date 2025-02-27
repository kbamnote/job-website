import React from "react";
import {
  Briefcase,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br w-full from-gray-900 to-black text-white pt-16 pb-8 px-10 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {/* Logo and Description */}
        <div>
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 text-teal-400" />
            <span className="text-xl sm:text-2xl font-bold">Job Quick</span>
          </div>
          <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
            The Job Quick is a powerful job search platform that helps job seekers find their dream job quickly and efficiently.
          </p>
        </div>
        
        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 sm:mb-5 text-teal-400">
            Address
          </h3>
          <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
            <strong>HEAD OFFICE:</strong> Office No. S11, Dharampeth Tower P No. 209, WHC Road, Nagpur- 44010
          </p>
          <div className="h-3"></div>
          <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
            <strong>BRANCH OFFICE:</strong> Office No. 1, 1st Floor, Shree Sai Complex, Near Hotel Hardeo, Sitabuldi, Nagpur- 44012
          </p>
        </div>
        
        {/* Job Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-3 sm:mb-5 text-teal-400">
            Links
          </h3>
          <ul className="space-y-2 sm:space-y-3">
            {[
              { name: "Home", link: "/" },
              { name: "Jobs", link: "/jobs" },
              { name: "Mocks", link: "/mock" },
              { name: "About", link: "/about" },
              { name: "Contact Us", link: "/contact" },
            ].map((item, index) => (
              <li key={index}>
                <a
                  href={item.link}
                  className="text-gray-400 hover:text-teal-400 transition duration-300 text-sm sm:text-base"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-3 sm:mb-5 text-teal-400">
            Newsletter
          </h3>
          <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">
            Subscribe to stay updated on the latest job opportunities.
          </p>
          <div className="flex flex-col lg:flex-row space-x-1 space-y-2 lg:space-y-0">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <button className="bg-teal-500 text-white px-4 py-3 rounded-lg hover:bg-teal-600 transition sm:w-auto w-full">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
          © {new Date().getFullYear()} Job Portal. All rights reserved.
        </div>
        {/* Social Icons */}
        <div className="flex space-x-4">
          {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
            <a
              key={index}
              href="#"
              className="text-gray-400 hover:text-teal-400 transition-all duration-300 transform hover:-translate-y-1 hover:scale-110"
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          ))}
        </div>
      </div>
  </footer>
  );
};

export default Footer;
