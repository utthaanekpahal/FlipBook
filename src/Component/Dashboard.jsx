import React from 'react'
import { IoNotificationsOutline } from 'react-icons/io5';
import { FaBookOpen } from "react-icons/fa";
import {
  FaTachometerAlt,
  FaBook,
  FaList,
  FaUpload,
  FaUsers,
  FaCog
} from 'react-icons/fa';

function Dashboard() {
  return (
    <div>

      {/* HEADER */}
      <header className="flex items-center justify-between px-[20px] py-[12px]">
        <div className='flex items-center gap-[8px] font-bold'>
          <FaBookOpen size={22} />
          Digital Book Library
        </div>

        <input
          type="text"
          placeholder='search Book, Categories'
          className='w-[600px] px-[12px] py-[8px] rounded-[20px] border border-[#ccc] outline-none'
        />

        <div>
          <IoNotificationsOutline size={24} />
        </div>

        <div>Profile</div>
      </header>

      {/* BODY */}
      <div className='flex justify-center items-center gap-[60px]'>

        {/* SIDEBAR */}
        <aside className="mt-[-37%]">
          <ul className="list-none">

            <li className="flex items-center gap-[10px] px-[20px] py-[10px] cursor-pointer">
              <FaTachometerAlt /> Dashboard
            </li>

            <li className="flex items-center gap-[10px] px-[20px] py-[10px] cursor-pointer">
              <FaBook /> Books
            </li>

            <li className="flex items-center gap-[10px] px-[20px] py-[10px] cursor-pointer">
              <FaList /> Categories
            </li>

            <li className="flex items-center gap-[10px] px-[20px] py-[10px] cursor-pointer">
              <FaUpload /> Upload Books
            </li>

            <li className="flex items-center gap-[10px] px-[20px] py-[10px] cursor-pointer">
              <FaUsers /> Agents
            </li>

            <li className="flex items-center gap-[10px] px-[20px] py-[10px] cursor-pointer">
              <FaCog /> Settings
            </li>

          </ul>
        </aside>

        {/* MAIN CONTENT */}
        <footer className="flex flex-col justify-center items-center w-[75vw] mr-[5%]">

          {/* TOP BOXES */}
          <main className="flex justify-center items-center gap-[10px] mt-[20px]">
            <div className="h-[20vh] w-[20vw] bg-[#F5F5F5] rounded-[10px] flex justify-center items-center text-[20px]">1</div>
            <div className="h-[20vh] w-[20vw] bg-[#F5F5F5] rounded-[10px] flex justify-center items-center text-[20px]">2</div>
            <div className="h-[20vh] w-[20vw] bg-[#F5F5F5] rounded-[10px] flex justify-center items-center text-[20px]">3</div>
            <div className="h-[20vh] w-[20vw] bg-[#F5F5F5] rounded-[10px] flex justify-center items-center text-[20px]">4</div>
          </main>

          {/* RECENT BOOK */}
          <div className="flex justify-center items-center gap-[20px] mt-[20px]">
            <div className="h-[45vh] w-[173vh] bg-[#F5F5F5] rounded-[10px]">

              <div className='flex justify-around items-center bg-[#F5F5F5] gap-[70%] h-[48px]'>
                <h4 className="font-bold">Recent Book</h4>
                <button className="border-2 border-[rgb(231,229,229)] rounded-[4px] px-[2px] w-[65px]">
                  view all
                </button>
              </div>

              <div className='flex justify-center items-center gap-[40px]'>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className='flex flex-col justify-center items-center gap-[5px]'>
                    <div className='w-[9vw] h-[22vh] bg-[rgb(0,255,128)] rounded-[5px] mt-[5px] text-center'>tem</div>
                    <span className="text-[12px]">Mathematics</span>
                    <span className="text-[12px]">class 8</span>
                    <span className="text-[12px]">May 25 2026</span>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* TABLE + CARD */}
          <div className="flex justify-center items-center gap-[20px] mt-[20px]">

            {/* TABLE */}
            <div className="h-[46vh] w-[127vh] bg-[#F5F5F5] rounded-[7px]">

              <div className='flex justify-around items-center bg-[#F5F5F5] gap-[450px] h-[48px]'>
                <h4 className="font-bold">Active Agent</h4>
                <button className="border-2 border-[rgb(231,229,229)] rounded-[4px] px-[2px] w-[65px]">
                  view all
                </button>
              </div>

              <div>
                <table className="w-full border-collapse mt-[2px]">
                  <thead>
                    <tr className="bg-[rgb(226,223,223)]">
                      <th className="text-left p-[12px] border-b">Agent Name</th>
                      <th className="text-left p-[12px] border-b">Email</th>
                      <th className="text-left p-[12px] border-b">Last Active</th>
                      <th className="text-left p-[12px] border-b">Book Viewed</th>
                      <th className="text-left p-[12px] border-b">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {[...Array(4)].map((_, i) => (
                      <tr key={i}>
                        {[...Array(5)].map((_, j) => (
                          <td key={j} className="text-left p-[12px] border-b border-amber-50">name</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

            {/* CARD */}
            <div className="h-[45vh] w-[20vw] bg-[#F5F5F5] p-[20px] rounded-[5px]">

              <div className='flex justify-around items-center bg-[#F5F5F5] gap-[25px] h-[48px] mt-[-20px]'>
                <h4 className="font-bold">Top Viewed Books</h4>
                <button className="border-2 border-[rgb(231,229,229)] rounded-[4px] px-[2px]">
                  view all
                </button>
              </div>

              <table className='w-[25vw] border-collapse mt-[2px]'>
                <tbody>
                  {[...Array(5)].map((_, i) => (
                    <tr key={i}>
                      <td className="text-left p-[12px]">value</td>
                      <td className="text-left p-[12px]">value</td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>

          </div>

        </footer>

      </div>
    </div>
  )
}

export default Dashboard;