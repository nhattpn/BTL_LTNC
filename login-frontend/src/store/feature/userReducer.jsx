import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggin: false,
  view: null,
  userData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LogginOn: (state, action) => {
      state.isLoggin = true;
      state.view = "Info"
      state.userData = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setView: (state, action) => {
      state.view = action.payload;
    },
    logOut: () => initialState
  }
});

export const {LogginOn, setUserData, setView, logOut} = userSlice.actions;
export default userSlice.reducer;

