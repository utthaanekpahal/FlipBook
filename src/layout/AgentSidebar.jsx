import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FaHome,
  FaBook,
  FaUsers,
  FaUser,
  FaTimes,
} from "react-icons/fa";

import { FaFolder } from "react-icons/fa6";
import { MdConfirmationNumber } from "react-icons/md";

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
      <aside
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

          bg-white
          border border-[#E9E1D8]
          rounded-3xl
          shadow-[0_10px_40px_rgba(0,0,0,0.06)]

          z-50
          transition-transform duration-300

          ${open ? "translate-x-0" : "-translate-x-[120%]"}

          lg:translate-x-0
        `}
      >
        <div className="h-full flex flex-col p-4">
          {/* Header */}
          <div className="pb-4 border-b border-[#F2E8DF] relative">
            <h2 className="text-lg font-extrabold text-[#572C10]">
              Agent Panel
            </h2>

            <p className="text-xs font-medium text-[#A77F60] mt-1">
              Dashboard Navigation
            </p>

            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="lg:hidden absolute top-0 right-0 text-[#572C10] text-xl font-bold"
            >
              <FaTimes />
            </button>
          </div>

          {/* Menu */}
          <ul className="flex-1 mt-4 space-y-2 overflow-y-auto">
            <li
              className="group flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-[#572C10] font-bold hover:bg-[#572C10] hover:text-white transition-all duration-200"
              onClick={() => handleNavigate("/agentDashboard")}
            >
              <FaHome className="text-base" />
              <span>Home</span>
            </li>

            <li
              className="group flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-[#572C10] font-bold hover:bg-[#572C10] hover:text-white transition-all duration-200"
              onClick={() =>
                handleNavigate("/agent/category", {
                  from: "agent",
                })
              }
            >
              <FaFolder className="text-base" />
              <span>Categories</span>
            </li>

            <li
              className="group flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-[#572C10] font-bold hover:bg-[#572C10] hover:text-white transition-all duration-200"
              onClick={() =>
                handleNavigate("/agent/books", {
                  from: "agent",
                })
              }
            >
              <FaBook className="text-base" />
              <span>All Books</span>
            </li>

            <li
              className="group flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-[#572C10] font-bold hover:bg-[#572C10] hover:text-white transition-all duration-200"
              onClick={() =>
                handleNavigate("/VisitForm", {
                  from: "agent",
                })
              }
            >
              <FaFolder className="text-base" />
              <span>School Visit Form</span>
            </li>

            <li
              className="group flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-[#572C10] font-bold hover:bg-[#572C10] hover:text-white transition-all duration-200"
              onClick={() => handleNavigate("/agent/followUp")}
            >
              <FaUsers className="text-base" />
              <span>Follow Up</span>
            </li>

            <li
              className="group flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-[#572C10] font-bold hover:bg-[#572C10] hover:text-white transition-all duration-200"
              onClick={() =>
                handleNavigate("/agent/Ticket", {
                  role: "agent",
                })
              }
            >
              <MdConfirmationNumber className="text-base" />
              <span>Ticket</span>
            </li>
          </ul>

          {/* Logout */}
          <div className="pt-4 border-t border-[#F2E8DF]">
            <button
              onClick={handleLogout}
              className="
                w-full
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                text-red-600
                font-bold
                hover:bg-red-50
                transition-all
              "
            >
              <FaUser />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AgentSidebar;