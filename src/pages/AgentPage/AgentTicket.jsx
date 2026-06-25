import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import useApiLoader from "../../hook/useApiLoader";
const AgentTicket = () => {
  const navigate = useNavigate();
  const { loading, execute } = useApiLoader();

  // =========================
  // Popup states
  // =========================
  const [showModal, setShowModal] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const [upload, setUpload] = useState({
    Agentname: "",
    category: "",
    subject: "",
    message: "",
  });
const agentName = localStorage.getItem("agentName");


  // =========================
  // Tickets State
  // =========================
  const [adminUpdates, setAdminUpdates] = useState([]);

  const [hiddenTickets] = useState(() => {
    const storedHidden =
      localStorage.getItem("hiddenTickets_agent");

    return storedHidden ? JSON.parse(storedHidden) : [];
  });

  // =========================
  // Load Tickets
  // =========================
  const fetchTickets = async () => {
    try {
      const res = await execute(()=> axios.get(
        "https://flipbook-1-l2tf.onrender.com/api/tickets/all"
      ))
      setAdminUpdates(res.data.tickets);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // =========================
  // Input change
  // =========================
  const getTicketData = (e) => {
    const { name, value } = e.target;
    setUpload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // Create Ticket
  // =========================
  const ticketHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://flipbook-1-l2tf.onrender.com/api/tickets/create",
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
  // Delete Ticket
  // =========================
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

  // =========================
  // STATUS UI
  // =========================
  const statusUI = {
     opened: {
    label: "Opened",
    className:
      "bg-gray-100 text-gray-700 border-gray-300",
    icon: "fa-regular fa-folder-open",
  },
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
  const [activeSection, setActiveSection] =
  useState("opened");
  const sections = [
  {
    title: "Opened",
    key: "opened",
    color: "text-gray-600",
  },
  {
    title: "Pending",
    key: "wait",
    color: "text-orange-600",
  },
  {
    title: "Progress",
    key: "progress",
    color: "text-blue-600",
  },
  {
    title: "Resolved",
    key: "resolved",
    color: "text-green-600",
  },
];

const getTicketsByStatus = (status) => {
  return adminUpdates.filter((item) => {
    if (hiddenTickets.includes(item._id)) return false;

    if (status === "opened") {
      return !item.replies || item.replies.length === 0;
    }

    return (
      item.replies?.length > 0 &&
      item.replies[item.replies.length - 1].status === status
    );
  });
};
  return (
<div className="w-full min-h-screen bg-[#EFE6DD] lg:mt-[4%] sm:mt-[6%] mt-[33%] p-3 sm:p-4 md:p-5 overflow-x-hidden">
      {/* HEADER */}

      <div className="flex items-center justify-between gap-2 p-3 mb-4">

  <button
    className="bg-[#572C10] text-white px-3 py-2 rounded-md text-sm font-bold"
    onClick={() => navigate("/AgentDashboard")}
  >
    Back
  </button>

  <h1 className="text-base sm:text-lg md:text-2xl font-bold text-[#572C10] text-center flex-1">
    Ticket Update
  </h1>

  <button
    onClick={() => setShowModal(true)}
    className="bg-[#572C10] text-white px-3 py-2 rounded-md text-sm font-bold"
  >
    New Ticket
  </button>

</div>
   {/* SUCCESS MESSAGE */}
      {successMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[999]">
          <div className="bg-green-100 text-green-700 border border-green-400 px-6 py-3 rounded-md">
            {successMessage}
          </div>
        </div>
      )}

      {/* =========================
          CREATE MODAL
      ========================== */}

{
  showModal && (
    <div className="fixed inset-0 z-50 lg:mt-[73px] mt-[65px] flex justify-center items-start sm:items-center p-3 sm:p-4 bg-black/30">

      <form
        onSubmit={ticketHandler}
        className="
          relative
          w-full

          /* SIDEBAR FRIENDLY WIDTH */
          max-w-[92vw]
          sm:max-w-md
          md:max-w-lg
          lg:max-w-xl

          /* HEIGHT CONTROL */
          max-h-[75vh]
          overflow-y-auto

          bg-white
          rounded-xl
          shadow-2xl
          border border-gray-200

          p-4 sm:p-6

          mt-16 sm:mt-0
        "
      >

        {/* Close Button */}
        <button
          type="button"
          onClick={() => setShowModal(false)}
          className="
            absolute
            top-3
            right-4
            text-xl
            font-semibold
            text-gray-500
            hover:text-gray-800
          "
        >
          ✕
        </button>

        {/* Header */}
        <div className="mb-4 sm:mb-5 text-center">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#572C10]">
            Raise Ticket
          </h2>

          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Fill the details below to submit your issue
          </p>
        </div>

        {/* Fields */}
        <div className="space-y-3 sm:space-y-4">

          {/* Agent Name */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Agent Name
            </label>

            <input
              onChange={getTicketData}
              value={agentName}
              name="Agentname"
              type="text"
              placeholder="Enter your name"
              className="
                w-full
                border border-gray-300
                rounded-lg
                px-3 py-2
                sm:py-2.5
                text-sm
                outline-none
                focus:border-[#572C10]
                focus:ring-1 focus:ring-[#572C10]/30
              "
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Category
            </label>

            <select
              onChange={getTicketData}
              value={upload.category}
              name="category"
              className="
                w-full
                border border-gray-300
                rounded-lg
                px-3 py-2
                sm:py-2.5
                text-sm
                outline-none
                focus:border-[#572C10]
                focus:ring-1 focus:ring-[#572C10]/30
              "
            >
              <option value="">Select Category</option>
              <option value="technical">Technical</option>
              <option value="billing">Billing</option>
              <option value="support">Support</option>
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Subject
            </label>

            <input
              onChange={getTicketData}
              value={upload.subject}
              name="subject"
              type="text"
              placeholder="Enter subject"
              className="
                w-full
                border border-gray-300
                rounded-lg
                px-3 py-2
                sm:py-2.5
                text-sm
                outline-none
                focus:border-[#572C10]
                focus:ring-1 focus:ring-[#572C10]/30
              "
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Description
            </label>

            <textarea
              onChange={getTicketData}
              value={upload.message}
              name="message"
              rows={4}
              placeholder="Describe your issue"
              className="
                w-full
                border border-gray-300
                rounded-lg
                px-3 py-2
                text-sm
                resize-none
                outline-none
                focus:border-[#572C10]
                focus:ring-1 focus:ring-[#572C10]/30
              "
            />
          </div>

          {/* Submit Button */}
         <button
  type="submit"
  disabled={loading}
  className="w-full font-bold bg-[#572C10] text-white py-2.5 rounded-lg flex justify-center items-center"
>
  {loading ? (
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  ) : (
    "Submit Ticket"
  )}
</button>

        </div>
      </form>

    </div>
  )
}


      {/* =========================
          TICKETS SECTION
      ========================== */}
 <div className="flex items-center gap-1 mt-5 mb-5">
  <button
    className="flex-1 bg-gray-100 text-gray-700 py-2 text-[10px] sm:text-sm rounded-full border border-gray-300"
    onClick={() => setActiveSection("opened")}
  >
    Opened
  </button>

  <button
    className="flex-1 bg-green-100 text-green-700 py-2 text-[10px] sm:text-sm rounded-full border border-green-300"
    onClick={() => setActiveSection("resolved")}
  >
    Resolved
  </button>

  <button
    className="flex-1 bg-blue-100 text-blue-700 py-2 text-[10px] sm:text-sm rounded-full border border-blue-300"
    onClick={() => setActiveSection("progress")}
  >
    Progress
  </button>

  <button
    className="flex-1 bg-orange-100 text-orange-700 py-2 text-[10px] sm:text-sm rounded-full border border-orange-300"
    onClick={() => setActiveSection("wait")}
  >
    Pending
  </button>
</div>

<div className="mt-[30px]">
  <div className="flex flex-col gap-[20px]">

    {(() => {

      // FILTER LOGIC
      const filteredTickets = adminUpdates.filter((item) => {
        if (hiddenTickets.includes(item._id)) return false;

        const lastReply = item.replies?.[item.replies.length - 1];

        // OPENED (no replies)
        if (activeSection === "opened") {
          return !item.replies || item.replies.length === 0;
        }

        // OTHER STATUS (wait / progress / resolved)
        return lastReply?.status === activeSection;
      });

      // EMPTY STATE PER TAB
     if (loading) {
  return (
    <div className="flex justify-center py-20">
      <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-md">
        <div className="w-5 h-5 border-2 border-[#572C10]/20 border-t-[#572C10] rounded-full animate-spin"></div>
        <span className="text-[#572C10] font-medium">
          Loading tickets...
        </span>
      </div>
    </div>
  );
}

if (filteredTickets.length === 0) {
  return (
    <div className="text-center text-gray-500 text-lg sm:text-xl mt-[50px]">
      No Tickets Available
    </div>
  );
}

      return filteredTickets.map((item) => (
        <div
          key={item._id}
          className="bg-white p-4 rounded-md shadow-md flex flex-col gap-4"
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

            {/* REPLIES */}
            {item.replies?.map((reply, index) => (
              <div key={index} className="flex flex-col mt-2">

                <div
                  className={`mt-2 p-2 rounded-md font-semibold w-fit ${
                    statusUI[reply.status]?.className ||
                    "bg-gray-100 text-gray-600"
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
          <div className="flex gap-2 items-center shrink-0 min-w-[110px]">

            {(() => {
              const currentStatus =
                item.replies?.length > 0
                  ? item.replies[item.replies.length - 1].status
                  : "opened";

              return (
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border shadow-sm ${
                    statusUI[currentStatus]?.className ||
                    "bg-gray-100 text-gray-600 border-gray-300"
                  }`}
                >
                  <i
                    className={
                      statusUI[currentStatus]?.icon ||
                      "fa-solid fa-circle-info"
                    }
                  ></i>

                  {statusUI[currentStatus]?.label}
                </span>
              );
            })()}

            {/* DELETE */}
            <button
              onClick={() => deleteUpdate(item._id)}
              className="bg-red-500 text-white font-bold px-2 sm:px-4 py-1 sm:py-2 rounded-md text-xs sm:text-sm"
            >
              Delete
            </button>

          </div>
        </div>
      ));
    })()}

  </div>
</div>
    </div>
  );
};

export default AgentTicket;