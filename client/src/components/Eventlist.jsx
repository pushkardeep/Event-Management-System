import React, { useMemo } from "react";
import { useSelector } from "react-redux";

// components
import EventCard from "./EventCard";

function EventList({ events }) {
  // Redux State
  const { category, date } = useSelector((state) => state.filter);

  // Memoized Filtered Events
  const filteredEvents = useMemo(() => {
    return events?.filter((event) => {
      const matchesCategory = !category || event.category === category;
      const matchesDate = !date || event.date?.split("T")[0] === date;
      return matchesCategory && matchesDate;
    });
  }, [events, category, date]);

  return (
    <div className="flex-1 relative">
      {filteredEvents?.length > 0 ? (
        <div className="w-full max-w-[1320px] mx-auto h-full grid grid-cols-1 min-[500px]:grid-cols-2 min-[1060px]:grid-cols-3 xl:grid-cols-4 gap-3 px-4 pb-4">
          {filteredEvents.map((event, index) => (
            <EventCard key={event.id || index} data={event} />
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center text-white/70">
          No events available with current filters
        </div>
      )}
    </div>
  );
}

export default EventList;
