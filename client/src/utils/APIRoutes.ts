export enum APIRoutes {
  HOST = "http://192.168.0.54:3001",
  //auth
  LOGIN = "/API/auth/login",
  LOGOUT = "/API/auth/logout",
  SIGN_UP = "/API/auth/signup",
  REFRESH = "/API/auth/refresh",
  //user
  ALL_USERS = "/API/allusers",
  SET_AVATAR = "/API/setavatar",
  SEND_MESSAGE = "/API/addMsg",
  RECEIVE_MESSAGE = "/API/getmsg",
  GET_ALL_MESSAGES = "/API/allMsgs",
}
