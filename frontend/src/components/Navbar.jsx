import React, { useState } from "react";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { LuShoppingCart } from "react-icons/lu";
import { FaBookOpen } from "react-icons/fa";

import { Link } from "react-router-dom";
import avatarImg from "../assets/avatar.png";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  // { name: "Check Out", href: "/checkout" },
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const { currentUser, logout } = useAuth();

  const handleLogOut = () => {
    logout();
  };
  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6">
      <nav className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex item-center md:gap-16 gap-4">
          <Link to="/">
            <FaBookOpen className="size-6" />
          </Link>

          {/* Search bar */}
          <div className="relative sm:w-72 w-40 space-x-2">
            <IoSearch className="size-4 absolute inline-block left-4 inset-y-2" />
            <input
              type="text"
              placeholder="Search Book..."
              className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="relative flex items-center md:space-x-3 space-x-2">
          <div>
            {currentUser ? (
              <>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <img
                    src={avatarImg}
                    alt="user-avatar"
                    className={`size-7 rounded-full ${
                      currentUser ? "ring-2 ring-blue-500" : ""
                    }`}
                  />
                </button>
                {/* DROPDOWN */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 border border-gray-300 bg-white shadow-lg rounded-md z-40">
                    <ul className="py-2">
                      {navigation.map((item) => (
                        <li
                          key={item.name}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Link
                            to={item.href}
                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={handleLogOut}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <FaRegUserCircle className="size-6" />
              </Link>
            )}
          </div>
          <button className="hidden sm:block">
            <MdFavoriteBorder className="size-6" />
          </button>
          <Link
            to="/cart"
            className="bg-primary p-1 sm:px-6 py-2 flex items-center rounded-sm"
          >
            <LuShoppingCart />
            {cartItems.length > 0 ? (
              <span className="text-sm font-semibold sm:ml-1">
                {cartItems.length}
              </span>
            ) : (
              <span className="text-sm font-semibold sm:ml-1">0</span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
