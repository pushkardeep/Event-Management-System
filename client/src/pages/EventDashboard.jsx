import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// Icons
import { MdCategory, MdError } from "react-icons/md";
import { FaCalendar } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";

// Components
import OptionButtons from "../components/commmon/OptionButtons";
import Toast from "../components/commmon/Toast";
import FilterCategory from "../components/FilterCategory";
import Eventlist from "../components/Eventlist";
import Dashboard from "../components/commmon/Dashboard";

// Services & Redux
import { get_events } from "../services/events/events.service";
import { setDate } from "../redux/slices/Filter.slice";
import {
  setDashboardOpen,
  setLoading,
  setToastMessage,
  setIsToatOpen,
  setIsFilterBoxOpen,
} from "../redux/slices/ui.slice";

const EventDashboard = () => {
  const dispatch = useDispatch();
  const dateInputRef = useRef();

  // Redux Selectors
  const { isToastOpen, isFilterBoxOpen } = useSelector((state) => state.ui);
  const { events } = useSelector((state) => state.events);
  const { date, category } = useSelector((state) => state.filter);
  const { user } = useSelector((state) => state.user);
  const token = localStorage.getItem("token");

  // Fetch Events on User Load
  useEffect(() => {
    if (!user) return;

    const fetchEvents = async () => {
      dispatch(setLoading(true));
      if (!events) {
        const { success, message } = await get_events(token, dispatch);
        dispatch(setLoading(false));
        if (!success) {
          dispatch(setIsToatOpen(true));
          dispatch(setToastMessage(message));
        }
      }
    };

    fetchEvents();
  }, [user, events, dispatch, token]);

  return (
    <Dashboard>
      <div className="flex-1 overflow-y-auto">
        {isToastOpen && <Toast Icon={MdError} />}
        {events?.length > 0 ? (
          <EventContent events={events} dateInputRef={dateInputRef} />
        ) : (
          <EmptyState />
        )}
      </div>
    </Dashboard>
  );
};

// Navbar Component
const Navbar = ({ dateInputRef }) => {
  const dispatch = useDispatch();
  const { category, date } = useSelector((state) => state.filter);
  const { isFilterBoxOpen } = useSelector((state) => state.ui);

  return (
    <nav className="w-full flex justify-between items-center px-6 py-3">
      <h1 className="text-white font-medium text-xl">Events</h1>
      <div className="flex gap-2 relative">
        <OptionButtons
          active={category}
          callback={() => dispatch(setIsFilterBoxOpen(!isFilterBoxOpen))}
          Icon={MdCategory}
        />
        <OptionButtons
          active={date}
          callback={() =>
            date ? dispatch(setDate("")) : dateInputRef.current.showPicker()
          }
          Icon={FaCalendar}
        />
        <OptionButtons
          active={isFilterBoxOpen}
          callback={() => dispatch(setDashboardOpen(true))}
          Icon={IoIosMenu}
          styles="md:hidden"
        />
        {isFilterBoxOpen && <FilterCategory />}
        <input
          ref={dateInputRef}
          type="date"
          className="hidden"
          value={date}
          onChange={(e) => dispatch(setDate(e.target.value))}
        />
      </div>
    </nav>
  );
};

// Event Content Component
const EventContent = ({ events, dateInputRef }) => (
  <div className="w-full h-full flex flex-col">
    <Navbar dateInputRef={dateInputRef} />
    <Eventlist events={events} />
  </div>
);

// Empty State
const EmptyState = () => (
  <div className="w-full h-full flex justify-center items-center text-white/70">
    No events available
  </div>
);

export default EventDashboard;
