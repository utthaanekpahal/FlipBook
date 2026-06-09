import React, { useEffect, useState } from "react";
import axios from "axios";

const FollowUp = () => {
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/visits")
      .then((res) => setVisits(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const getColor = (status) => {
    switch (status) {
      case "Interested": return "bg-green-500";
      case "Call Back": return "bg-yellow-500";
      case "Not Interested": return "bg-red-500";
      case "Order Placed": return "bg-purple-500";
      default: return "bg-blue-500";
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Follow-Up Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {visits.map((v) => (
          <div key={v._id} className="bg-white p-4 rounded-xl shadow">

            <h2 className="font-bold text-lg">{v.name}</h2>
            <p>{v.school}</p>
            <p>{v.phone}</p>

            <span className={`text-white px-3 py-1 rounded mt-2 inline-block ${getColor(v.followUp)}`}>
              {v.followUp}
            </span>

            <img src={v.photo} className="w-16 h-16 rounded-full mt-3" />

          </div>
        ))}

      </div>
    </div>
  );
};

export default FollowUp;