import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: { isUserAdded: false },
  reducers: {
    addUser: (state, action) => {
      state.isUserAdded = action.payload;
    },
  },
});

export const { getUsers, addUserAndRefresh } = usersSlice.actions;
export default usersSlice.reducer;
