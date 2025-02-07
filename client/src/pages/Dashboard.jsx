import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

// Icons
import { MdCategory } from "react-icons/md";
import { FaCalendar } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";

// Components
import SideBar from "../components/SideBar";
import OptionButtons from "../components/commmon/OptionButtons";
import ScLoader from "../components/commmon/ScLoader";
import Toast from "../components/commmon/Toast";
import FilterCategory from "../components/FilterCategory";
import Eventlist from "../components/Eventlist";

// Methods
import { profile } from "../services/user/user.service";
import { get_events } from "../services/events/events.service";
import { setDate } from "../redux/slices/Filter.slice";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Refs
  const dateInputRef = useRef();

  // Local State
  const [message, setMessage] = useState("");
  const [fltCategoryToggle, setFltCategoryToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redux Selectors
  const { user } = useSelector((state) => state.user);
  const { events } = useSelector((state) => state.events);
  const { date, category } = useSelector((state) => state.filter);

  const token = localStorage.getItem("token");

  // Fetch Events and Profile
  const fetchData = async () => {
    setLoading(true);

    if (!user) await profile(token, dispatch, navigate);

    if (!events) {
      const { success, message } = await get_events(token, dispatch);
      if (!success) setMessage(message);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [user, events]);

  // Handlers
  const toggleCategoryFilter = () => setFltCategoryToggle((prev) => !prev);

  return (
    <div className="w-screen h-screen bg-gray-900 relative">
      <div className="w-screen h-screen flex">
        <SideBar />

        <div className="flex-1 relative overflow-y-auto">
          {message && <Toast message={message} />}

          {events?.length > 0 ? (
            <div className="w-full h-full flex flex-col">
              {/* Navbar */}
              <nav className="w-full flex justify-between items-center px-6 py-3">
                <h1 className="text-white font-medium text-xl">Events</h1>

                {/* Filter & Menu Buttons */}
                <div className="flex gap-2 relative">
                  <OptionButtons
                    active={category ? true : false}
                    callback={toggleCategoryFilter}
                    Icon={MdCategory}
                  />
                  <OptionButtons
                    active={date ? true : false}
                    callback={() =>
                      date
                        ? dispatch(setDate(""))
                        : dateInputRef?.current.showPicker()
                    }
                    Icon={FaCalendar}
                  />
                  <OptionButtons Icon={IoIosMenu} styles="md:hidden" />

                  {fltCategoryToggle && (
                    <FilterCategory openState={setFltCategoryToggle} />
                  )}

                  <input
                    ref={dateInputRef}
                    type="date"
                    className="hidden"
                    value={date}
                    onChange={(e) => dispatch(setDate(e.target.value))}
                  />
                </div>
              </nav>

              {/* Event List */}
              <Eventlist />
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center text-white/70">
              No events available
            </div>
          )}
        </div>
      </div>

      {loading && <ScLoader />}
    </div>
  );
}

export default Dashboard;
