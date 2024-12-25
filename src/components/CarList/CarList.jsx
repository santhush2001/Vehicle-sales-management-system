import React from "react";
import whiteCar from "../../assets/car2.png";
import car2 from "../../assets/car6.png";
import car3 from "../../assets/van.png";
import car4 from "../../assets/bike.png";
import car5 from "../../assets/bus.png";
import car6 from "../../assets/threeweel.png";
import car7 from "../../assets/lorry-truck.png";
import car8 from "../../assets/double-cab.png";
import car9 from "../../assets/doser.png";

const carList = [
  {
    image: whiteCar,
    category: "Car",
    aosDelay: "0",
  },
  {
    image: car2,
    category: "Jeep",
    aosDelay: "500",
  },
  {
    image: car3,
    category: "Van",
    aosDelay: "1000",
  },
  {
    image: car4,
    category: "Bike",
    aosDelay: "1000",
  },
  {
    image: car5,
    category: "Bus",
    aosDelay: "1000",
  },
  {
    image: car6,
    category: "Three-wheeler",
    aosDelay: "1000",
  },
  {
    image: car7,
    category: "Lorry-Truck",
    aosDelay: "1000",
  },
  {
    image: car8,
    category: "Double-Cab",
    aosDelay: "1000",
  },
   {
    image: car9,
    category: "Dozer",
    aosDelay: "1000",
  },
];

const CarList = () => {
  return (
    <div className="pb-24">
      <div className="container">
        {/* Heading */}
        <h1
          data-aos="fade-up"
          className="text-3xl sm:text-4xl font-semibold font-serif mb-3"
        >
          Vehicle Category
        </h1>
        <p data-aos="fade-up" aos-delay="400" className="text-sm pb-10">
          Our website offers sales across all vehicle categories, providing a
          wide range of options to suit every need and preference.
        </p>
        {/* Car listing */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
            {carList.map((data) => (
              <div
                key={data.name}
                data-aos="fade-up"
                data-aos-delay={data.aosDelay}
                className="space-y-3 border-2 border-gray-300 hover:border-primary p-3 rounded-xl relative group"
              >
                <div className="w-full h-[120px]">
                  <img
                    src={data.image}
                    alt={data.name}
                    className="w-full h-[120px] object-contain sm:translate-x-8 group-hover:sm:translate-x-16 duration-700"
                  />
                </div>
                <div className="space-y-2">
                  <h1 className="text-primary font-semibold">{data.name}</h1>
                  <div className="flex justify-between items-center text-xl font-semibold">
                    <span>{data.category}</span> {/* Display the category */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* End of car listing */}
        <div className="grid place-items-center mt-8">
          <button data-aos="fade-up" className="button-outline">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarList;
