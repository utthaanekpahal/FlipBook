import React from 'react';
import { FaSearch, FaUser, FaBookOpen, FaBars } from "react-icons/fa";

const AgentHeader = ({ setOpen }) => {
  return (
    <div className='flex flex-col sticky top-0 z-50 md:flex-row justify-between items-center gap-4 bg-[#F5F5F5] p-3 rounded-[4px]'>

      <button
        className="lg:hidden text-[#572C10] "
        onClick={() => setOpen(true)}
      >
        <FaBars size={22} />
      </button>

      <div className='text-[#572C10] ml-[20px] text-3xl mt-[20px] flex items-center gap-3'>
        <FaBookOpen className='text-4xl mt-[-26px]' />

        <div className='flex flex-col justify-center mt-[-24px]'>
          <h1 className='font-bold text-[25px] text-[#572C10]'>
            BookHub
          </h1>

          <span className='font-bold text-[17px] text-[#572C10]'>
            Agent panel
          </span>
        </div>
      </div>

      <span className='text-lg font-bold text-[#572C10] truncate'></span>

      <div className='relative w-full md:w-[50%]'>
        <FaSearch className='absolute left-4 top-1/2 -translate-y-1/2 text-[#A77F60] text-xl' />

        <input
          className='p-1 px-[50px] w-full rounded-[15px] text-[#A77F60] font-bold border-2 border-[#A77F60] placeholder:text-[#A77F60] outline-none'
          type="text"
          placeholder='Search Books'
        />
      </div>

      <div className='flex justify-center gap-[10px]'>
        <FaUser size={25} color="#572C10" className='mt-[-2px]' />

        <a
          href="#"
          className='mr-[15px] text-xl text-[#572C10] font-bold'
        >
          Agent
        </a>
      </div>
    </div>
  );
};

export default AgentHeader;