import React from 'react'
import { useEffect } from 'react';
import { FaThList } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { MdConfirmationNumber } from "react-icons/md";
import { FaBook } from "react-icons/fa";

const AgentDashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {

    const views =
      Number(localStorage.getItem("viewsagent")) || 0;

    localStorage.setItem(
      "viewsagent",
      views + 1
    );

  }, []);
  const agenttotalViews =localStorage.getItem("viewsagent");
  return (
  <div className="min-h-screen lg:mt-[48px] sm:mt-[48px] mt-[35%] bg-[#EFE6DD]">
  <section className="w-full overflow-x-hidden">

    {/* Stats Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 p-4 md:p-6">

      {/* Total Books */}
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex items-center gap-4 border border-[#E8DCCF]">
        <div className="w-14 h-14 bg-[#FFDBB5] rounded-xl flex items-center justify-center shrink-0">
          <FaBook className="text-2xl text-[#572C10]" />
        </div>

        <div>
          <p className="text-sm font-semibold text-[#572C10]">
            Total Books
          </p>
          <h2 className="text-2xl font-bold">500</h2>
          <p className="text-xs text-[#995F2F]">
            +12 this month
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex items-center gap-4 border border-[#E8DCCF]">
        <div className="w-14 h-14 bg-[#FFDBB5] rounded-xl flex items-center justify-center shrink-0">
          <FaThList className="text-2xl text-[#572C10]" />
        </div>

        <div>
          <p className="text-sm font-semibold text-[#572C10]">
            Categories
          </p>
          <h2 className="text-2xl font-bold">2</h2>
          <p className="text-xs text-[#995F2F]">
            4 this month
          </p>
        </div>
      </div>

      {/* Tickets */}
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex items-center gap-4 border border-[#E8DCCF]">
        <div className="w-14 h-14 bg-[#FFDBB5] rounded-xl flex items-center justify-center shrink-0">
          <MdConfirmationNumber className="text-2xl text-[#572C10]" />
        </div>

        <div>
          <p className="text-sm font-semibold text-[#572C10]">
            Ticket Raise
          </p>
          <h2 className="text-2xl font-bold">ID</h2>
          <p className="text-xs text-[#995F2F]">
            This month
          </p>
        </div>
      </div>

      {/* Views */}
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex items-center gap-4 border border-[#E8DCCF]">
        <div className="w-14 h-14 bg-[#FFDBB5] rounded-xl flex items-center justify-center shrink-0">
          <FaEye className="text-2xl text-[#572C10]" />
        </div>

        <div>
          <p className="text-sm font-semibold text-[#572C10]">
            Total Views
          </p>
          <h2 className="text-2xl font-bold">
            {agenttotalViews}
          </h2>
          <p className="text-xs text-[#995F2F]">
            +17.8% this month
          </p>
        </div>
      </div>

    </div>

    {/* Browser Category */}
    <div className="mx-4 md:mx-6 mb-6 bg-white rounded-2xl shadow-sm border border-[#E8DCCF] p-5">

  <h2 className="text-xl font-bold text-[#572C10] mb-6">
    Browse Category
  </h2>

  <div className="flex justify-center items-center gap-10 sm:gap-16 flex-wrap">

    <img
      onClick={() => navigate("/Category")}
      src="/nav.png"
      alt="Navigation"
      className="
        w-[120px]
        sm:w-[150px]
        md:w-[180px]
        object-contain
        cursor-pointer
        hover:scale-110
        transition-all
        duration-300
      "
    />

    <img
      onClick={() => navigate("/Category")}
      src="/gyan.png"
      alt="Gyan"
      className="
        w-[120px]
        sm:w-[150px]
        md:w-[180px]
        object-contain
        cursor-pointer
        hover:scale-110
        transition-all
        duration-300
      "
    />

  </div>

</div>

    {/* Recent Books */}
    <div className="mx-4 md:mx-6 bg-white rounded-2xl shadow-sm border border-[#E8DCCF] p-5">

      <h2 className="text-xl font-bold text-[#572C10] mb-5">
        Recent Added Books
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5">

        {[
          "book4.png",
          "book2.jfif",
          "book 3.jfif",
          "book 4.jfif",
          "book 4.jfif",
        ].map((book, index) => (
          <div
            key={index}
            onClick={() => navigate("/FlipPage")}
            className="cursor-pointer rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <img
              src={book}
              alt=""
              className="w-full h-[220px] object-cover"
            />
          </div>
        ))}

      </div>

    </div>

  </section>
</div>
  )
}

export default AgentDashboard