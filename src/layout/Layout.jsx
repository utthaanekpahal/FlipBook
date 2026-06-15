import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#EFE6DD] min-h-screen">
      <Header setOpen={setOpen} />

      <Sidebar
        open={open}
        setOpen={setOpen}
      />

      <main
        className="
          p-5
          lg:ml-[220px]
        "
      >
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;