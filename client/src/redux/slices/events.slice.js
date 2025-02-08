import { createSlice } from "@reduxjs/toolkit";

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    events: null,
  },
  reducers: {
    addEvents: (state, action) => {
      state.events = action.payload;
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

export const { addEvents, updateAttendees } = eventsSlice.actions;
export default eventsSlice.reducer;
