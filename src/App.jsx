import "./App.css";
import AboutUs from "./components/navbarSection/about/AboutUs";
import AiResume from "./components/navbarSection/AiResume";
import AtsScore from "./components/navbarSection/AtsScore";

import ContactPage from "./components/navbarSection/ContactUs";
import Jobs from "./components/navbarSection/Jobs";
import Home from "./components/pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs/>}/>
          <Route path="/contact" element={<ContactPage/>}/>
          <Route path="/ai-resume-builder" element={<AiResume/>}/>
          <Route path="/ats-score-checker" element={<AtsScore/>}/>
          <Route path="/about" element={<AboutUs/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
