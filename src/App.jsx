import React from 'react';
import Signupform from './Component/Signform';
import Loginform from './Component/Loginform';
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Dashboard from './Component/Dashboard';
import Agentlogin from './Component/Agentlogin';
import AgentDashboard from './Component/AgentDashboard';
import Category from './pages/Category';
import FlipPage from './pages/FlipPage';
import Books from './pages/books';
import Ticket from './pages/Ticket';
import ClassPage from './pages/ClassPage';
import UploadBooks from './pages/UploadBooks';
import ViewMoreBooks from './pages/ViewMoreBooks';
import VisitForm from './pages/VisitForm';
import FollowUp from './pages/FollowUp';

// Public Routes (Login / Signup)
function PublicRoute() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const role = localStorage.getItem("role");

  if (isLoggedIn === "true") {
    return (
      <Navigate
        to={role === "agent" ? "/AgentDashboard" : "/Dashboard"}
        replace
      />
    );
  }

  return <Outlet />;
}

// Protected Routes
function PrivateRoute() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return isLoggedIn === "true"
    ? <Outlet />
    : <Navigate to="/Loginform" replace />;
}

const App = () => {
  return (
    <div>
      <Routes>

        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Signupform />} />
          <Route path="/Loginform" element={<Loginform />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/agent" element={<Agentlogin />} />
          <Route path="/AgentDashboard" element={<AgentDashboard />} />
          <Route path="/Category" element={<Category />} />
          <Route path="/FlipPage" element={<FlipPage />} />
          <Route path="/Books" element={<Books />} />
          <Route path="/Ticket" element={<Ticket />} />
          <Route path="/ClassPage" element={<ClassPage />} />
          <Route path="/UploadBooks" element={<UploadBooks />} />
          <Route path="/ViewMoreBooks" element={<ViewMoreBooks />} />
          <Route path="/VisitForm" element={<VisitForm />} />
          <Route path="/FollowUp" element={<FollowUp />} />
        </Route>

      </Routes>
    </div>
  );
};

export default App;