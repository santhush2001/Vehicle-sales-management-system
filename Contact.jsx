import React from "react";
import "../Contact/Contact.css";
import { FaWhatsapp, FaFacebook, FaYoutube } from "react-icons/fa"; // Import icons for social media

const Contact = () => {
  return (
    <>
      <span id="contact"></span>
      <div data-aos="zoom-in" className="dark:bg-black dark:text-white py-14">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-800 py-8 px-6">
            {/* Left side: Contact info and social icons */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl font-bold text-white">
                Let's collaborate on finding the perfect vehicle for you. Your dream car awaits!
              </h1>
              <p className="text-gray-400">
                Reach out to us through the following:
              </p>
              <div className="contact-info">
                <p className="text-white">
                  <strong>Phone Hotline:</strong> 0789 25 4555
                </p>
                <p className="text-white">
                  <strong>Email:</strong> driveline@gmail.com
                </p>
              </div>
         
            </div>

            {/* Right side: Contact Form */}
            <div className="sm:flex sm:flex-col sm:justify-center">
              <a
                href="#"
                className="inline-block font-semibold py-2 px-6 bg-primary text-white hover:bg-primary/80 duration-200 tracking-widest uppercase mb-6"
              >
                Contact
              </a>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400"
                />
                <textarea
                  placeholder="Your Message"
                  className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400"
                  rows="4"
                ></textarea>
                <button
                  type="submit"
                  className="w-full py-3 bg-primary text-white rounded hover:bg-primary/80 duration-200 tracking-widest uppercase"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
