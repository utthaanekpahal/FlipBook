import React, { useState } from 'react'
import Signupform from './Component/Signform'
import Loginform from './Component/Loginform'
import { Routes, Route } from "react-router-dom";
import Dashboard from './Component/Dashboard';
import Agentlogin from './Component/Agentlogin';
import AgentDashboard from './Component/AgentDashboard';
import Category from './pages/Category';
import FlipPage from './pages/FlipPage';
import Books from './pages/Books';
import Ticket from './pages/Ticket';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signupform />} />
        <Route path="/Loginform" element={<Loginform />} />
        <Route path="/Dashboard" element={<Dashboard />}/>
        <Route path="/agent" element={<Agentlogin />}/>
        <Route path="/AgentDashboard" element={<AgentDashboard/>}/>
        <Route path="/Category"  element={<Category/>}/>
        <Route path="/FlipPage"  element={<FlipPage/>}/>
        <Route path="/Books"  element={<Books/>}/>
        <Route  path='/Ticket' element={<Ticket/>}/>
      </Routes>
    </div>
  )
}

export default App