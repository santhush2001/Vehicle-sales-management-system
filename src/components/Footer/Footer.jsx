import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLocationArrow,
  FaMobileAlt,
  FaWhatsapp,
} from "react-icons/fa";

const FooterLinks = [
  {
    title: "Home",
    link: "#",
  },
  {
    title: "About",
    link: "#about",
  },
  {
    title: "Contact",
    link: "#contact",
  },
];

const Footer = () => {
  return (
    <div className="bg-gray-100 dark:bg-dark mt-14 rounded-t-3xl">
      <section className="container">
        <div className="grid md:grid-cols-3 py-5">
          {/* Company Details */}
          <div className="py-8 px-4">
            <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3 font-serif">
              DriveLine
            </h1>
            <p className="text-sm">
              Have questions or need assistance? Contact Driveline today! We're here to help with all your second-hand vehicle needs.
            </p>
            <br />
            <div className="flex items-center gap-3">
              <FaLocationArrow />
              <p>Kandy, Sri Lanka</p>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <FaMobileAlt />
              <p>+94 710852093</p>
            </div>
            {/* Social Handles */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://www.instagram.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-3xl hover:text-primary duration-300" />
              </a>
              <a
                href="https://www.facebook.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="text-3xl hover:text-primary duration-300" />
              </a>
              <a
                href="https://www.whatsapp.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="text-3xl hover:text-primary duration-300" />
              </a>
            </div>
          </div>
          {/* Links and Map */}
          <div className="grid grid-cols-1 md:grid-cols-2 col-span-2 md:pl-10">
            {/* Important Links */}
            <div>
              <div className="py-8 px-4">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                  Important Links
                </h1>
                <ul className="flex flex-col gap-3">
                  {FooterLinks.map((link) => (
                    <li
                      key={link.title}
                      className="cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary space-x-1 text-gray-500 dark:text-gray-200"
                    >
                      <a href={link.link}>
                        <span>&#11162;</span>
                        <span>{link.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Map Section */}
            <div className="py-8 px-4">
              <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                Find Us Here
              </h1>
              <div className="w-full h-64">
                <iframe
                  title="Sri Lanka Vehicle Sale Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31707.47972158909!2d80.63372600590314!3d7.292843457215559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae366c0db9f3b5d%3A0x3f87c6fc93308d56!2sKandy%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
