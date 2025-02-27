import { useEffect, useState } from 'react'
import Footer from '../commonSeeker/Footer'
import Header from '../commonSeeker/Header'
import DyAbout from './DyAbout'
import DyCategories from './DyCategories'
import DyCompanyLogos from './DyCompanyLogos'
import DyHero from './DyHero'
import DyNewsBlog from './DyNewsBlog'
import DyRecentJobs from './DyRecentJobs'
import DyTestimonials from './DyTestimonials'
import DyTopCompany from './DyTopCompany'
import Cookies from 'js-cookie'
import axios from 'axios';

function DyHome() {
  const [landingPageData, setLandingPageData] = useState({
    topCompanies: [],
    recentJobs: [],
    categories: [],
    testimonials: []
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    LandingPageData();
  }, []);

  const LandingPageData = async () => {
    const token = Cookies.get("JwtToken");
    if (!token) {
      setError("Token is missing or invalid");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('https://jobquick.onrender.com/landingpage', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.status !== 200) {
        setError(`Error ${response.status}: ${response.statusText}`);
        setLoading(false);
        return;
      }

      // Extract the necessary data from the response
      setLandingPageData({
        topCompanies: response.data.data.topcompanyList || [],
        recentJobs: response.data.data.jobList || [],
        categories: response.data.data.categoryList || [],
        testimonials: response.data.data.feedbackList || []
      });
      
      setLoading(false);
    } catch (error) {
      setError(`Error: ${error.message}`);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Simple loading state
  }

  return (
    <>
     <Header/>
     <DyHero/>
     <DyCompanyLogos/>
     <DyRecentJobs jobs={landingPageData.recentJobs}/>
     <DyCategories categories={landingPageData.categories}/>
     <DyTopCompany companies={landingPageData.topCompanies}/>
     <DyAbout/>
     <DyTestimonials testimonials={landingPageData.testimonials}/>
     <DyNewsBlog/>
     <Footer/>
     {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  )
}

export default DyHome;