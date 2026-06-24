import React from 'react';
import { FaHome, FaBook, FaUsers } from "react-icons/fa";
import { FaFolder } from "react-icons/fa6";
import { MdConfirmationNumber } from "react-icons/md";
import { FaUser, FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const AgentSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");

    navigate("/", { replace: true });

    if (window.innerWidth < 1024) {
      setOpen(false);
    }
  };

  const handleNavigate = (path, state = {}) => {
    navigate(path, { state });

    if (window.innerWidth < 1024) {
      setOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <header
        className={`
          fixed
          lg:top-[14%]
          md:top-[10%]
          sm:top-[5px]
          top-[22%]

          left-0

          h-[75%]
          sm:h-[50%]
          md:h-[50%]
          lg:h-[84%]

          w-[250px]
          ml-[20px]

          bg-white/80 backdrop-blur-xl
          border border-[#E6D6C8]
          rounded-2xl
          shadow-[0_10px_40px_rgba(0,0,0,0.08)]

          z-50
          transition-all duration-300

          ${open ? "translate-x-0" : "-translate-x-[120%]"}

          lg:translate-x-0
        `}
      >

        {/* Close Button Mobile */}
        <div className="flex justify-end p-3 lg:hidden">
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F5F0EB] transition"
          >
            <FaTimes size={16} className="text-[#572C10]" />
          </button>
        </div>

        <div className='flex flex-col h-full px-3 pb-4'>

          {/* MENU */}
          <ul className='flex flex-col gap-2 flex-1'>

            {/* ITEM */}
            <li
              onClick={() => handleNavigate("/agentDashboard")}
              className='flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-[#572C10] font-semibold
              hover:bg-[#572C10] hover:text-white transition-all duration-200'
            >
              <FaHome className='text-lg' />
              Home
            </li>

            <li
              onClick={() =>
                handleNavigate("/agent/category", {
                  from: "agent"
                })
              }
              className='flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-[#572C10] font-semibold
              hover:bg-[#572C10] hover:text-white transition-all duration-200'
            >
              <FaFolder className='text-lg' />
              Categories
            </li>

            <li
              onClick={() =>
                handleNavigate("/agent/books", {
                  from: "agent"
                })
              }
              className='flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-[#572C10] font-semibold
              hover:bg-[#572C10] hover:text-white transition-all duration-200'
            >
              <FaBook className='text-lg' />
              All Books
            </li>

            <li
              onClick={() =>
                handleNavigate("/VisitForm", {
                  from: "agent"
                })
              }
              className='flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-[#572C10] font-semibold
              hover:bg-[#572C10] hover:text-white transition-all duration-200'
            >
              <FaFolder className='text-lg' />
              School Visit Form
            </li>

            <li
              onClick={() =>
                handleNavigate("/agent/followUp")
              }
              className='flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-[#572C10] font-semibold
              hover:bg-[#572C10] hover:text-white transition-all duration-200'
            >
              <FaUsers className='text-lg' />
              Follow Up
            </li>

            <li
              onClick={() =>
                handleNavigate("/agent/Ticket", {
                  role: "agent"
                })
              }
              className='flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-[#572C10] font-semibold
              hover:bg-[#572C10] hover:text-white transition-all duration-200'
            >
              <MdConfirmationNumber className='text-lg' />
              Ticket
            </li>

          </ul>

          {/* LOGOUT */}
          <div className="pt-3 border-t border-[#E6D6C8]">

            <li
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
              text-red-600 font-semibold hover:bg-red-50 transition"
            >
              <FaUser />
              Logout
            </li>

          </div>

        </div>
      </header>
    </>
  );
};

export default AgentSidebar;