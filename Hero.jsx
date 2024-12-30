import React, { useEffect } from "react";
import { ChevronRight } from "lucide-react";
import carPng from "../../assets/car.png";
import yellowCar from "../../assets/banner-car.png";
import AOS from "aos";

const Hero = ({ theme }) => {
  useEffect(() => {
    AOS.refresh();
  });

  return (
    <div className="dark:bg-black dark:text-white duration-300 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-950/30 dark:to-transparent -z-10" />
      
      <div className="container min-h-[620px] flex">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center gap-8 py-12">
          <div className="order-1 sm:order-2 relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl dark:from-blue-500/10 dark:to-purple-500/10" />
            <img
              src={theme === "dark" ? carPng : yellowCar}
              alt="Featured Car"
              className="sm:scale-125 relative max-h-[600px] hover:scale-105 transition-transform duration-300 drop-shadow-[2px_20px_6px_rgba(0,0,0,0.50)]"
              data-aos="zoom-in"
              data-aos-duration="1500"
              data-aos-once="false"
            />
          </div>

          <div className="space-y-8 order-2 sm:order-1 sm:pr-32 text-center sm:text-left">
            <div data-aos="fade-up" data-aos-delay="600">
              <h1 className="text-5xl lg:text-7xl font-semibold font-serif mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
                DriveLine
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto sm:mx-0 rounded-full" />
            </div>
            
            <p 
              className="text-lg text-gray-600 dark:text-gray-300"
              data-aos="fade-up"
              data-aos-delay="1000"
            >
              Find the best vehicles with Driveline. Buy or sell effortlessly on our secure platform!
            </p>

            <div 
              className="flex gap-4 justify-center sm:justify-start"
              data-aos="fade-up"
              data-aos-delay="1200"
            >
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;