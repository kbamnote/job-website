import React, { useState } from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";

const AtsScore = () => {
  const [resumeText, setResumeText] = useState("");
  const [score, setScore] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      setLoading(true);
      reader.onload = (event) => {
        const text = event.target.result;
        setResumeText(text);
        analyzeResume(text);
        setLoading(false);
      };
      reader.readAsText(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      setLoading(true);
      reader.onload = (event) => {
        const text = event.target.result;
        setResumeText(text);
        analyzeResume(text);
        setLoading(false);
      };
      reader.readAsText(file);
    }
  };

  const analyzeResume = (text) => {
    let currentScore = 70;
    const feedback = [];

    if (!text.toLowerCase().includes("work history")) {
      feedback.push("Your resume is missing a 'Work History' section.");
      currentScore -= 10;
    }
    if (!text.toLowerCase().includes("skills")) {
      feedback.push("Your resume is missing a 'Skills' section.");
      currentScore -= 10;
    }

    const wordCount = text.split(/\s+/).length;
    if (wordCount < 150) {
      feedback.push("Your resume is too short. Aim for at least 150 words.");
      currentScore -= 15;
    } else if (wordCount > 400) {
      feedback.push("Your resume is too long. Aim for a concise summary (under 400 words).");
      currentScore -= 5;
    }

    const overusedWords = ["responsible for", "team player", "detail-oriented"];
    overusedWords.forEach((word) => {
      if (text.toLowerCase().includes(word)) {
        feedback.push(`Avoid using generic phrases like '${word}'.`);
        currentScore -= 5;
      }
    });

    const randomAdjustment = Math.floor(Math.random() * 10) - 5;
    currentScore += randomAdjustment;
    currentScore = Math.max(0, Math.min(100, currentScore));

    setScore(currentScore);
    setSuggestions(feedback);
  };

  return (
    <>
      <Header />
      <div className="w-full h-40 sm:h-60 bg-gray-900 text-white flex justify-center items-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center">
          ATS Resume Checker
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 mt-8 md:mt-12">
          {/* Upload Section */}
          <section className="bg-gray-50 rounded-lg shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Upload Your Resume</h2>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">
              Supported formats: DOC, DOCX, PDF, TXT.
            </p>
            <div
              className={`border-2 border-dashed ${
                isDragging ? "border-teal-500 bg-teal-50" : "border-gray-300"
              } rounded-lg p-6 sm:p-10 text-center`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                Drag & Drop your resume here
              </p>
              <input
                type="file"
                accept=".txt,.doc,.docx,.pdf"
                className="hidden"
                id="fileUpload"
                onChange={handleFileUpload}
              />
              <label
                htmlFor="fileUpload"
                className="inline-block bg-teal-600 text-white px-4 sm:px-6 py-2 rounded-md cursor-pointer hover:bg-teal-700 transition-colors text-sm sm:text-base"
              >
                Choose a File
              </label>
            </div>
          </section>

          {/* Results Section */}
          <section className="bg-gray-50 rounded-lg shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow">
            {loading ? (
              <div className="min-h-[200px] flex items-center justify-center">
                <p className="text-center text-gray-600 text-sm sm:text-base">
                  Analyzing your resume...
                </p>
              </div>
            ) : score !== null ? (
              <>
                <div className="mt-4 p-4 bg-teal-100 rounded-lg shadow-sm">
                  <h3 className="text-3xl sm:text-4xl font-bold text-teal-600 text-center">
                    {score}
                  </h3>
                  <p className="text-center text-gray-700 mt-2 text-sm sm:text-base">
                    {score >= 80
                      ? "Excellent! Your resume is highly competitive!"
                      : "Your resume could use some improvement."}
                  </p>
                </div>
                {suggestions.length > 0 && (
                  <div className="mt-6 p-4 bg-yellow-100 rounded-lg shadow-sm">
                    <h4 className="text-base sm:text-lg font-bold text-yellow-700">
                      Suggestions for Improvement
                    </h4>
                    <ul className="mt-4 list-disc ml-4 sm:ml-6 text-xs sm:text-sm text-yellow-800 space-y-2">
                      {suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <div className="min-h-[200px] flex items-center justify-center">
                <p className="text-center text-gray-600 text-sm sm:text-base">
                  Upload your resume to see your score and suggestions!
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AtsScore;