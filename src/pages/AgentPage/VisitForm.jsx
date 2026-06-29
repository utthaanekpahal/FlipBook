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
  FaCamera,
  FaMicrophone,
  
} from "react-icons/fa";
import { BiCurrentLocation } from "react-icons/bi";

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
    location:"",
     latitude: "",
  longitude: "",
  
  });
const [location, setLocation] = useState("");
const [loading, setLoading] = useState(false);
const [coords, setCoords] = useState(null);
const getCurrentLocation = () => {
  console.log("Button Clicked");

  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  setLoading(true);

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      console.log("Lat:", lat);
      console.log("Lon:", lon);
          setCoords({ lat, lon });
      const address = await getAddressFromCoords(lat, lon);

     setForm((prev) => ({
  ...prev,
  location: address,
  latitude: lat,
  longitude: lon,
}));

      setLoading(false);
    },
    (error) => {
      console.log(error);
      alert("Location permission denied");
      setLoading(false);
    },
    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    }
  );
};
const getAddressFromCoords = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&addressdetails=1`
    );

    const data = await response.json();

    console.log(data);

    const a = data.address || {};

    const readableAddress = [
      a.house_number,
      a.road,
      a.neighbourhood,
      a.suburb,
      a.village,
      a.town,
      a.city,
      a.state,
    ]
      .filter(Boolean)
      .join(", ");

    return readableAddress || data.display_name;
  } catch (err) {
    console.log(err);
    return `${lat}, ${lon}`;
  }
};
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isListening, setIsListening] = useState(false);

const startListening = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech Recognition is not supported in this browser");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "  en-IN"; // Hindi + English
  recognition.continuous = false;
  recognition.interimResults = false;

  setIsListening(true);

  recognition.start();

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;

    setForm((prev) => ({
      ...prev,
      notes: prev.notes
        ? prev.notes + " " + transcript
        : transcript,
    }));

    setIsListening(false);
  };

  recognition.onerror = (event) => {
    console.log(event.error);

    setIsListening(false);

    alert("Mic error: " + event.error);
  };

  recognition.onend = () => {
    setIsListening(false);
  };
};

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
  setLoading(true);

  try {
    if (!form.schoolName || !form.teacher || !form.phone || !photo) {
      alert("School Name, Teacher, Phone and Photo are required");
      return;
    }

    const data = new FormData();

    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });

    data.append("photo", photo);

    const res = await axios.post(
      "https://flipbook-production.up.railway.app/api/visits/create",
      data
    );

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
      location: "",
      latitude: "",
      longitude: "",
    });

    setPhoto(null);
    setPreview(null);

  } catch (error) {
    console.log(error);
    alert(error.response?.data?.message || "Error saving visit");

  } finally {
    // 🔥 ALWAYS RUNS (MOST IMPORTANT FIX)
    setLoading(false);
  }
};
return (
  <div className="min-h-screen lg:ml-[15px] mt-[25%] sm:mt-[30px] lg:mt-[30px] bg-gradient-to-br  py-10 px-4">

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

    <select
      name="designation"
      value={form.designation}
      onChange={handleChange}
      className="w-full outline-none bg-transparent"
    >
      <option value="">
        Select Designation
      </option>

      <option value="Principal">
        Principal
      </option>

      <option value="Vice Principal">
        Vice Principal
      </option>

      <option value="Teacher">
        Teacher
      </option>

    </select>

  </div>

</div>
        
          <div>

            <label className="font-semibold">
              Phone Number
            </label>

            <div className="flex items-center border rounded-xl p-3 mt-2">

              <FaPhone className="mr-3 text-[#572C10]" />

              <input
  type="tel"
  name="phone"
  value={form.phone}
  onChange={(e) => {
    const value = e.target.value;

    // Sirf numbers allow + max 10 digits
    if (/^\d{0,10}$/.test(value)) {
      setForm({
        ...form,
        phone: value,
      });
    }
  }}
  placeholder="Enter  mobile number"
  maxLength={10}
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

  <div className="flex items-start border rounded-xl p-3 mt-2 gap-3">

    <FaStickyNote className="mt-1 text-[#572C10]" />

    <textarea
      rows="3"
      name="notes"
      value={form.notes}
      onChange={handleChange}
      placeholder="Write notes or use mic..."
      className="w-full outline-none resize-none"
    />

    <button
      type="button"
      onClick={startListening}
      className={`p-3 rounded-full transition ${
        isListening
          ? "bg-red-500 text-white animate-pulse"
          : "bg-[#572C10] text-white hover:bg-[#3f1f0b]"
      }`}
    >
      <FaMicrophone />
    </button>

  </div>

  {isListening && (
    <p className="text-red-500 mt-2 font-semibold">
      🎤 Listening...
    </p>
  )}

</div>

{/* location */}
<div className="mt-5">
  <label className="font-semibold text-gray-700 text-sm sm:text-base">
    Location
  </label>

  <div className="flex flex-col sm:flex-row gap-2 mt-2">

    <input
      type="text"
      value={form.location}
      onChange={(e) =>
        setForm({
          ...form,
          location: e.target.value,
        })
      }
      placeholder="Your location will appear here"
      className="
        flex-1
        border
        border-gray-300
        p-3
        rounded-xl
        text-sm
        outline-none
        focus:border-[#572C10]
        focus:ring-1
        focus:ring-[#572C10]
      "
    />

    <button
      type="button"
      onClick={getCurrentLocation}
      className="
        bg-[#572C10]
        text-white
        px-4
        py-3
        rounded-xl
        whitespace-nowrap
        hover:bg-[#3f1f0b]
        transition
        font-medium
      "
    >
      {loading ? "Loading..." : "📍 GPS"}
    </button>

  </div>

  {coords && (
    <div className="mt-3">
      <a
        href={`https://www.google.com/maps?q=${coords.lat},${coords.lon}`}
        target="_blank"
        rel="noopener noreferrer"
        className="
          inline-flex
          items-center
          justify-center
          gap-2
          bg-green-600
          hover:bg-green-700
          text-white
          px-4
          py-3
          rounded-xl
          text-sm
          font-medium
          transition
          w-full
          sm:w-auto
        "
      >
        📍 Open in Google Maps
      </a>
    </div>
  )}
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
                 latitude: "",
  longitude: "",
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
  disabled={loading}
  className="flex-1 py-3 rounded-xl bg-[#572C10] text-white font-bold hover:bg-[#3f1f0b] shadow-lg flex items-center justify-center"
>
  {loading ? (
    <div className="flex items-center gap-2">
      <span className="w-2.5 h-2.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
      <span className="w-2.5 h-2.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
      <span className="w-2.5 h-2.5 bg-white rounded-full animate-bounce"></span>

      <span className="ml-2 text-sm">Saving...</span>
    </div>
  ) : (
    "Save Visit"
  )}
</button>

        </div>

      </div>

    </div>

  </div>
);
       
};

export default VisitForm;