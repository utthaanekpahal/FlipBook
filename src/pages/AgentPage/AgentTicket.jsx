import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";

const AgentTicket = () => {
  const navigate = useNavigate();

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
      const res = await axios.get(
        "http://localhost:3000/api/tickets/all"
      );
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
  // Delete Ticket
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