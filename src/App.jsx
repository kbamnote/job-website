import "./App.css";
import Login from "./components/jobSeeker/seekerAuth/Login";
import Signup from "./components/jobSeeker/seekerAuth/Signup";
import AboutUs from "./components/jobSeeker/navbarSection/about/AboutUs";
import AiResume from "./components/jobSeeker/navbarSection/aiSection/AiResume";
import AtsScore from "./components/jobSeeker/navbarSection/aiSection/AtsScore";
import ContactUs from "./components/jobSeeker/navbarSection/contactUs/ContactUs";
import Jobs from "./components/jobSeeker/navbarSection/jobCategories/Jobs";
import Salaries from "./components/jobSeeker/navbarSection/salarySection/Salaries";
import Home from "./components/jobSeeker/LandingPage/Home";
import { Routes, Route } from "react-router-dom";
import Profile from "./components/jobSeeker/seekerProfile/Profile";
import HostingLogin from "./components/jobHosting/hostingAuth/HostingLogin";
import HostingSignup from "./components/jobHosting/hostingAuth/HostingSignup";
import JobHostingDashboard from "./components/jobHosting/HostingDashboard/JobHostingDashboard";
import PostJob from "./components/jobHosting/postJob/PostJob";
import HostingProfileDetail from "./components/jobHosting/hostingProfile/HostingProfileDetail";
import HostingProfileForm from "./components/jobHosting/hostingProfile/HostingProfileForm";
import NotFoundPage from "./components/notFoundPage/NotFoundPage";
import MyJobs from "./components/jobHosting/myJobs/Myjobs";
import ProtectedRoute from "./components/jobSeeker/seekerAuth/ProtectedRoute";
import JobDetails from "./components/jobSeeker/navbarSection/jobCategories/JobDetails";
import ViewApplicant from "./components/jobHosting/myJobs/ViewApplicant";
import UserDetails from "./components/jobSeeker/seekerProfile/UserDetails";
import ApplicantProfile from "./components/jobHosting/myJobs/ApplicantProfile";
import AiMockTest from "./components/jobSeeker/navbarSection/aiSection/mocktest/AiMockTest";
import QuestionComponent from "./components/jobSeeker/navbarSection/aiSection/mocktest/QuestionComponent";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/user-detail" element={<UserDetails/>} />
        
        <Route path="/job/:id/applicants" element={<ViewApplicant/>} />
        <Route path="/host-signup" element={<HostingSignup />} />
        <Route path="/host-login" element={<HostingLogin />} />
        <Route path="/hostingDashboard" element={<JobHostingDashboard />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/hosting-detail-form" element={<HostingProfileForm />} />
            
        <Route path="/profile-hoster" element={<HostingProfileDetail />} />
        <Route path="/jobs-hoster" element={<MyJobs />} />
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/jobs/:id/applicants" element={<ViewApplicant/>} />
        <Route path="/applicant/:id" element={<ApplicantProfile/>} />

        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/jobs/:id" 
          element={
            <ProtectedRoute>
              <JobDetails/>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/contact" 
          element={
            <ProtectedRoute>
              <ContactUs />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/ai-resume-builder" 
          element={
            <ProtectedRoute>
              <AiResume />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/ats-score-checker" 
          element={
            <ProtectedRoute>
              <AtsScore />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/about" 
          element={
            <ProtectedRoute>
              <AboutUs />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/salaries" 
          element={
            <ProtectedRoute>
              <Salaries />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/job-login" 
          element={
            <ProtectedRoute>
              <HostingLogin />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user-profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
                
        <Route
          path="/mock"
          element={
            <ProtectedRoute>
              <AiMockTest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/questions/:category/:subcategory"
          element={
            <ProtectedRoute>
              <QuestionComponent />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;