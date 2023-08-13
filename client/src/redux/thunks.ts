import { axiosPublic } from "../utils/axios";
import { APIRoutes } from "../utils/APIRoutes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../utils/axios";
import axios from "axios";
import { UsersState } from "./reducers/usersSlice";
import { MessagesState } from "./reducers/messagesSlice";

interface LoginForm {
  username: string;
  password: string;
}

interface SignupForm extends LoginForm {
  email: string;
}

interface LoginRes {
  data: {
    user: {
      _id: string;
      username: string;
      accessToken: string;
      avatar: string;
    };
  };
}
interface GetAllUsersRes {
  data: UsersState;
}
interface GetAllMsgsRes {
  data: MessagesState;
}

interface SetAvatarParams {
  userID: string;
  avatar: string;
}
interface GetAllMsgsParams {
  from: string;
  to: string;
}
interface AddMsgParams extends GetAllMsgsParams {
  msg: string;
}

export const signup = createAsyncThunk(
  "auth/signup",
  async (userForm: SignupForm, thunkAPI) => {
    try {
      const res = await axiosPublic.post(APIRoutes.SIGN_UP, userForm);
      return res;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return thunkAPI.rejectWithValue(e.response?.data.msg);
      } else {
        return thunkAPI.rejectWithValue(e);
      }
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userForm: LoginForm, thunkAPI) => {
    try {
      const res = await axiosPublic.post<any, LoginRes>(
        APIRoutes.LOGIN,
        userForm
      );
      return res.data.user;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return thunkAPI.rejectWithValue(e.response?.data.msg);
      } else {
        return thunkAPI.rejectWithValue(e);
      }
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (userID: string, thunkAPI) => {
    try {
      await axiosPublic.get(`${APIRoutes.LOGOUT}/${userID}`);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return thunkAPI.rejectWithValue(e.response?.data.msg);
      } else {
        return thunkAPI.rejectWithValue(e);
      }
    }
  }
);

export const setAvatar = createAsyncThunk(
  "API/setAvatar",
  async (data: SetAvatarParams, thunkAPI) => {
    try {
      await axiosPrivate.post(`${APIRoutes.SET_AVATAR}/${data.userID}`, {
        avatar: data.avatar,
      });
      return data.avatar;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return thunkAPI.rejectWithValue(e.response?.data.msg);
      } else {
        return thunkAPI.rejectWithValue(e);
      }
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "API/allusers",
  async (_, thunkAPI) => {
    try {
      const res = await axiosPrivate.get<any, GetAllUsersRes>(
        APIRoutes.ALL_USERS
      );
      return res.data.list;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return thunkAPI.rejectWithValue(e.response?.data.msg);
      } else {
        return thunkAPI.rejectWithValue(e);
      }
    }
  }
);

export const getAllMsgs = createAsyncThunk(
  "API/getAllMsgs",
  async (data: GetAllMsgsParams, thunkAPI) => {
    try {
      const res = await axiosPrivate.get<GetAllMsgsParams, GetAllMsgsRes>(
        APIRoutes.GET_ALL_MESSAGES,
        { params: data }
      );
      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return thunkAPI.rejectWithValue(e.response?.data.msg);
      } else {
        return thunkAPI.rejectWithValue(e);
      }
    }
  }
);
export const sendMsgAPI = createAsyncThunk(
  "API/addMsg",
  async (data: AddMsgParams, thunkAPI) => {
    try {
      await axiosPrivate.post(APIRoutes.SEND_MESSAGE, data);
      return;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return thunkAPI.rejectWithValue(e.response?.data.msg);
      } else {
        return thunkAPI.rejectWithValue(e);
      }
    }
  }
);
