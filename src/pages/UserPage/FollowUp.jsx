import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";

const FollowUp = () => {
  const [visits, setVisits] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [editData, setEditData] = useState(null);

  // FETCH DATA
  useEffect(() => {
    fetchVisits();
  }, []);

  const fetchVisits = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/visits"
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
      await axios.delete(
        `http://localhost:3000/api/visits/${id}`
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
      const res = await axios.put(
        `http://localhost:3000/api/visits/${editData._id}`,
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
        }
      );

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
    <div className="min-h-screen bg-[#EFE6DD] p-6">

      {/* TITLE */}

      <h1 className="text-3xl font-bold text-center mb-8">
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
            onClick={() =>
              handleFilter(status)
            }
            className={`px-5 py-2 rounded-full font-semibold transition
              ${
                activeFilter === status
                  ? "bg-[#572C10] text-white"
                  : "bg-white border"
              }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* CARDS */}

      <div className="grid md:grid-cols-3 gap-6">

        {filtered.map((v) => (
          <div
            key={v._id}
            className="bg-white p-5 rounded-2xl shadow-lg"
          >
            <h2 className="text-xl font-semibold">
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

            <p className="text-blue-600 font-bold mt-2">
              Status : {v.outcome}
            </p>

            {v.photo && (
              <img
                src={v.photo}
                alt=""
                className="w-full h-40 object-cover rounded-xl mt-4"
              />
            )}

            {/* BUTTONS */}

            <div className="flex gap-3 mt-5">

              <button
                onClick={() =>
                  handleEdit(v)
                }
                className="
                flex items-center gap-2
                bg-yellow-500
                text-white
                px-4 py-2
                rounded-lg
                hover:bg-yellow-600
                "
              >
                <FaEdit />

                <span>Edit</span>
              </button>

              <button
                onClick={() =>
                  handleDelete(v._id)
                }
                className="
                flex items-center gap-2
                bg-red-600
                text-white
                px-4 py-2
                rounded-lg
                hover:bg-red-700
                "
              >
                <FaTrash />

                <span>Delete</span>
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* EDIT POPUP */}

            {/* EDIT POPUP */}

      {editData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

          <div className="relative bg-white w-[92%] max-w-lg rounded-3xl shadow-2xl p-7">

            {/* Close Button */}

            <button
              onClick={() => setEditData(null)}
              className="
                absolute
                top-4
                right-4
                w-9
                h-9
                rounded-full
                bg-gray-100
                hover:bg-red-100
                text-gray-600
                hover:text-red-600
                text-xl
                font-bold
                transition
              "
            >
              ✕
            </button>

            {/* Heading */}

            <div className="text-center mb-6">

              <h2 className="text-3xl font-bold text-[#572C10]">
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
                  p-3
                  outline-none
                  focus:ring-2
                  focus:ring-[#572C10]
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

            <div className="flex justify-end gap-4">

              <button
                onClick={() => setEditData(null)}
                className="
                  px-5
                  py-3
                  rounded-xl
                  bg-gray-200
                  text-gray-700
                  font-semibold
                  hover:bg-gray-300
                  transition
                "
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="
                  px-6
                  py-3
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