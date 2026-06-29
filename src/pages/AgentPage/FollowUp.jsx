import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import useApiLoader from "../../hook/useApiLoader";

const FollowUp = () => {
  const [visits, setVisits] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [editData, setEditData] = useState(null);
    const { loading, execute } = useApiLoader();


  // FETCH DATA
  useEffect(() => {
    fetchVisits();
  }, []);

  const fetchVisits = async () => {
    try {
     const res = await execute(() =>
  axios.get("https://flipbook-production-b71a.up.railway.app/api/visits")
);

      setVisits(res.data.data);
      setFiltered(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // FILTER
  const handleFilter = (status) => {
    setActiveFilter(status);

    if (status === "All") {
      setFiltered(visits);
    } else {
      const data = visits.filter(
        (v) => v.outcome === status
      );

      setFiltered(data);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await execute(() =>
  axios.delete(
    `https://flipbook-production-b71a.up.railway.app/api/visits/${id}`
  )
);

      const updated = visits.filter(
        (v) => v._id !== id
      );

      setVisits(updated);

      if (activeFilter === "All") {
        setFiltered(updated);
      } else {
        setFiltered(
          updated.filter(
            (v) => v.outcome === activeFilter
          )
        );
      }

      alert("Visit deleted successfully");
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  // OPEN EDIT POPUP
  const handleEdit = (visit) => {
    setEditData({ ...visit });
  };

  // SAVE EDIT
  const handleSave = async () => {
    try {
      const res = await execute(() =>
  axios.put(
        `https://flipbook-production-b71a.up.railway.app/api/visits/${editData._id}`,
        {
          schoolName: editData.schoolName,
          teacher: editData.teacher,
          principal: editData.principal,
          designation: editData.designation,
          phone: editData.phone,
          visitDate: editData.visitDate,
          outcome: editData.outcome,
          notes: editData.notes,
          visitedBy: editData.visitedBy,
          location: editData.location,
        }
      ))

      const updatedVisit = res.data.data;

      const updated = visits.map((v) =>
        v._id === updatedVisit._id
          ? updatedVisit
          : v
      );

      setVisits(updated);

      if (activeFilter === "All") {
        setFiltered(updated);
      } else {
        setFiltered(
          updated.filter(
            (v) => v.outcome === activeFilter
          )
        );
      }

      setEditData(null);

      alert("Visit updated successfully");
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "Update failed"
      );
    }
  };

  return (
<div className="min-h-screen lg:ml-[15px] lg:mt-[7%] sm:mt-[10%] mt-[37%] rounded-xl bg-gradient-to-br from-[#F8F4F0] via-[#F5EFE8] to-[#EFE6DD] px-4 sm:px-6 lg:px-8 py-6">
      {/* TITLE */}

      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-[#572C10] mb-8 tracking-tight">
  Follow-Up CRM Dashboard
</h1>

      {/* FILTERS */}

     <div className="flex flex-wrap justify-center gap-3 mb-8">
  {[
    "All",
    "Pending",
    "Interested",
    "Follow Up",
    "Ordered",
    "Not Interested",
  ].map((status) => (
    <button
      key={status}
      onClick={() => handleFilter(status)}
      className={`
        px-4 sm:px-5 py-2.5 rounded-full
        text-sm sm:text-base
        font-medium
        transition-all duration-300
        ${
          activeFilter === status
            ? "bg-[#572C10] text-white shadow-lg scale-105"
            : "bg-white border border-gray-200 hover:bg-gray-50 hover:shadow-md"
        }
      `}
    >
      {status}
    </button>
  ))}
</div>

      {/* CARDS */}
{loading ? (
  <div className="flex justify-center py-20">
    <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-md">
      <div className="w-5 h-5 border-2 border-[#572C10]/20 border-t-[#572C10] rounded-full animate-spin"></div>
      <span className="text-[#572C10] font-medium">
        Loading visits...
      </span>
    </div>
  </div>
) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

        {filtered.map((v) => (
          <div
  key={v._id}
  className="
    bg-white
    p-5
    rounded-3xl
    border border-gray-100
    shadow-md
    hover:shadow-2xl
    hover:-translate-y-1
    transition-all duration-300
  "
>
      <h2 className="text-xl font-bold text-[#572C10]">
  <b>School:</b> {v.schoolName}
</h2>

            <p className="mt-2">
              <b>Teacher:</b> {v.teacher}
            </p>

            <p>
              <b>Principal:</b> {v.principal}
            </p>

            <p>
              <b>Phone:</b> {v.phone}
            </p>

            <p>
              <b>Visit Date:</b>{" "}
              {new Date(v.visitDate).toLocaleDateString()}
            </p>
            <p>
              <b>Loaction:</b> {v.location}
            </p>
            <p>
              <b>Notes:</b> {v.notes}
            </p>

            <p className="mt-3">
  <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
    Status : {v.outcome}
  </span>
</p>

            {v.photo && (
              <img
  src={v.photo}
  alt=""
  className="
    w-full
    h-44
    object-cover
    rounded-2xl
    mt-4
    border border-gray-100
    shadow-sm
  "
/>
            )}

            {/* BUTTONS */}

           <div className="flex gap-3 mt-5">
  <button
    onClick={() => handleEdit(v)}
    className="
      flex-1
      flex items-center justify-center gap-2
      bg-amber-500
      text-white
      py-2.5
      rounded-xl
      hover:bg-amber-600
      transition-all
      font-medium
    "
  >
    <FaEdit />
    <span>Edit</span>
  </button>

  <button
    onClick={() => handleDelete(v._id)}
    className="
      flex-1
      flex items-center justify-center gap-2
      bg-red-500
      text-white
      py-2.5
      rounded-xl
      hover:bg-red-700
      transition-all
      font-medium
    "
  >
    <FaTrash />
    <span>Delete</span>
  </button>
</div>
          </div>
        ))}

      </div>
)}
      {/* EDIT POPUP */}

            {/* EDIT POPUP */}

      {editData && (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
<div
  className="
    relative
    w-full
    max-w-md
    sm:max-w-lg
    bg-white
    rounded-3xl
    shadow-[0_20px_60px_rgba(0,0,0,0.15)]
    p-5 sm:p-7
    max-h-[90vh]
    overflow-y-auto
  "
>
            {/* Close Button */}

            <button
  onClick={() => setEditData(null)}
  className="
    absolute top-4 right-4
    w-10 h-10
    rounded-full
    bg-gray-100
    hover:bg-red-100
    text-gray-600
    hover:text-red-600
    transition
  "
>
  ✕
</button>

            {/* Heading */}

           <div className="text-center mb-6">
  <h2 className="text-2xl sm:text-3xl font-bold text-[#572C10]">
    Edit Visit
  </h2>

  <p className="text-gray-500 mt-1">
    Update visit details
  </p>
</div>
            {/* School Name */}

            <div className="mb-4">

              <label className="block font-semibold text-gray-700 mb-2">
                School Name
              </label>

              <input
                type="text"
                value={editData.schoolName}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    schoolName: e.target.value,
                  })
                }
                className="
w-full
border
border-gray-300
rounded-xl
px-4
py-3
text-sm
sm:text-base
outline-none
transition-all
focus:ring-2
focus:ring-[#572C10]/30
focus:border-[#572C10]
"
              />

            </div>

            {/* Teacher */}

            <div className="mb-4">

              <label className="block font-semibold text-gray-700 mb-2">
                Teacher Name
              </label>

              <input
                type="text"
                value={editData.teacher}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    teacher: e.target.value,
                  })
                }
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-xl
                  p-3
                  outline-none
                  focus:ring-2
                  focus:ring-[#572C10]
                "
              />

            </div>

            {/* Principal */}

            <div className="mb-4">

              <label className="block font-semibold text-gray-700 mb-2">
                Principal Name
              </label>

              <input
                type="text"
                value={editData.principal}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    principal: e.target.value,
                  })
                }
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-xl
                  p-3
                  outline-none
                  focus:ring-2
                  focus:ring-[#572C10]
                "
              />

            </div>

            {/* Phone */}

            <div className="mb-4">

              <label className="block font-semibold text-gray-700 mb-2">
                Phone Number
              </label>

              <input
                type="text"
                value={editData.phone}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    phone: e.target.value,
                  })
                }
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-xl
                  p-3
                  outline-none
                  focus:ring-2
                  focus:ring-[#572C10]
                "
              />

            </div>

            {/* Outcome */}

            <div className="mb-6">

              <label className="block font-semibold text-gray-700 mb-2">
                Outcome
              </label>

              <select
                value={editData.outcome}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    outcome: e.target.value,
                  })
                }
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-xl
                  p-3
                  outline-none
                  focus:ring-2
                  focus:ring-[#572C10]
                "
              >
                <option value="Pending">
                  Pending
                </option>

                <option value="Interested">
                  Interested
                </option>

                <option value="Follow Up">
                  Follow Up
                </option>

                <option value="Ordered">
                  Ordered
                </option>

                <option value="Not Interested">
                  Not Interested
                </option>

              </select>

            </div>

            {/* Buttons */}
<div className="flex flex-col sm:flex-row justify-end gap-3">

             <button
  onClick={() => setEditData(null)}
  className="
    w-full sm:w-auto
    px-5 py-3
    rounded-xl
    bg-gray-100
    text-gray-700
    font-semibold
    hover:bg-gray-200
    transition
  "
>
  Cancel
</button>

              <button
  onClick={handleSave}
  className="
    w-full sm:w-auto
    px-6 py-3
    rounded-xl
    bg-[#572C10]
    text-white
    font-semibold
    shadow-lg
    hover:bg-[#3f1f0b]
    transition
  "
>
  Save Changes
</button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default FollowUp;