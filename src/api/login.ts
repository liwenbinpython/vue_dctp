import request from '@/utils/request';

export const login = (username: string, password: string) =>
  request({
    url: '/user/login',
    method: 'post',
    data: {
      user_name: username,
      password,
    },
  });

export const getInfo = (token: string) =>
  request({
    url: '/user/index',
    method: 'get',
    params: { token },
  });

export const logout = () =>
  request({
    url: '/user/logout',
    method: 'post',
  });

export const Registers = (data: any) =>
  request({
    url: '/user/register',
    method: 'post',
    data
  });

export const emailSend = (email: any) =>
  request({
    url: '/get_email_code',
    method: 'post',
    data: {email}
  });

export const Forgets = (data: any) =>
  request({
    url: '/user/retrieve_password ',
    method: 'post',
    data
  });  
export const checkEmail = (user_email: any) =>
  request({
    url: '/user/exist_user_email',
    method: 'get',
    params: { user_email }
  });

