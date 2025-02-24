import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Cookies from "js-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";
import JobFilters from "./JobFilters";
import JobCard from "./JobCard";

const Jobs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jobListings, setJobListings] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);
  const jobsPerPage = 10;

  const queryParams = new URLSearchParams(location.search);
  const searchTitle = queryParams.get("title") || "";
  const searchCategory = queryParams.get("category") || "";
  const searchLocation = queryParams.get("location") || "";

  const [filters, setFilters] = useState({
    search: searchTitle,
    category: searchCategory,
    location: searchLocation,
    jobType: "",
    workType: "",
    experience: "",
    subcategory: "",
  });

  const [pendingFilters, setPendingFilters] = useState(filters);

  const JobToken = Cookies.get("JwtToken");
  const userId = Cookies.get("userID");

  const isAuthenticated = () => {
    return !!JobToken && !!userId;
  };

  const updateURL = (currentFilters) => {
    const params = new URLSearchParams();
    Object.entries(currentFilters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    navigate(`/jobs?${params.toString()}`, { replace: true });
  };

  const buildFilterUrl = (pageNum) => {
    const queryParams = new URLSearchParams();
    Object.entries(pendingFilters).forEach(([key, value]) => {
      if (value) {
        if (key === "category") {
          queryParams.append("categories", value);
        } else if (key === "subcategory") {
          queryParams.append("subcategories", value);
        } else {
          queryParams.append(key, value);
        }
      }
    });
    queryParams.append("page", pageNum);
    queryParams.append("limit", jobsPerPage);
    return `https://jobquick.onrender.com/job/filter?${queryParams.toString()}`;
  };

  useEffect(() => {
    const fetchCategories = async () => {
      if (!isAuthenticated()) return;

      setIsLoading(true);
      try {
        const response = await fetch(
          "https://jobquick.onrender.com/categories",
          {
            headers: {
              Authorization: `Bearer ${JobToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const categoriesData = data.categories || data.data || [];
        setCategories(categoriesData);
        
        if (searchCategory) {
          const category = categoriesData.find(cat => cat.title === searchCategory);
          if (category) {
            setSelectedCategory(category);
            setPendingFilters(prev => ({
              ...prev,
              category: category.title
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [JobToken, searchCategory]);

  const fetchJobs = async (pageNum, isLoadMore = false) => {
    if (!isAuthenticated()) return;

    setIsLoading(true);
    try {
      const response = await fetch(buildFilterUrl(pageNum), {
        headers: {
          Authorization: `Bearer ${JobToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (isLoadMore) {
        setJobListings((prevJobs) => [...prevJobs, ...data.jobs]);
      } else {
        setJobListings(data.jobs || []);
      }

      setTotalJobs(data.pagination.total);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setError("Failed to load jobs");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (name, value) => {
    setPendingFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (categoryId) => {
    const selectedCat = categories.find((cat) => cat._id === categoryId);
    if (selectedCat) {
      setSelectedCategory(selectedCat);
      setSelectedSubcategory("");
      handleFilterChange("category", selectedCat.title);
      handleFilterChange("subcategory", "");
    } else {
      setSelectedCategory(null);
      handleFilterChange("category", "");
      handleFilterChange("subcategory", "");
    }
  };

  const handleSubcategoryChange = (subcategory) => {
    setSelectedSubcategory(subcategory);
    handleFilterChange("subcategory", subcategory);
  };

  const handleApplyFilters = () => {
    setCurrentPage(1);
    setJobListings([]);
    setFilters(pendingFilters);
    updateURL(pendingFilters);
    fetchJobs(1, false);
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchJobs(nextPage, true);
  };

  useEffect(() => {
    if (isAuthenticated()) {
      setPendingFilters(prev => ({
        ...prev,
        search: searchTitle,
        category: searchCategory,
        location: searchLocation,
      }));
      setFilters(prev => ({
        ...prev,
        search: searchTitle,
        category: searchCategory,
        location: searchLocation,
      }));
      setCurrentPage(1);
      fetchJobs(1, false);
    }
  }, [searchTitle, searchCategory, searchLocation]);

  if (!isAuthenticated()) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
          <p className="text-gray-600 mb-4">
            You need to be logged in to view job listings
          </p>
          <Link
            to="/login"
            className="inline-block bg-gradient-to-r from-teal-500 to-blue-500 text-white py-2 px-6 rounded-md hover:opacity-90"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col space-y-8">
            <div className="relative flex flex-col lg:flex-row gap-6">
              <div className="lg:w-80">
              <button
  className="fixed top-4 left-4 z-50 p-2 bg-teal-600 text-white rounded-lg lg:hidden"
  onClick={() => setIsOpen(!isOpen)}
>
  {isOpen ? (
    <X className="h-5 w-6" />
  ) : (
    <Menu className="h-5 w-6" />
  )}
</button>

<div
  className={`fixed inset-y-0 left-0 bg-white z-40 overflow-y-auto p-4 transition-transform duration-300 ease-in-out transform
    ${isOpen ? "translate-x-0" : "-translate-x-full"} 
    w-full h-screen
    lg:relative lg:translate-x-0 lg:w-80 lg:flex-shrink-0 lg:inset-auto lg:overflow-hidden`}
>
  <JobFilters
    filters={pendingFilters}
    onFilterChange={handleFilterChange}
    categories={categories}
    isLoading={isLoading}
    onApplyFilters={handleApplyFilters}
    selectedCategory={selectedCategory}
    selectedSubcategory={selectedSubcategory}
    handleCategoryChange={handleCategoryChange}
    handleSubcategoryChange={handleSubcategoryChange}
  />
</div>
              </div>

              <div className="flex-1">
                {isLoading && jobListings.length === 0 ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
                    {[1, 2, 3, 4].map((n) => (
                      <div
                        key={n}
                        className="border rounded-lg p-4 animate-pulse"
                      >
                        <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    ))}
                  </div>
                ) : error ? (
                  <div className="text-red-500 text-center py-8">
                    <p className="text-xl font-semibold mb-2">Error</p>
                    <p>{error}</p>
                  </div>
                ) : jobListings.length === 0 ? (
                  <div className="text-gray-500 text-center py-8">
                    <p className="text-xl font-semibold mb-2">No jobs found</p>
                    <p className="text-gray-400">Try adjusting your filters</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
                    {jobListings.map((job) => (
                      <JobCard key={job._id} job={job} />
                    ))}
                  </div>
                )}

                {currentPage < totalPages && !isLoading && jobListings.length > 0 && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={handleLoadMore}
                      className="w-40 h-10 rounded-lg text-blue-800 hover:text-blue-800 hover:underline cursor-pointer font-semibold sm:h-12 md:h-14 lg:h-12"
                    >
                      Load More...
                    </button>
                  </div>
                )}

                {isLoading && (
                  <div className="flex justify-center mt-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Jobs;