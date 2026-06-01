import React from 'react'
import { useEffect } from 'react';
import { FaHome, FaBook, FaSearch, FaBookOpen } from "react-icons/fa";
import { FaFolder } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaThList } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { MdConfirmationNumber } from "react-icons/md";

const AgentDashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {

    const views =
      Number(localStorage.getItem("viewsagent")) || 0;

    localStorage.setItem(
      "viewsagent",
      views + 1
    );

  }, []);
  const agenttotalViews =
    localStorage.getItem("viewsagent");
  const storedTicketsid = JSON.parse(localStorage.getItem("tickets")) || []
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");

    navigate("/Loginform", { replace: true });
  };
  const username = localStorage.getItem("agents")
  return (
    <div className='flex flex-col lg:flex-row min-h-screen bg-[#EFE6DD]'>
      {/* Sidebar */}
      <header className='w-full lg:w-[250px] bg-[#F5F5F5]'>
        <div className='flex flex-col items-center gap-5 h-full py-5 '>

          {/* Logo Section */}
          <div className='text-[#572C10] p-3 text-3xl flex items-center gap-3 '>
            <FaBookOpen className='text-4xl mt-[-26px] ' />
            <div className='flex flex-col justify-center mt-[-24px]'>
              <h1 className='font-bold  text-[25px] text-[#572C10]'>BookHub</h1>
              <span className='font-bold text-[17px] text-[#572C10]'>Agent panel</span>
            </div>
          </div>

          {/* Menu */}
          <div>
           <ul className='flex flex-wrap lg:flex-col gap-3 justify-center'>
              <li className='flex items-center gap-3 p-[8px] text-xl  text-[#572C10]  hover:bg-[#572C10] hover:text-white font-bold rounded-lg cursor-pointer'>

                <FaHome className='text-2xl' />
                Home
              </li>
              <li
                className='flex items-center gap-3 p-[8px] text-xl text-[#572C10] hover:bg-[#572C10] hover:text-white font-bold rounded-lg cursor-pointer'
                onClick={() =>
                  navigate("/category", {
                    state: { from: "agent" }
                  })
                }
              >
                <FaFolder className='text-2xl' />
                Categories
              </li>
              <li
                className='flex items-center gap-3 p-[8px] text-xl text-[#572C10] hover:bg-[#572C10] hover:text-white font-bold rounded-lg cursor-pointer'
                onClick={() =>
                  navigate("/books", {
                    state: { from: "agent" }
                  })
                }
              >
                <FaBook className='text-2xl' />
                All Books
              </li>
              <li className='flex items-center gap-3 p-[8px] text-xl  text-[#572C10]  hover:bg-[#572C10] hover:text-white font-bold rounded-lg cursor-pointer'
                onClick={() => { navigate("/Ticket", { state: { role: "agent" } }) }}>
                <MdConfirmationNumber className='text-2xl' /> Ticket </li>
              <li className="flex items-center gap-[10px] px-[20px] py-[10px] font-bold cursor-pointer hover:bg-red-600 hover:text-white rounded text-red-600"
                onClick={handleLogout}>
                <FaUser /> Logout </li>

            </ul>
          </div>
        </div>
      </header>


      {/* Main Section */}
      <section className='flex flex-col w-full overflow-x-hidden '>

        {/* Top Navbar */}
        <div className='flex flex-col md:flex-row justify-between items-center gap-4 bg-[#F5F5F5] p-3 rounded-[4px]'>
          <span className='text-lg font-bold text-[#572C10] truncate'>
          </span>

          {/* Search Input */}
          <div className='relative w-full md:w-[50%]'>
            <FaSearch className='absolute left-4 top-1/2 -translate-y-1/2  text-[#A77F60] text-xl ' />

            <input
              className='p-1 px-[50px] w-full rounded-[15px] text-[#A77F60] font-bold border-2 border-[#A77F60] placeholder:text-[#A77F60]  outline-none  '
              type="text"
              placeholder='Search Books'
            />
          </div>
          <div className='flex justify-center gap-[10px]'>
            <FaUser size={25} color="572C10" className='mt-[-2px] ' />
            <a href="#" className='mr-[15px] text-xl text-[#572C10] font-bold'>
              Agent
            </a>
          </div>
        </div>


        {/* Main Content */}
        <div className='p-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5'>
          <div
            className="min-h-[150px] w-full bg-[#F5F5F5] rounded-[10px] flex justify-center gap-[15px] items-center text-[20px]">
            <div className="w-[60px] h-[65px] bg-[#FFDBB5] rounded-[25px] flex items-center justify-center">
              <FaBook className="text-2xl text-[#572C10] w-[25px] h-[45px]" />
            </div>
            <div className='flex flex-col justify-center gap-[5px]'>
              <span className='font-bold text-[14px] text-[#572C10] '>Total Books</span>
              <span className='font-bold text-[17px]'>500</span>
              <span className='font-bold text-[12px] text-[#995F2F]'>+12 this month</span>
            </div>
          </div>
          <div className="min-h-[150px] w-full bg-[#F5F5F5] rounded-[10px] flex justify-center gap-[15px] items-center text-[20px]">
            <div className="w-[60px] h-[65px] bg-[#FFDBB5] rounded-[25px] flex items-center justify-center">
              <FaThList className="text-2xl text-[#572C10] w-[25px] h-[45px]" />
            </div>
            <div className='flex flex-col justify-center gap-[5px]'>
              <span className='font-bold text-[14px] text-[#572C10] '>Total Categories</span>
              <span className='font-bold text-[17px]'>2</span>
              <span className='font-bold text-[12px] text-[#995F2F]'>4 this month</span>
            </div>
          </div>
          <div className="min-h-[150px] w-full bg-[#F5F5F5] rounded-[10px] flex justify-center gap-[15px] items-center text-[20px]">
            <div className="w-[60px] h-[65px] bg-[#FFDBB5] rounded-[25px] flex items-center justify-center">
              <MdConfirmationNumber className="text-2xl text-[#572C10] w-[25px] h-[45px]" />
            </div>
            <div className='flex flex-col justify-center gap-[5px]'>
              <span className='font-bold text-[14px] text-[#572C10]'>
                Ticket Raise
              </span>
              <span className='font-bold text-[17px]'>
                {storedTicketsid.length}
              </span>
              <span className='font-bold text-[12px] text-[#995F2F]'>
                this month
              </span>
            </div>
          </div>
          <div
            className="min-h-[150px] w-full bg-[#F5F5F5] rounded-[10px] flex justify-center gap-[15px] items-center text-[20px]">
            <div className="w-[60px] h-[65px] bg-[#FFDBB5] rounded-[25px] flex items-center justify-center">
              <FaEye className="text-2xl text-[#572C10] w-[25px] h-[45px]" />
            </div>
            <div className='flex flex-col justify-center gap-[5px]'>
              <span className='font-bold text-[14px] text-[#572C10] '>Total views</span>
              <span className='font-bold text-[17px]'>{agenttotalViews}</span>
              <span className='font-bold text-[12px] text-[#995F2F]'>+17.8% this month</span>
            </div>
          </div>


        </div>
        <div className='flex flex-col gap-[20px]'>

          <div className='bg-[#F5F5F5] min-h-[170px] mx-5 rounded-sm p-4'>

            <div className='font-bold text-[#572C10] text-[20px] mb-4'>
              <h1>Browser Category</h1>

            </div>

            <div className='flex flex-wrap justify-center gap-6'>
              <div className='bg-[#F5F5F5] h-[120px] w-full max-w-[150px] rounded-md flex items-center justify-center text-black bg-amber-700 font-bold text-2xl'>
                <img onClick={() => { navigate("/Category") }} src="/nav.png" alt="" className='w-[150px] h-[150px] rounded-[5px] object-cover ' />

              </div>
              <div className='bg-[#F5F5F5] h-[120px] w-full max-w-[150px] rounded-sm text-center flex items-center bg-amber-800 justify-center text-black font-bold text-2xl'>
                <img onClick={() => { navigate("/Category") }} src="/gyan.png" alt="" className='w-[150px] h-[150px] rounded-[5px] object-cover' />

              </div>
            </div>
          </div>

          <div className='bg-[#F5F5F5] min-h-[210px] mx-5 rounded-sm p-4'>

            <div className='font-bold text-[#572C10] text-[20px] mb-4 ml-[15px] mt-[-5px] '>
              <h1>Recent Add Books</h1>

            </div>


            <div className='flex flex-wrap justify-center gap-6'>
              <div className=' w-full max-w-[150px] h-[180px] text-center text-white mt-[-18px]'>
                <img onClick={() => { navigate("/FlipPage") }} src="book4.png " alt="" className='w-full h-full object-cover rounded-[5px]' />
              </div>
              <div className=' w-full max-w-[150px] h-[180px]  text-center text-white mt-[-23px]'>
                <img onClick={() => { navigate("/FlipPage") }} src="book2.jfif " alt="" className='w-full h-full object-cover rounded-[5px]' />
              </div>
              <div className=' w-full max-w-[150px] h-[180px] text-center text-white  mt-[-23px]'>
                <img onClick={() => { navigate("/FlipPage") }} src="book 3.jfif " alt="" className='w-full h-full object-cover rounded-[5px]' />
              </div>
              <div className=' w-full max-w-[150px] h-[180px]  text-center text-white mt-[-23px]'>
                <img onClick={() => { navigate("/FlipPage") }} src="book 4.jfif " alt="" className='w-full h-full object-cover rounded-[5px]' />
              </div>
              <div className='w-full max-w-[150px] h-[180px] text-center text-white mt-[-23px]'>
                <img onClick={() => { navigate("/FlipPage") }} src="book 4.jfif " alt="" className='w-full h-full object-cover rounded-[5px]' />
              </div>
            </div>


          </div>

        </div>

      </section>

    </div>
  )
}

export default AgentDashboard