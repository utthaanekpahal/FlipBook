import React, { useEffect, useState } from "react";
import axios from "axios";

const FollowUp = () => {
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/visits")
      .then((res) => setVisits(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-[#EFE6DD] p-6">

      <h1 className="text-3xl font-bold mb-6 flex items-center justify-center gap-2 p-4">
        Follow-Up Dashboard
      </h1>

      <div className="grid  md:grid-cols-3 gap-6">

        {visits.map((v) => (
          <div
            key={v._id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
          >

            {/* NAME */}
            <p className="text-black font-bold text-2xl">
              Name — <span className="font-bold text-2xl ">{v.name}</span>
            </p>

            {/* SCHOOL */}
            <p className="text-gray-800 font-bold text-xl mt-2">
              School — <span className="font-bold">{v.school}</span>
            </p>

            {/* PHONE */}
            <p className="text-gray-800 font-bold text-xl mt-2">
              Phone — <span className="font-bold">{v.phone}</span>
            </p>

            {/* STATUS */}
            <p className="mt-3 font-bold text-2xl text-black">
              Status —{" "}
              <span className="font-bold text-blue-600">
                {v.followUp}
              </span>
            </p>

            {/* PROOF IMAGE (LAST) */}
            {v.photo && (
              <div className="mt-4">
                <p className="text-xl font-bold text-black mb-1">
                  Proof
                </p>

                <img
                  src={v.photo}
                  alt="proof"
                  className="w-full h-40 object-cover rounded-2xl border"
                />
              </div>
            )}

          </div>
        ))}

      </div>
    </div>
  );
};

export default FollowUp;