import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBookOpen, FaBars, FaPlus } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";

const Header = ({ setOpen }) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#EDE4DB] px-3 py-2 shadow-md">

      <div className="flex items-center justify-between gap-4">

        {/* Left */}
        <div className="flex items-center gap-3">

          {/* Mobile Menu */}
          <button
            className="lg:hidden text-[#572C10] hover:bg-[#FAF7F4] p-2 rounded-lg transition"
            onClick={() => setOpen(true)}
          >
            <FaBars size={22} />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-3 font-extrabold text-[#572C10] text-lg md:text-xl tracking-tight">

            <div className="p-2 rounded-xl bg-[#FAF7F4] shadow-sm border border-[#E9E1D8]">
              <FaBookOpen size={22} />
            </div>

            <span className="bg-gradient-to-r from-[#572C10] to-[#A77F60] bg-clip-text text-transparent">
              Digital Book Library
            </span>

          </div>

        </div>

        {/* Center Status (EXPANDED ONLY) */}
        <div className="flex flex-1 justify-center items-center gap-3 hidden md:flex">

          {/* Brand Section */}
          <div className="flex items-center lg:w-[45%] lg:gap-[15px] gap-[15px] bg-[#FAF7F4] px-3 py-2 rounded-2xl border border-[#E9E1D8] shadow-sm">

            {/* Logo */}
            <div className="w-11 h-11 rounded-full overflow-hidden border border-[#E9E1D8] shadow-md bg-white flex items-center justify-center hover:scale-105 transition">
              <img
                src="/nav.png"
                alt="Navbodh Prakashan"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Company Name */}
            <div className="leading-tight hidden sm:block">

              <h1 className="lg:text-[25px] text-[10px] font-extrabold  text-[#572C10] tracking-wide">
                Navbodh Prakashan
              </h1>

              <p className="text-[11px] text-[#A77F60] font-medium">
                Publishing Company Dashboard
              </p>

            </div>

          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">

          {/* Notifications */}
          <div className="relative cursor-pointer p-2 rounded-full hover:bg-[#FAF7F4] transition">
            <IoNotificationsOutline size={24} className="text-[#572C10]" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-[#E9E1D8]"></div>

          {/* Profile */}
          <div className="flex items-center gap-2 cursor-pointer hover:bg-[#FAF7F4] px-3 py-1.5 rounded-xl transition-all border border-transparent hover:border-[#E9E1D8]">

            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#572C10] to-[#A77F60] text-white flex items-center justify-center font-bold text-sm shadow-sm">
              A
            </div>

            <div className="hidden sm:block leading-tight">
              <p className="text-sm font-bold text-[#572C10]">
                Admin
              </p>
              <p className="text-[11px] text-[#A77F60]">
                Super Admin
              </p>
            </div>

          </div>

        </div>

      </div>

    </header>
  );
};

export default Header;