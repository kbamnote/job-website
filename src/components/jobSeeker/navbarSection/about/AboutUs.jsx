import React from "react";

import WorkingWithTheBest from "./WorkingWithTheBest";
import NewsBlogSection from "../../../jobSeeker/LandingPage/NewsBlog";
import Header from "../../../jobSeeker/commonSeeker/Header";
import Footer from "../../../jobSeeker/commonSeeker/Footer";
import Work from "./Work";
import SectionAbout from "./SectionAbout";
import Question from "./Question";


const AboutUs = () => (
  <>
    <Header />
    <SectionAbout/>
   <Work/>
    <Question/>
    <WorkingWithTheBest />
    <NewsBlogSection />
    <Footer />
  </>
);

export default AboutUs;