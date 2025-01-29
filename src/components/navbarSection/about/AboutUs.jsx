import React from "react";

import WorkingWithTheBest from "./WorkingWithTheBest";
import NewsBlogSection from "../../pages/NewsBlog";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import Work from "./Work";
import SectionAbout from "./SectionAbout";


const AboutUs = () => (
  <>
    <Header />
    <SectionAbout/>
   <Work/>
    
    <WorkingWithTheBest />
    <NewsBlogSection />
    <Footer />
  </>
);

export default AboutUs;