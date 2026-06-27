import React from "react";
import { FaSearch, FaUser, FaBookOpen, FaBars } from "react-icons/fa";

const AgentHeader = ({ setOpen }) => {
  const agentName = localStorage.getItem("agentName");

  return (
    <header className="fixed top-0 left-0 right-0 z-[60] bg-white/70 backdrop-blur-xl border-b border-[#E6D6C8] shadow-sm">
      
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8">

        {/* TOP ROW */}
        <div className="flex items-center justify-between py-2.5 gap-4">

          {/* LEFT */}
          <div className="flex items-center gap-3 min-w-0">

            <button
              className="lg:hidden text-[#572C10] p-2 rounded-lg hover:bg-[#F5F0EB] transition"
              onClick={() => setOpen(true)}
            >
              <FaBars size={20} />
            </button>

            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#F5F0EB] shadow-sm border border-[#E6D6C8]">
              <FaBookOpen className="text-[#572C10] text-lg" />
            </div>

            <div className="leading-tight min-w-0">
              <h1 className="font-bold text-[16px] sm:text-[18px] md:text-[22px] text-[#572C10] truncate">
                BookHub
              </h1>

              <span className="font-medium text-[11px] sm:text-[12px] md:text-[13px] text-[#A77F60] tracking-wide">
                Agent panel
              </span>
            </div>

          </div>

          {/* CENTER SEARCH */}
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

              <h1 className="lg:text-[25px] text-[18px] font-extrabold  text-[#572C10] tracking-wide">
                Navbodh Prakashan
              </h1>

              <p className="text-[11px] text-[#A77F60] font-medium">
                Publishing Company Dashboard
              </p>

            </div>

          </div>
        </div>


          {/* RIGHT USER */}
          <div className="flex items-center gap-3 text-[#572C10] shrink-0">

            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-[#572C10] to-[#A77F60] text-white shadow-md">
              <FaUser size={14} />
            </div>

            <h1 className="font-semibold whitespace-nowrap text-[14px] sm:text-[15px] md:text-[16px]">
              Welcome {agentName}
            </h1>

          </div>

        </div>

        {/* MOBILE SEARCH */}
        <div className="sm:hidden pb-3">
          <div className="relative w-full">

            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A77F60]" />

            <input
              className="
                w-full pl-11 pr-3 py-2.5
                rounded-2xl
                bg-white/80
                border border-[#E6D6C8]
                shadow-sm
                text-[#5A3E2B]
                font-medium
                placeholder:text-[#A77F60]
                outline-none
                focus:ring-2 focus:ring-[#A77F60]/20
              "
              type="text"
              placeholder="Search Books"
            />
          </div>
        </div>

      </div>
    </header>
  );
};

export default AgentHeader;