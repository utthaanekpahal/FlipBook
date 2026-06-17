import React, { useState } from "react";
import AgentHeader from "./AgentHeader";
import AgentSidebar from "./AgentSidebar";
import { Outlet } from "react-router-dom";

const AgentLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#EFE6DD] overflow-x-hidden">
      
      {/* Header */}
      <AgentHeader setOpen={setOpen} />

      {/* Layout */}
      <div className="flex w-full">

        {/* Sidebar */}
        <AgentSidebar
          open={open}
          setOpen={setOpen}
        />

        {/* Main Content */}
        <main
          className="
            flex-1
            min-w-0
            w-full
            p-3
            sm:p-4
            md:p-5
            lg:ml-[250px]
            overflow-x-hidden
          "
        >
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AgentLayout;