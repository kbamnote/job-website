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
    <footer className="bg-gradient-to-br from-gray-900 to-black text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-7 h-7 text-teal-400" />
              <span className="text-2xl font-bold">Job Quick</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Explore limitless career opportunities and land your dream job
              with us.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-teal-400">
              Company
            </h3>
            <ul className="space-y-3">
              {[
                "About Us",
                "Our Team",
                "Partners",
                "For Candidates",
                "For Employers",
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-teal-400 transition duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Job Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-teal-400">
              Job Categories
            </h3>
            <ul className="space-y-3">
              {[
                "Telecommunications",
                "Hotels & Tourism",
                "Construction",
                "Education",
                "Financial Services",
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-teal-400 transition duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-teal-400">
              Newsletter
            </h3>
            <p className="text-gray-400 mb-4">
              Subscribe to stay updated on the latest job opportunities.
            </p>
            <div className="flex flex-col sm:flex-row w-full space-y-2 sm:space-y-0 sm:space-x-2">
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
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Job Portal. Designed by figma
          </div>
          {/* Social Icons */}
          <div className="flex space-x-4">
            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="text-gray-400 hover:text-teal-400 transition-all duration-300 transform hover:-translate-y-1 hover:scale-110"
              >
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-gray-400 hover:text-teal-400 transition duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-teal-400 transition duration-300"
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
