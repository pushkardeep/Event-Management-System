import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    category: "",
    date: "",
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const { setCategory, setDate } = filterSlice.actions;

export default filterSlice.reducer;
