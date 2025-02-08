import { createSlice } from "@reduxjs/toolkit";

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    events: null,
    user_events: null,
  },
  reducers: {
    addEvents: (state, action) => {
      state.events = action.payload;
    },

    addUserEvents: (state, action) => {
      state.user_events = action.payload;
    },

    removeUserEvents: (state, action) => {
      state.user_events = state.user_events.filter(
        (e, i) => action.payload !== e._id
      );
    },

    updateAttendees: (state, action) => {
      const { eventId, attendees } = action.payload;
      const eventIndex = state.events.findIndex(
        (event) => event._id === eventId
      );

      if (eventIndex !== -1) {
        state.events[eventIndex].attendees.length = attendees; // Update the attendees count
      }
    },
  },
});

export const { addEvents, addUserEvents, updateAttendees, removeUserEvents } =
  eventsSlice.actions;
export default eventsSlice.reducer;
