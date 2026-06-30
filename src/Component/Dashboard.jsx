import React, { useActionState, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaThList, FaUserTie } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import {FaBook,} from 'react-icons/fa';
import { FiSearch } from "react-icons/fi";
import axios from 'axios';
import useApiLoader from "../hook/useApiLoader";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

function PdfCover({ pdfUrl, title }) {
  const [cover, setCover] = useState("");

  useEffect(() => {
    const loadCover = async () => {
      try {
        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        const page = await pdf.getPage(1);

        const viewport = page.getViewport({ scale: 0.8 });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: ctx,
          viewport,
        }).promise;

        setCover(canvas.toDataURL("image/jpeg"));
      } catch (err) {
        console.log(err);
      }
    };

    if (pdfUrl) {
      loadCover();
    }
  }, [pdfUrl]);

  return (
    <img
      src={cover || "/book1.jpg"}
      alt={title}
      className="w-full h-[240px] object-cover"
    />
  );
}

function Dashboard() {
  const navigate = useNavigate();
  const [saveLoading, setSaveLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agents, setAgents] = useState([]);
  const { loading, execute } = useApiLoader();
const agentLoader = useApiLoader();
const ticketLoader = useApiLoader();
const [agentError, setAgentError] = useState("");
const [ticketError, setTicketError] = useState("");
const [books, setBooks] = useState([]);
useEffect(() => {
  fetchAgents();
}, []);
useEffect(() => {
  fetchBooks();
}, []);

const fetchAgents = async () => {
  try {
   const response = await agentLoader.execute(() =>
      axios.get("https://flipbook-production-b71a.up.railway.app/api/books/agents")
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
      axios.get("https://flipbook-production-b71a.up.railway.app/api/tickets/all")
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
    setSaveLoading(true);

    await axios.put(
      `https://flipbook-production-b71a.up.railway.app/api/books/agents/${id}`,
      payload
    );

    setagenteditpop(false);
  } catch (error) {
    console.log(error);
  } finally {
    setSaveLoading(false);
  }
};
const deleteAgent = async (id) => {
  try {
    await axios.delete(`https://flipbook-production-b71a.up.railway.app/api/books/agents/${id}`);

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
const fetchBooks = async () => {
  try {
    const res = await axios.get(
      "https://flipbook-production-b71a.up.railway.app/api/books"
    );

    if (res.data.success) {

      const sortedBooks = res.data.data.sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );

      setBooks(sortedBooks);

    }

  } catch (error) {

    console.log("Book fetch error:", error);

  }
};

  return (
    <div>

      {/* BODY */}
      <div className='flex flex-col  lg:flex-row gap-5  p-[20px]'>

        {/* MAIN CONTENT */}
        <main className="flex-1 flex mt-[-16px] lg:ml-[20px] flex-col gap-[20px] ">

          {/* TOP BOXES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

  {/* Total Books */}
  <div className="group relative overflow-hidden rounded-3xl bg-white border border-gray-100 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300">
    <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-amber-400 to-orange-500" />

    <div className="flex items-center justify-between mb-5">
      <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center">
        <FaBook className="text-[#572C10] text-lg" />
      </div>

      <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
        Library
      </span>
    </div>

    <h2 className="text-[30px] font-bold text-gray-900 tracking-tight">
      {books.length}
    </h2>

    <p className="mt-1 text-sm font-medium text-gray-500">
      Total Books
    </p>
  </div>

  {/* Categories */}
  <div className="group relative overflow-hidden rounded-3xl bg-white border border-gray-100 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300">
    <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-blue-400 to-indigo-500" />

    <div className="flex items-center justify-between mb-5">
      <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
        <FaThList className="text-blue-600 text-lg" />
      </div>

      <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
        Catalog
      </span>
    </div>

    <h2 className="text-[30px] font-bold text-gray-900 tracking-tight">
      2
    </h2>

    <p className="mt-1 text-sm font-medium text-gray-500">
      Total Categories
    </p>
  </div>

  {/* Agents */}
  <div className="group relative overflow-hidden rounded-3xl bg-white border border-gray-100 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300">
    <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-emerald-400 to-green-500" />

    <div className="flex items-center justify-between mb-5">
      <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
        <FaUserTie className="text-emerald-600 text-lg" />
      </div>

      <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
        Team
      </span>
    </div>

    <h2 className="text-[30px] font-bold text-gray-900 tracking-tight">
      {agents.length}
    </h2>

    <p className="mt-1 text-sm font-medium text-gray-500">
      Active Agents
    </p>
  </div>

  {/* Views */}
  <div className="group relative overflow-hidden rounded-3xl bg-white border border-gray-100 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300">
    <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-purple-400 to-violet-500" />

    <div className="flex items-center justify-between mb-5">
      <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center">
        <FaEye className="text-purple-600 text-lg" />
      </div>

      <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
        Analytics
      </span>
    </div>

    <h2 className="text-[30px] font-bold text-gray-900 tracking-tight">
      {totalViews}
    </h2>

    <p className="mt-1 text-sm font-medium text-gray-500">
      Total Views
    </p>
  </div>

</div>
          {/* RECENT BOOK */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">

  {/* Header */}
  <div className="flex items-center justify-between mb-6">
    <div>
      <h2 className="text-xl font-bold text-[#572C10]">
        Recent Books
      </h2>
      <p className="text-sm text-[#572C10] mt-1">
        Latest books added to your library
      </p>
    </div>
  </div>

  {/* Books Grid */}
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

  {books
    .slice() // avoid mutation
    
    .slice(0, 5)
    .map((book) => (

      <div
        key={book._id}
        className="group cursor-pointer"
        onClick={() => navigate("/FlipPage")}
      >

        {/* Book Cover */}
        <div
          className="
            relative
            overflow-hidden
            rounded-2xl
            bg-gray-100
            border border-gray-100
            shadow-sm
            transition-all duration-300
            group-hover:shadow-lg
            group-hover:-translate-y-1
          "
        >
<PdfCover
  pdfUrl={book.fileUrl}
  title={book.title}
/>

          {/* Subject Badge */}
          <div className="absolute top-3 left-3">
            <span
              className="
                px-3 py-1
                rounded-full
                bg-white/95
                backdrop-blur-sm
                text-[11px]
                font-bold
                text-gray-700
                shadow-sm
              "
            >
              {book.subject || "Subject"}
            </span>
          </div>

        </div>

        {/* Book Info */}
        <div className="mt-3 px-1">

          <h3
            className="
              font-bold
              text-[15px]
              text-gray-900
              line-clamp-1
            "
          >
            {book.title}
          </h3>

          <p
            className="
              mt-1
              text-[13px]
              font-medium
              text-gray-500
            "
          >
            {book.className}
          </p>

        </div>

      </div>

    ))}

</div>
</div>
          {/* TABLE + CARD */}
          <div className='flex flex-col xl:flex-row gap-2'>

            {/* TABLE */}
  <div className="flex-1 bg-white rounded-2xl border border-[#E9E1D8] shadow-sm overflow-hidden">

  {/* Header */}
  <div className="flex items-center justify-between px-5 py-4 border-b border-[#F1E8DF]">
    <div>
      <h4 className="text-lg font-extrabold text-[#572C10]">
        Active Agents
      </h4>
      <p className="text-xs font-semibold text-[#A77F60] mt-1">
        Recently active team members
      </p>
    </div>

    <button
      className="px-4 py-2 text-sm font-bold text-[#572C10] border border-[#E7DDD4] rounded-lg hover:bg-[#FAF7F4] transition-all"
      onClick={() => {
        setagentpop(!agentpop);
      }}
    >
      View All
    </button>
  </div>

  {/* Table */}
  <div className="overflow-x-auto">
    <table className="w-full min-w-[560px]">

      <thead>
        <tr className="bg-[#FAF8F6]">

          <th className="px-5 py-3 text-left text-xs font-extrabold tracking-wider text-[#8A6B52] uppercase">
            Agent
          </th>

          <th className="px-4 py-3 text-left text-xs font-extrabold tracking-wider text-[#8A6B52] uppercase">
            Email
          </th>

          <th className="px-4 py-3 text-center text-xs font-extrabold tracking-wider text-[#8A6B52] uppercase">
            Status
          </th>

          <th className="px-4 py-3 text-center text-xs font-extrabold tracking-wider text-[#8A6B52] uppercase">
            Last Login
          </th>

          <th className="px-4 py-3 text-center text-xs font-extrabold tracking-wider text-[#8A6B52] uppercase">
            Actions
          </th>

        </tr>
      </thead>

      <tbody>

        {agentLoader.loading ? (
          <tr>
            <td colSpan="5" className="py-10">

              <div className="flex justify-center items-center gap-3">

                <div className="w-5 h-5 border-2 border-[#572C10]/20 border-t-[#572C10] rounded-full animate-spin"></div>

                <span className="font-bold text-[#572C10]">
                  Loading Agents...
                </span>

              </div>

            </td>
          </tr>
        ) : agentError ? (

          <tr>
            <td
              colSpan="5"
              className="text-center py-10 text-red-500 font-bold"
            >
              {agentError}
            </td>
          </tr>

        ) : (

          agents
            .slice(-2)
            .reverse()
            .map((value, index) => (

              <tr
                key={index}
                className="hover:bg-[#FCFBFA] transition-colors"
              >

                {/* Agent */}
                <td className="px-5 py-4 border-t border-[#F3ECE5]">

                  <div className="flex items-center gap-3">

                    <div className="w-9 h-9 rounded-full bg-[#572C10] text-white flex items-center justify-center text-sm font-extrabold">
                      {value.name?.charAt(0)?.toUpperCase()}
                    </div>

                    <div>
                      <p className="font-bold text-[#572C10]">
                        {value.name}
                      </p>
                    </div>

                  </div>

                </td>

                {/* Email */}
                <td className="px-4 py-4 border-t border-[#F3ECE5]">
                  <p className="font-semibold text-gray-700 text-sm break-all">
                    {value.email}
                  </p>
                </td>

                {/* Status */}
                <td className="px-4 py-4 border-t border-[#F3ECE5] text-center">

                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-bold
                    ${
                      value.status === "Active"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : value.status === "Inactive"
                        ? "bg-red-50 text-red-700 border border-red-200"
                        : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                    }`}
                  >
                    {value.status}
                  </span>

                </td>

                {/* Last Login */}
                <td className="px-4 py-4 border-t border-[#F3ECE5] text-center">

                  <span className="font-semibold text-sm text-gray-700">
                    {value.lastLogin
                      ? new Date(value.lastLogin).toLocaleDateString("en-GB")
                      : "No Login"}
                  </span>

                </td>

                {/* Actions */}
                <td className="px-4 py-4 border-t border-[#F3ECE5]">

                  <div className="flex justify-center gap-2">

                    <button
                      className="px-3 py-2 bg-[#572C10] text-white rounded-lg text-xs font-bold hover:bg-[#6D3817] transition-all"
                      onClick={() => {
                        setagenteditpop(true);
                        setSelectedAgent(value);
                      }}
                    >
                      Action
                    </button>

                    <button
                      className="px-3 py-2 bg-white border border-red-200 text-red-600 rounded-lg text-xs font-bold hover:bg-red-50 transition-all"
                      onClick={() => deleteAgent(value._id)}
                    >
                      Delete
                    </button>

                  </div>

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
  className="relative w-full bg-[#572C10] text-white py-2 rounded-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden transition-all"
  disabled={saveLoading || passwordError !== ""}
  onClick={() => updateagentchanges(selectedAgent?._id)}
>
  {/* shimmer effect */}
  {saveLoading && (
    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_1.2s_infinite]"></span>
  )}

  {/* spinner */}
  {saveLoading && (
    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
  )}

  <span className="relative z-10">
    {saveLoading ? "Saving Changes..." : "Save Changes"}
  </span>

  <style>{`
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
  `}</style>
</button>
        </div>
      </div>
    </div>
  )
}
                </div>
              <div>
 {agentpop && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

  <div className="bg-white w-full max-w-6xl h-[85vh] rounded-2xl border border-[#E9E1D8] shadow-xl flex flex-col overflow-hidden">

    {/* Header */}
    <div className="flex items-center justify-between px-6 py-5 border-b border-[#F2E8DF]">

      <div>
        <h2 className="text-xl font-extrabold text-[#572C10]">
          Active Agents
        </h2>

        <p className="text-sm font-medium text-[#A77F60] mt-1">
          Manage and monitor all registered agents
        </p>
      </div>

      <button
        onClick={() => setagentpop(false)}
        className="w-9 h-9 rounded-lg hover:bg-[#F8F5F2] flex items-center justify-center text-gray-500 text-xl font-bold transition-all"
      >
        ×
      </button>

    </div>

    {/* Search */}
    <div className="px-6 py-4 border-b border-[#F2E8DF]">

      <div className="relative max-w-md">

        <FiSearch
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search agents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-11 pl-11 pr-4 rounded-xl border border-[#E6DDD5] bg-white font-semibold text-sm focus:outline-none focus:border-[#572C10]"
        />

      </div>

    </div>

    {/* Table */}
    <div className="flex-1 overflow-auto">

      <table className="w-full min-w-[750px]">

        <thead className="sticky top-0 bg-[#FAF8F6] z-10">

          <tr>

            <th className="px-6 py-4 text-left text-xs uppercase tracking-wider font-extrabold text-[#8A6B52]">
              Agent
            </th>

            <th className="px-4 py-4 text-left text-xs uppercase tracking-wider font-extrabold text-[#8A6B52]">
              Email
            </th>

            <th className="px-4 py-4 text-center text-xs uppercase tracking-wider font-extrabold text-[#8A6B52]">
              Status
            </th>

            <th className="px-4 py-4 text-center text-xs uppercase tracking-wider font-extrabold text-[#8A6B52]">
              Last Login
            </th>

            <th className="px-4 py-4 text-center text-xs uppercase tracking-wider font-extrabold text-[#8A6B52]">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {agentLoader.loading ? (
            <tr>
              <td colSpan="5" className="py-16">

                <div className="flex justify-center items-center gap-3">

                  <div className="w-6 h-6 border-2 border-[#572C10]/20 border-t-[#572C10] rounded-full animate-spin"></div>

                  <span className="font-bold text-[#572C10]">
                    Loading Agents...
                  </span>

                </div>

              </td>
            </tr>
          ) : agentError ? (
            <tr>
              <td
                colSpan="5"
                className="text-center py-16 text-red-500 font-bold"
              >
                {agentError}
              </td>
            </tr>
          ) : filteredAgents.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                className="text-center py-16 text-gray-500 font-semibold"
              >
                No Agent Found
              </td>
            </tr>
          ) : (
            filteredAgents.map((value, index) => (

              <tr
                key={index}
                className="hover:bg-[#FCFBFA] transition-colors"
              >

                {/* Agent */}
                <td className="px-6 py-4 border-t border-[#F3ECE5]">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-full bg-[#572C10] text-white flex items-center justify-center font-extrabold">
                      {value.name?.charAt(0)?.toUpperCase()}
                    </div>

                    <div>
                      <p className="font-bold text-[#572C10]">
                        {value.name}
                      </p>
                    </div>

                  </div>

                </td>

                {/* Email */}
                <td className="px-4 py-4 border-t border-[#F3ECE5]">

                  <p className="font-semibold text-gray-700 break-all">
                    {value.email}
                  </p>

                </td>

                {/* Status */}
                <td className="px-4 py-4 border-t border-[#F3ECE5] text-center">

                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-bold
                    ${
                      value.status === "Active"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : value.status === "Inactive"
                        ? "bg-red-50 text-red-700 border border-red-200"
                        : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                    }`}
                  >
                    {value.status}
                  </span>

                </td>

                {/* Last Login */}
                <td className="px-4 py-4 border-t border-[#F3ECE5] text-center">

                  <span className="font-semibold text-gray-700">
                    {value.lastLogin
                      ? new Date(value.lastLogin).toLocaleDateString("en-GB")
                      : "No Login"}
                  </span>

                </td>

                {/* Actions */}
                <td className="px-4 py-4 border-t border-[#F3ECE5]">

                  <div className="flex justify-center gap-2">

                    <button
                      className="px-4 py-2 bg-[#572C10] text-white rounded-lg text-xs font-bold hover:bg-[#6D3817] transition-all"
                      onClick={() => {
                        setagenteditpop(true);
                        setSelectedAgent(value);
                      }}
                    >
                      Action
                    </button>

                    <button
                      className="px-4 py-2 border border-red-200 text-red-600 rounded-lg text-xs font-bold hover:bg-red-50 transition-all"
                      onClick={() => deleteAgent(value._id)}
                    >
                      Delete
                    </button>

                  </div>

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
          <div className="w-full xl:w-[300px] h-[285px] bg-white rounded-2xl border border-[#E9E1D8] shadow-sm overflow-hidden flex flex-col">

  {/* Header */}
  <div className="px-4 py-3 border-b border-[#F2E8DF]">

    <h3 className="text-[#572C10] text-base font-extrabold">
      Recent Tickets
    </h3>

    <p className="text-xs text-[#A77F60] font-medium mt-1">
      Latest support requests
    </p>

  </div>

  {/* Content */}
  <div className="flex-1 overflow-y-auto">

    {/* Desktop Header */}
    <div className="hidden md:grid grid-cols-3 px-4 py-3 bg-[#FAF8F6] border-b border-[#F2E8DF] sticky top-0 z-10">

      <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#8A6B52]">
        Agent
      </span>

      <span className="text-center text-[11px] font-extrabold uppercase tracking-wider text-[#8A6B52]">
        Date
      </span>

      <span className="text-right text-[11px] font-extrabold uppercase tracking-wider text-[#8A6B52]">
        Action
      </span>

    </div>

    {ticketLoader.loading ? (

      <div className="flex justify-center py-10">

        <div className="flex items-center gap-3">

          <div className="w-5 h-5 border-2 border-[#572C10]/20 border-t-[#572C10] rounded-full animate-spin"></div>

          <span className="font-bold text-[#572C10]">
            Loading Tickets...
          </span>

        </div>

      </div>

    ) : ticketError ? (

      <div className="text-center py-10 text-red-500 font-bold">
        {ticketError}
      </div>

    ) : (

      Ticketdata?.map((data, index) => {
        return (
          <div
            key={index}
            className="
              px-4 py-3
              border-b border-[#F3ECE5]
              hover:bg-[#FCFBFA]
              transition-colors
            "
          >

            {/* Desktop Layout */}
            <div className="hidden md:grid md:grid-cols-3 md:items-center">

              <div>
                <p className="font-bold text-[#572C10] truncate">
                  {data?.Agentname}
                </p>
              </div>

              <div className="text-center">

                <span className="text-sm font-semibold text-gray-600">
                  {new Date(data?.createdAt).toLocaleDateString("en-GB")}
                </span>

              </div>

              <div className="flex justify-end">

                <button
                  className="
                    px-3 py-2
                    bg-[#572C10]
                    text-white
                    rounded-lg
                    text-xs
                    font-bold
                    hover:bg-[#6D3817]
                    transition-all
                  "
                  onClick={() =>
                    navigate("/ticket", {
                      state: { role: "user" },
                    })
                  }
                >
                  View
                </button>

              </div>

            </div>

            {/* Mobile Layout */}
            <div className="md:hidden space-y-2">

              <div className="flex justify-between">

                <span className="text-xs font-semibold text-gray-500">
                  Agent
                </span>

                <span className="font-bold text-[#572C10]">
                  {data?.Agentname}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-xs font-semibold text-gray-500">
                  Date
                </span>

                <span className="text-sm font-semibold text-gray-700">
                  {new Date(data?.createdAt).toLocaleDateString("en-GB")}
                </span>

              </div>

              <button
                className="
                  w-full
                  py-2
                  bg-[#572C10]
                  text-white
                  rounded-lg
                  text-sm
                  font-bold
                  hover:bg-[#6D3817]
                  transition-all
                "
                onClick={() =>
                  navigate("/ticket", {
                    state: { role: "user" },
                  })
                }
              >
                View Ticket
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