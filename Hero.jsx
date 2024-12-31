import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import carPng from "../../assets/car.png";
import yellowCar from "../../assets/banner-car.png";
import AOS from "aos";

const Hero = ({ theme }) => {
  const [translateX, setTranslateX] = useState(-100);  // Starting position of the line
  const [colorIndex, setColorIndex] = useState(0);  // Color change index
  const [reverse, setReverse] = useState(false);  // Direction flag (left or right)

  // Define the rainbow colors
  const rainbowColors = [
    'linear-gradient(to right, #ff0000, #ff7300)',  // Red to Orange
    'linear-gradient(to right, #ff7300, #fffb00)',  // Orange to Yellow
    'linear-gradient(to right, #fffb00, #00ff00)',  // Yellow to Green
    'linear-gradient(to right, #00ff00, #0000ff)',  // Green to Blue
    'linear-gradient(to right, #0000ff, #8a2be2)',  // Blue to Indigo
    'linear-gradient(to right, #8a2be2, #ff1493)',  // Indigo to Violet
    'linear-gradient(to right, #ff1493, #ff0000)',  // Violet to Red
  ];

  // This effect will move and change color like KITT's light bar
  useEffect(() => {
    const colorInterval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % rainbowColors.length); // Cycle through rainbow colors
    }, 500); // Change color every 500ms (faster)

    const movementInterval = setInterval(() => {
      setTranslateX((prev) => {
        if (!reverse) {
          if (prev < 100) {
            return prev + 4;  // Move right faster
          } else {
            setReverse(true); // Reverse direction when it reaches 100%
            return prev - 4;
          }
        } else {
          if (prev > -100) {
            return prev - 4;  // Move left faster
          } else {
            setReverse(false); // Reverse direction when it reaches -100%
            return prev + 4;
          }
        }
      });
    }, 20); // Update position every 20ms (faster)

    return () => {
      clearInterval(colorInterval);
      clearInterval(movementInterval);
    };
  }, [reverse]);

  // Dynamic styles for the line
  const lineStyle = {
    height: "4px",
    width: "100px",
    background: rainbowColors[colorIndex],  // Apply rainbow colors dynamically
    transform: `translateX(${translateX}%)`,
    borderRadius: "9999px",
    margin: "auto",
    transition: "transform 0.05s linear",  // Smooth horizontal movement
  };

  useEffect(() => {
    AOS.refresh();
  }, []);

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
              <div
                style={lineStyle}  // Apply the dynamic style for the moving line
                className="mx-auto sm:mx-0 rounded-full"
              />
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
