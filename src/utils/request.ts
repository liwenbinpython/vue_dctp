import axios from 'axios';
import qs from 'qs';
import { Message, MessageBox } from 'element-ui';
import { getToken } from '@/utils/auth';
import { UserModule } from '@/store/modules/user';
import Router from 'vue-router'

const service = axios.create({
  //baseURL: process.env.NODE_ENV === 'production' ? 'https://www.sicklequant.com/api/' : 'http://47.74.186.8:8010/',
  baseURL: '/api', //生产
  // baseURL: 'http://47.244.44.174:8010/',
  // baseURL: http://47.74.186.8:8010
  // baseURL: 'http://47.74.186.8:8010/',
  timeout: 10000,
});
axios.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
}
// Request interceptors
service.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (config.method === 'post'  ) {
      if (token) {
        config.data.token = token;
      }
      config.data = qs.stringify(config.data);
    }
    if (config.method === 'get' || config.method === 'delete' || config.method === 'put' || config.method === 'update'   ) {
      if (token) {
        config.params = {
          ...config.params,
          token,
        };
      }
    }
    return config;
  },

  (error) => {
    Promise.reject(error);
  },
);

// Response interceptors
service.interceptors.response.use(
  (response) => {
    // Some example codes here:
    // code == 20000: valid
    // code == 50008: invalid token
    // code == 50012: already login in other place
    // code == 50014: token expired
    // code == 60204: account or password is incorrect
    // You can change this part for your own usage.
    const res = response.data;
    if(res.msg === '用户登录信息已经失效'){
      window.location.href = '#/login';
      UserModule.LogOut()
      return response.data
    }
    if (res.status !== 200) {
      if (res.msg === '该邮箱已存在'){
        return response.data;
      }
      Message({
        // message: res.message,
        message: res.msg,
        type: 'error',
        duration: 5 * 1000,
      });
      // if (res.status === 400) {
      //   Message({
      //     message: res.msg,
      //     type: 'warning',
      //   });
      // }
      if (res.status === 40000 || res.status === 50012 || res.status === 50014) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning',
          },
        ).then(() => {
          UserModule.FedLogOut().then(() => {
            // location.reload();  // To prevent bugs from vue-router
          });
        });
      }
      //return Promise.reject('error with code: ' + res.status);
    }else {
      return response.data;
    }
  },

  (error) => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  },
);

export default service;
