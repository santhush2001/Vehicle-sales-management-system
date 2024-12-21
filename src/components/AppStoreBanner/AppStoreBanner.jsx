import React, { useState } from "react";
import image1 from "../../assets/website/1.jpg";
import image2 from "../../assets/website/2.jpg";
import image3 from "../../assets/website/3.jpg";
import image4 from "../../assets/website/4.jpg";
import image5 from "../../assets/website/5.jpg";
import image6 from "../../assets/website/6.jpg";

import "./AppStoreBanner.css"; // Ensure the file exists

const AppStoreBanner = () => {
  const images = [image1, image2, image3, image4, image5, image6];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="slider-container">
      <div
        className="slider-image"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      >
        
      </div>
      <div className="slider-buttons">
        <button onClick={prevSlide} className="slider-btn">
          &#8592; Prev
        </button>
        <button onClick={nextSlide} className="slider-btn">
          Next &#8594;
        </button>
      </div>
    </div>
  );
};

export default AppStoreBanner;
