import axiosI from '../utils/axios';
import { APIRoutes } from '../utils/APIRoutes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface LoginForm {
  username: string;
  password: string;
}

interface SignupForm extends LoginForm {
  email: string;
}

interface LoginRes {
  _id: string;
  username: string;
  accessToken: string;
  avatar: string;
}

interface SignupRes {
  msg?: string;
}

export const signup = createAsyncThunk('auth/signup', async (userForm: SignupForm, thunkAPI) => {
  try {
    const res = await axiosI.post<any, SignupRes>(APIRoutes.SIGN_UP, userForm);
    return res;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return thunkAPI.rejectWithValue(e.response?.data.msg);
    } else {
      return thunkAPI.rejectWithValue(e);
    }
  }
});

export const login = createAsyncThunk('auth/login', async (userForm: LoginForm, thunkAPI) => {
  try {
    const user = await axiosI.post<any, LoginRes>(APIRoutes.LOGIN, userForm);
    return user;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return thunkAPI.rejectWithValue(e.response?.data.msg);
    } else {
      return thunkAPI.rejectWithValue(e);
    }
  }
});

export const logout = createAsyncThunk('auth/logout', async (userID: string, thunkAPI) => {
  try {
    await axiosI.get(`${APIRoutes.LOGOUT}/${userID}`);
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return thunkAPI.rejectWithValue(e.response?.data.msg);
    } else {
      return thunkAPI.rejectWithValue(e);
    }
  }
});
