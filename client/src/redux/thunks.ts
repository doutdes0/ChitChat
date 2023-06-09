import axiosI from '../utils/axios';
import { APIRoutes } from '../utils/APIRoutes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axios from 'axios';

interface LoginForm {
  username: string;
  password: string;
}

interface SignupForm extends LoginForm {
  email: string;
}

export interface LoginRes {
  status: number;
  user: {
    id: string;
    username: string;
    accessToken: string;
    refreshToken: string;
    avatar?: string;
  };
}

interface SignupRes {
  msg?: string;
}

export const signup = createAsyncThunk('auth/signup', async (userForm: SignupForm, thunkAPI) => {
  try {
    const res = await axiosI.post<any, SignupRes>(APIRoutes.SIGN_UP, userForm);
    console.log('in thunk resp', res);
    return res;
  } catch (e) {
    console.log('in thunk rejected', e);
    if (axios.isAxiosError(e)) {
      return thunkAPI.rejectWithValue(e.response?.data.msg);
    } else {
      return thunkAPI.rejectWithValue(e);
    }
  }
});

export const login = createAsyncThunk('auth/login', async (userForm: LoginForm, thunkAPI) => {
  try {
    const { user } = await axiosI.post<any, LoginRes>(APIRoutes.LOGIN, userForm);
    return user;
  } catch (e) {
    thunkAPI.rejectWithValue(e);
  }
});

export const logout = createAsyncThunk('auth/logout', async (userID: string, thunkAPI) => {
  try {
    await axiosI.get(`${APIRoutes.LOGOUT}/${userID}`);
  } catch (e) {
    thunkAPI.rejectWithValue(e);
  }
});
