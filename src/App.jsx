import "./App.css";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import AboutUs from "./components/navbarSection/about/AboutUs";
import AiResume from "./components/navbarSection/AiResume";
import AtsScore from "./components/navbarSection/AtsScore";
import ContactUs from "./components/navbarSection/ContactUs";

import ContactPage from "./components/navbarSection/ContactUs";
import Jobs from "./components/navbarSection/Jobs";
import Salaries from "./components/navbarSection/Salaries";
import Home from "./components/pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./components/profile/Profile";
import HostingLogin from "./components/jobHosting/hostingAuth/HostingLogin";
import HostingSignup from "./components/jobHosting/hostingAuth/HostingSignup";
import JobHostingDashboard from "./components/jobHosting/HostingDashboard/JobHostingDashboard";
import PostJob from "./components/jobHosting/HostingDashboard/PostJob";
import HostingProfileDetail from "./components/jobHosting/HostingDashboard/hostingProfile/HostingProfileDetail";
import HostingProfileForm from "./components/jobHosting/HostingDashboard/hostingProfile/hostingProfileForm";
import NotFoundPage from "./components/notFoundPage/NotFoundPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs/>}/>
          <Route path="/contact" element={<ContactUs/>}/>
          <Route path="/ai-resume-builder" element={<AiResume/>}/>
          <Route path="/ats-score-checker" element={<AtsScore/>}/>
          <Route path="/about" element={<AboutUs/>}/>
          <Route path='/login' element= {<Login/>}/>
          <Route path="/register" element = {<Signup/>}/>
          <Route path="/salaries" element = {<Salaries/>}/>
          <Route path="/job-login" element={<HostingLogin/>}/>
        
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/host-signup" element={<HostingSignup/>}/>
          <Route path="/host-login" element={<HostingLogin/>}/>
          <Route path="/hostingDashboard" element={<JobHostingDashboard/>}/>
          <Route path="/post-job" element={<PostJob/>}/>
          <Route path="/profile-hoster" element={<HostingProfileDetail/>}/>
          <Route path="/hosting-profile-form" element={<HostingProfileForm/>}/>
          <Route path="/*" element={<NotFoundPage/>}/>
        </Routes>
        
      </BrowserRouter>
    </>
  );
}

export default App;
