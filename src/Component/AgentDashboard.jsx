import React, { useState, useEffect } from "react";
import { FaThList, FaEye, FaBook } from "react-icons/fa";
import { MdConfirmationNumber } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AgentDashboard = () => {
  const navigate = useNavigate();

  const agenttotalViews =
    localStorage.getItem("viewsagent") || 0;

  const [lengths, setlengths] = useState([]);
  const [books, setBooks] = useState([]);

  // Tickets
  const ticketlength = async () => {
    try {
      const res = await axios.get(
        "https://flipbook-production.up.railway.app/api/tickets/all"
      );

      setlengths(res.data.tickets);
    } catch (error) {
      console.log("error in tickets length");
    }
  };

  // Books
  const getBooks = async () => {
    try {
      const res = await axios.get(
        "flipbook-production.up.railway.app/api/books"
      );

      if (res.data.success) {
        const sortedBooks = res.data.data.sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        );

        setBooks(sortedBooks);
      }
    } catch (error) {
      console.log("Error fetching books", error);
    }
  };

  useEffect(() => {
    ticketlength();
    getBooks();
  }, []);

  return (
    <div className="min-h-screen lg:mt-[48px] sm:mt-[48px] mt-[35%] bg-[#EFE6DD]">
      <section className="w-full overflow-x-hidden">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 p-4 md:p-6">

          {/* Total Books */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex items-center gap-4 border border-[#E8DCCF]">

            <div className="w-14 h-14 bg-[#FFDBB5] rounded-xl flex items-center justify-center">
              <FaBook className="text-2xl text-[#572C10]" />
            </div>

            <div>

              <p className="text-xl font-bold text-black">

                Total Books

              </p>

              <h2 className="text-xl font-bold text-[#572C10]">

                {books.length}

              </h2>


            </div>

          </div>

          {/* Categories */}

          <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex items-center gap-4 border border-[#E8DCCF]">

            <div className="w-14 h-14 bg-[#FFDBB5] rounded-xl flex items-center justify-center">

              <FaThList className="text-2xl text-[#572C10]" />

            </div>

            <div>

              <p className="text-xl font-bold text-black">

                Categories

              </p>

              <h2 className="text-xl font-bold text-[#572C10]">

                2

              </h2>


            </div>

          </div>

          {/* Tickets */}

          <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex items-center gap-4 border border-[#E8DCCF]">

            <div className="w-14 h-14 bg-[#FFDBB5] rounded-xl flex items-center justify-center">

              <MdConfirmationNumber className="text-2xl text-[#572C10]" />

            </div>

            <div>

              <p className="text-xl font-bold text-black">

                Ticket Raise

              </p>

              <h2 className="text-xl font-bold text-[#572C10]">

                {lengths.length}

              </h2>

             

            </div>

          </div>

          {/* Views */}

          <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex items-center gap-4 border border-[#E8DCCF]">

            <div className="w-14 h-14 bg-[#FFDBB5] rounded-xl flex items-center justify-center">

              <FaEye className="text-2xl text-[#572C10]" />

            </div>

            <div>

              <p className="text-xl font-bold text-black">

                Total Views

              </p>

              <h2 className="text-xl font-bold text-[#572C10]">

                {agenttotalViews}

              </h2>

            </div>

          </div>

        </div>

        {/* Browse Category */}

        <div className="mx-4 md:mx-6 mb-6 bg-white rounded-2xl shadow-sm border border-[#E8DCCF] p-5">

          <h2 className="text-2xl font-bold text-black mb-6 text-center">

             Category

          </h2>

          <div className="flex justify-center items-center gap-10 sm:gap-16 flex-wrap">

            <img
              onClick={() => navigate("/Category")}
              src="/nav.png"
              alt="Navigation"
              className="w-[120px] sm:w-[150px] md:w-[180px] object-contain cursor-pointer hover:scale-110 transition-all duration-300"
            />

            <img
              onClick={() => navigate("/Category")}
              src="/gyan.png"
              alt="Gyan"
              className="w-[120px] sm:w-[150px] md:w-[180px] object-contain cursor-pointer hover:scale-110 transition-all duration-300"
            />

          </div>

        </div>

        {/* Recent Added Books */}

        <div className="mx-4 md:mx-6 bg-white rounded-2xl shadow-sm border border-[#E8DCCF] p-5">

          <h2 className="text-xl font-bold text-[#572C10] mb-5 text-center">

            Recent Added Books

          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5">

            {books.slice(0, 5).map((book) => (

              <div
                key={book._id}
                onClick={() => navigate("/FlipPage")}
                className="cursor-pointer rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all bg-white"
              >

                <img
                  src={book.img}
                  alt={book.title}
                  className="w-full h-[220px] object-cover"
                  onError={(e) => {
                    e.target.src = "/book1.jpg";
                  }}
                />

                <div className="p-3">

                  <h3 className="font-bold text-center text-[#572C10]">

                    {book.title}

                  </h3>
                  <h2 className="font-bold text-blue-600 text-center">
                    {book.className}
                  </h2>
                  <h3 className="font-bold text-[#572C10 ]  text-center">

                    {book.subject}

                  </h3>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>
    </div>
  );
};

export default AgentDashboard;