import React, { useState, useEffect, useRef } from 'react'; 
import { BriefcaseBusiness, ChevronDown } from 'lucide-react'; 
import { Link } from 'react-router-dom'; 
 
const Header = () => { 
  const [isAIToolsOpen, setIsAIToolsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleAIToolsDropdown = () => {
    setIsAIToolsOpen(!isAIToolsOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close dropdown if clicked outside of dropdown element
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAIToolsOpen(false);
      }
    };

    // Add event listener when dropdown is open
    if (isAIToolsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAIToolsOpen]);

  return ( 
    <header className="w-full bg-black text-white p-4 flex justify-between items-center relative"> 
      <div className='flex space-x-2 items-center'> 
        <BriefcaseBusiness /> 
        <h1 className="text-2xl">Job Quick</h1> 
      </div> 
      
      <nav> 
        <ul className="flex space-x-4 items-center"> 
          <Link to="/"><li>Home</li></Link> 
          <Link to="/jobs"><li>Jobs</li></Link> 
        <Link to="/about"><li>About Us</li>  </Link>  
          <Link to="/contact"><li>Contact Us</li></Link>
          
          {/* AI Tools Dropdown */}
          <li 
            className="relative" 
            ref={dropdownRef}
          >
            <div 
              className="flex items-center cursor-pointer"
              onClick={toggleAIToolsDropdown}
            >
              AI Tools <ChevronDown className="ml-1" size={16} />
            </div>
            
            {isAIToolsOpen && (
              <ul className="absolute top-full left-0 bg-gray-800 w-48 mt-2 py-2 rounded shadow-lg z-10">
                <Link to="/ats-score-checker">
                  <li className="px-4 py-2 hover:bg-gray-700">ATS Score Checker</li>
                </Link>
                <Link to="/ai-resume-builder">
                  <li className="px-4 py-2 hover:bg-gray-700">AI Resume Builder</li>
                </Link>
              </ul>
            )}
          </li>
        </ul> 
      </nav>
      
      <div> 
        <button className="px-4 py-2 rounded">Login</button> 
        <button className="bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded ml-2">Register</button> 
      </div> 
    </header> 
  ); 
}; 
 
export default Header;