import React from "react";
import { FaCameraRetro } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { SlNote } from "react-icons/sl";

const servicesData = [
  {
    name: "Best Deals",
    icon: <FaCameraRetro className="text-5xl text-primary group-hover:text-black duration-300" />,
    description: "Get the best deals on quality second-hand vehicles.",
    aosDelay: "0",
  },
  {
    name: "Fast and Reliable",
    icon: <GiNotebook className="text-5xl text-primary group-hover:text-black duration-300" />,
    description: "Quick and trustworthy service you can count on.",
    aosDelay: "500",
  },
  {
    name: "Expert Guidance",
    icon: <SlNote className="text-5xl text-primary group-hover:text-black duration-500" />,
    description: "Professional advice to help you make informed decisions.",
    aosDelay: "1000",
  },
];

const Services = () => {
  return (
    <div id="services" className="dark:bg-black dark:text-white py-14 sm:min-h-[600px] sm:grid sm:place-items-center">
      <div className="container">
        <div className="pb-12">
          <h1 data-aos="fade-up" className="text-3xl font-semibold text-center sm:text-4xl font-serif">
            Why Choose Us
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {servicesData.map((service) => (
            <div
              key={service.name}
              data-aos="fade-up"
              data-aos-delay={service.aosDelay}
              className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-16 bg-dark hover:bg-primary duration-300 text-white hover:text-black rounded-lg"
            >
              <div className="grid place-items-center">{service.icon}</div>
              <h1 className="text-2xl font-bold">{service.name}</h1>
              <p>{service.description}</p>
              <a href="#" className="inline-block text-lg font-semibold py-3 text-primary group-hover:text-black duration-300">
                Learn more
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
