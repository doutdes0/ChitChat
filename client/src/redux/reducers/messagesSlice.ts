import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { getAllMsgs } from "../thunks";

type Message = {
  isFromSelf: boolean;
  msg: string;
};

export type Payload_Msg = {
  userID: string;
  msg: string;
};

export interface MessagesState {
  [userID: string]: Message[];
}
const initialState: MessagesState = {};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    receive_msg: (state, action: PayloadAction<Payload_Msg>) => {
      const { userID, msg } = action.payload;
      state[userID].push({ isFromSelf: false, msg });
    },
    send_msg_io: (state, action: PayloadAction<Payload_Msg>) => {
      const { userID, msg } = action.payload;
      state[userID].push({ isFromSelf: true, msg });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getAllMsgs.fulfilled,
      (state, action: PayloadAction<MessagesState>) => {
        const messages = action.payload;
        const userID = Object.keys(messages)[0];
        state[userID] = messages.userID;
      }
    );
  },
});

export default messagesSlice.reducer;
export const { receive_msg, send_msg_io } = messagesSlice.actions;
