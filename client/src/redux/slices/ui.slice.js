import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isLoading: false,
    isDashboardOpen: false,
    toastMessage: "",
    isToastOpen: false,
    isFilterBoxOpen: false,
    isDeleteAble: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setDashboardOpen: (state, action) => {
      state.isDashboardOpen = action.payload;
    },

    setToastMessage: (state, action) => {
      state.toastMessage = action.payload;
    },

    setIsToatOpen: (state, action) => {
      state.isToastOpen = action.payload;
    },

    setIsFilterBoxOpen: (state, action) => {
      state.isFilterBoxOpen = action.payload;
    },

    setIsDeleteAble: (state, action) => {
      state.isDeleteAble = action.payload;
    },
  },
});

export const {
  setLoading,
  setDashboardOpen,
  setToastMessage,
  setIsToatOpen,
  setIsFilterBoxOpen,
  setIsDeleteAble,
} = uiSlice.actions;

export default uiSlice.reducer;
