import React, { useEffect } from "react";
import "./CarGallery.css"; // Link to the CSS file for styling

const CarGallery = () => {
  useEffect(() => {
    // JavaScript logic for slider
    const next = document.querySelector(".next");
    const prev = document.querySelector(".prev");

    next.addEventListener("click", () => {
      const items = document.querySelectorAll(".item");
      document.querySelector(".slide").appendChild(items[0]);
    });

    prev.addEventListener("click", () => {
      const items = document.querySelectorAll(".item");
      document.querySelector(".slide").prepend(items[items.length - 1]);
    });
  }, []);

  return (
    <div className="container">
      <div className="slide">
        <div className="item" style={{ backgroundImage: "url('/1.jpg')" }}>
          <div className="content">
            <div className="name">Switzerland</div>
            <div className="des">X-Dev, Transforming code into visual poetry..!</div>
            <button>See More</button>
          </div>
        </div>
        <div className="item" style={{ backgroundImage: "url('/2.jpg')" }}>
          <div className="content">
            <div className="name">Finland</div>
            <div className="des">X-Dev, Transforming code into visual poetry..!</div>
            <button>See More</button>
          </div>
        </div>
        <div className="item" style={{ backgroundImage: "url('/3.jpg')" }}>
          <div className="content">
            <div className="name">Iceland</div>
            <div className="des">X-Dev, Transforming code into visual poetry..!</div>
            <button>See More</button>
          </div>
        </div>
        <div className="item" style={{ backgroundImage: "url('/4.jpg')" }}>
          <div className="content">
            <div className="name">Australia</div>
            <div className="des">X-Dev, Transforming code into visual poetry..!</div>
            <button>See More</button>
          </div>
        </div>
        <div className="item" style={{ backgroundImage: "url('/5.jpg')" }}>
          <div className="content">
            <div className="name">Netherlands</div>
            <div className="des">X-Dev, Transforming code into visual poetry..!</div>
            <button>See More</button>
          </div>
        </div>
        <div className="item" style={{ backgroundImage: "url('/6.jpg')" }}>
          <div className="content">
            <div className="name">Ireland</div>
            <div className="des">X-Dev, Transforming code into visual poetry..!</div>
            <button>See More</button>
          </div>
        </div>
      </div>

      <div className="button">
        <button className="prev">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <button className="next">
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default CarGallery;
