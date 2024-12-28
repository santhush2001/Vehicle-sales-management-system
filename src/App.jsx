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
import ForgotPassword from "./components/ForgotPassword";
import ProfilePage from "./components/User/ProfilePage";
import ManageUsers from "./components/Admin/ManageUsers";

// Dashboard imports
import AdminDashboard from "./components/Admin/AdminDashboard";
import UserDashboard from "./components/User/UserDashboard"; 

// New Component Import
import ChatBot from "./components/ChatBot/ChatBot";
import AddVehicle from "./components/Admin/AddVehicle";
import ViewVehicle from "./components/Admin/ViewVehicle";
import VehicleDetails from "./components/Admin/VehicleDetails";
import Buy from "./components/User/Buy";
import EditVehicle from "./components/Admin/EditVehicle";
import ComparisonList from "./components/User/ComparisonList";
import MediaViewer from "./components/Admin/MediaViewer";
import MediaViewerUser from "./components/User/MediaViewerUser";
import ViewSchedule from "./components/User/ViewSchedule";


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
  
     
          {/* Routes without Navbar */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin-dashboard/AddVehicle" element={<AddVehicle />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/Admin/AddVehicle" element={<AddVehicle />} />
          <Route path="/Admin/ViewVehicle" element={<ViewVehicle />} />
          <Route path="/vehicle/:id" element={<VehicleDetails />} />
          <Route path="/buy/:id" element={<Buy />} />
          <Route path="/edit-vehicle/:id" element={<EditVehicle />} />
          <Route path="/comparison" element={<ComparisonList />} />
          <Route path="/media-viewer" element={<MediaViewer />} />
          <Route path="/user-media-viewer" element={<MediaViewerUser />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/Admin/ManageUsers" element={<ManageUsers />} />
          <Route path="/ViewSchedule" element={<ViewSchedule />} />  
        </Routes>
        <ChatBot />
      </div>
    </Router>
  );
};

export default App;
