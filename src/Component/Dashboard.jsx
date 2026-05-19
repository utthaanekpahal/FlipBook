import React, { useEffect ,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoNotificationsOutline } from 'react-icons/io5';
import { FaBookOpen } from "react-icons/fa";
import {
  FaTachometerAlt,
  FaBook,
  FaList,
  FaUpload,
  FaUsers,
  FaCog
} from 'react-icons/fa';

function Dashboard() {
  const [sliced, setsliced] = useState([])
  async function fetchdata() {
  const response = await   fetch("https://jsonplaceholder.typicode.com/users")
  const data = await response.json()
  const slic = data.slice(0,4);
  setsliced(slic)
  console.log(sliced)
}
useEffect(()=>{
fetchdata();
  },[])

  const navigate = useNavigate();

  return (
    <div>

      {/* HEADER */}
      <header className="flex items-center justify-between px-[20px] py-[12px]  bg-[#995F2F] ">

        <div className='flex items-center gap-[8px] font-bold text-[20px] text-white'>
          <FaBookOpen size={22} />
          Digital Book Library
        </div>

        <input
          type="text"
          placeholder='Search Book, Categories'
          className='w-[600px] px-[12px] py-[8px] rounded-[20px] text-white border border-[#BBBBBB] placeholder-white outline-none'
        />

        <div className='flex justify-center gap-[15px]'>
          <div className='invert'>
          <IoNotificationsOutline size={24} />
        </div>
        <div className='cursor-pointer text-white font-bold'>
          Profile
        </div>
        </div>

      </header>

      {/* BODY */}
      <div className='flex gap-[40px] p-[20px]'>

        {/* SIDEBAR */}
        <aside className="w-[220px]">

          <ul className="list-none flex flex-col gap-[10px]">

            <li className="flex items-center gap-[10px] px-[20px] py-[10px] font-bold cursor-pointer hover:bg-gray-100 rounded">
              <FaTachometerAlt />
              Dashboard
            </li>

            <li className="flex items-center gap-[10px] px-[20px] py-[10px] font-bold cursor-pointer hover:bg-gray-100 rounded">
              <FaBook />
              Books
            </li>

            <li className="flex items-center gap-[10px] px-[20px] py-[10px]  font-bold cursor-pointer hover:bg-gray-100 rounded"
              onClick={() => navigate("/category")}
            >
              <FaList />
              Categories
            </li>

            <li className="flex items-center gap-[10px] px-[20px] py-[10px] font-bold cursor-pointer hover:bg-gray-100 rounded">
              <FaUpload />
              Upload Books
            </li>

            <li
              className="flex items-center gap-[10px] px-[20px] py-[10px] font-bold  cursor-pointer hover:bg-gray-100 rounded"
              onClick={() => navigate("/agent")}
            >
              <FaUsers />
              Agents
            </li>

            <li className="flex items-center gap-[10px] px-[20px] py-[10px]  font-bold cursor-pointer hover:bg-gray-100 rounded">
              <FaCog />
              Settings
            </li>

          </ul>

        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 flex flex-col gap-[20px]">

          {/* TOP BOXES */}
          <div className="flex gap-[10px]">

            {[1,2,3,4].map((item)=>(

              <div
                key={item}
                className="h-[20vh] w-[20vw] bg-[#F5F5F5] rounded-[10px] flex justify-center items-center text-[20px]"
              >
                {item}
              </div>

            ))}

          </div>


          {/* RECENT BOOK */}
          <div className="bg-[#F5F5F5] rounded-[10px] p-[20px]">

            <div className='flex justify-between items-center mb-[20px]'>

              <h4 className="font-bold">
                Recent Book
              </h4>

              <button className="border rounded px-[10px] py-[5px]">
                View all
              </button>

            </div>

            <div className='flex justify-center gap-[30px]'>

              {[...Array(6)].map((_, i) => (

                <div
                  key={i}
                  className='flex flex-col items-center gap-[5px]'
                >

                  <div className='w-[120px] h-[160px] bg-green-400 rounded flex items-center justify-center'>
                    item
                  </div>

                  <span className="text-[12px]">
                    Mathematics
                  </span>

                  <span className="text-[12px]">
                    Class 8
                  </span>

                  <span className="text-[12px]">
                    May 25 2026
                  </span>

                </div>

              ))}

            </div>

          </div>


          {/* TABLE + CARD */}
          <div className='flex gap-[20px]'>

            {/* TABLE */}
            <div className="flex-1 bg-[#F5F5F5] rounded-[10px] p-[20px]">

              <div className='flex justify-between mb-[20px]'>

                <h4 className='font-bold'>
                  Active Agent
                </h4>

                <button className='border px-[10px] py-[5px] rounded'>
                  View all
                </button>

              </div>

              <table className='w-full'>

                <thead>

                  <tr className='bg-gray-200'>

                    <th className='p-[10px]'>Agent Name</th>
                    <th>Email</th>
                    <th>Last Active</th>
                    <th>Book Viewed</th>
                    <th>Status</th>

                  </tr>

                </thead>

                <tbody>

                 {sliced.map((value, index) => (
    <tr key={index}>
      <td className="text-left p-[12px] border-b border-amber-50">
        {value.name}
      </td>

      <td className="text-left p-[12px] border-b border-amber-50">
        {value.email}
      </td>

      <td className="text-left p-[12px] border-b border-amber-50">
        {new Date().toLocaleDateString()}
      </td>

      <td className="text-left p-[12px] border-b border-amber-50">
        N/A
      </td>

      <td className="text-left p-[12px] border-b border-amber-50">
        Active
      </td>
    </tr>
  ))}    

                </tbody>

              </table>

            </div>


            {/* CARD */}
            <div className="w-[300px] bg-[#F5F5F5] rounded-[10px] p-[20px]">

              <div className='flex justify-between mb-[20px]'>

                <h4 className='font-bold'>
                  Top Viewed Books
                </h4>

                <button className='border px-[10px] py-[5px] rounded'>
                  View all
                </button>

              </div>

              <table className='w-full'>

                <tbody>

                  {[...Array(5)].map((_,i)=>(

                    <tr key={i}>

                      <td className='p-[10px]'>
                        value
                      </td>

                      <td>
                        value
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </main>

      </div>

    </div>
  )
}

export default Dashboard;