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
  },
});

export const { addEvents } = eventsSlice.actions;

export default eventsSlice.reducer;
