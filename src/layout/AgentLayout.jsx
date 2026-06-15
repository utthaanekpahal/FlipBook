import React, { useState } from 'react';
import AgentHeader from './AgentHeader';
import AgentSidebar from './AgentSidebar';
import { Outlet } from "react-router-dom";

const AgentLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#EFE6DD] min-h-screen">

      <AgentHeader setOpen={setOpen} />

      <div className="flex">
        <AgentSidebar
          open={open}
          setOpen={setOpen}
        />

        <main className="flex-1 p-5 lg:ml-[250px]">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default AgentLayout;