import Mock from 'mockjs';
import userAPI from './user';
import tableAPI from './table';
import noticeAPI from './notice';

// User
Mock.mock(/\/user\/login/, 'post', userAPI.login);
Mock.mock(/\/user\/info/, 'get', userAPI.getInfo);
Mock.mock(/\/user\/logout/, 'post', userAPI.logout);

// Table
Mock.mock(/\/table\/list/, 'get', tableAPI.list);

// Notice
Mock.mock(/\/notice\/list/, 'post', noticeAPI.list);
Mock.mock(/\/notice\/detail/, 'post', noticeAPI.detail);

export default Mock;
