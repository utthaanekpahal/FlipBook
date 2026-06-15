import React from "react";
import {
  FaBookOpen,
  FaSearch,
  FaUser,
  FaBars,
} from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";

const Header = ({ setOpen }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#F5F5F5] px-4 py-3 shadow-sm">

      <div className="flex items-center justify-between gap-3">

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-[#572C10]"
          onClick={() => setOpen(true)}
        >
          <FaBars size={22} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-[#572C10] text-lg md:text-xl">
          <FaBookOpen size={22} />
          <span>Digital Book Library</span>
        </div>

        {/* Search Desktop */}
        <div className="hidden md:block relative w-[350px] lg:w-[600px]">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A77F60]" />

          <input
            type="text"
            placeholder="Search Book, Categories"
            className="w-full pl-12 pr-4 py-2 rounded-full border-2 border-[#A77F60] outline-none text-[#A77F60] font-bold"
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <IoNotificationsOutline
            size={24}
            color="#572C10"
          />

          <div className="flex items-center gap-2">
            <FaUser size={20} color="#572C10" />
            <span className="font-bold text-[#572C10]">
              Piyush
            </span>
          </div>
        </div>

      </div>

      {/* Mobile Search */}
      <div className="relative mt-3 md:hidden">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A77F60]" />

        <input
          type="text"
          placeholder="Search Book, Categories"
          className="w-full pl-12 pr-4 py-2 rounded-full border-2 border-[#A77F60] outline-none text-[#A77F60] font-bold"
        />
      </div>

    </header>
  );
};

export default Header;