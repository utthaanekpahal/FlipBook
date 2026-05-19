import React from 'react'
import { FaHome, FaBook, FaCog, FaSearch, FaBookOpen } from "react-icons/fa";

const AgentDashboard = () => {
  return (
    <div className='flex h-screen overflow-hidden'>

      {/* Sidebar */}
      <header className='w-[250px] bg-red-700 text-white h-full '>
        <div className='flex flex-col items-center gap-5 h-full py-5'>

          {/* Logo Section */}
          <div className='text-black p-3 text-3xl flex items-center gap-3'>

            <FaBookOpen className='text-4xl text-white' />

            <div className='flex flex-col justify-center'>
              <h1 className='font-bold'>BookHub</h1>
              <span className='font-bold text-lg'>Agent panel</span>
            </div>

          </div>

          {/* Menu */}
          <div>

            <ul className='flex flex-col gap-5'>

              <li className='flex items-center gap-3 p-[8px] text-2xl font-bold rounded-lg cursor-pointer'>
                <FaHome className='text-2xl' />
                Home
              </li>

              <li className='flex items-center gap-3 p-[8px] text-2xl font-bold rounded-lg cursor-pointer'>
               
                <FaBook className='text-2xl' />
                
                Categories
              </li>

              <li className='flex items-center gap-3 p-[8px] text-2xl font-bold rounded-lg cursor-pointer'>
                <FaBook className='text-2xl' />
                All Books
              </li>

              <li className='flex items-center gap-3 p-[8px] text-2xl font-bold rounded-lg cursor-pointer'>
                <FaCog className='text-2xl' />
                Setting
              </li>

            </ul>
          </div>
        </div>
      </header>


      {/* Main Section */}
      <section className='flex flex-col w-full'>

        {/* Top Navbar */}
        <div className='flex justify-between items-center bg-amber-500 p-4'>

          <span className='ml-[10px] text-2xl font-bold'>
            Hii Agent
          </span>

          {/* Search Input */}
          <div className='relative w-[50%]'>

            <FaSearch className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl' />

            <input
              className='border border-gray-800 p-2 px-[50px] w-full rounded-md outline-none text-xl font-bold'
              type="text"
              placeholder='Search Books'
            />

          </div>

          <a href="#" className='mr-[15px] text-2xl font-bold'>
            Agent
          </a>

        </div>


        {/* Main Content */}
        <div className='p-5 flex gap-[20px]'>
          <div className='bg-green-700 h-[120px] w-[250px] rounded-sm'>ed</div>
          <div className='bg-pink-700 h-[120px] w-[250px] rounded-sm'>ed</div>
          <div className='bg-slate-900 h-[120px] w-[250px] rounded-sm'>d</div>
          <div className='bg-yellow-600 h-[120px] w-[250px] rounded-sm'>d</div>
        </div>

        <div className='flex flex-col gap-[20px]'>

          <div className='bg-amber-200 h-[170px] ml-[20px] w-[96%] rounded-sm'>

            <div className='flex justify-around gap-[60%] font-bold p-[2px] mt-[10px]'>
              <h1>Browser Category</h1>
              <button className='font-bold'>View all</button>
            </div>

            <div className='flex justify-center gap-[20%]'>
              <div className='bg-green-900 h-[120px] w-[150px] rounded-sm text-center text-white'>
                Navbodh
              </div>

              <div className='bg-purple-950 h-[120px] w-[150px] rounded-sm text-center text-white'>
                GyanBodh
              </div>
            </div>

          </div>


          <div className='bg-amber-200 h-[210px] ml-[20px] w-[96%] rounded-sm'>

            <div className='flex justify-around gap-[60%] font-bold p-[2px] mt-[10px]'>
              <h1>Recent Add Books</h1>
              <button className='font-bold'>View all</button>
            </div>

            <div className='flex justify-center gap-[10px]'>
              <div className='bg-blue-900 h-[150px] w-[150px] rounded-sm text-center text-white'>Books</div>
              <div className='bg-red-950 h-[150px] w-[150px] rounded-sm text-center text-white'>Books</div>
              <div className='bg-red-950 h-[150px] w-[150px] rounded-sm text-center text-white'>Books</div>
              <div className='bg-red-950 h-[150px] w-[150px] rounded-sm text-center text-white'>Books</div>
            </div>

          </div>

        </div>

      </section>

    </div>
  )
}

export default AgentDashboard