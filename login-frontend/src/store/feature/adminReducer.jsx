import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggin: false,
  adminData: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    LogginOn: (state, action) => {
      state.isLoggin = true;
      state.adminData = action.payload;
    },
    setAdminData: (state, action) => {
      state.adminData = action.payload;
    },
    logOut: () => initialState
  }
});

export const {LogginOn, setAdminData, logOut} = adminSlice.actions;
export default adminSlice.reducer;

