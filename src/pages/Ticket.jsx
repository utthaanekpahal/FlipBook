import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import { mycontext } from '../Context/Contextfile';


const Ticket = () => {
  const {globaldata,setglobaldata}=useContext(mycontext)

  const location = useLocation();
  const role = location.state?.role;
  // =========================
  // Popup open/close state
  // =========================
  const [showModal, setShowModal] = useState(false)
  const [showReplyModal, setShowReplyModal] = useState(false)


  const [ticketShow, setTicketShow] = useState([])

  const [upload, setUpload] = useState({
    Agentname: "",
    category: "",
    subject: "",
    message: ""
  })

  // =========================
  // Admin updates
  // =========================
  const [adminUpdates, setAdminUpdates] = useState([
    {
      id: 1,
      title: "Technical Issue Resolved",
      desc: "Server issue fixed by admin team"
    },
    {
      id: 2,
      title: "Billing Update",
      desc: "Payment gateway updated successfully"
    }
  ])

  // handle input change
  const getTicketData = (e) => {
    const { name, value } = e.target

    setUpload((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  // form submit
  const ticketHandler = (e) => {
    e.preventDefault()

    setTicketShow((prev) => [...prev, upload])

    setUpload({
      Agentname: "",
      category: "",
      subject: "",
      message: ""
    })

    setShowModal(false)
  }

  // =========================
  // Delete function
  // =========================
  const deleteUpdate = (id) => {
    const filterData = adminUpdates.filter((item) => item.id !== id)
    setAdminUpdates(filterData)
  }

  // =========================
  // Reply function
  // =========================
  const [replyData, setReplyData] = useState({
  status: "",
  message: ""
})
const [selectedTicket, setSelectedTicket] = useState(null)

const handleReplyChange = (e) => {
  const { name, value } = e.target

  setReplyData((prev) => ({
    ...prev,
    [name]: value
  }))
}

const submitReply = (e) => {
  e.preventDefault()

  const Adminreplymessage=({
    ticket: selectedTicket,
    reply: replyData
  })
  setglobaldata((prev)=>[...prev,Adminreplymessage])

  setReplyData({
    status: "",
    message: ""
  })

  setShowReplyModal(false)
}

const replyHandler = (item) => {
  setSelectedTicket(item)
  setShowReplyModal(true)
}
/*const badgeColors = {
  resolved: "bg-green-500",
  progress: "bg-yellow-500",
  wait: "bg-red-500",
  active: "bg-blue-500",
};*/
useEffect(()=>{
console.log(globaldata)
},[globaldata])

  // localStorage
  useEffect(() => {
    localStorage.setItem("tickets", JSON.stringify(ticketShow))
  }, [ticketShow])
   
  return (

    <div
      className='min-h-screen w-full bg-cover bg-[#EFE6DD] bg-center p-[20px]'
    >

      {/* =========================
          TOP HEADER
      ========================== */}
      
      <div className='flex justify-around items-center p-[15px] rounded-md'>

        {role !=="user"?<h1 className='text-2xl font-bold text-[#572C10]'>
          Ticket Update
        </h1>:<h1 className='text-2xl font-bold text-[#572C10]'>Tickets By Agents</h1>}

       {role !=="user"&&
        <button  onClick={() => setShowModal(true)}
        className='bg-[#572C10] text-white font-bold px-5 py-2 rounded-md'
  >
        New Ticket
       </button>
      }
      </div>


      {/* =========================
          POPUP MODAL
      ========================== */}

      {
        showModal && (

          <div className='fixed inset-0 bg-black/50 flex justify-center items-center z-50'>

            <form
              onSubmit={ticketHandler}
              className='flex justify-center items-center rounded-md bg-[#F5F5F5] gap-[10px] flex-col w-[35%] p-[20px] relative'
            >

              {/* CLOSE BUTTON */}
              <button
                type='button'
                onClick={() => setShowModal(false)}
                className='absolute right-3 top-2 text-2xl'
              >
                ×
              </button>

              <h1 className='font-bold text-2xl text-[#572C10]'>
                Ticket Raise
              </h1>

              <div className='flex justify-center items-center gap-[15px] flex-col p-[15px] w-full'>

                {/* Agent Name */}
                <div className='w-full'>
                  <label className='font-bold text-[#572C10]'>
                    Agent Name
                  </label>

                  <input
                    onChange={getTicketData}
                    value={upload.Agentname}
                    name="Agentname"
                    className='border-2 rounded-md border-[#ac8d6f] outline-none p-[5px] w-full'
                    type="text"
                    placeholder='enter your name'
                  />
                </div>

                {/* Category */}
                <div className='w-full'>

                  <label className='font-bold text-[#572C10]'>
                    Category
                  </label>

                  <select
                    onChange={getTicketData}
                    value={upload.category}
                    name="category"
                    className='border-2 p-2 w-full border-[#ac8d6f] rounded-md outline-none'
                  >
                    <option value="">Select Category</option>
                    <option value="technical">Technical</option>
                    <option value="billing">Billing</option>
                    <option value="support">Support</option>
                  </select>

                </div>

                {/* Subject */}
                <div className='w-full'>

                  <label className='font-bold text-[#572C10]'>
                    Subject
                  </label>

                  <input
                    onChange={getTicketData}
                    value={upload.subject}
                    name="subject"
                    className='border-2 border-[#ac8d6f] rounded-md outline-none w-full p-[5px]'
                    type="text"
                    placeholder='enter your Subject'
                  />

                </div>

                {/* Description */}
                <div className='w-full'>

                  <label className='font-bold text-[#572C10]'>
                    Description
                  </label>

                  <textarea
                    onChange={getTicketData}
                    value={upload.message}
                    name="message"
                    className='border-2 rounded-md border-[#ac8d6f] outline-none h-[20vh] p-[5px] w-full'
                    placeholder='enter your message'
                  />

                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className='bg-[#572C10] p-[10px] w-[50%] rounded-sm text-white'
                >
                  Submit
                </button>

              </div>

            </form>

          </div>

        )
      }
      {/* =========================
    REPLY MODAL
========================= */}

{
  showReplyModal && (

    <div className='fixed inset-0 bg-black/50 flex justify-center items-center z-50'>

      <form
        onSubmit={submitReply}
        className='bg-white w-[35%] rounded-md p-[20px] flex flex-col gap-[15px] relative'
      >

        {/* Close Button */}
        <button
          type='button'
          onClick={() => setShowReplyModal(false)}
          className='absolute right-3 top-2 text-2xl'
        >
          ×
        </button>

        <h1 className='text-2xl font-bold text-[#572C10]'>
          Reply Ticket
        </h1>

        {/* Status */}
        <div className='w-full'>

          <label className='font-bold text-[#572C10]'>
            Status
          </label>

          <select
            name="status"
            value={replyData.status}
            onChange={handleReplyChange}
            className='border-2 p-2 w-full border-[#ac8d6f] rounded-md outline-none'
          >
            <option value="">Select Status</option>
            <option value="resolved">Resolved</option>
            <option value="progress">Progress</option>
            <option value="wait">Wait</option>
          </select>

        </div>

        {/* Message */}
        <div className='w-full'>

          <label className='font-bold text-[#572C10]'>
            Message
          </label>

          <textarea
            name="message"
           value={replyData.message}
            onChange={handleReplyChange}
            placeholder='Enter your message'
            className='border-2 rounded-md border-[#ac8d6f] outline-none h-[20vh] p-[5px] w-full'
          />

        </div>

        {/* Submit */}
        <button
          type='submit'
          className='bg-[#572C10] text-white p-[10px] rounded-md'
        >
          Submit Reply
        </button>

      </form>

    </div>
  )
}
      {/* =========================
          ADMIN UPDATE SECTION
      ========================== */}

      <div className='mt-[30px]'>

        <div className='flex flex-col gap-[20px]'>

          {
            adminUpdates.map((item) => (

              <div
                key={item.id}
                className='bg-white p-[20px] rounded-md shadow-md flex justify-between items-center'
              >

                <div>
                  <h2 className='text-xl font-bold text-[#572C10]'>
                    {item.title}
                  </h2>

                  <p className='text-gray-600'>
                    {item.desc}
                  </p>
                </div>

                {/* BUTTONS */}
                <div className='flex gap-[10px]'>

                   {
                    role === "user" &&
                      <button
                   onClick={() => replyHandler(item)}
                   className='bg-green-600 text-white font-bold px-4 py-2 rounded-md' >
                   Reply
                </button>
                  }
                  { /* {role === "agent" &&
                    globaldata?.map((gd, index) => (
                    <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-white text-xs font-semibold 
                    ${badgeColors[gd?.reply?.status] || "bg-gray-500"}`}  >
                   {gd?.reply?.status}
                   </span>))} */}
                  {/* DELETE BUTTON */}
                  <button
                    onClick={() => deleteUpdate(item.id)}
                    className='bg-red-500 text-white font-bold px-4 py-2 rounded-md'
                  >
                    Delete
                  </button>
                </div>

              </div>

            ))
          }

        </div>

      </div>

    </div>
  )
}

export default Ticket