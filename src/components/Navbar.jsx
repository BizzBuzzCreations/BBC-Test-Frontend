import React from "react";
import logo from "../assets/bbc-logo.jpg"; 

const Navbar = () => {
  return (
    <header className="bg-[#1f2f3f] py-4 px-8">
      <div className="flex items-center">
        <a 
          href="https://bizzbuzzcreations.com/" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <img
            src={logo}
            alt="bbc"
            className="h-12 w-auto object-contain cursor-pointer"
          />
        </a>
      </div>
    </header>
  );
};

export default Navbar;