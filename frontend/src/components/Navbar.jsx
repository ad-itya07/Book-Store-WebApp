import React from "react";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6">
      <nav className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex item center md:gap-16 gap-4">
          <Link to="/">
            <HiMiniBars3BottomLeft className="size-6" />
          </Link>

          {/* Search bar */}
          <div className="relative sm:w-72 w-40 space-x-2">
            <IoSearch className="size-4 absolute inline-block left-3 inset-y-2" />
            <input
              type="text"
              placeholder="Search Book..."
              className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
            />
          </div>
        </div>

        {/* Right side */}
        <div>nav items</div>
      </nav>
    </header>
  );
};

export default Navbar;
