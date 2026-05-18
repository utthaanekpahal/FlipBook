import React from 'react'
import Signupform from './Component/Signform'
import Loginform from './Component/Loginform'
import { Routes, Route } from "react-router-dom";
import Dashboard from './Component/Dashboard';
import Agentlogin from './Component/Agentlogin';
import AgentDashboard from './Component/AgentDashboard';
import Category from './pages/Category';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signupform />} />
        <Route path="/Loginform" element={<Loginform />} />
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/agent" element={<Agentlogin/>}/>
        <Route path="/AgentDashboard" element={<AgentDashboard/>}/>
        <Route path="/Category"  element={<Category/>}/>
      </Routes>
    </div>
  )
}

export default App