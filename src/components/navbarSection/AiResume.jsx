import React, { useState } from "react";
import { jsPDF } from "jspdf";
import Header from "../common/Header";
import Footer from "../common/Footer";

const AiResume = () => {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
  });

  const [education, setEducation] = useState([]);
  const [workExperience, setWorkExperience] = useState([]);
  const [skills, setSkills] = useState([]);

  const [currentEducation, setCurrentEducation] = useState({
    school: "",
    degree: "",
    major: "",
    graduationYear: "",
  });

  const [currentWork, setCurrentWork] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [currentSkill, setCurrentSkill] = useState("");

  const generatePDF = () => {
    if (!personalInfo.fullName) {
      alert("Please enter your full name before generating the resume.");
      return;
    }
    
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Refined Color Palette
    const colors = {
      primary: [41, 73, 128],     // Deep navy blue
      accent: [52, 152, 219],     // Vibrant blue
      text: {
        dark: [44, 62, 80],       // Dark slate gray
        light: [255, 255, 255]    // White
      },
      background: {
        main: [236, 240, 241],    // Light gray
        section: [248, 249, 250]  // Lighter gray
      }
    };
    
    let yPos = 20;
    
    // Advanced Page Background with Subtle Texture
    const drawPageBackground = () => {
      doc.setFillColor(...colors.background.main);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
      
      // Subtle diagonal texture
      doc.setDrawColor(220, 220, 220);
      doc.setLineWidth(0.1);
      for (let i = 0; i < pageWidth; i += 5) {
        for (let j = 0; j < pageHeight; j += 5) {
          if (Math.random() > 0.9) {
            doc.line(i, j, i + 1, j + 1);
          }
        }
      }
    };
    
    // Sleek Header with Modern Design
    const drawHeader = () => {
      // Gradient-like background
      doc.setFillColor(...colors.primary);
      doc.rect(0, 0, pageWidth, 50, 'F');
      
      // Shadow effect
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.2);
      doc.line(0, 50, pageWidth, 50);
      
      // Profile Name
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(...colors.text.light);
      doc.text(personalInfo.fullName.toUpperCase(), pageWidth / 2, 30, { align: "center" });
      
      // Contact Information
      doc.setFontSize(10);
      doc.text(
        `${personalInfo.email || ""} | ${personalInfo.phone || ""} | ${personalInfo.location || ""}`,
        pageWidth / 2,
        40,
        { align: "center" }
      );
      
      yPos = 60;
    };
    
    // Elegant Section Titles
    const drawSectionTitle = (title) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(...colors.primary);
      
      // Simplified underline
      doc.text(title.toUpperCase(), 20, yPos);
      
      // Standard line
      doc.setDrawColor(...colors.primary);
      doc.setLineWidth(0.7);
      doc.line(20, yPos + 3, 120, yPos + 3);
      
      yPos += 15;
    };
    
    // Rest of the code remains the same as in the previous version
    
    // Advanced Professional Section Renderer
    const drawProfessionalSection = (title, items, formatter) => {
      drawSectionTitle(title);
      
      items.forEach((item, index) => {
        // Soft hover-like effect
        doc.setFillColor(...(index % 2 === 0 ? colors.background.section : [255, 255, 255]));
        doc.rect(20, yPos - 2, pageWidth - 40, 12, 'F');
        
        // Main details with icons (simulated with text)
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(...colors.text.dark);
        
        // Simulated icon placement
        doc.text("•", 22, yPos + 6);
        doc.text(formatter(item), 35, yPos + 6);
        
        yPos += 12;
      });
      
      yPos += 10;
    };
    
    // Skills with Modern Chip Design
    const renderSkills = () => {
      drawSectionTitle("Skills");
      
      const skillsPerLine = 4;
      skills.forEach((skill, index) => {
        if (index % skillsPerLine === 0) {
          yPos += (index > 0 ? 12 : 0);
        }
        
        const xPosition = 20 + (index % skillsPerLine) * 45;
        
        // Chip design
        doc.setFillColor(...colors.accent);
        doc.setTextColor(...colors.text.light);
        
        // Rounded rectangle
        doc.roundedRect(xPosition, yPos, 40, 8, 2, 2, 'F');
        
        doc.setFontSize(9);
        doc.text(skill, xPosition + 20, yPos + 6, { align: 'center' });
      });
      
      yPos += 20;
    };
    
    // Execution Flow
    drawPageBackground();
    drawHeader();
    
    // Sections
    const drawSections = () => {
      // Professional Summary
      drawSectionTitle("Professional Summary");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(...colors.text.dark);
      doc.text(
        doc.splitTextToSize(
          personalInfo.summary || "No summary provided", 
          pageWidth - 40
        ), 
        20, 
        yPos
      );
      
      yPos += 30;
      
      // Professional Sections
      drawProfessionalSection("Education", education, (edu) => 
        `${edu.school} - ${edu.degree} in ${edu.major} (${edu.graduationYear})`
      );
      
      drawProfessionalSection("Work Experience", workExperience, (work) => 
        `${work.company} | ${work.position} (${work.startDate} - ${work.endDate})`
      );
      
      // Skills Section
      renderSkills();
    };
    
    drawSections();
    
    // Elegant Footer
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Professional Resume | Generated on ${new Date().toLocaleDateString()}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" }
    );
    
    // Save PDF
    doc.save(`${personalInfo.fullName}_Professional_Resume.pdf`);
  };
  
  
  
  
  

  const addEducation = () => {
    // Modify to allow adding even if some fields are empty
    if (currentEducation.school || currentEducation.degree || 
        currentEducation.major || currentEducation.graduationYear) {
      setEducation([...education, currentEducation]);
      setCurrentEducation({
        school: "",
        degree: "",
        major: "",
        graduationYear: "",
      });
    } else {
      alert("Please enter at least one education detail.");
    }
  };

  const addWorkExperience = () => {
    // Modify to allow adding even if some fields are empty
    if (currentWork.company || currentWork.position || 
        currentWork.startDate || currentWork.endDate || currentWork.description) {
      setWorkExperience([...workExperience, currentWork]);
      setCurrentWork({
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      });
    } else {
      alert("Please enter at least one work experience detail.");
    }
  };

  const addSkill = () => {
    if (currentSkill.trim()) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill("");
    } else {
      alert("Please enter a skill.");
    }
  };

  return (
    <>
    <Header />
    
    {/* Hero Section */}
    <div className="w-auto h-60 bg-gray-900 text-white flex justify-center items-center">
      <h1 className="text-5xl font-semibold">Resume Builder</h1>
    </div>
  
    {/* Main Content */}
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Personal Information Section */}
      <div className="bg-gray-50 rounded-lg shadow-lg p-6 mb-12 hover:shadow-xl transition-shadow">
        <h2 className="text-3xl font-bold mb-6">Personal Information</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={personalInfo.fullName}
            onChange={(e) =>
              setPersonalInfo({ ...personalInfo, fullName: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <input
            type="email"
            placeholder="Email"
            value={personalInfo.email}
            onChange={(e) =>
              setPersonalInfo({ ...personalInfo, email: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Phone"
            value={personalInfo.phone}
            onChange={(e) =>
              setPersonalInfo({ ...personalInfo, phone: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Location"
            value={personalInfo.location}
            onChange={(e) =>
              setPersonalInfo({ ...personalInfo, location: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <textarea
            placeholder="Professional Summary"
            value={personalInfo.summary}
            onChange={(e) =>
              setPersonalInfo({ ...personalInfo, summary: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          ></textarea>
        </div>
      </div>
  
      {/* Education Section */}
      <div className="bg-gray-50 rounded-lg shadow-lg p-6 mb-12 hover:shadow-xl transition-shadow">
        <h2 className="text-3xl font-bold mb-6">Education</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="School"
            value={currentEducation.school}
            onChange={(e) =>
              setCurrentEducation({ ...currentEducation, school: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Degree"
            value={currentEducation.degree}
            onChange={(e) =>
              setCurrentEducation({ ...currentEducation, degree: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Major"
            value={currentEducation.major}
            onChange={(e) =>
              setCurrentEducation({ ...currentEducation, major: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Graduation Year"
            value={currentEducation.graduationYear}
            onChange={(e) =>
              setCurrentEducation({
                ...currentEducation,
                graduationYear: e.target.value,
              })
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <button
            onClick={addEducation}
            className="bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors"
          >
            Add Education
          </button>
        </div>
  
        {education.length > 0 && (
          <div className="mt-6">
            <h3 className="font-bold text-lg mb-4">Added Education:</h3>
            {education.map((edu, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded-md shadow-sm mb-2"
              >
                {edu.school} - {edu.degree} in {edu.major} ({edu.graduationYear})
              </div>
            ))}
          </div>
        )}
      </div>
  
      {/* Work Experience Section */}
      <div className="bg-gray-50 rounded-lg shadow-lg p-6 mb-12 hover:shadow-xl transition-shadow">
        <h2 className="text-3xl font-bold mb-6">Work Experience</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Company"
            value={currentWork.company}
            onChange={(e) =>
              setCurrentWork({ ...currentWork, company: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Position"
            value={currentWork.position}
            onChange={(e) =>
              setCurrentWork({ ...currentWork, position: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <textarea
            placeholder="Description"
            value={currentWork.description}
            onChange={(e) =>
              setCurrentWork({ ...currentWork, description: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          ></textarea>
          <button
            onClick={addWorkExperience}
            className="bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors"
          >
            Add Work Experience
          </button>
        </div>
  
        {workExperience.length > 0 && (
          <div className="mt-6">
            <h3 className="font-bold text-lg mb-4">Added Work Experiences:</h3>
            {workExperience.map((work, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded-md shadow-sm mb-2"
              >
                {work.company} - {work.position} ({work.startDate} - {work.endDate})
              </div>
            ))}
          </div>
        )}
      </div>
  
      {/* Skills Section */}
      <div className="bg-gray-50 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
        <h2 className="text-3xl font-bold mb-6">Skills</h2>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Skill"
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <button
            onClick={addSkill}
            className="bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors"
          >
            Add Skill
          </button>
        </div>
  
        {skills.length > 0 && (
          <div className="mt-6">
            <h3 className="font-bold text-lg">Added Skills:</h3>
            <div className="bg-gray-100 p-4 rounded-md shadow-sm">
              {skills.join(", ")}
            </div>
          </div>
        )}
      </div>
  
      <div className="text-center mt-8">
        <button
          onClick={generatePDF}
          className="bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-colors"
        >
          Generate Resume
        </button>
      </div>
    </div>
    <Footer />
  </>
  
  );
};

export default AiResume;
