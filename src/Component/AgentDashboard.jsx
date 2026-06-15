import React from 'react'
import { useEffect } from 'react';
import { FaThList } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { MdConfirmationNumber } from "react-icons/md";
import { FaBook } from "react-icons/fa";

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
  const agenttotalViews =localStorage.getItem("viewsagent");
  return (
    <div className='flex flex-col lg:flex-row min-h-screen bg-[#EFE6DD]'>
  
      <section className='flex flex-col mt-[-18px]  w-full overflow-x-hidden '>
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
                id
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