
import { useState } from 'react'
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

function DyHome() {
  const [topCompanies, setTopCompanies] = useState(null);



  return (
    <>
     <Header/>
     <DyHero/>
     <DyCompanyLogos/>
     <DyRecentJobs/>
     <DyCategories/>
     <DyTopCompany/>
     <DyAbout/>
     <DyTestimonials/>
     <DyNewsBlog/>
     <Footer/>
    </>
  )
}

export default DyHome;