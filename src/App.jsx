import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import Layout from "./layout/Layout";
import AgentLayout from "./layout/AgentLayout";

import Dashboard from "./Component/Dashboard";
import AgentDashboard from "./Component/AgentDashboard";
import Loginform from "./Component/Loginform";
import Agentlogin from "./Component/Agentlogin";

// USER PAGES
import UserBooks from "./pages/UserPage/books";
import UserCategory from "./pages/UserPage/Category";
import UserTicket from "./pages/UserPage/UserTicket";
import UserClassPage from "./pages/UserPage/ClassPage";
import UserFlipPage from "./pages/UserPage/FlipPage";
import UserViewMoreBooks from "./pages/UserPage/ViewMoreBooks";
import UserFollowUp from "./pages/UserPage/FollowUp";
import UploadBooks from "./pages/UserPage/UploadBooks";

// AGENT PAGES
import AgentBooks from "./pages/AgentPage/books";
import AgentCategory from "./pages/AgentPage/Category";
import AgentTicket from "./pages/AgentPage/AgentTicket";
import AgentClassPage from "./pages/AgentPage/ClassPage";
import AgentFlipPage from "./pages/AgentPage/FlipPage";
import AgentViewMoreBooks from "./pages/AgentPage/ViewMoreBooks";
import AgentFollowUp from "./pages/AgentPage/FollowUp";
import VisitForm from "./pages/AgentPage/VisitForm";

// ==========================
// PUBLIC ROUTE
// ==========================
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

// ==========================
// ROLE ROUTE
// ==========================
function RoleRoute({ allowedRole }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const role = localStorage.getItem("role");

  if (isLoggedIn !== "true") {
    return <Navigate to="/Loginform" replace />;
  }

  if (role !== allowedRole) {
    return (
      <Navigate
        to={role === "agent" ? "/AgentDashboard" : "/Dashboard"}
        replace
      />
    );
  }

  return <Outlet />;
}

// ==========================
// APP
// ==========================
export default function App() {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Loginform />} />
      </Route>

      {/* USER PANEL */}
      <Route element={<RoleRoute allowedRole="admin" />}>
        <Route element={<Layout />}>

          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/agent" element={<Agentlogin />} />
          <Route path="/UploadBooks" element={<UploadBooks />} />

          <Route path="/Category" element={<UserCategory />} />
          <Route path="/Books" element={<UserBooks />} />
          <Route path="/Ticket" element={<UserTicket />} />
          <Route path="/ClassPage" element={<UserClassPage />} />
          <Route path="/ViewMoreBooks" element={<UserViewMoreBooks />} />
          <Route path="/FollowUp" element={<UserFollowUp />} />
          <Route path="/FlipPage" element={<UserFlipPage />} />

        </Route>
      </Route>

      {/* AGENT PANEL */}
      <Route element={<RoleRoute allowedRole="agent" />}>
        <Route element={<AgentLayout />}>

          <Route
            path="/AgentDashboard"
            element={<AgentDashboard />}
          />

          <Route path="/VisitForm" element={<VisitForm />} />

          <Route path="/agent/category" element={<AgentCategory />} />
          <Route path="/agent/books" element={<AgentBooks />} />
          <Route path="/agent/ticket" element={<AgentTicket />} />
          <Route path="/agent/classpage" element={<AgentClassPage />} />
          <Route
            path="/agent/viewmorebooks"
            element={<AgentViewMoreBooks />}
          />
          <Route
            path="/agent/followup"
            element={<AgentFollowUp />}
          />
          <Route
            path="/agent/flippage"
            element={<AgentFlipPage />}
          />

        </Route>
      </Route>

      {/* INVALID URL */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}