
import Footer from '../common/Footer'
import Header from '../common/Header'
import About from '../pages/About'
import Categories from '../pages/Categories'
import CompanyLogos from '../pages/CompanyLogos'
import Hero from '../pages/Hero'
import NewsBlog from '../pages/NewsBlog'
import RecentJobs from '../pages/RecentJobs'
import Testimonials from '../pages/Testimonials'
import TopCompany from '../pages/TopCompany'

function Home() {
  

  return (
    <>
     <Header/>
     <Hero/>
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

export default Home;