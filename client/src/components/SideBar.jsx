import React from "react";
import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";

// icons
import { RiDashboard2Fill } from "react-icons/ri";
import { MdOutlineEventAvailable } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";

function SideBar() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/sign_in");
  };
  return (
    <div className="hidden md:block border-r-2 border-gray-700 bg-gray-800 w-full max-w-[270px] h-full overflow-y-auto p-4">
      <div className="w-full px-3 py-2 mb-2">
        <h1 className="text-white font-medium text-xl line-clamp-1">
          {user?.name || "Unknown"}
        </h1>
        <h6 className="text-white/55 text-xs -mt-0.5">
          {user?.email || "Unknown"}
        </h6>
      </div>
      <ul className="space-y-2 font-medium">
        <li>
          <Link
            to="/"
            className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group"
          >
            <RiDashboard2Fill className="w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white" />

            <span className="ml-2">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            to="#"
            className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group"
          >
            <MdOutlineEventAvailable className="w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white" />

            <span className="ml-2">Enrolled Events</span>
          </Link>
        </li>
        <li>
          <Link
            to="/create_event"
            className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group"
          >
            <IoIosCreate className="w-[24.4px] h-[24.4px] ml-[1px] transition duration-75 text-gray-400 group-hover:text-white" />

            <span className="ml-2">Create Events</span>
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="w-full flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group cursor-pointer"
          >
            <IoLogOut className="w-[24.4px] h-[24.4px] ml-[1px] transition duration-75 text-gray-400 group-hover:text-white" />

            <span className="ml-2">Log out</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
