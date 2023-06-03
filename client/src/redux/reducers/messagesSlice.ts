import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
});

export default messagesSlice.reducer;
