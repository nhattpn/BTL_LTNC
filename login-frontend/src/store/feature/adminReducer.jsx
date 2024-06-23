import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggin: false,
  view: null,
  adminData: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    LogginOn: (state, action) => {
      state.isLoggin = true;
      state.view = "Info";
      state.adminData = action.payload;
    },
    setAdminData: (state, action) => {
      state.adminData = action.payload;
    },
    setView: (state, action) => {
      state.view = action.payload;
    },
    logOut: () => initialState
  }
});

export const {LogginOn, setAdminData, setView, logOut} = adminSlice.actions;
export default adminSlice.reducer;

