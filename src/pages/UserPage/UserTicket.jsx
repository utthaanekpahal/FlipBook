import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";

const UserTicket = () => {
  const navigate = useNavigate();

  const [showReplyModal, setShowReplyModal] = useState(false);
  const [TicketMessage, setTicketMessage] = useState("");

  const [adminUpdates, setAdminUpdates] = useState(() => {
    const stored = localStorage.getItem("tickets");
    return stored ? JSON.parse(stored) : [];
  });

  const [hiddenTickets] = useState(() => {
    const storedHidden = localStorage.getItem("hiddenTickets_user");
    return storedHidden ? JSON.parse(storedHidden) : [];
  });

  const [replyData, setReplyData] = useState({
    status: "",
    message: "",
  });

  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleReplyChange = (e) => {
    const { name, value } = e.target;

    setReplyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const replyHandler = (item) => {
    setSelectedTicket(item);
    setShowReplyModal(true);
  };

  const fetchTickets = async () => {
    try {
      const res = await axios.get(
        "https://flipbook-1-l2tf.onrender.com/api/tickets/all"
      );
      setAdminUpdates(res.data.tickets);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const submitReply = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `https://flipbook-1-l2tf.onrender.com/api/tickets/reply/${selectedTicket._id}`,
        {
          status: replyData.status,
          message: replyData.message,
          repliedBy: "user",
        }
      );

      fetchTickets();

      setTicketMessage("Replied Successfully ✅");

      setTimeout(() => setTicketMessage(""), 3000);

      setReplyData({
        status: "",
        message: "",
      });

      setShowReplyModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUpdate = async (id) => {
    try {
      await axios.delete(
        `https://flipbook-1-l2tf.onrender.com/api/tickets/delete/${id}`
      );

      setAdminUpdates((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const statusUI = {
    resolved: {
      label: "Resolved",
      className:
        "bg-green-100 text-green-700 border-green-300",
      icon: "fa-regular fa-circle-check",
    },
    progress: {
      label: "Progress",
      className:
        "bg-blue-100 text-blue-700 border-blue-300",
      icon: "fa-solid fa-spinner fa-spin",
    },
    wait: {
      label: "Pending",
      className:
        "bg-orange-100 text-orange-700 border-orange-300",
      icon: "fa-solid fa-triangle-exclamation",
    },
  };

  return (
    <div className="min-h-screen lg:ml-[15px] lg:w-[101%] mt-[-33px] bg-[#EFE6DD] p-4 sm:p-5">

      {/* HEADER */}
      <div className="flex justify-between items-center p-[15px] rounded-md">
        <div className="flex items-center gap-4">
          <button
            className="bg-[#572C10] text-white font-bold px-5 py-2 rounded-md"
            onClick={() => navigate("/Dashboard")}
          >
            back
          </button>

          <h1 className="text-2xl font-bold text-[#572C10]">
            Tickets By Agents
          </h1>
        </div>
      </div>

      {/* SUCCESS MESSAGE */}
      {TicketMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[999]">
          <div className="bg-green-100 text-green-700 border border-green-400 px-6 py-3 rounded-md">
            {TicketMessage}
          </div>
        </div>
      )}

      {/* REPLY MODAL */}
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

      {/* TICKETS */}
     <div className="mt-[30px]">

  <div className="flex flex-col gap-[20px]">

    {adminUpdates.length > 0 ? (
      adminUpdates
        .filter((item) => !hiddenTickets.includes(item._id))
        .map((item) => (
          <div
            key={item._id}
            className="bg-white p-5 rounded-md shadow-md flex flex-col sm:flex-row justify-between gap-4"
          >

            {/* LEFT SIDE */}
            <div className="flex-1 min-w-0">

              <h2 className="text-base sm:text-lg font-bold text-[#572C10] break-words">
                {item.subject}
              </h2>

              <p className="text-gray-600 break-words">
                {item.message}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Agent: {item.Agentname}
              </p>

              <p className="text-sm text-gray-500">
                Category: {item.category}
              </p>

              {/* REPLIES (COLOR BASED ON STATUS, NO ICON) */}
              {item.replies?.map((reply, index) => (
                <div key={index} className="flex flex-col mt-2">

                  <div
                    className={`mt-2 p-2 rounded-md font-semibold w-fit ${
                      statusUI?.[reply?.status]?.className ||
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <span>{reply.message}</span>
                  </div>

                  <small className="text-gray-500 ml-1 mt-[10px]">
                    {reply.repliedBy} •{" "}
                    {new Date(reply.date).toLocaleString()}
                  </small>

                </div>
              ))}

            </div>

            {/* RIGHT SIDE */}
            <div className="flex lg:flex-col sm:flex-col justify-between gap-2 items-center shrink-0 min-w-[110px]">

              {/* REPLY BUTTON */}
              <button
                onClick={() => replyHandler(item)}
                className="bg-green-600 text-white font-bold px-4 py-1.5 rounded-md"
              >
                Reply
              </button>

              {/* STATUS BADGE (ICON ONLY HERE) */}
              {item.replies?.length > 0 && (
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border shadow-sm ${
                    statusUI?.[
                      item.replies[item.replies.length - 1]?.status
                    ]?.className ||
                    "bg-gray-100 text-gray-600 border-gray-300"
                  }`}
                >
                  <i
                    className={
                      statusUI?.[
                        item.replies[item.replies.length - 1]?.status
                      ]?.icon || "fa-solid fa-circle-info"
                    }
                  ></i>

                  <span>
                    {
                      statusUI?.[
                        item.replies[item.replies.length - 1]?.status
                      ]?.label
                    }
                  </span>
                </span>
              )}

              {/* DELETE */}
              <button
                onClick={() => deleteUpdate(item._id)}
                className="bg-red-500 text-white font-bold px-2 sm:px-4 py-1 sm:py-2 rounded-md text-xs sm:text-sm"
              >
                Delete
              </button>

            </div>

          </div>
        ))
    ) : (
      <div className="text-center text-gray-500 text-lg sm:text-xl mt-[50px]">
        No Tickets Available
      </div>
    )}

  </div>

</div>
    </div>
  );
};

export default UserTicket;