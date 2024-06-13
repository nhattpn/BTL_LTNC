import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggin: false,
  userData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      return {isLoggin: true, ...action.payload};
    },
    logout: () => initialState
  }
});

export const {setUserData, logout} = userSlice.actions;
export default userSlice.reducer;

