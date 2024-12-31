import React from "react";
import { Clock, Sparkles } from "lucide-react";
import CarPng from "../../assets/car1.png"; // Ensure this path is correct

const About = () => {
  return (
    <div id="about" className="dark:bg-black dark:text-white duration-300 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image */}
          <div data-aos="fade-right" data-aos-duration="1500" className="relative">
            {/* Main Image */}
            <div className="relative">
              <img
                src={CarPng}
                alt="Luxury Car"
                className="w-3/4 mx-auto max-h-[300px] object-cover rounded-lg shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-500"
              />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-10">
            {/* Section Title */}
            <div className="space-y-4" data-aos="fade-up">
              <div className="flex items-center space-x-2">
                <div className="h-px w-8 bg-blue-600 dark:bg-blue-400"></div>
                <span className="text-blue-600 dark:text-blue-400 font-semibold">About Driveline</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight dark:text-white">
                Experience Luxury in
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Every Drive</span>
              </h1>
            </div>

            {/* Description */}
            <p data-aos="fade-up" data-aos-delay="100" className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              At Driveline, we redefine the experience of buying and selling premium second-hand vehicles.
              Our curated platform connects discerning buyers with verified sellers, ensuring every
              transaction is seamless, secure, and exceptional.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-aos="fade-up" data-aos-delay="300">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2 dark:text-white">24/7 Support</h3>
                <p className="text-gray-600 dark:text-gray-400">Round-the-clock assistance for all your vehicle needs</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <Sparkles className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2 dark:text-white">Premium Quality</h3>
                <p className="text-gray-600 dark:text-gray-400">Thoroughly inspected and certified vehicles</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
