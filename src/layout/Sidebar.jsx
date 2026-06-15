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

    navigate("/Loginform", { replace: true });
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
    md:top-[10%]
    sm:top-[1000%]
    top-[18%]
    left-0
    h-[65%]       /* Mobile */
    sm:h-[70%]    /* Small tablets */
    md:h-[45%]    /* Tablets */
    lg:h-[84%]    /* Desktop */
    
    rounded-xl
    w-[220px] ml-[20px]
    bg-[#F5F5F5]
    z-50
    transition-transform duration-300

    ${open ? "translate-x-0" : "-translate-x-[120%]"}

    lg:translate-x-0
  `}
>
        <div className="pt-2 lg:pt-5">
          <ul className="flex flex-col gap-[10px] p-3">

            <li
              className="flex items-center gap-[10px] px-[20px] py-[10px] font-bold cursor-pointer text-[#572C10] hover:bg-[#572C10] hover:text-white rounded"
              onClick={() => handleNavigate("/dashboard")}
            >
              <FaTachometerAlt />
              Dashboard
            </li>

            <li
              className="flex items-center gap-[10px] px-[20px] py-[10px] font-bold cursor-pointer text-[#572C10] hover:bg-[#572C10] hover:text-white rounded"
              onClick={() =>
                handleNavigate("/books", {
                  from: "admin",
                })
              }
            >
              <FaBook />
              Books
            </li>

            <li
              className="flex items-center gap-[10px] px-[20px] py-[10px] font-bold cursor-pointer text-[#572C10] hover:bg-[#572C10] hover:text-white rounded"
              onClick={() =>
                handleNavigate("/category", {
                  from: "admin",
                })
              }
            >
              <FaList />
              Categories
            </li>

            <li
              className="flex items-center gap-[10px] px-[20px] py-[10px] font-bold cursor-pointer text-[#572C10] hover:bg-[#572C10] hover:text-white rounded"
              onClick={() =>
                handleNavigate("/uploadBooks")
              }
            >
              <FaUpload />
              Upload Books
            </li>

            <li
              className="flex items-center gap-[10px] px-[20px] py-[10px] font-bold cursor-pointer text-[#572C10] hover:bg-[#572C10] hover:text-white rounded"
              onClick={() =>
                handleNavigate("/agent")
              }
            >
              <FaUsers />
              Agents
            </li>

            <li
              className="flex items-center gap-[10px] px-[20px] py-[10px] font-bold cursor-pointer text-[#572C10] hover:bg-[#572C10] hover:text-white rounded"
              onClick={() =>
                handleNavigate("/ticket", {
                  role: "user",
                })
              }
            >
              <MdConfirmationNumber />
              Ticket
            </li>

            <li
              className="flex items-center gap-[10px] px-[20px] py-[10px] font-bold cursor-pointer text-[#572C10] hover:bg-[#572C10] hover:text-white rounded"
              onClick={() =>
                handleNavigate("/FollowUp")
              }
            >
              <FaUsers />
              Follow Up
            </li>

            <li
              className="flex items-center gap-[10px] px-[20px] py-[10px] font-bold cursor-pointer text-red-600 hover:bg-red-600 hover:text-white rounded"
              onClick={handleLogout}
            >
              <FaUser />
              Logout
            </li>

          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;