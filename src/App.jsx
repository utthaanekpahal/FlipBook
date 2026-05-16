import React from 'react'
import Signupform from './Component/Signform'
import Loginform from './Component/Loginform'
import { Routes, Route } from "react-router-dom";
import Dashboard from './Component/Dashboard';
import Agentlogin from './Component/Agentlogin';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signupform />} />
        <Route path="/Loginform" element={<Loginform />} />
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/agent" element={<Agentlogin/>}/>
      </Routes>
    </div>
  )
}

export default App