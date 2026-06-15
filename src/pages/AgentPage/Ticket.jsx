import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import "@fortawesome/fontawesome-free/css/all.min.css"

const Ticket = () => {
  const navigate = useNavigate();

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
  const [TicketMessage, setTicketMessage] = useState("")

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
  const ticketHandler = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "http://localhost:3000/api/tickets/create",
      upload
    );

    setAdminUpdates((prev) => [
      ...prev,
      response.data.ticket,
    ]);

    setSuccessMessage("Ticket Submitted Successfully ✅");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

    setUpload({
      Agentname: "",
      category: "",
      subject: "",
      message: "",
    });

    setShowModal(false);

  } catch (error) {
    console.log(error);
  }
};

  // =========================
  // Delete Only For Current Role UI
  // =========================
  const deleteUpdate = async (id) => {
  try {
    await axios.delete(
      `http://localhost:3000/api/tickets/delete/${id}`
    );

    setAdminUpdates((prev) =>
      prev.filter((item) => item._id !== id)
    );

  } catch (error) {
    console.log(error);
  }
};

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
  const submitReply = async (e) => {
  e.preventDefault();
  try {
    await axios.put(
      `http://localhost:3000/api/tickets/reply/${selectedTicket._id}`,
      {
        status: replyData.status,
        message: replyData.message,
        repliedBy: role,
      }
    );
    
    fetchTickets();
    setTicketMessage("Replied Successfully ✅");
    setTimeout(() => {
      setTicketMessage("");
    }, 3000);

    setReplyData({
      status: "",
      message: "",
    });

    setShowReplyModal(false);

  } catch (error) {
    console.log(error);
  }
};
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
  fetchTickets();
}, []);

const fetchTickets = async () => {
  try {
    const res = await axios.get(
      "http://localhost:3000/api/tickets/all"
    );

    setAdminUpdates(res.data.tickets);

  } catch (error) {
    console.log(error);
  }
};
  // =========================
  // Sync Tickets Between Tabs
  // =========================
  return (

    <div className='min-h-screen bg-cover bg-[#EFE6DD] bg-center p-4 sm:p-5'>
      {/* =========================
          TOP HEADER
      ========================== */}

    <div className='flex justify-between items-center p-[15px] rounded-md'>
  {
    role !== "user" ? (
        <h1 className='text-2xl font-bold text-[#572C10]'>
          Ticket Update
        </h1>
    ) : (
        <h1 className='text-2xl font-bold text-[#572C10]'>
          Tickets By Agents
        </h1>    
        )
  }

  {
    role !== "user" && (
      <button
        onClick={() => setShowModal(true)}
        className='bg-[#572C10] ml-[20px] text-white font-bold px-5 py-2 rounded-md whitespace-nowrap'
      >
        New Ticket
      </button>
    )
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
          className='bg-green-100 text-green-700 border border-green-400 px-4 sm:px-6 py-3 rounded-md max-w-[90vw]'
        >
          {successMessage}
        </div>

      </div>
      <div
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-[999]
        transition-all duration-500 ease-in-out
        ${
          TicketMessage
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >

        <div
          className='bg-green-100 text-green-700 border border-green-400 px-4 sm:px-6 py-3 rounded-md max-w-[90vw]'
        >
          {TicketMessage}
        </div>

      </div>
      

      {/* =========================
          POPUP MODAL
      ========================== */}

     {
  showModal && (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

      <form
        onSubmit={ticketHandler}
        className="
          relative
          bg-[#F5F5F5]
          rounded-md
          flex flex-col
          gap-3
          w-full
          max-w-md
          sm:max-w-lg
          md:max-w-xl
          lg:max-w-2xl
          p-4
          sm:p-6
        "
      >

        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={() => setShowModal(false)}
          className="absolute right-3 top-2 text-2xl font-bold"
        >
          ×
        </button>

        <h1 className="font-bold text-xl sm:text-2xl text-[#572C10] text-center">
          Ticket Raise
        </h1>

        <div className="flex flex-col gap-4 w-full">

          {/* Agent Name */}
          <div className="w-full">
            <label className="font-bold text-[#572C10] block mb-1">
              Agent Name
            </label>

            <input
              onChange={getTicketData}
              value={upload.Agentname}
              name="Agentname"
              type="text"
              placeholder="Enter your name"
              className="w-full border-2 border-[#ac8d6f] rounded-md p-2 outline-none"
            />
          </div>

          {/* Category */}
          <div className="w-full">
            <label className="font-bold text-[#572C10] block mb-1 text-sm sm:text-base">
              Category
            </label>

            <select
              onChange={getTicketData}
              value={upload.category}
              name="category"
              className="w-full border-2 border-[#ac8d6f] rounded-md p-2 sm:p-3 text-sm sm:text-base outline-none ">
              <option value="">Select Category</option>
              <option value="technical">Technical</option>
              <option value="billing">Billing</option>
              <option value="support">Support</option>
            </select>
          </div>

          {/* Subject */}
          <div className="w-full">
            <label className="font-bold text-[#572C10] block mb-1">
              Subject
            </label>

            <input
              onChange={getTicketData}
              value={upload.subject}
              name="subject"
              type="text"
              placeholder="Enter your subject"
              className="w-full border-2 border-[#ac8d6f] rounded-md p-2 outline-none"
            />
          </div>

          {/* Description */}
          <div className="w-full">
            <label className="font-bold text-[#572C10] block mb-1">
              Description
            </label>

            <textarea
              onChange={getTicketData}
              value={upload.message}
              name="message"
              placeholder="Enter your message"
              className="
                w-full
                border-2
                border-[#ac8d6f]
                rounded-md
                p-2
                outline-none
                min-h-[120px]
                sm:min-h-[150px]
              "
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="
              bg-[#572C10]
              text-white
              rounded-md
              py-2
              w-full
              sm:w-1/2
              mx-auto
              hover:bg-[#6b3915]
              transition
            "
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
             className='bg-white w-full max-w-md sm:max-w-lg md:max-w-xl rounded-md p-[20px] flex flex-col gap-[15px] relative mx-4'>

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
                  className='border-2 rounded-md border-[#ac8d6f] outline-none min-h-[120px] sm:min-h-[150px] p-[5px] w-full'
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
                .filter((item) => !hiddenTickets.includes(item._id))
                .map((item) => (

                  <div key={item._id}
                   className="bg-white p-5 rounded-md shadow-md  flex flex-col  sm:flex-row  justify-between gap-4  ">
                    {/* LEFT SIDE */}
                    <div className="flex-1 min-w-0">

                 <h2 className='text-base sm:text-lg font-bold text-[#572C10] break-words'>
                        {item.subject}
                      </h2>

                     <p className="text-gray-600 break-words">
                        {item.message}
                      </p>

                      <p className='text-sm text-gray-500 mt-2'>
                        Agent: {item.Agentname}
                      </p>

                      <p className='text-sm text-gray-500 '>
                        Category: {item.category}
                      </p>
                     {item.replies?.map((reply, index) => (
  <div
    key={index}
    className="flex justify-center flex-col"
  >
    <div
      className={`mt-2 p-1 rounded-[10px] mb-[10px] font-bold w-fit ${
        statusUI[reply.status]?.className ||
        "bg-gray-100 text-gray-600"
      }`}
    >
      <p>{reply.message}</p>
    </div>

    <small>
      {reply.repliedBy}{" "}
      {new Date(reply.date).toLocaleString()}
    </small>
  </div>
))}
                    </div>

                    {/* RIGHT SIDE */}

                    <div className="flex gap-2 items-center shrink-0 min-w-[110px]">
                      {/* USER REPLY BUTTON */}
                      {
                        role === "user" &&

                        <button
                          onClick={() => replyHandler(item)}
                          className='bg-green-600 text-white font-bold px-4 py-1.5 rounded-md'
                        >
                          Reply
                        </button>
                      }

                      {/* STATUS BADGE */}

                      {
  role === "agent" &&
  item.replies?.length > 0 && (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border shadow-sm
      ${
        statusUI[
          item.replies[item.replies.length - 1].status
        ]?.className ||
        "bg-gray-100 text-gray-600 border-gray-300"
      }`}
    >
      <i
        className={
          statusUI[
            item.replies[item.replies.length - 1].status
          ]?.icon
        }
      ></i>

      {
        statusUI[
          item.replies[item.replies.length - 1].status
        ]?.label
      }
    </span>
  )
}
                      {/* DELETE BUTTON */}

                      <button
                        onClick={() => deleteUpdate(item._id)}
                       className='bg-red-500 text-white font-bold px-2 sm:px-4 py-1 sm:py-2 rounded-md text-xs sm:text-sm'
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                ))
            ) : (

              <div className='text-center text-gray-500 text-lg sm:text-xl mt-[50px]'>
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