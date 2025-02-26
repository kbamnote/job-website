import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../../../../jobSeeker/commonSeeker/Header";
import Footer from "../../../../jobSeeker/commonSeeker/Footer";
import {
  Brain,
  Lightbulb,
  BookOpen,
  Target,
  Trophy,
  ChevronDown,
  Rocket,
  CheckCircle,
} from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white/90 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
    <div className="flex items-center gap-3 mb-2">
      <div className="bg-teal-100 p-2 rounded-lg">
        <Icon className="w-6 h-6 text-teal-600" />
      </div>
      <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const AiMockTest = () => {
  const CategoryApi = "https://jobquick.onrender.com/categories";
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = Cookies.get("JwtToken");
        const response = await fetch(CategoryApi, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.success) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleStartTest = () => {
    if (selectedCategory && selectedSubcategory) {
      navigate(`/questions/${selectedCategory.title}/${selectedSubcategory}`);
    }
  };

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Adaptive questions that match your skill level",
    },
    {
      icon: Target,
      title: "Focused Practice",
      description: "Targeted preparation for specific exam topics",
    },
    {
      icon: Trophy,
      title: "Track Progress",
      description: "Monitor your improvement with detailed analytics",
    },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
        {/* Hero Section */}
        <div className="bg-teal-800 text-white py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-1/2">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Master Your Exams with AI
                </h1>
                <p className="text-teal-100 text-lg mb-6">
                  Practice smarter with our AI-powered mock tests. Get instant
                  feedback and detailed analysis to improve your performance.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-teal-300" size={20} />
                    <span>Personalized Learning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-teal-300" size={20} />
                    <span>Real-time Feedback</span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <Rocket className="w-48 h-48 text-teal-200" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Test Selection Form */}
            <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-8 h-8 text-teal-600" />
                <h2 className="text-2xl font-bold text-gray-800">
                  Start Your Test
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Select Category
                  </label>
                  <div className="relative">
                    <select
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-teal-400"
                      onChange={(e) =>
                        setSelectedCategory(
                          categories.find((cat) => cat._id === e.target.value)
                        )
                      }
                    >
                      <option value="">Choose a category</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.title}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                {selectedCategory && (
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Select Subcategory
                    </label>
                    <div className="relative">
                      <select
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-teal-400"
                        onChange={(e) => setSelectedSubcategory(e.target.value)}
                      >
                        <option value="">Choose a subcategory</option>
                        {selectedCategory.subcategories.map((sub, index) => (
                          <option key={index} value={sub.title}>
                            {sub.title}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                )}

                {selectedSubcategory && (
                  <button
                    className="w-full bg-teal-600 text-white font-bold p-4 rounded-lg 
                           hover:bg-teal-700 transform transition-all duration-200 
                           flex items-center justify-center gap-2"
                    onClick={handleStartTest}
                  >
                    <Lightbulb className="w-5 h-5" />
                    Start Your Test
                  </button>
                )}
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid gap-4">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-teal-50 py-12 px-6 mt-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              Why Choose Our AI Mock Tests?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Brain className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Smart Learning</h3>
                <p className="text-gray-600">
                  Our AI adapts questions to your skill level
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Target className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Focused Practice</h3>
                <p className="text-gray-600">
                  Target specific areas for improvement
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Trophy className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Track Progress</h3>
                <p className="text-gray-600">
                  Monitor your improvement over time
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AiMockTest;