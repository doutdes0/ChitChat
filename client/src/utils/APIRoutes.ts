export enum APIRoutes {
  HOST = 'http://localhost:3001',
  LOGIN = '/API/auth/login',
  LOGOUT = '/API/auth/logout',
  SIGN_UP = '/API/auth/signup',
  ALL_USERS = '/API/auth/allusers',
  SET_AVATAR = '/API/auth/setavatar',
  SEND_MESSAGE = '/API/messages/addmsg',
  RECEIVE_MESSAGE = '/API/messages/getmsg',
  REFRESH = '/API/messages/refresh',
}
