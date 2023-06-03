import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, LoginRes, logout, signup } from '../thunks';

interface AuthState {
  id: string;
  username: string;
  email: string;
  avatar: string | undefined;
  accessToken: string;
  loading: boolean;
  error: unknown;
}

const initialState: AuthState = {
  id: '',
  username: '',
  email: '',
  avatar: '',
  accessToken: '',
  loading: false,
  error: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(signup.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(login.fulfilled, (state, action: PayloadAction<LoginRes>) => {
      const { username, accessToken, avatar, id } = action.payload;
      state.id = id;
      state.username = username;
      state.accessToken = accessToken;
      state.avatar = avatar;
      state.loading = false;
    });
  },
});

export default authSlice.reducer;
