import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "../thunks";

export interface UsersState {
  list: {
    _id: string;
    avatar: string;
    username: string;
  }[];
}

const initialState: UsersState = { list: [] };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export default usersSlice.reducer;
