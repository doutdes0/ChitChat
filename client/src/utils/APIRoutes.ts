export enum APIRoutes {
  HOST = 'http://localhost:3001',
  //auth
  LOGIN = '/API/auth/login',
  LOGOUT = '/API/auth/logout',
  SIGN_UP = '/API/auth/signup',
  REFRESH = '/API/auth/refresh',
  //user
  ALL_USERS = '/API/allusers',
  SET_AVATAR = '/API/setavatar',
  SEND_MESSAGE = '/API/messages/addmsg',
  RECEIVE_MESSAGE = '/API/messages/getmsg',
}
