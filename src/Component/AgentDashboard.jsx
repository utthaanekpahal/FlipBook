import React from 'react'
import { FaHome, FaBook, FaCog, FaSearch, FaBookOpen } from "react-icons/fa";
import { FaUsers, FaFolder } from "react-icons/fa6";
import { FaC } from 'react-icons/fa6';

const AgentDashboard = () => {
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
              <li className='flex items-center gap-3 p-[8px] text-xl text-[#572C10] hover:bg-[#572C10] hover:text-white   font-bold rounded-lg cursor-pointer'>
                <FaBook className='text-2xl' />
                Categories
              </li>
              <li className='flex items-center gap-3 p-[8px] text-xl text-[#572C10] hover:bg-[#572C10] hover:text-white  font-bold rounded-lg cursor-pointer'>
                <FaBook className='text-2xl' />
                All Books
              </li>
              <li className='flex items-center gap-3 p-[8px] text-xl text-[#572C10] hover:bg-[#572C10] hover:text-white   font-bold rounded-lg cursor-pointer'>
                <FaCog className='text-2xl' />
                Setting
              </li>
            </ul>
          </div>
        </div>
      </header>


      {/* Main Section */}
      <section className='flex flex-col w-full '>

        {/* Top Navbar */}
        <div className='flex justify-between items-center bg-[#F5F5F5] p-3 rounded-[4px]'>
            
          <span className='ml-[10px] text-xl font-bold text-white'>
            Hii Agent
          </span>

          {/* Search Input */}
          <div className='relative w-[50%]'>

            <FaSearch className='absolute left-4 top-1/2 -translate-y-1/2  text-xl invert' />

            <input
              className='border border-[#BBBBBB] p-1 px-[50px] w-full rounded-[15px] placeholder-white outline-none  '
              type="text"
              placeholder='Search Books'
            />

          </div>

          <a href="#" className='mr-[15px] text-xl text-white font-bold'>
            Agent
          </a>

        </div>


        {/* Main Content */}
        <div className='p-5 flex gap-[20px]'>
          <div className=' bg-[#DFF1F1] h-[120px] w-[260px] rounded-sm flex flex-col justify-center items-center text-center text-black font-bold '> 
           
              <FaBook />
              
              <h1 className='text-xl font-bold'>Total Books</h1>
    <p className='text-3xl font-bold mt-4'>120</p>
  
          </div>
          <div className='bg-[#DFF1F1] h-[120px] w-[260px] rounded-sm flex flex-col justify-center items-center text-center text-black font-bold'>
            <h1 className='text-xl font-bold'>Total Users</h1>
            <p className='text-3xl font-bold mt-4'>50</p>
            <FaUsers />
          </div>
          <div className='bg-[#DFF1F1] h-[120px] w-[260px] rounded-sm flex flex-col justify-center items-center text-center text-black font-bold'>
            <h1 className='text-xl font-bold'>New Books</h1>
            <p className='text-3xl font-bold mt-4'>10</p>
            <FaBook />
          </div>
          <div className='bg-[#DFF1F1] h-[120px] w-[260px] rounded-sm flex flex-col justify-center items-center text-center text-black font-bold'>
            <h1 className='text-xl font-bold'>Categories</h1>
            <p className='text-3xl font-bold mt-4'>2</p>
            <FaFolder />
          </div>
        </div>
        <div className='flex flex-col gap-[20px]'>

          <div className='bg-[#DFF1F1] h-[170px] ml-[20px] w-[96%] rounded-sm'>

            <div className='flex justify-around gap-[60%] font-bold p-[2px] mt-[10px]'>
              <h1>Browser Category</h1>
              <button className='font-bold'>View all</button>
            </div>

            <div className='flex justify-center gap-[20%]'>
              <div className='bg-[#BBD5DA]  h-[120px] w-[150px] rounded-sm text-center flex items-center justify-center text-black font-bold text-2xl'>
                Navbodh
              </div>

              <div className='bg-[#BBD5DA]  h-[120px] w-[150px] rounded-sm text-center flex items-center justify-center text-black font-bold text-2xl'>
                GyanBodh
              </div>
            </div>

          </div>


          <div className='bg-[#DFF1F1] h-[210px] ml-[20px] w-[96%] rounded-sm'>

            <div className='flex justify-around gap-[60%] font-bold p-[2px] mt-[10px]'>
              <h1>Recent Add Books</h1>
              <button className='font-bold'>View all</button>
            </div>

            <div className='flex justify-center gap-[10px]'>
              <div className='bg-[#BBD5DA] h-[150px] w-[150px] rounded-sm text-center text-white'>
            <img src="book 1.jpg " alt="" className='w-full h-full object-cover' />
               </div>
              <div className=' bg-[#BBD5DA] h-[150px] w-[150px] rounded-sm text-center text-white'>
              <img src="book2.jfif " alt="" className='w-full h-full object-cover' />
              </div>
              <div className=' bg-[#BBD5DA]   h-[150px] w-[150px] rounded-sm text-center text-white'>
              <img src="book 3.jfif " alt="" className='w-full h-full object-cover' />
              </div>
              <div className=' bg-[#BBD5DA]  h-[150px] w-[150px] rounded-sm text-center text-white'>
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