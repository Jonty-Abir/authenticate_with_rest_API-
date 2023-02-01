import { createSlice } from "@reduxjs/toolkit";

const userDetailsSclice = createSlice({
  name: "user_details",
  initialState: {
    userName: '',
    email: '',
  },
  reducers: {
    setStateStore: (state, { payload }) => {
      state.userName = payload;
    },
  },
});

export default userDetailsSclice.reducer;
export const { setStateStore } = userDetailsSclice.actions;
