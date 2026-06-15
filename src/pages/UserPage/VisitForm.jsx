import React, { useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaSchool,
  FaTasks,
  FaUpload,
} from "react-icons/fa";

const VisitForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    school: "",
    followUp: "",
  });

  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const submit = async () => {
    try {
      if (!form.name || !form.phone || !photo) {
        alert("Name, Phone and Photo required");
        return;
      }

      const data = new FormData();
      Object.keys(form).forEach((key) => data.append(key, form[key]));
      data.append("photo", photo);

      await axios.post("http://localhost:3000/api/visits/create", data);

      alert("Visit Saved Successfully ✔");

      setForm({
        name: "",
        email: "",
        phone: "",
        school: "",
        followUp: "",
      });

      setPhoto(null);
      setPreview(null);
    } catch (error) {
      console.log(error);
      alert("Error saving visit");
    }
  };

  return (
    <div className=" bg-gray-100">

      <div
        className="h-full bg-cover bg-center flex items-center justify-center p-8"
        style={{
          backgroundImage:
            "url('background img.png')",
        }}
      >
      </div>

      {/* FORM BOX */}
      <div className="flex justify-center ">
        <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-6 -mt-10">

          {/* NAME */}
          <label className="text-sm font-semibold">Name</label>
          <div className="flex items-center border p-2 rounded mb-3">
            <FaUser className="text-[#572C10] mr-2" />
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter name"
              className="w-full outline-none"
            />
          </div>

          {/* EMAIL */}
          <label className="text-sm font-semibold">Email</label>
          <div className="flex items-center border p-2 rounded mb-3">
            <FaEnvelope className="text-[#572C10] mr-2" />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full outline-none"
            />
          </div>

          {/* PHONE */}
          <label className="text-sm font-semibold">Phone</label>
          <div className="flex items-center border p-2 rounded mb-3">
            <FaPhone className="text-[#572C10] mr-2" />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone"
              className="w-full outline-none"
            />
          </div>

          {/* SCHOOL */}
          <label className="text-sm font-semibold">School</label>
          <div className="flex items-center border p-2 rounded mb-3">
            <FaSchool className="text-[#572C10] mr-2" />
            <input
              name="school"
              value={form.school}
              onChange={handleChange}
              placeholder="School name"
              className="w-full outline-none"
            />
          </div>

          {/* FOLLOW UP */}
          <label className="text-sm font-semibold">Follow Up</label>
          <div className="flex items-center border p-2 rounded mb-3">
            <FaTasks className="text-[#572C10] mr-2" />
            <select
              name="followUp"
              value={form.followUp}
              onChange={handleChange}
              className="w-full outline-none"
            >
              <option value="">Select Status</option>
              <option value="Order Placed">Order Placed</option>
              <option value="Interested">Interested</option>
              <option value="Meeting Scheduled">Meeting Scheduled</option>
              <option value="Call Back Later">Call Back Later</option>
              <option value="Not Interested">Not Interested</option>
            </select>
          </div>

          {/* PHOTO */}
          <label className="text-sm font-semibold">Photo</label>
          <div className="flex items-center border p-2 rounded mb-3">
            <FaUpload className="text-[#572C10] mr-2" />
            <input type="file" onChange={handlePhoto} />
          </div>

          {/* PREVIEW */}
          {preview && (
            <div className="flex justify-center mb-3">
              <img
                src={preview}
                className="w-28 h-28 rounded-full object-cover border-4 border-[#572c10]"
              />
            </div>
          )}

          {/* BUTTON */}
          <button
            onClick={submit}
            className="w-full bg-[#572c10] hover:bg-[#3f1f0b] text-white py-3 rounded-xl font-bold"
          >
            Save Visit
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisitForm;