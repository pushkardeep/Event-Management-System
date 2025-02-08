import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { sendEvent } from "../services/socket/socket";

// componenets
import BigButton from "./commmon/BigButton";
import {
  setIsToatOpen,
  setLoading,
  setToastMessage,
} from "../redux/slices/ui.slice";

import { deleteEvent } from "../services/events/events.service";

function EventCard({ data }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const { user } = useSelector((state) => state.user);
  const { isDeleteAble } = useSelector((state) => state.ui);

  const handleClick = (id) => {
    sendEvent("attendeeChanged", { id });
  };

  const handleDelete = async (id) => {
    // eventId
    dispatch(setLoading(true));
    const { message } = await deleteEvent(id, token, dispatch);

    dispatch(setIsToatOpen(true));
    dispatch(setToastMessage(message));

    dispatch(setLoading(false));
  };

  return (
    <div className="w-full max-h-fit border rounded-lg shadow-md bg-gray-800 border-gray-700 hover:bg-gray-700 transition-all p-3">
      {/* Event Image */}
      <div className="relative">
        <img
          className="w-full aspect-video object-cover rounded-lg"
          src={data?.cover}
          alt="Event Thumbnail"
        />
      </div>

      {/* Event Details */}
      <div className="mt-3">
        {/* Category Tag */}
        <span className="inline-block bg-blue-500 text-white text-[10px] sm:text-xs font-medium px-2 py-1 rounded-md">
          {data?.category}
        </span>

        {/* Event Title */}
        <h5 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mt-2 line-clamp-1">
          {data?.title}
        </h5>

        {/* Host Name */}
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          Hosted by <span className="font-medium">{data?.owner?.name}</span>
        </p>

        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
          {data?.description}
        </p>

        {/* Event Info */}
        <div className="mt-3 text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <p className="flex items-center">
            📅
            <span className="ml-2">
              {data?.date?.split("T")[0]} | {data?.time}
            </span>
          </p>
          <p className="flex items-center">
            📍 <span className="ml-2">{data?.location}</span>
          </p>
          <p className="flex items-center">
            👥 <span className="ml-2">{data?.attendees?.length} Attendees</span>
          </p>
        </div>

        {/* Enroll Button */}
        {!isDeleteAble && (
          <BigButton
            callback={() =>
              user?._id === data?.owner?._id
                ? navigate("/user_events")
                : handleClick(data?._id)
            }
            title={
              user?._id === data?.owner?._id ? "Manage event" : "Enroll Now"
            }
            styles={"mt-4"}
          />
        )}

        {isDeleteAble && (
          <BigButton
            callback={() => handleDelete(data?._id)}
            title={"Delete Event"}
            styles={"mt-4"}
          />
        )}
      </div>
    </div>
  );
}

export default EventCard;
