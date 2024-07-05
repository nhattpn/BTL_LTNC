import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggin: false,
  userData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LogginOn: (state, action) => {
      state.isLoggin = true;
      state.userData = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    
    updateUserImage: (state, action) => {
      state.userData.image = action.payload;
      state.userData.imageLastUpdate = new Date();
    },
    logOut: () => initialState
  }
});

export const {LogginOn, setUserData, updateUserImage, logOut} = userSlice.actions;
export default userSlice.reducer;

