import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [{ id: 0 }],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state) => {
      const user = {
        id: 1,
      };
      state.users.push(user);
    },

    removeUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
