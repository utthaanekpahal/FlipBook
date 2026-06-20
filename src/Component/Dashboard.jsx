import React, { useActionState, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaThList, FaUserTie } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import {FaBook,} from 'react-icons/fa';
import { FiSearch } from "react-icons/fi";
import axios from 'axios';
import useApiLoader from "../hook/useApiLoader";
function Dashboard() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [agents, setAgents] = useState([]);
  const { loading, execute } = useApiLoader();
const agentLoader = useApiLoader();
const ticketLoader = useApiLoader();
const [agentError, setAgentError] = useState("");
const [ticketError, setTicketError] = useState("");
useEffect(() => {
  fetchAgents();
}, []);

const fetchAgents = async () => {
  try {
   const response = await agentLoader.execute(() =>
      axios.get("http://localhost:3000/api/books/agents")
    );

    setAgents(response.data.agents);

  }catch (error) {
  setAgentError("Server is unavailable");
}
};
const [Ticketdata, setTicketdata] = useState([])
useEffect(()=>{
  fetchTicket()
},[])
const fetchTicket=async ()=>{
  try{
    const res = await ticketLoader.execute(() =>
      axios.get("http://localhost:3000/api/tickets/all")
    );

    setTicketdata(res.data.tickets)
  }
catch (error) {
  setTicketError("Server is unavailable");
}
}
const [selectedAgent, setSelectedAgent] = useState({
    updateagentname : "",
    updateagentemail :"",
    updateagentpass:"",
    updatedstatus:""
});
 const [isActive, setIsActive] = useState(true);
const [passwordError, setPasswordError] = useState("");
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  const updateagentdata=(e)=>{
    const {name , value}=e.target
    setSelectedAgent((prev)=>({...prev,[name]:value}))
  }
  useEffect(() => {
  setSelectedAgent((prev) => ({
    ...prev,
    updatedstatus: isActive ? "Active" : "Deactivated",
  }));
}, [isActive]);
 const updateagentchanges = async (id) => {
  const payload = {
    status: selectedAgent.updatedstatus,
  };

  // password only if user typed it
  if (selectedAgent.updateagentpass) {
    if (!passwordRegex.test(selectedAgent.updateagentpass)) {
      setPasswordError(
        "Password must be at least 8 characters and contain uppercase, lowercase, number and special character."
      );
      return;
    }

    payload.NewPassword = selectedAgent.updateagentpass;
  }

  setPasswordError("");

  try {
    await axios.put(
      `http://localhost:3000/api/books/agents/${id}`,
      payload
    );

    setagenteditpop(false);
  } catch (error) {
    console.log(error);
  }
};
const deleteAgent = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/api/books/agents/${id}`);

    // UI update without refresh
    setAgents((prev) => prev.filter((a) => a._id !== id));

  } catch (error) {
    console.log("Delete error:", error);
  }
};
  const [agenteditpop, setagenteditpop] = useState(false)
  const [agentpop, setagentpop] = useState(false)
  const totalViews =localStorage.getItem("adminViews");
  const [searchTerm, setSearchTerm] = useState("");
  const filteredAgents = agents.filter((agent) =>
  agent.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  agent.email?.toLowerCase().includes(searchTerm.toLowerCase())
);
  return (
    <div className=''>

      {/* BODY */}
      <div className='flex flex-col  lg:flex-row gap-5  p-[20px]'>

        {/* SIDEBAR */}

        {/* MAIN CONTENT */}
        <main className="flex-1 flex mt-[-16px] flex-col gap-[20px] ">

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
          <div className='flex flex-col xl:flex-row gap-2'>

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
                      <th className='p-[10px] text-[#A77F60] bg-[#EFE6DD]'>Last login</th>
                      <th className='p-[10px] text-[#A77F60] bg-[#EFE6DD]'>Edit</th>
                    </tr>

                  </thead>

                              <tbody>
               {agentLoader.loading ? (
    <tr>
      <td colSpan="5" className="text-center py-8">
        <div className="flex justify-center items-center gap-2">
          <div className="w-5 h-5 border-2 border-[#572C10]/20 border-t-[#572C10] rounded-full animate-spin"></div>
          <span>Loading Agents...</span>
        </div>
      </td>
    </tr>
  ) :  agentError ? (
 <tr>
    <td colSpan="5" className="text-center py-8 text-red-500 font-medium">
        {agentError}

    </td>
  </tr>
):( agents.slice(-2)
  .reverse().map((value, index) => (
                      <tr key={index}>
                        <td className="text-center p-[12px] border-b border-amber-50">
                          {value.name}
                        </td>

                        <td className="text-center p-[12px] border-b border-amber-50 break-all">
                          {value.email}
                        </td>

                        <td className="text-center p-[12px] border-b border-amber-50">
                          {value.status}
                        </td>
                         <td className="text-center p-[12px] border-b border-amber-50">
                          {value.lastLogin
                           ? new Date(value.lastLogin).toLocaleDateString("en-GB")
                           : "No Login"}
                        </td>
                        <td className="text-center flex ml-[5%] gap-[15px]  p-[12px] border-b border-amber-50">
                        <button className='bg-[#572C10] text-white py-[5px] px-[10px] rounded-2xl font-bold'
                          onClick={()=>{setagenteditpop(true);
                             setSelectedAgent(value);
                          }}>Action</button>
                          <button
      className="bg-red-500 text-white py-[5px] px-[10px] rounded-2xl font-bold"
      onClick={() => deleteAgent(value._id)}
    >
      Delete
    </button>
                        </td>
                      </tr>
                    ))
                      )}
            </tbody>

                </table>

              </div>
            </div>
                <div>
                 {
  agenteditpop && (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-xl p-4 sm:p-6 max-h-[90vh] overflow-y-auto">

        {/* Close Button */}
        <button
          onClick={() => setagenteditpop(false)}
          className="absolute top-3 right-4 text-2xl font-bold text-gray-500 hover:text-black"
        >
          ×
        </button>

        {/* Heading */}
        <h2 className="text-lg sm:text-xl font-semibold mb-5">
          Edit Agent
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            name='updateagentname'
            value={selectedAgent?.name || ""}
            onChange={updateagentdata}
            placeholder="Enter Name"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            name='updateagentemail'
            value={selectedAgent?.email || ""}
            onChange={updateagentdata}
            placeholder="Enter Email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mb-4 relative">
  <label className="block text-sm font-medium mb-1">
    New Password
  </label>

  <input
    type={showPassword ? "text" : "password"}
    name="updateagentpass"
    value={selectedAgent.updateagentpass || ""}
    onChange={updateagentdata}
    placeholder="Enter New Password"
    className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <span
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-[38px] cursor-pointer text-gray-500 hover:text-gray-700"
  >
    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
  </span>

  {passwordError && (
    <p className="text-red-500 text-sm mt-1">
      {passwordError}
    </p>
  )}
</div>

        {/* Status Toggle */}
        <div className="flex items-center justify-between mb-6">
          <span className="font-medium text-sm sm:text-base">
            Status
          </span>

          <button
            onClick={() => setIsActive(!isActive)}
            className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${
              isActive ? "bg-green-500" : "bg-red-500"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                isActive ? "translate-x-8" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div className="mb-4 text-center">
          <span
           name='updatedstatus'
           onChange={updateagentdata}
            className={`font-medium  ${
              isActive ? "text-green-600 font-bold" : "text-red-600 font-bold"
            }` }
          >
            {isActive ? "Active" : "Deactivated"}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setagenteditpop(false)}
            className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            className="w-full bg-[#572C10] text-white py-2 rounded-lg"
             disabled={passwordError !== ""}
            onClick={() => updateagentchanges(selectedAgent?._id)}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
                </div>
              <div>
 {agentpop && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-3">

    <div className="bg-white w-full sm:w-[90%] md:w-[80%] lg:w-[70%] h-[85vh] sm:h-[80vh] rounded-lg shadow-lg relative flex flex-col">

      {/* Close Button */}
      <button
        className="absolute top-2 right-3 text-xl font-bold"
        onClick={() => setagentpop(false)}
      >
        ×
      </button>

      {/* Header */}
      <div className="p-3 sm:p-4 font-semibold text-[#572C10] text-sm sm:text-base">
        Agents Table
      </div>

      {/* SEARCH BAR ADDED */}
   {/* SEARCH BAR WITH ICON */}
<div className="p-3 mt-[-10px]">
  <div className="relative">
    
    {/* Search Icon */}
    <FiSearch
      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      size={18}
    />

    <input
      type="text"
      placeholder="Please Search Agents..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:outline-none"
    />
    
  </div>
</div>
      {/* Table Wrapper */}
      <div className="p-2 sm:p-4 overflow-y-auto">

        <table className="w-full min-w-[600px] text-xs sm:text-sm md:text-base border-collapse">

          <thead>
            <tr className="bg-[#EFE6DD]">
              <th className="p-2 sm:p-3 text-[#A77F60]">Agent Name</th>
              <th className="p-2 sm:p-3 text-[#A77F60]">Email</th>
              <th className="p-2 sm:p-3 text-[#A77F60]">Status</th>
              <th className="p-[10px] text-[#A77F60] bg-[#EFE6DD]">
                Last login
              </th>
              <th className="p-2 sm:p-3 text-[#A77F60]">Edit</th>
            </tr>
          </thead>

          <tbody>
            {agentLoader.loading ? (
              <tr>
                <td colSpan="5" className="text-center py-8">
                  <div className="flex justify-center items-center gap-2">
                    <div className="w-5 h-5 border-2 border-[#572C10]/20 border-t-[#572C10] rounded-full animate-spin"></div>
                    <span>Loading Agents...</span>
                  </div>
                </td>
              </tr>
            ) : agentError ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-8 text-red-500 font-medium"
                >
                  {agentError}
                </td>
              </tr>
            ) : filteredAgents.length === 0 ? (
              // NO RESULT MESSAGE ADDED
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-8 text-gray-500"
                >
                  No Agent Found
                </td>
              </tr>
            ) : (
              // SEARCH FILTER APPLIED
              filteredAgents.map((value, index) => (
                <tr key={index}>
                  <td className="text-center p-[12px] border-b border-amber-50">
                    {value.name}
                  </td>

                  <td className="text-center p-[12px] border-b border-amber-50 break-all">
                    {value.email}
                  </td>

                  <td className="text-center p-[12px] border-b border-amber-50">
                    {value.status}
                  </td>

                  <td className="text-center p-[12px] border-b border-amber-50">
                    {value.lastLogin
                      ? new Date(value.lastLogin).toLocaleDateString("en-GB")
                      : "No Login"}
                  </td>

                  <td className="text-center flex ml-[15%] gap-[15px] p-[12px] border-b border-amber-50">
                    <button
                      className="bg-[#572C10] text-white py-[5px] px-[10px] rounded-2xl font-bold"
                      onClick={() => {
                        setagenteditpop(true);
                        setSelectedAgent(value);
                      }}
                    >
                      Action
                    </button>

                    <button
                      className="bg-red-500 text-white py-[5px] px-[10px] rounded-2xl font-bold"
                      onClick={() => deleteAgent(value._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>

      </div>
    </div>
  </div>
)}
</div>
            {/* CARD */}
            <div className="w-full  h-[258px] xl:w-[300px]  bg-[#F5F5F5] overflow-y-auto rounded-[10px] p-[20px]">
              <div className='text-[#572C10] font-bold '>Recent Ticket</div>
              <div>
                    <div className="hidden md:grid grid-cols-3 gap-4 pb-3 font-medium mt-[10px]">
    <span>Agents</span>
    <span className="text-center">Date</span>
    <span className="text-right">Detail</span>
  </div>

  {/* Rows */}
  {ticketLoader.loading ? (
  <div className="flex justify-center py-8">
    <div className="flex items-center gap-2">
      <div className="w-5 h-5 border-2 border-[#572C10]/20 border-t-[#572C10] rounded-full animate-spin"></div>
      <span className="text-[#572C10] font-medium">
        Loading Tickets...
      </span>
    </div>
  </div>
): ticketError ? (
  <div className="text-center py-6 text-red-500">
    {ticketError}
  </div>
) :(Ticketdata?.map((data, index) => {
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
              bg-[#572C10]
              text-white
              font-bold
              px-4
              py-2
              rounded-[10px]
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
  })
  )}
              </div>
            </div>

          </div>

        </main>

      </div>

    </div>
  )
}

export default Dashboard;