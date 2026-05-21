import React from "react";

const Books = () => {
  return (
    <div className="min-h-screen">


      <div className="flex justify-center pt-10 pb-20">
        <div className="w-[900px]">
          <div className="grid grid-cols-3 gap-6">

            <div className="bg-gray-300 h-[350px] flex items-center justify-center">
                <img src="book 1.jpg " alt="" className='w-full h-full object-cover' />
            </div>
            <div className="bg-gray-300 h-[350px] flex items-center justify-center">
                <img src="book2.jfif" alt="" className='w-full h-full object-cover' />
            </div>
            <div className="bg-gray-300 h-[350px] flex items-center justify-center">
                <img src="book 3.jfif " alt="" className='w-full h-full object-cover' />
            </div>

            <div className="bg-gray-300 h-[350px] flex items-center justify-center">
                <img src="book 4.jfif" alt="" className='w-full h-full object-cover' />
            </div>
            <div className="bg-gray-300 h-[350px] flex items-center justify-center">
                <img src="book 5.jfif" alt="" className='w-full h-full object-cover' />
            </div>
            <div className="bg-gray-300 h-[350px] flex items-center justify-center">
                <img src="https://m.media-amazon.com/images/I/71+TwKNoQVL._AC_UF1000,1000_QL80_.jpg" alt="" className='w-full h-full object-cover' />
            </div>

            <div className="bg-gray-300 h-[350px] flex items-center justify-center">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa2Uqs40QJCCVlNGk29dO0-_H8iOJIr_6R2w&s " alt="" className='w-full h-full object-cover' />
            </div>
            <div className="bg-gray-300 h-[350px] flex items-center justify-center">
                <img src="book 1.jpg" alt="" className='w-full h-full object-cover' />
            </div>
            <div className="bg-gray-300 h-[350px] flex items-center justify-center">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhfMVbs2bvpy1YDYuyJahoBdnrdaQk_KD4wQ&s " alt="" className='w-full h-full object-cover' />
            </div>

          </div>
        </div>
      </div>

     
      <div className="flex justify-center pb-10">
        <button  className="px-6 py-2 bg-blue-500 font-bold text-2xl text-white rounded shadow-md">
          View More
        </button>
      </div>

    </div>
  );
};

export default Books;