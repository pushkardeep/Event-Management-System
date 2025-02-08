import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";

// Icons
import { RiDashboard2Fill } from "react-icons/ri";
import { IoIosCreate } from "react-icons/io";
import { IoLogOut, IoCloseOutline } from "react-icons/io5";

// Redux Actions
import { setDashboardOpen, setLoading } from "../redux/slices/ui.slice";

// Services
import { profile } from "../services/user/user.service";

const MenuItem = ({ to, icon: Icon, label, onClick }) => (
  <li>
    {to ? (
      <Link
        to={to}
        className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group"
      >
        <Icon className="w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white" />
        <span className="ml-2">{label}</span>
      </Link>
    ) : (
      <button
        onClick={onClick}
        className="w-full flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group cursor-pointer"
      >
        <Icon className="w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white" />
        <span className="ml-2">{label}</span>
      </button>
    )}
  </li>
);

function SideBar({ styles }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        dispatch(setLoading(true));
        await profile(token, dispatch, navigate);
        dispatch(setLoading(false));
      }
    };
    fetchData();
  }, [user, token, dispatch, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/sign_in");
  };

  return (
    <div
      className={`w-full h-full md:w-fit absolute top-0 left-0 md:static z-50 bg-black/50 ${styles}`}
    >
      <div className="border-r-2 border-gray-700 bg-gray-800 w-full min-w-[270px] max-w-[270px] h-full overflow-y-auto p-4">
        {/* Close Button for Mobile */}
        <div className="w-full h-fit flex justify-end items-center">
          <button
            onClick={() => dispatch(setDashboardOpen(false))}
            type="button"
            className=" md:hidden text-gray-500 hover:text-white rounded-lg p-1.5 hover:bg-gray-700 cursor-pointer"
          >
            <IoCloseOutline className="w-5 h-5" />
          </button>
        </div>

        {/* User Info */}
        <div className="w-full px-3 py-2 mb-2">
          <h1 className="text-white font-medium text-xl truncate">
            {user?.name || "Unknown"}
          </h1>
          <h6 className="text-white/55 text-xs">{user?.email || "Unknown"}</h6>
        </div>

        {/* Menu Items */}
        <ul className="space-y-2 font-medium">
          <MenuItem to="/" icon={RiDashboard2Fill} label="Dashboard" />
          <MenuItem
            to="/create_event"
            icon={IoIosCreate}
            label="Create Events"
          />
          <MenuItem onClick={handleLogout} icon={IoLogOut} label="Log out" />
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
