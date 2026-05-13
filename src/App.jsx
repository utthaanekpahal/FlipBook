import React from 'react'
import Signupform from './Component/Signform'
import Loginform from './Component/Loginform'
import { Routes, Route } from "react-router-dom";
import Dashboard from './Component/Dashboard';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signupform />} />
        <Route path="/Loginform" element={<Loginform />} />
        <Route path="/Dashboard" element={<Dashboard/>}/>
      </Routes>
    </div>
  )
}

export default App