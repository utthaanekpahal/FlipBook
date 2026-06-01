import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import { mycontext } from '../Context/Contextfile';
import { useNavigate } from 'react-router-dom';
import "@fortawesome/fontawesome-free/css/all.min.css"

const Ticket = () => {
  const navigate = useNavigate();
  const { globaldata, setglobaldata } = useContext(mycontext)

  const location = useLocation();

  // ROLE
  const role =
    location.state?.role || localStorage.getItem("role") || "agent";

  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);

  // =========================
  // Popup open/close state
  // =========================
  const [showModal, setShowModal] = useState(false)
  const [showReplyModal, setShowReplyModal] = useState(false)

  // SUCCESS MESSAGE
  const [successMessage, setSuccessMessage] = useState("")

  // =========================
  // Ticket Form Data
  // =========================
  const [upload, setUpload] = useState({
    Agentname: "",
    category: "",
    subject: "",
    message: ""
  })

  // =========================
  // Tickets State
  // =========================
  const [adminUpdates, setAdminUpdates] = useState(() => {

    const stored = localStorage.getItem("tickets")

    return stored ? JSON.parse(stored) : []

  })

  // =========================
  // Hidden Tickets
  // =========================
  const [hiddenTickets, setHiddenTickets] = useState(() => {

    const storedHidden =
      localStorage.getItem(`hiddenTickets_${role}`)

    return storedHidden
      ? JSON.parse(storedHidden)
      : []

  })

  // =========================
  // Handle Input Change
  // =========================
  const getTicketData = (e) => {

    const { name, value } = e.target

    setUpload((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  // =========================
  // Submit Ticket
  // =========================
  const ticketHandler = (e) => {

    e.preventDefault()
     console.log(upload.Agentname)
    const newTicket = {
      ...upload,
      id: Date.now(),
      date: new Date().toLocaleDateString()
    }
     console.log("Date:", newTicket.date)
    // UPDATED ARRAY
    const updatedTickets = [...adminUpdates, newTicket]

    // UPDATE STATE
    setAdminUpdates(updatedTickets)

    // SAVE LOCALSTORAGE
    localStorage.setItem(
      "tickets",
      JSON.stringify(updatedTickets)
    )

    // FORCE STORAGE EVENT
    window.dispatchEvent(new Event("storage"))

    // SUCCESS MESSAGE
    setSuccessMessage("Ticket Submitted Successfully ✅")

    // AUTO REMOVE MESSAGE
    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)

    // RESET FORM
    setUpload({
      Agentname: "",
      category: "",
      subject: "",
      message: ""
    })

    // CLOSE MODAL
    setShowModal(false)
  }

  // =========================
  // Delete Only For Current Role UI
  // =========================
  const deleteUpdate = (id) => {

    const updatedHidden = [...hiddenTickets, id]

    setHiddenTickets(updatedHidden)

    localStorage.setItem(
      `hiddenTickets_${role}`,
      JSON.stringify(updatedHidden)
    )
  }

  // =========================
  // Reply State
  // =========================
  const [replyData, setReplyData] = useState({
    status: "",
    message: ""
  })

  const [selectedTicket, setSelectedTicket] = useState(null)

  // =========================
  // Reply Change
  // =========================
  const handleReplyChange = (e) => {

    const { name, value } = e.target

    setReplyData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  // =========================
  // Submit Reply
  // =========================
  const submitReply = (e) => {

    e.preventDefault()

    const Adminreplymessage = {
      ticketId: selectedTicket.id,
      ticket: selectedTicket,
      reply: replyData
    }

    setglobaldata((prev) => {

      // Remove old reply
      const filtered = prev.filter(
        (item) => item.ticketId !== selectedTicket.id
      )

      return [...filtered, Adminreplymessage]
    })

    // RESET
    setReplyData({
      status: "",
      message: ""
    })

    // CLOSE MODAL
    setShowReplyModal(false)
  }

  // =========================
  // Open Reply Modal
  // =========================
  const replyHandler = (item) => {

    setSelectedTicket(item)

    setShowReplyModal(true)
  }

  // =========================
  // STATUS UI
  // =========================
  const statusUI = {

    resolved: {
      label: "Resolved",
      className: "bg-green-100 text-green-700 border-green-300",
      icon: "fa-regular fa-circle-check"
    },

    progress: {
      label: "Progress",
      className: "bg-blue-100 text-blue-700 border-blue-300",
      icon: "fa-solid fa-spinner fa-spin"
    },

    wait: {
      label: "Pending",
      className: "bg-orange-100 text-orange-700 border-orange-300",
      icon: "fa-solid fa-triangle-exclamation"
    }
  }

  // =========================
  // Load Tickets Initially
  // =========================
  useEffect(() => {

    const storedTickets =
      localStorage.getItem("tickets")

    if (storedTickets) {

      setAdminUpdates(JSON.parse(storedTickets))
    }

  }, [])

  // =========================
  // Sync Tickets Between Tabs
  // =========================
  useEffect(() => {

    const handleTicketChange = () => {

      const updatedTickets =
        localStorage.getItem("tickets")

      setAdminUpdates(
        updatedTickets
          ? JSON.parse(updatedTickets)
          : []
      )
    }

    window.addEventListener(
      "storage",
      handleTicketChange
    )

    return () => {

      window.removeEventListener(
        "storage",
        handleTicketChange
      )
    }

  }, [])

  return (

    <div className='min-h-screen w-full bg-cover bg-[#EFE6DD] bg-center p-[20px]'>
      {/* =========================
          TOP HEADER
      ========================== */}

      <div className='flex justify-around items-center p-[15px] rounded-md'>
        {
          role !== "user" ?

             <div className='flex justify-center gap-[50px] '>
                <button className='bg-[#572C10] text-white font-bold px-5 py-2 rounded-md'
                onClick={()=>{navigate("/AgentDashboard")}}>back</button>
              <h1 className='text-2xl font-bold text-[#572C10]'>
              Ticket Update
            </h1>
            </div>
            :

            <h1 className='text-2xl font-bold text-[#572C10]'>
              Tickets By Agents
            </h1>
        }

        {
          role !== "user" &&

          <button
            onClick={() => setShowModal(true)}
            className='bg-[#572C10] text-white font-bold px-5 py-2 rounded-md'
          >
            New Ticket
          </button>
        }

      </div>

      {/* SUCCESS MESSAGE */}

      <div
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-[999]
        transition-all duration-500 ease-in-out
        ${
          successMessage
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >

        <div
          className='bg-green-100 text-green-700 border border-green-400 px-6 py-3 rounded-md font-semibold shadow-lg'
        >
          {successMessage}
        </div>

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
      ========================== */}

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
            adminUpdates.length > 0 ? (

              adminUpdates
                .filter((item) => !hiddenTickets.includes(item.id))
                .map((item) => (

                  <div
                    key={item.id}
                    className='bg-white p-[20px] rounded-md shadow-md flex justify-between items-center'
                  >

                    {/* LEFT SIDE */}

                    <div>

                      <h2 className='text-xl font-bold text-[#572C10]'>
                        {item.subject}
                      </h2>

                      <p className='text-gray-600'>
                        {item.message}
                      </p>

                      <p className='text-sm text-gray-500 mt-2'>
                        Agent: {item.Agentname}
                      </p>

                      <p className='text-sm text-gray-500'>
                        Category: {item.category}
                      </p>

                    </div>

                    {/* RIGHT SIDE */}

                    <div className='flex gap-[10px] items-center'>

                      {/* USER REPLY BUTTON */}

                      {
                        role === "user" &&

                        <button
                          onClick={() => replyHandler(item)}
                          className='bg-green-600 text-white font-bold px-4 py-2 rounded-md'
                        >
                          Reply
                        </button>
                      }

                      {/* STATUS BADGE */}

                      {
                        role === "agent" && (() => {

                          const matchedReply = globaldata.find(
                            (gd) => gd.ticketId === item.id
                          )

                          return matchedReply ? (

                            <span
                              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border shadow-sm
                              ${statusUI[matchedReply.reply.status]?.className ||
                                "bg-gray-100 text-gray-600 border-gray-300"}`}
                            >

                              <i className={`${statusUI[matchedReply.reply.status]?.icon}`}></i>

                              {statusUI[matchedReply.reply.status]?.label || "Unknown"}

                            </span>

                          ) : null

                        })()
                      }

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
            ) : (

              <div className='text-center text-gray-500 text-xl mt-[50px]'>
                No Tickets Available
              </div>
            )
          }

        </div>

      </div>

    </div>
  )
}

export default Ticket