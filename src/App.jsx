import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

// Component imports
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Services from "./components/Services/Services";
import CarList from "./components/CarList/CarList";
import AppStoreBanner from "./components/AppStoreBanner/AppStoreBanner";
import Contact from "./components/Contact/Contact";
import Testimonial from "./components/Testimonial/Testimonial";
import Footer from "./components/Footer/Footer";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";

// Dashboard imports
import AdminDashboard from "./components/Admin/AdminDashboard";
import UserDashboard from "./components/User/UserDashboard";

// New Component Import
import MyCars from "./components/User/MyCars"; // Import the MyCars component

// Layout Component
const Layout = ({ theme, setTheme, children }) => {
  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} />
      {children}
    </>
  );
};

const App = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );
  const element = document.documentElement;

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <Router>
      <div className="bg-white dark:bg-black dark:text-white text-black overflow-x-hidden">
        <Routes>
          {/* Routes with Navbar */}
          <Route
            path="/"
            element={
              <Layout theme={theme} setTheme={setTheme}>
                <Hero theme={theme} />
                <About />
                <Services />
                <CarList />
                <Testimonial />
                <AppStoreBanner />
                <Contact />
                <Footer />
              </Layout>
            }
          />
          <Route
            path="/signin"
            element={
              <Layout theme={theme} setTheme={setTheme}>
                <SignIn />
              </Layout>
            }
          />
          <Route
            path="/signup"
            element={
              <Layout theme={theme} setTheme={setTheme}>
                <SignUp />
              </Layout>
            }
          />
          <Route
            path="/User/MyCars"
            element={
              
                <MyCars />
              
            }
          />

          {/* Routes without Navbar */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/user-dashboard/MyCars" element={<MyCars />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
