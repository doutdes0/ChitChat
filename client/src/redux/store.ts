import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import usersReducer from './reducers/usersSlice';
import messagesReducer from './reducers/messagesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    messages: messagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
