import React, { useEffect } from "react";
import { useSelector } from "react-redux";

// components
import SideBar from "../SideBar";
import ScLoader from "./ScLoader";

function Dashboard({ children }) {
  const { isLoading, isDashboardOpen } = useSelector((state) => state.ui);
  return (
    <div className="w-screen h-screen bg-gray-900 relative">
      <div className="w-screen h-screen relative flex">
        {/* for pc and tabs */}
        <SideBar styles={"hidden md:block"} />
        {/* for mobils  */}
        {isDashboardOpen && <SideBar styles={"md:hidden"} />}
        {children}
      </div>
      {isLoading && <ScLoader />}
    </div>
  );
}

export default Dashboard;
