import React from 'react'
import { FaHome, FaBook, FaCog, FaSearch, FaBookOpen } from "react-icons/fa";
import { FaUsers, FaFolder } from "react-icons/fa6";
import { FaC } from 'react-icons/fa6';
import { FaUser } from "react-icons/fa";
import {  FaThList ,FaUserTie } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from "react-icons/fa";

const AgentDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className='flex h-screen overflow-hidden bg-[#EFE6DD]'>

      {/* Sidebar */}
      <header className='w-[250px] h-full bg-[#F5F5F5] '>
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
            <ul className='flex flex-col gap-5'>
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
  <FaBook className='text-2xl' />
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
              <li
  className='flex items-center gap-3 p-[8px] text-xl text-red-600 hover:bg-red-600 hover:text-white font-bold rounded-lg cursor-pointer'
  onClick={() => {
    localStorage.removeItem("user");
    navigate("/loginform");
  }}
>
  <FaSignOutAlt className='text-2xl' />
  Logout
</li>
              
            </ul>
          </div>
        </div>
      </header>


      {/* Main Section */}
      <section className='flex flex-col w-full '>

        {/* Top Navbar */}
        <div className='flex justify-between items-center bg-[#F5F5F5] p-3 rounded-[4px]'>
            
          <span className='ml-[10px] text-xl font-bold text-[#572C10]'>
            Hii Agent
          </span>

          {/* Search Input */}
          <div className='relative w-[50%]'>

            <FaSearch className='absolute left-4 top-1/2 -translate-y-1/2  text-[#A77F60] text-xl ' />

            <input
              className='p-1 px-[50px] w-full rounded-[15px] text-[#A77F60] font-bold border-2 border-[#A77F60] placeholder:text-[#A77F60]  outline-none  '
              type="text"
              placeholder='Search Books'
            />
          </div>
           <div className='flex justify-center gap-[10px]'>
            <FaUser size={25} color="572C10" className='mt-[-2px] '/>
            <a href="#" className='mr-[15px] text-xl text-[#572C10] font-bold'>
            Agent
          </a>
           </div>
        </div>


        {/* Main Content */}
        <div className='p-5 flex gap-[20px]'>
         <div
                        className="h-[20vh] w-[20vw] bg-[#F5F5F5] rounded-[10px] flex justify-center gap-[15px] items-center text-[20px]">
                        <div className="w-[60px] h-[65px] bg-[#FFDBB5] rounded-[25px] flex items-center justify-center">
                       <FaBook className="text-2xl text-[#572C10] w-[25px] h-[45px]" />
                       </div>
                        <div className='flex flex-col justify-center gap-[5px]'>
                          <span className='font-bold text-[14px] text-[#572C10] '>Total Books</span>
                          <span className='font-bold text-[17px]'>500</span>
                          <span className='font-bold text-[12px] text-[#995F2F]'>+12 this month</span>
                        </div>
                      </div>
                        <div className="h-[20vh] w-[20vw] bg-[#F5F5F5] rounded-[10px] flex justify-center gap-[15px] items-center text-[20px]">
                          <div className="w-[60px] h-[65px] bg-[#FFDBB5] rounded-[25px] flex items-center justify-center">
                          <FaThList  className="text-2xl text-[#572C10] w-[25px] h-[45px]" />
                          </div>
                        <div className='flex flex-col justify-center gap-[5px]'>
                          <span className='font-bold text-[14px] text-[#572C10] '>Total Categories</span>
                          <span className='font-bold text-[17px]'>85</span>
                          <span className='font-bold text-[12px] text-[#995F2F]'>4 this month</span>
                          </div>
                          </div>
                        <div className="h-[20vh] w-[20vw] bg-[#F5F5F5] rounded-[10px] flex justify-center gap-[15px] items-center text-[20px]">
                            <div className="w-[60px] h-[65px] bg-[#FFDBB5] rounded-[25px] flex items-center justify-center">
                                      <FaUserTie  className="text-2xl text-[#572C10] w-[25px] h-[45px]" />
                            </div>
                            <div className='flex flex-col justify-center gap-[5px]'>
                                         <span className='font-bold text-[14px] text-[#572C10] '>Active Agents</span>
                                         <span className='font-bold text-[17px]'>10</span>
                                         <span className='font-bold text-[12px] text-[#995F2F]'>+5 this month</span>
                           </div>
                        </div>
                        <div
                                        className="h-[20vh] w-[20vw] bg-[#F5F5F5] rounded-[10px] flex justify-center gap-[15px] items-center text-[20px]">
                                        <div className="w-[60px] h-[65px] bg-[#FFDBB5] rounded-[25px] flex items-center justify-center">
                                       <FaEye   className="text-2xl text-[#572C10] w-[25px] h-[45px]" />
                                       </div>
                                        <div className='flex flex-col justify-center gap-[5px]'>
                                          <span className='font-bold text-[14px] text-[#572C10] '>Total views</span>
                                          <span className='font-bold text-[17px]'>200</span>
                                          <span className='font-bold text-[12px] text-[#995F2F]'>+17.8% this month</span>
                                        </div>
                                      </div>
                                     
      
          
        </div>
        <div className='flex flex-col gap-[20px]'>

          <div className='bg-[#F5F5F5]  h-[170px] ml-[20px] w-[96%] rounded-sm'>

            <div className='flex justify-start gap-[60%] font-bold p-[2px] mt-[10px] text-[#572C10] text-2xl '>
              <h1>Browser Category</h1>
             
            </div>

            <div className='flex justify-center gap-[20%]'>
              <div className='bg-[#F5F5F5]  h-[120px] w-[150px] rounded-md flex items-center justify-center text-black font-bold text-2xl'>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQjUOnvHB-eJ11uevsZc_4FUQINV8pPTP9Lg&s" alt="" className='w-full h-full object-cover ' />
      
              </div>
              <div className='bg-[#F5F5F5]   h-[120px] w-[150px] rounded-sm text-center flex items-center justify-center text-black font-bold text-2xl'>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9uhqo9C1byKl7dmz29-E47DNhPFTRSg3aMQ&s" alt="" className='w-full h-full object-cover' />
              
              </div>
            </div>
          </div>

          <div className=' bg-[#F5F5F5] h-[210px] ml-[20px] w-[96%] rounded-sm'>

            <div className='flex justify-start gap-[60%] font-bold p-[2px] mt-[10px] text-[#572C10] text-2xl'>
              <h1>Recent Add Books</h1>
             
            </div>


            <div className='flex justify-center gap-[10px]'>
              <div className='bg-[#F5F5F5]  h-[150px] w-[150px] rounded-sm text-center text-white'>
              <img src="book 1.jpg " alt="" className='w-full h-full object-cover' />
              </div>
              <div className=' bg-[#F5F5F5]  h-[150px] w-[150px] rounded-sm text-center text-white'>
              <img src="book2.jfif " alt="" className='w-full h-full object-cover' />
              </div>
              <div className=' bg-[#F5F5F5]    h-[150px] w-[150px] rounded-sm text-center text-white'>
              <img src="book 3.jfif " alt="" className='w-full h-full object-cover' />
              </div>
              <div className=' bg-[#F5F5F5]  h-[150px] w-[150px] rounded-sm text-center text-white'>
                <img src="book 4.jfif " alt="" className='w-full h-full object-cover' />
              </div>
            </div>

          </div>

        </div>

      </section>

    </div>
  )
}

export default AgentDashboard