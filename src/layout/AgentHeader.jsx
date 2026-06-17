import React from "react";
import { FaSearch, FaUser, FaBookOpen, FaBars } from "react-icons/fa";

const AgentHeader = ({ setOpen }) => {
  return (
  <header className="fixed top-0 left-0 right-0 z-[60] bg-[#F5F5F5] border-b border-[#E6D6C8]">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8">

        {/* TOP ROW */}
        <div className="flex items-center justify-between py-3 gap-3">

          {/* LEFT */}
          <div className="flex items-center gap-3 min-w-0">

            <button
              className="lg:hidden text-[#572C10]"
              onClick={() => setOpen(true)}
            >
              <FaBars size={22} />
            </button>

            <FaBookOpen className="text-3xl text-[#572C10] shrink-0" />

            <div className="leading-tight min-w-0">
              <h1 className="font-bold text-[16px] sm:text-[18px] md:text-[22px] text-[#572C10] truncate">
                BookHub
              </h1>
              <span className="font-bold text-[11px] sm:text-[12px] md:text-[14px] text-[#572C10]">
                Agent panel
              </span>
            </div>
          </div>

          {/* CENTER SEARCH (desktop/tablet only) */}
          <div className="hidden sm:flex flex-1 justify-center px-2">
            <div className="relative w-full max-w-[500px]">

              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A77F60]" />

              <input
                className="w-full pl-10 pr-3 py-2 rounded-[15px] text-[#A77F60] font-medium border-2 border-[#A77F60] placeholder:text-[#A77F60] outline-none focus:ring-2 focus:ring-[#A77F60]/30"
                type="text"
                placeholder="Search Books"
              />
            </div>
          </div>

          {/* RIGHT USER */}
          <div className="flex items-center gap-2 text-[#572C10] shrink-0">

            <FaUser size={22} />

            {/* FIX: Agent name always visible on sm+ */}
            <span className="font-bold whitespace-nowrap text-[14px] sm:text-[16px]">
              Agent
            </span>

          </div>

        </div>

        {/* MOBILE SEARCH */}
        <div className="sm:hidden pb-3">
          <div className="relative w-full">

            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A77F60]" />

            <input
              className="w-full pl-10 pr-3 py-2 rounded-[15px] text-[#A77F60] font-medium border-2 border-[#A77F60] placeholder:text-[#A77F60] outline-none"
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