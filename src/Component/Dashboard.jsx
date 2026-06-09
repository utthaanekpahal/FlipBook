import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoNotificationsOutline } from 'react-icons/io5';
import { FaBookOpen } from "react-icons/fa";
import { FaSearch, FaUser, FaThList, FaUserTie } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { MdConfirmationNumber } from "react-icons/md";
import {FaTachometerAlt,FaBook,FaList, FaUpload,FaUsers,FaCog,} from 'react-icons/fa';
import axios from 'axios';
function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {

    const views =
      Number(localStorage.getItem("views")) || 0;

    localStorage.setItem(
      "views",
      views + 1
    );

  }, []);
  const [agents, setAgents] = useState([]);

useEffect(() => {
  fetchAgents();
}, []);

const fetchAgents = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/books/agents"
    );

    setAgents(response.data.agents);

  } catch (error) {
    console.log(error);
  }
};
const [Ticketdata, setTicketdata] = useState([])
useEffect(()=>{
  fetchTicket()
},[])
const fetchTicket=async ()=>{
  try{
    const res= await axios.get("http://localhost:3000/api/tickets/all")
    setTicketdata(res.data.tickets)
  }
  catch(error){
    console.log(error)
  }
}
  const [agentpop, setagentpop] = useState(false)
  const totalViews =localStorage.getItem("views");
  const email = localStorage.getItem("username");
  const username = email?.split("@")[0];
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");

    navigate("/loginform", { replace: true });
  };
  return (
    <div className=''>
      {/* HEADER */}
      <header className="flex flex-col md:flex-row items-center justify-between gap-4 px-[20px] py-[12px]  bg-[#F5F5F5] ">
        <div className='flex items-center gap-[5px] font-bold text-[20px] text-[#572C10] '>
          <FaBookOpen size={22} />
          Digital Book Library
        </div>
        <div className="relative w-full md:w-[400px] lg:w-[600px]">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A77F60] text-lg" />
          <input
            type="text"
            placeholder="Search Book, Categories"
            className="w-full pl-12 pr-4 py-2 rounded-full text-[#A77F60] font-bold border-2 border-[#A77F60] placeholder:text-[#A77F60] outline-none"
          />
        </div>
        <div className='flex justify-center gap-[15px] '>
          <div >
            <IoNotificationsOutline size={24} color="572C10" />
          </div>
          <div className='flex justify-center gap-[10px]'>
            <FaUser size={25} color="572C10" className='mt-[-2px] ' />
            <div className='cursor-pointer text-[#572C10] font-bold truncate max-w-[120px]'>
              {username}
            </div>

          </div>
        </div>

      </header>

      {/* BODY */}
      <div className='flex flex-col lg:flex-row gap-5  p-[20px] bg-[#EFE6DD]'>

        {/* SIDEBAR */}
        <aside className="w-full lg:w-[220px]  shrink-0 bg-[#F5F5F5] ml-0 rounded-[5px]">

          <ul className="list-none flex flex-col gap-[10px] ">

            <li className="flex items-center gap-[10px] px-[20px] py-[10px] font-bold cursor-pointer text-[#572C10] hover:bg-[#572C10] hover:text-white rounded"
              onClick={() => navigate("/dashboard")}
            >
              <FaTachometerAlt />
              Dashboard
            </li>
            <li className="flex items-center gap-[10px] px-[20px] py-[10px] font-bold cursor-pointer text-[#572C10] hover:bg-[#572C10] hover:text-white rounded"
              onClick={() => navigate("/books", { state: { from: "admin" } })}>
              <FaBook />
              Books
            </li>

            <li
              className="flex items-center gap-[10px] px-[20px] py-[10px] text-[#572C10] font-bold cursor-pointer hover:bg-[#572C10] hover:text-white rounded"
              onClick={() =>
                navigate("/category", {
                  state: { from: "admin" }
                })
              }
            >
              <FaList />
              Categories
            </li>

            <li className="flex items-center gap-[10px] px-[20px] py-[10px] text-[#572C10]  font-bold cursor-pointer hover:bg-[#572C10] hover:text-white rounded"
              onClick={() => navigate("/uploadBooks")}
            >
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
            
            <li
              className="flex items-center gap-[10px] px-[20px] py-[10px] font-bold text-[#572C10] cursor-pointer hover:bg-[#572C10] hover:text-white rounded"
              onClick={() => navigate("/ticket", { state: { role: "user" } })}
            >
              <MdConfirmationNumber />
              Ticket
            </li>
             <li
              className="flex items-center gap-[10px] px-[20px] py-[10px] font-bold text-[#572C10]  cursor-pointer hover:bg-[#572C10] hover:text-white rounded"
              onClick={() => navigate("/FollowUp")}
            >
              <FaUsers />
              Follow Up
            </li>
            <li className="flex items-center gap-[10px] px-[20px] py-[10px] font-bold cursor-pointer  hover:bg-red-600 hover:text-white rounded text-red-600"
              onClick={handleLogout}> <FaUser /> Logout </li>

          </ul>

        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 flex flex-col gap-[20px] ">

          {/* TOP BOXES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 ">
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
            <div
              className="min-h-[150px] w-full bg-[#F5F5F5] rounded-[10px] flex justify-center gap-[15px] items-center text-[20px]">
              <div className="w-[60px] h-[65px] bg-[#FFDBB5] rounded-[25px] flex items-center justify-center">
                <FaThList className="text-2xl text-[#572C10] w-[25px] h-[45px]" />
              </div>
              <div className='flex flex-col justify-center gap-[5px]'>
                <span className='font-bold text-[14px] text-[#572C10] '>Total Categories</span>
                <span className='font-bold text-[17px]'>2</span>
                <span className='font-bold text-[12px] text-[#995F2F]'>4 this month</span>
              </div>
            </div>
            <div
              className="min-h-[150px] w-full bg-[#F5F5F5] rounded-[10px] flex justify-center gap-[15px] items-center text-[20px]">
              <div className="w-[60px] h-[65px] bg-[#FFDBB5] rounded-[25px] flex items-center justify-center">
                <FaUserTie className="text-2xl text-[#572C10] w-[25px] h-[45px]" />
              </div>
              <div className='flex flex-col justify-center gap-[5px]'>
                <span className='font-bold text-[14px] text-[#572C10] '>Active Agents</span>
                <span className='font-bold text-[17px]'>{agents.length}</span>
                <span className='font-bold text-[12px] text-[#995F2F]'>+5 this month</span>
              </div>
            </div>
            <div
              className="min-h-[150px] w-full bg-[#F5F5F5] rounded-[10px] flex justify-center gap-[15px] items-center text-[20px]">
              <div className="w-[60px] h-[65px] bg-[#FFDBB5] rounded-[25px] flex items-center justify-center">
                <FaEye className="text-2xl text-[#572C10] w-[25px] h-[45px]" />
              </div>
              <div className='flex flex-col justify-center gap-[5px]'>
                <span className='font-bold text-[14px] text-[#572C10] '>Total views</span>
                <span className='font-bold text-[17px]'>{totalViews}</span>
                <span className='font-bold text-[12px] text-[#995F2F]'>+17.8% this month</span>
              </div>
            </div>

          </div>


          {/* RECENT BOOK */}
          <div className="bg-[#F5F5F5] rounded-[10px] p-[10px]">

            <div className='flex justify-between items-center mb-[20px]'>

              <h2 className="font-bold text-[#572C10]">
                Recent Book
              </h2>

            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>

              {/* BOOK 1 */}
              <div className='flex flex-col items-center gap-[5px]'>

               <div className='w-full max-w-[120px] h-[160px] bg-[#FFDBB5] rounded flex items-center justify-center'>
                  <img onClick={() => { navigate("/FlipPage") }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpvDOaZom26Em_V82vJa8tl-zovil5OlgmwA&s" alt="" className='w-full h-full object-cover rounded' />
                </div>

                <span className="text-[14px] font-bold">Mathematics</span>
                <span className="text-[12px] font-bold">Class 8</span>
                <span className="text-[12px] font-bold">May 25 2026</span>

              </div>

              {/* BOOK 2 */}
              <div className='flex flex-col items-center gap-[5px]'>

               <div className='w-full max-w-[120px] h-[160px] bg-[#FFDBB5] rounded flex items-center justify-center'>
                  <img onClick={() => { navigate("/FlipPage") }} src="https://m.media-amazon.com/images/I/81zleB1itJL._AC_UF1000,1000_QL80_.jpg" alt="" className='w-full h-full object-cover rounded' />
                </div>

                <span className="text-[14px] font-bold">English</span>
                <span className="text-[12px] font-bold">Class 8</span>
                <span className="text-[12px] font-bold">May 25 2026</span>

              </div>

              {/* BOOK 3 */}
              <div className='flex flex-col items-center gap-[5px]'>
                <div className='w-full max-w-[120px] h-[160px] bg-[#FFDBB5] rounded flex items-center justify-center'>
                  <img onClick={() => { navigate("/FlipPage") }} src="https://sureshbookdepot.com/wp-content/uploads/2025/07/20250707_180109-scaled.jpg" alt="" className='w-full h-full object-cover rounded' />
                </div>

                <span className="text-[14px] font-bold">Hindi</span>
                <span className="text-[12px] font-bold">Class 8</span>
                <span className="text-[12px] font-bold">May 25 2026</span>

              </div>

              {/* BOOK 4 */}
              <div className='flex flex-col items-center gap-[5px]'>

                <div className='w-full max-w-[120px] h-[160px] bg-[#FFDBB5] rounded flex items-center justify-center'>
                  <img onClick={() => { navigate("/FlipPage") }} src="/book 4.jfif" alt="" className='w-full h-full object-cover rounded' />
                </div>

                <span className="text-[14px] font-bold">Science</span>
                <span className="text-[12px] font-bold">Class 8</span>
                <span className="text-[12px] font-bold">May 25 2026</span>

              </div>
              <div className='flex flex-col items-center gap-[5px]'>

               <div className='w-full max-w-[120px] h-[160px] bg-[#FFDBB5] rounded flex items-center justify-center'>
                  <img onClick={() => { navigate("/FlipPage") }} src="/book12.jpg" alt="" className='w-full h-full object-cover rounded' />
                </div>

                <span className="text-[14px] font-bold">Science</span>
                <span className="text-[12px] font-bold">Class 8</span>
                <span className="text-[12px] font-bold">May 25 2026</span>

              </div>
              <div className='flex flex-col items-center gap-[5px]'>

               <div className='w-full max-w-[120px] h-[160px] bg-[#FFDBB5] rounded flex items-center justify-center'>
                  <img onClick={() => { navigate("/FlipPage") }} src="/book8.jpg" alt="" className='w-full h-full object-cover rounded' />
                </div>

                <span className="text-[14px] font-bold">Science</span>
                <span className="text-[12px] font-bold">Class 8</span>
                <span className="text-[12px] font-bold">May 25 2026</span>

              </div>

            </div>

          </div>

          {/* TABLE + CARD */}
          <div className='flex flex-col xl:flex-row gap-5'>

            {/* TABLE */}
            <div className="flex-1 bg-[#F5F5F5] rounded-[10px] p-[20px]">

              <div className='flex justify-between mb-[20px]'>

                <h4 className='font-bold text-[#572C10]'>
                  Active Agent
                </h4>

                <button className='border px-[10px] py-[5px] text-[#572C10] border-[#EFE6DD] font-bold  rounded'
                 onClick={()=>{setagentpop(!agentpop)}}>
                  View all
                </button>

              </div>
              <div className='overflow-x-auto'>
                <table className='w-full min-w-[700px]'>

                  <thead>

                    <tr className='bg-gray-200'>

                      <th className='p-[10px] text-[#A77F60] bg-[#EFE6DD]'>Agent Name</th>
                      <th className='p-[10px] text-[#A77F60] bg-[#EFE6DD]'>Email</th>
                      <th className='p-[10px] text-[#A77F60] bg-[#EFE6DD]'>Status</th>
                      <th className='p-[10px] text-[#A77F60] bg-[#EFE6DD]'>Edit</th>
                    </tr>

                  </thead>

                  <tbody>

                    {agents.map((value, index) => (
                      <tr key={index}>
                        <td className="text-center p-[12px] border-b border-amber-50">
                          {value.name}
                        </td>

                        <td className="text-center p-[12px] border-b border-amber-50 break-all">
                          {value.email}
                        </td>

                        <td className="text-center p-[12px] border-b border-amber-50">
                          Active
                        </td>

                        <td className="text-center p-[12px] border-b border-amber-50">
                        <button className='bg-[#572C10] text-white py-[5px] px-[10px] rounded-2xl font-bold'>Action</button>
                        </td>
                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>
            </div>
              <div>
  {agentpop && (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-3">

      {/* Popup Box */}
      <div className="bg-white w-full sm:w-[90%] md:w-[80%] lg:w-[70%] h-[85vh] sm:h-[80vh] rounded-lg shadow-lg relative flex flex-col">

        {/* Close Button */}
        <button
          className="absolute top-2 right-3 text-xl font-bold"
          onClick={() => setagentpop(false)}
        >
          ×
        </button>

        {/* Header */}
        <div className="p-3 sm:p-4 border-b font-semibold text-[#572C10] text-sm sm:text-base">
          Agents Table
        </div>

        {/* Table Wrapper */}
        <div className="p-2 sm:p-4 overflow-y-auto">

          <table className="w-full min-w-[600px] text-xs sm:text-sm md:text-base border-collapse">

            <thead>
              <tr className="bg-[#EFE6DD]">
                <th className="p-2 sm:p-3 text-[#A77F60]">Agent Name</th>
                <th className="p-2 sm:p-3 text-[#A77F60]">Email</th>
                <th className="p-2 sm:p-3 text-[#A77F60]">Status</th>
                <th className="p-2 sm:p-3 text-[#A77F60]">Edit</th>
              </tr>
            </thead>

            <tbody>
              {agents.map((value, index) => (
                <tr key={index} className="border-b">

                  <td className="text-center p-2 sm:p-3">
                    {value.name}
                  </td>

                  <td className="text-center p-2 sm:p-3 break-all">
                    {value.email}
                  </td>

                  <td className="text-center p-2 sm:p-3">
                    Active
                  </td>

                  <td className="text-center p-2 sm:p-3">
                  <button className='bg-[#572C10] text-white py-[5px] px-[10px] rounded-2xl font-bold'>Action</button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>
    </div>
  )}
</div>
            {/* CARD */}
            <div className="w-full   h-[250px] xl:w-[300px]  bg-[#F5F5F5] overflow-y-auto rounded-[10px] p-[20px]">
              <div className='text-[#572C10] font-bold '>Recent Ticket</div>
              <div>
                    <div className="hidden md:grid grid-cols-3 gap-4 pb-3 font-medium">
    <span>Agents</span>
    <span className="text-center">Date</span>
    <span className="text-right">Detail</span>
  </div>

  {/* Rows */}
  {Ticketdata?.map((data, index) => {
    return (
      <div
        key={index}
        className="
          py-3
          flex flex-col gap-3
          md:grid md:grid-cols-3 md:items-center
        "
      >
        {/* Mobile Agent */}
        <div className="flex justify-between md:hidden">
          <span className="text-gray-500 text-sm">Agent</span>
          <span className="font-medium">{data?.Agentname}</span>
        </div>

        {/* Desktop Agent */}
        <span className="hidden md:block font-medium truncate">
          {data?.Agentname}
        </span>

        {/* Mobile Date */}
        <div className="flex justify-between md:hidden">
          <span className="text-gray-500 text-sm">Date</span>
          <span className="text-sm">
            {new Date(data?.createdAt).toLocaleDateString("en-GB")}
          </span>
        </div>

        {/* Desktop Date */}
        <span className="hidden md:block text-center text-sm whitespace-nowrap">
          {new Date(data?.createdAt).toLocaleDateString("en-GB")}
        </span>

        {/* Button */}
        <div className="flex justify-end md:justify-end">
          <button
            className="
              bg-[#A77F60]
              text-white
              font-bold
              px-4
              py-2
              rounded-md
              w-full md:w-auto
            "
            onClick={() =>
              navigate("/ticket", {
                state: { role: "user" },
              })
            }
          >
            Click
          </button>
        </div>
      </div>
    );
  })}
              </div>
            </div>

          </div>

        </main>

      </div>

    </div>
  )
}

export default Dashboard;