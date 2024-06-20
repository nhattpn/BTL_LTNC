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
    setAdminData: (state, action) => {
      state.isLoggin = true;
      state.view = "Info";
      state.adminData = action.payload;
    },
    setView: (state, action) => {
      state.view = action.payload;
    },
    logoutAdmin: () => initialState
  }
});

export const {setAdminData, setView, logoutAdmin} = adminSlice.actions;
export default adminSlice.reducer;

