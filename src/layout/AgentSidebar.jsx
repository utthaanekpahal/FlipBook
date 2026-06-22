import React from 'react';
import { FaHome, FaBook ,  FaUsers
} from "react-icons/fa";
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

      <header
        className={`
          fixed 
    lg:top-[14%]
    md:top-[10%]
    sm:top-[5px]
    top-[22%]
    left-0
    h-[75%]       /* Mobile */
    sm:h-[50%]    /* Small tablets */
    md:h-[50%]    /* Tablets */
    lg:h-[84%]    /* Desktop */
    rounded-xl
    w-[250px] ml-[20px]
    bg-[#F5F5F5]
    z-50
    transition-transform duration-300

    ${open ? "translate-x-0" : "-translate-x-[120%]"}

    lg:translate-x-0
        `}
      >
        {/* Close Button Mobile */}
        <div className="flex justify-end p-3 lg:hidden">
          <button onClick={() => setOpen(false)}>
            <FaTimes
              size={20}
              className="text-[#572C10]"
            />
          </button>
        </div>

        <div className='flex flex-col items-center gap-5 py-5'>

          <div>
            <ul className='flex flex-col gap-3 justify-center'>

              <li
                onClick={() => handleNavigate("/agentDashboard")}
                className='flex items-center gap-3 p-[8px] text-xl text-[#572C10] hover:bg-[#572C10] hover:text-white font-bold rounded-lg cursor-pointer'
              >
                <FaHome className='text-2xl' />
                Home
              </li>

              <li
                className='flex items-center gap-3 p-[8px] text-xl text-[#572C10] hover:bg-[#572C10] hover:text-white font-bold rounded-lg cursor-pointer'
                onClick={() =>
                  handleNavigate("/agent/category", {
                    from: "agent"
                  })
                }
              >
                <FaFolder className='text-2xl' />
                Categories
              </li>

              <li
                className='flex items-center gap-3 p-[8px] text-xl text-[#572C10] hover:bg-[#572C10] hover:text-white font-bold rounded-lg cursor-pointer'
                onClick={() =>
                  handleNavigate("/agent/books", {
                    from: "agent"
                  })
                }
              >
                <FaBook className='text-2xl' />
                All Books
              </li>

              <li
                className='flex items-center gap-3 p-[8px] text-xl text-[#572C10] hover:bg-[#572C10] hover:text-white font-bold rounded-lg cursor-pointer'
                onClick={() =>
                  handleNavigate("/VisitForm", {
                    from: "agent"
                  })
                }
              >
                <FaFolder className='text-2xl' />
                School Visit Form
              </li>
              <li className='flex items-center gap-3 p-[8px] text-xl text-[#572C10] hover:bg-[#572C10] hover:text-white font-bold rounded-lg cursor-pointer'
              onClick={() =>
                handleNavigate("/agent/followUp")
              }
            >
              <FaUsers />
              Follow Up
            </li>

              <li
                className='flex items-center gap-3 p-[8px] text-xl text-[#572C10] hover:bg-[#572C10] hover:text-white font-bold rounded-lg cursor-pointer'
                onClick={() =>
                  handleNavigate("/agent/Ticket", {
                    role: "agent"
                  })
                }
              >
                <MdConfirmationNumber className='text-2xl' />
                Ticket
              </li>

              <li
                className="flex items-center gap-[10px] px-[20px] py-[10px] font-bold cursor-pointer hover:bg-red-600 hover:text-white rounded text-red-600"
                onClick={handleLogout}
              >
                <FaUser />
                Logout
              </li>

            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default AgentSidebar;