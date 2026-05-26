import React, { useEffect, useState } from 'react'
import bgimg from "../assets/imges/bgimg.PNG";

const Ticket = () => {
  const [ticketShow, setTicketShow] = useState("")
  const [upload, setUpload] = useState({
    Agentname: "",
    category: "",
    subject: "",
    message: ""
  })

  // handle input change
  const getTicketData = (e) => {
    const { name, value } = e.target
    setUpload((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  // form submit
  const ticketHandler = (e) => {
    e.preventDefault()
    setTicketShow(upload)
    setUpload({
      Agentname: "",
      category: "",
      subject: "",
      message: ""
    })
  }
  // watch submitted ticket
  useEffect(() => {
      localStorage.setItem("Agentn",ticketShow.Agentname)
      localStorage.setItem("Category",ticketShow.category)
      localStorage.setItem("subject",ticketShow.subject)
      localStorage.setItem("message",ticketShow.message)
  }, [ticketShow])

  return (
    <div
      className='h-screen w-full flex justify-center bg-[#EFE6DD] bg-cover bg-center'
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      <form
        onSubmit={ticketHandler}
        className='flex justify-center items-center rounded-md bg-[#F5F5F5] gap-[10px] flex-col w-[30%] h-[87vh] mt-[45px]'
      >
        <h1 className='font-bold text-2xl text-[#572C10] mt-[20px]'>
          Ticket Raise
        </h1>

        <div className='flex justify-center items-center gap-[15px] flex-col p-[15px] mt-[-20px]'>

          {/* Agent Name */}
          <label className='mr-[72%] font-bold text-[#572C10]'>
            Agent Name
          </label>
          <input
            onChange={getTicketData}
            value={upload.Agentname}
            name="Agentname"
            className='border-2 rounded-md border-[#ac8d6f] outline-none p-[5px] w-[25vw]'
            type="text"
            placeholder='enter your name'
          />

          {/* Category */}
          <label className='mr-[80%] font-bold text-[#572C10]'>
            Category
          </label>
          <select
            onChange={getTicketData}
            value={upload.category}
            name="category"
            className='border-2 p-2 w-[25vw] border-[#ac8d6f] rounded-md outline-none'
          >
            <option value="">Select Category</option>
            <option value="technical">Technical</option>
            <option value="billing">Billing</option>
            <option value="support">Support</option>
          </select>

          {/* Subject */}
          <label className='mr-[83%] font-bold text-[#572C10]'>
            Subject
          </label>
          <input
            onChange={getTicketData}
            value={upload.subject}
            name="subject"
            className='border-2 border-[#ac8d6f] rounded-md outline-none w-[25vw] p-[5px]'
            type="text"
            placeholder='enter your Subject'
          />

          {/* Description */}
          <label className='mr-[73%] font-bold text-[#572C10]'>
            Description
          </label>
          <textarea
            onChange={getTicketData}
            value={upload.message}
            name="message"
            className='border-2 rounded-md border-[#ac8d6f] outline-none h-[20vh] p-[5px] w-[25vw]'
            placeholder='enter your message'
          />

          {/* Submit Button */}
          <button
            type="submit"
            className='bg-[#572C10] p-[10px] w-[50%] rounded-sm text-white'
          >
            Submit
          </button>

        </div>
      </form>
    </div>
  )
}

export default Ticket