import React from "react";
import { FaInstagram, FaLinkedin, FaGithub, FaFileAlt } from "react-icons/fa";

const TopBar = () => {
  return (
    <div className="bg-black text-white border-b-2 border-white">
      <div className="container mx-auto flex justify-between items-center py-3 px-4 text-sm">
        {/* Left: Social Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="https://www.linkedin.com/in/yash-kotra"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            <FaLinkedin className="h-5 w-5" />
          </a>

          <a
            href="https://github.com/YashKotra"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            <FaGithub className="h-5 w-5" />
          </a>

          <a
            href="https://drive.google.com/file/d/1rt7KFeOLJz4AoKp2c2ZgiSU1JFOgx152/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            <FaFileAlt className="h-5 w-5" />
          </a>

          <a
            href="https://www.instagram.com/_iam.yash17__/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            <FaInstagram className="h-5 w-5" />
          </a>
        </div>

        {/* Center: Tagline */}
        <div className="text-center flex-grow">
          <span>Rent. Ride. Relax.</span>
        </div>

        {/* Right: Phone Number */}
        <div className="text-sm hidden md:block">
          <a href="tel:+917056008838" className="hover:text-gray-300">
            +91 7056008838
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
