import { createSlice } from '@reduxjs/toolkit';
import { login, setAvatar } from '../thunks';
import { PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  id: string;
  username: string;
  email: string;
  avatar: string;
  accessToken: string;
}

const initialState: AuthState = {
  id: '',
  username: '',
  email: '',
  avatar: '',
  accessToken: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      state = initialState;
    },
    setUserOnReload: (state, action: PayloadAction<AuthState>) => {
      const { username, avatar, id, accessToken } = action.payload;
      state.id = id;
      state.username = username;
      state.avatar = avatar;
      state.accessToken = accessToken;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(signup.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(signup.rejected, (state) => {
    //   state.loading = false;
    // });
    // builder.addCase(signup.fulfilled, (state) => {
    //   state.loading = false;
    // });
    // builder.addCase(login.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(login.rejected, (state) => {
    //   state.loading = false;
    // });
    builder.addCase(login.fulfilled, (state, action) => {
      const { username, avatar, _id, accessToken } = action.payload;
      state.id = _id;
      state.username = username;
      state.avatar = avatar;
      state.accessToken = accessToken;
    });
    builder.addCase(setAvatar.fulfilled, (state, action) => {
      state.avatar = action.payload;
    });
  },
});

export default authSlice.reducer;
export const { logOut, setUserOnReload } = authSlice.actions;
