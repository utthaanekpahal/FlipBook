import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FaTachometerAlt,
  FaBook,
  FaList,
  FaUpload,
  FaUsers,
  FaUser,
} from "react-icons/fa";

import { MdConfirmationNumber } from "react-icons/md";

const Sidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");

    navigate("/", { replace: true });
  }

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
    md:top-[15%]
    sm:top-[10%]
    top-[25%]
    left-0

    h-[70%]
    sm:h-[70%]
    md:h-[45%]
    lg:h-[84%]

    w-[240px]
    ml-4

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
   {/* Header */}
<div className="pb-4 border-b border-[#F2E8DF] relative">

  <h2 className="text-lg font-extrabold text-[#572C10]">
    Admin Panel
  </h2>

  <p className="text-xs font-medium text-[#A77F60] mt-1">
    Management Dashboard
  </p>

  {/* Close Button (NEW ONLY) */}
  <button
    onClick={() => setOpen(false)}
    className="lg:hidden absolute top-0 right-0 text-[#572C10] text-xl font-bold"
  >
    ✕
  </button>

</div>

    {/* Menu */}
    <ul className="flex-1 mt-4 space-y-2 overflow-y-auto">

      <li
        className="group flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-[#572C10] font-bold hover:bg-[#572C10] hover:text-white transition-all duration-200"
        onClick={() => handleNavigate("/dashboard")}
      >
        <FaTachometerAlt className="text-base" />
        <span>Dashboard</span>
      </li>

      <li
        className="group flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-[#572C10] font-bold hover:bg-[#572C10] hover:text-white transition-all duration-200"
        onClick={() =>
          handleNavigate("/books", {
            from: "admin",
          })
        }
      >
        <FaBook className="text-base" />
        <span>Books</span>
      </li>

      <li
        className="group flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-[#572C10] font-bold hover:bg-[#572C10] hover:text-white transition-all duration-200"
        onClick={() =>
          handleNavigate("/category", {
            from: "admin",
          })
        }
      >
        <FaList className="text-base" />
        <span>Categories</span>
      </li>

      <li
        className="group flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-[#572C10] font-bold hover:bg-[#572C10] hover:text-white transition-all duration-200"
        onClick={() =>
          handleNavigate("/uploadBooks")
        }
      >
        <FaUpload className="text-base" />
        <span>Upload Books</span>
      </li>

      <li
        className="group flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-[#572C10] font-bold hover:bg-[#572C10] hover:text-white transition-all duration-200"
        onClick={() =>
          handleNavigate("/agent")
        }
      >
        <FaUsers className="text-base" />
        <span>Agents</span>
      </li>

      <li
        className="group flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-[#572C10] font-bold hover:bg-[#572C10] hover:text-white transition-all duration-200"
        onClick={() =>
          handleNavigate("/ticket", {
            role: "user",
          })
        }
      >
        <MdConfirmationNumber className="text-base" />
        <span>Tickets</span>
      </li>

      <li
        className="group flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-[#572C10] font-bold hover:bg-[#572C10] hover:text-white transition-all duration-200"
        onClick={() =>
          handleNavigate("/FollowUp")
        }
      >
        <FaUsers className="text-base" />
        <span>Follow Up</span>
      </li>

    </ul>

    {/* Logout Section */}
    <div className="pt-4 border-t border-[#F2E8DF]">

      <button
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
        onClick={handleLogout}
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

export default Sidebar;