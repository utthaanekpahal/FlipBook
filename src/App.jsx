import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import Signupform from "./Component/Signform";
import Loginform from "./Component/Loginform";
import Dashboard from "./Component/Dashboard";
import Agentlogin from "./Component/Agentlogin";
import AgentDashboard from "./Component/AgentDashboard";

import Category from "./pages/Category";
import FlipPage from "./pages/FlipPage";
import Books from "./pages/books";
import Ticket from "./pages/Ticket";
import ClassPage from "./pages/ClassPage";
import UploadBooks from "./pages/UploadBooks";
import ViewMoreBooks from "./pages/ViewMoreBooks";

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
// COMMON ROUTE
// ==========================
function PrivateRoute() {
const isLoggedIn = localStorage.getItem("isLoggedIn");

return isLoggedIn === "true"
? <Outlet />
: <Navigate to="/Loginform" replace />;
}

const App = () => {
return ( <Routes>

  {/* PUBLIC */}
  <Route element={<PublicRoute />}>
    <Route path="/" element={<Signupform />} />
    <Route path="/Loginform" element={<Loginform />} />
  </Route>

  {/* USER ONLY */}
  <Route element={<RoleRoute allowedRole="user" />}>
    <Route path="/Dashboard" element={<Dashboard />} />
    <Route path="/agent" element={<Agentlogin />} />
    <Route path="/UploadBooks" element={<UploadBooks />} />
  </Route>

  {/* AGENT ONLY */}
  <Route element={<RoleRoute allowedRole="agent" />}>
    <Route path="/AgentDashboard" element={<AgentDashboard />} />
  </Route>

  {/* COMMON PAGES (User + Agent) */}
  <Route element={<PrivateRoute />}>
    <Route path="/Category" element={<Category />} />
    <Route path="/FlipPage" element={<FlipPage />} />
    <Route path="/Books" element={<Books />} />
    <Route path="/Ticket" element={<Ticket />} />
    <Route path="/ClassPage" element={<ClassPage />} />
    <Route path="/ViewMoreBooks" element={<ViewMoreBooks />} />
  </Route>

  {/* INVALID URL */}
  <Route path="*" element={<Navigate to="/" replace />} />

</Routes>

);
};

export default App;
