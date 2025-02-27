
import Footer from '../commonSeeker/Footer'
import Header from '../commonSeeker/Header'
import About from '../LandingPage/About'
import Categories from '../LandingPage/Categories'
import CompanyLogos from '../LandingPage/CompanyLogos'
import DyHero from './DyHero'
import NewsBlog from '../LandingPage/NewsBlog'
import RecentJobs from '../LandingPage/RecentJobs'
import Testimonials from '../LandingPage/Testimonials'
import TopCompany from '../LandingPage/TopCompany'

function DyHome() {
  

  return (
    <>
     <Header/>
     <DyHero/>
     <CompanyLogos/>
     <RecentJobs/>
     <Categories/>
     <TopCompany/>
     <About/>
     <Testimonials/>
     <NewsBlog/>
     <Footer/>



    </>
  )
}

export default DyHome;