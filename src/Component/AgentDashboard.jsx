import React from 'react'

const AgentDashboard = () => {
  return (
    <div className='flex h-screen'>
    {/* Sidebar */}
    <header className='w-[250px] bg-red-700 text-white'>
        <div className='flex flex-col items-center gap-5 h-full py-5'>
            {/* Logo Section */}
            <div className='bg-amber-400 text-black p-3'>
                <img src="" alt="" />
                <div className='flex flex-col justify-center'>
                    <h1 className='font-bold'>BookHub</h1>
                    <span>Agent panel</span>
                </div>
            </div>
            {/* Menu */}
            <div>
                <ul className='flex flex-col gap-5'>
                    <li className='hover:bg-blue-800 text-center p-[5px] font-bold'>Home</li>
                    <li className='hover:bg-blue-800 text-center p-[5px] font-bold'>Categories</li>
                    <li className='hover:bg-blue-800 text-center p-[5px] font-bold'>Home</li>
                    <li className='hover:bg-blue-800 text-center p-[5px] font-bold'>Setting</li>
                </ul>
            </div>
        </div>
    </header>
    {/* Main Section */}
    <section className='flex flex-col '>
        {/* Top Navbar */}
        <div className='flex justify-between items-center bg-amber-500 p-4'>
            <span  className='ml-[10px]'>Hii Agent</span>
           <input
            className='border border-gray-400 p-2 px-[50px] rounded-md outline-none'
            type="text"
            placeholder='Search Books'/>
            <a href="" className='mr-[15px]'>Agent</a>
        </div>
        {/* Main Content */}
        <div className='p-5 flex gap-[20px]'>
           <div className='bg-green-700 h-[120px] w-[250px] rounded-sm'>ed</div>
           <div className='bg-pink-700 h-[120px] w-[250px] rounded-sm'>ed</div>
           <div className='bg-slate-900 h-[120px] w-[250px] rounded-sm'>d</div>
           <div className='bg-yellow-600 h-[120px] w-[250px] rounded-sm'>d</div>
        </div>
        <div className='flex flex-col gap-[20px]'>
            <div className='bg-amber-200 h-[170px] ml-[20px] w-[96%] rounded-sm'>
            <div className='flex justify-around gap-[60%] font-bold p-[2px] mt-[10px]'>
               <h1> Browser Category</h1>
               <button className='font-bold'>View all</button>
            </div>
            <div className='flex justify-center h-screen gap-[20%]'>
                <div className='bg-green-900 h-[18%] w-[15%] rounded-sm text-center text-white'>Navbodh</div>
                <div className='bg-purple-950 h-[18%] w-[15%] rounded-sm text-center text-white'>GyanBodh</div>
            </div>
            </div>
            <div className='bg-amber-200 h-[220px] ml-[20px] w-[96%] rounded-sm'>
            <div className='flex justify-around gap-[60%] font-bold p-[2px] mt-[10px]'>
               <h1> Recent Add Books</h1>
               <button className='font-bold'>View all</button>
            </div>
            <div className='flex justify-center h-screen gap-[20%]'>
                <div className='bg-blue-900 h-[25%] w-[15%] rounded-sm text-center text-white'>Books</div>
                <div className='bg-red-950 h-[25%] w-[15%] rounded-sm text-center text-white'>Books</div>
            </div>
            </div>
        </div>
    </section>
</div>
  )
}

export default AgentDashboard