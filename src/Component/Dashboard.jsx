import React, { useEffect ,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoNotificationsOutline } from 'react-icons/io5';
import { FaBookOpen } from "react-icons/fa";
import { FaSearch , FaUser, FaThList ,FaUserTie } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import {
  FaTachometerAlt,
  FaBook,
  FaList,
  FaUpload,
  FaUsers,
  FaCog,
} from 'react-icons/fa';
function Dashboard() {
  const agentData = {
  name: localStorage.getItem("Aname"),
  password: localStorage.getItem("Apass"),
  email: localStorage.getItem("Aemail"),
  confirmPassword: localStorage.getItem("Acpass"),
};
const arr = [agentData];
  const navigate = useNavigate();
  return (
    <div>

      {/* HEADER */}
      <header className="flex items-center justify-between px-[20px] py-[12px]  bg-[#F5F5F5]  ">

        <div className='flex items-center gap-[5px] font-bold text-[20px] text-[#572C10]'>
          <FaBookOpen size={22} />
          Digital Book Library
        </div>
      <div className="relative w-[600px]">
       <FaSearch  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A77F60] text-lg"/>
       <input
         type="text"
         placeholder="Search Book, Categories"
         className="w-full pl-12 pr-4 py-2 rounded-full text-[#A77F60] font-bold border-2 border-[#A77F60] placeholder:text-[#A77F60] outline-none"/>
      </div>
        <div className='flex justify-center gap-[15px] '>
          <div >
          <IoNotificationsOutline size={24}  color="572C10" />
        </div>
        <div className='flex justify-center gap-[10px]'>
          <FaUser size={25} color="572C10" className='mt-[-2px] '/>
           <div className='cursor-pointer text-[#572C10] font-bold'>
          Profile
        </div>
        
        </div>
        </div>

      </header>

      {/* BODY */}
      <div className='flex gap-[20px] p-[20px] bg-[#EFE6DD]'>

        {/* SIDEBAR */}
        <aside className="w-[220px] bg-[#F5F5F5] ml-[-10px] rounded-[5px]">

          <ul className="list-none flex flex-col gap-[10px] ">

            <li className="flex items-center gap-[10px] px-[20px] py-[10px] font-bold cursor-pointer hover:bg-[#572C10] hover:text-white rounded"
              onClick={() => navigate("/dashboard")}
            >
              <FaTachometerAlt />
              Dashboard
            </li>

            <li className="flex items-center gap-[10px] px-[20px] py-[10px] font-bold cursor-pointer hover:bg-gray-100 rounded"
              onClick={() => navigate("/books")}
            >
              <FaBook />
              Books
            </li>

            <li className="flex items-center gap-[10px] px-[20px] py-[10px] text-[#572C10]  font-bold cursor-pointer hover:bg-[#572C10] hover:text-white rounded"
              onClick={() => navigate("/category")}
            >
              <FaList />
              Categories
            </li>

            <li className="flex items-center gap-[10px] px-[20px] py-[10px] text-[#572C10]  font-bold cursor-pointer hover:bg-[#572C10] hover:text-white rounded">
             
              <FaUpload />
              Upload Books
            </li>

            <li
              className="flex items-center gap-[10px] px-[20px] py-[10px] font-bold text-[#572C10]  cursor-pointer hover:bg-[#572C10] hover:text-white rounded"
              onClick={() => navigate("/agent")}
            >
              <FaUsers />
              Agents
            </li>

            <li className="flex items-center gap-[10px] px-[20px] py-[10px] text-[#572C10]  font-bold cursor-pointer hover:bg-[#572C10] hover:text-white rounded">
              <FaCog />
              Settings
            </li>

          </ul>

        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 flex flex-col gap-[20px] ">

          {/* TOP BOXES */}
          <div className="flex gap-[10px] ">
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
               <div
                className="h-[20vh] w-[20vw] bg-[#F5F5F5] rounded-[10px] flex justify-center gap-[15px] items-center text-[20px]">
                <div className="w-[60px] h-[65px] bg-[#FFDBB5] rounded-[25px] flex items-center justify-center">
               <FaThList  className="text-2xl text-[#572C10] w-[25px] h-[45px]" />
               </div>
                <div className='flex flex-col justify-center gap-[5px]'>
                  <span className='font-bold text-[14px] text-[#572C10] '>Total Categories</span>
                  <span className='font-bold text-[17px]'>85</span>
                  <span className='font-bold text-[12px] text-[#995F2F]'>4 this month</span>
                </div>
              </div>
               <div
                className="h-[20vh] w-[20vw] bg-[#F5F5F5] rounded-[10px] flex justify-center gap-[15px] items-center text-[20px]">
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


          {/* RECENT BOOK */}
          <div className="bg-[#F5F5F5] rounded-[10px] p-[20px]">

            <div className='flex justify-between items-center mb-[20px]'>

              <h4 className="font-bold text-[#572C10]">
                Recent Book
              </h4>

              <button className="border rounded text-[#572C10] font-bold border-[#EFE6DD] px-[10px] py-[5px]">
                View all
              </button>

            </div>

            <div className='flex justify-center gap-[30px]'>

              {[...Array(6)].map((_, i) => (

                <div
                  key={i}
                  className='flex flex-col items-center gap-[5px]'
                >

                  <div className='w-[120px] h-[160px] bg-[#FFDBB5]  rounded flex items-center justify-center'>
                    item
                  </div>

                  <span className="text-[12px]">
                    Mathematics
                  </span>

                  <span className="text-[12px]">
                    Class 8
                  </span>

                  <span className="text-[12px]">
                    May 25 2026
                  </span>

                </div>

              ))}

            </div>

          </div>


          {/* TABLE + CARD */}
          <div className='flex gap-[20px]'>

            {/* TABLE */}
            <div className="flex-1 bg-[#F5F5F5] rounded-[10px] p-[20px]">

              <div className='flex justify-between mb-[20px]'>

                <h4 className='font-bold text-[#572C10]'>
                  Active Agent
                </h4>

                <button className='border px-[10px] py-[5px] text-[#572C10] border-[#EFE6DD] font-bold  rounded'>
                  View all
                </button>

              </div>

              <table className='w-full'>

                <thead>

                  <tr className='bg-gray-200'>

                    <th className='p-[10px] text-[#A77F60] bg-[#EFE6DD]'>Agent Name</th>
                    <th className='p-[10px] text-[#A77F60] bg-[#EFE6DD]'>Email</th>
                    <th className='p-[10px] text-[#A77F60] bg-[#EFE6DD]'>Password</th>
                    <th className='p-[10px] text-[#A77F60] bg-[#EFE6DD]'>ConfirmPassword</th>
                    <th className='p-[10px] text-[#A77F60] bg-[#EFE6DD]'>Status</th>

                  </tr>

                </thead>

                <tbody>

                 {arr.map((value, index) => (
              <tr key={index}>
             <td className="text-center p-[12px] border-b border-amber-50">
        {value.name}
      </td>

      <td className="text-center p-[12px] border-b border-amber-50">
        {value.email}
      </td>

      <td className="text-center p-[12px] border-b border-amber-50">
        {value.password}
      </td>

      <td className="text-center p-[12px] border-b border-amber-50">
        {value.confirmPassword}
      </td>

      <td className="text-center p-[12px] border-b border-amber-50">
        Active
      </td>
    </tr>
  ))}    

                </tbody>

              </table>

            </div>


            {/* CARD */}
            <div className="w-[300px] bg-[#F5F5F5] rounded-[10px] p-[20px]">

              <div className='flex justify-between mb-[20px]'>

                <h4 className='font-bold text-[#572C10]'>
                  Top Viewed Books
                </h4>

                <button className='border px-[10px] py-[5px] text-[#572C10] border-[#EFE6DD] font-bold rounded'>
                  View all
                </button>

              </div>

              <table className='w-full'>

                <tbody>

                  {[...Array(5)].map((_,i)=>(

                    <tr key={i}>

                      <td className='p-[10px]'>
                        value
                      </td>

                      <td>
                        value
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </main>

      </div>

    </div>
  )
}

export default Dashboard;