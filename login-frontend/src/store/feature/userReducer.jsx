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
    setUserData: (state, action) => {
      state.isLoggin = true;
      state.view = "Info"
      state.userData = action.payload;
    },
    setView: (state, action) => {
      state.view = action.payload;
    },
    logoutUser: () => initialState
  }
});

export const {setUserData, setView, logoutUser} = userSlice.actions;
export default userSlice.reducer;

