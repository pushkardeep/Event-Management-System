import { updateAttendees } from "../../redux/slices/events.slice";
import { setToastMessage, setIsToatOpen } from "../../redux/slices/ui.slice";
import { socket } from "../../socket";

// Function to emit events
export const sendEvent = (event, data) => {
  console.log("event send", event);
  socket.emit(event, { data });
};

// Function to listen for events
export const listenForResponse = (dispatch) => {
  console.log("listening for events");
  socket.on("enrollmentResponse", (data) => {
    if (!data.success) return handleMessages(data?.message, dispatch);
    handleMessages(data?.message, dispatch);
    dispatch(
      updateAttendees({ eventId: data?.eventId, attendees: data?.attendees })
    );
  });
};

const handleMessages = (message, dispatch) => {
  dispatch(setToastMessage(message));
  dispatch(setIsToatOpen(true));
};
