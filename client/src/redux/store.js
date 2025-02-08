import { configureStore } from "@reduxjs/toolkit";

// slices
import userSlice from "./slices/user.slice";
import eventsSlice from "./slices/events.slice";
import filterSlice from "./slices/Filter.slice";
import uiSlice from "./slices/ui.slice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    events: eventsSlice,
    filter: filterSlice,
    ui: uiSlice,
  },
});
