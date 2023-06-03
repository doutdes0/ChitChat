import axios from '../utils/axios';
import { APIRoutes } from '../utils/APIRoutes';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface LoginForm {
  username: string;
  password: string;
}

interface SignupForm extends LoginForm {
  email: string;
}

export interface LoginRes {
  id: string;
  username: string;
  accessToken: string;
  refreshToken: string;
  avatar?: string;
}

export const signup = createAsyncThunk('auth/signup', async (userForm: SignupForm, thunkAPI) => {
  try {
    const { status } = await axios.post(APIRoutes.SIGN_UP, userForm);
    return status;
  } catch (e) {
    thunkAPI.rejectWithValue(e);
  }
});

export const login = createAsyncThunk('auth/login', async (userForm: LoginForm, thunkAPI) => {
  try {
    const { data } = await axios.post(APIRoutes.LOGIN, userForm);
    return data;
  } catch (e) {
    thunkAPI.rejectWithValue(e);
  }
});

export const logout = createAsyncThunk('auth/logout', async (userID: string, thunkAPI) => {
  try {
    await axios.get(`${APIRoutes.LOGOUT}/${userID}`);
  } catch (e) {
    thunkAPI.rejectWithValue(e);
  }
});
