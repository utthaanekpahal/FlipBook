import React, { useState } from "react";
import axios from "axios";
import {
  FaSchool,
  FaUser,
  FaPhone,
  FaCalendarAlt,
  FaTasks,
  FaUpload,
  FaStickyNote,
  FaCamera
} from "react-icons/fa";

const VisitForm = () => {
  const [form, setForm] = useState({
    schoolName: "",
    teacher: "",
    principal: "",
    designation: "",
    phone: "",
    visitDate: "",
    outcome: "",
    notes: "",
   
  });

  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const submit = async () => {
    try {
      if (
        !form.schoolName ||
        !form.teacher ||
        !form.phone ||
        !photo
      ) {
        alert(
          "School Name, Teacher, Phone and Photo are required"
        );
        return;
      }

      const data = new FormData();

      Object.keys(form).forEach((key) => {
        data.append(key, form[key]);
      });

      data.append("photo", photo);

      const res = await axios.post(
        "http://localhost:3000/api/visits/create",
        data
      );

      console.log(res.data);

      alert("Visit Saved Successfully ✔");

      setForm({
        schoolName: "",
        teacher: "",
        principal: "",
        designation: "",
        phone: "",
        visitDate: "",
        outcome: "",
        notes: "",
      
      });

      setPhoto(null);
      setPreview(null);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Error saving visit"
      );
    }
  };

return (
  <div className="min-h-screen bg-gradient-to-br from-[#fdf7f2] to-[#f5ece3] py-10 px-4">

    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">

      {/* Header */}
      <div className=" text-[#572C10] p-8 text-center">

        <h1 className="text-4xl font-bold">
          📚 School Visit Tracker
        </h1>

        <p className="mt-6 text-center text-[#572C10] text-lg font-semibold">
          Capture visits, selfies and outcomes effortlessly.
        </p>

      </div>

      <div className="p-8">

        {/* School Name */}
        <label className="font-semibold">
          School Name
        </label>

        <div className="flex items-center border rounded-xl p-3 mt-2 mb-5 focus-within:border-[#572C10]">

          <FaSchool className="mr-3 text-[#572C10]" />

          <input
            type="text"
            name="schoolName"
            value={form.schoolName}
            onChange={handleChange}
            placeholder="Enter School Name"
            className="w-full outline-none"
          />

        </div>

        {/* Teacher + Principal */}

        <div className="grid md:grid-cols-2 gap-5">

          <div>

            <label className="font-semibold">
              Teacher Name
            </label>

            <div className="flex items-center border rounded-xl p-3 mt-2">

              <FaUser className="mr-3 text-[#572C10]" />

              <input
                type="text"
                name="teacher"
                value={form.teacher}
                onChange={handleChange}
                placeholder="Teacher Name"
                className="w-full outline-none"
              />

            </div>

          </div>

          <div>

            <label className="font-semibold">
              Principal Name
            </label>

            <div className="flex items-center border rounded-xl p-3 mt-2">

              <FaUser className="mr-3 text-[#572C10]" />

              <input
                type="text"
                name="principal"
                value={form.principal}
                onChange={handleChange}
                placeholder="Principal Name"
                className="w-full outline-none"
              />

            </div>

          </div>

        </div>

        {/* Designation + Phone */}

        <div className="grid md:grid-cols-2 gap-5 mt-5">

          <div>

            <label className="font-semibold">
              Designation
            </label>

            <div className="flex items-center border rounded-xl p-3 mt-2">

              <FaUser className="mr-3 text-[#572C10]" />

              <input
                type="text"
                name="designation"
                value={form.designation}
                onChange={handleChange}
                placeholder="Designation"
                className="w-full outline-none"
              />

            </div>

          </div>

          <div>

            <label className="font-semibold">
              Phone Number
            </label>

            <div className="flex items-center border rounded-xl p-3 mt-2">

              <FaPhone className="mr-3 text-[#572C10]" />

              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full outline-none"
              />

            </div>

          </div>

        </div>

        {/* Visit Date */}

        <div className="mt-5">

          <label className="font-semibold">
            Visit Date
          </label>

          <div className="flex items-center border rounded-xl p-3 mt-2">

            <FaCalendarAlt className="mr-3 text-[#572C10]" />

            <input
              type="date"
              name="visitDate"
              value={form.visitDate}
              onChange={handleChange}
              className="w-full outline-none"
            />

          </div>

        </div>

        {/* Outcome */}

        <div className="mt-5">

          <label className="font-semibold">
            Outcome
          </label>

          <div className="flex items-center border rounded-xl p-3 mt-2">

            <FaTasks className="mr-3 text-[#572C10]" />

            <select
              name="outcome"
              value={form.outcome}
              onChange={handleChange}
              className="w-full outline-none"
            >

              <option value="">
                Select Outcome
              </option>

              <option value="Pending">
                  ⏳ Pending
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

        </div>

        {/* Notes */}

        <div className="mt-5">

          <label className="font-semibold">
            Notes
          </label>

          <div className="flex items-start border rounded-xl p-3 mt-2">

            <FaStickyNote className="mr-3 mt-1 text-[#572C10]" />

            <textarea
              rows="3"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Write notes..."
              className="w-full outline-none"
            />

          </div>

        </div>

{/* Selfie Upload */}

<div className="mt-6">

  <label className="flex items-center gap-2 text-lg font-bold  mb-3">
 
  <span >Selfie with Teacher / Principal</span>
</label>

  <label
    htmlFor="photo"
    className="
      flex
      items-center
      gap-4
      border
      border-gray-300
      rounded-2xl
      p-4
      cursor-pointer
      hover:border-violet-500
      transition
    "
  >

    {/* Icon Box */}

    <div
      className="
        w-12
        h-12
        rounded-xl
       
        flex
        items-center
        justify-center
      "
    >

      <FaCamera className="text-[#572C10] text-3xl " />

    </div>

    {/* Text */}

    <div>

      <h3 className="font-semibold text-gray-800">

        {photo
          ? photo.name
          : "Take or upload a selfie"}

      </h3>

      <p className="text-sm font-bold text-gray-400">

        JPG, PNG up to 10MB

      </p>

    </div>

  </label>

  <input
    id="photo"
    type="file"
    accept="image/*"
    capture="user"
    onChange={handlePhoto}
    className="hidden"
  />
</div>
       

        {/* Buttons */}

        <div className="flex gap-4 mt-8">

          <button
            type="button"
            onClick={() => {

              setForm({
                schoolName: "",
                teacher: "",
                principal: "",
                designation: "",
                phone: "",
                visitDate: "",
                outcome: "",
                notes: "",
              });

              setPhoto(null);
              setPreview(null);

            }}
            className="
              flex-1
              py-3
              rounded-xl
              border
              border-gray-300
              font-semibold
              hover:bg-gray-100
            "
          >

            Cancel

          </button>

          <button
            onClick={submit}
            className="
              flex-1
              py-3
              rounded-xl
              bg-[#572C10]
              text-white
              font-bold
              hover:bg-[#3f1f0b]
              shadow-lg
            "
          >

            Save Visit

          </button>

        </div>

      </div>

    </div>

  </div>
);
       
};

export default VisitForm;