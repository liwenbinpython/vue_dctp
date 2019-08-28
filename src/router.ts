import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/views/layout/Layout.vue';

Vue.use(Router);

/*
  redirect:                      if `redirect: noredirect`, it won't redirect if click on the breadcrumb
  meta: {
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    hidden: true                 if true, this route will not show in the sidebar (default is false)
  }
*/

export default new Router({
  // mode: 'history',  // Disabled due to Github Pages doesn't support this, enable this if you need.
  scrollBehavior: (to: any, from: any, savedPosition:any) => {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: (resolve) => require(/* webpackChunkName: "login" */ ['@/views/user/login/index.vue'], resolve),
      meta: { hidden: true},
    },
    {
      path: '/register',
      name: 'login',
      component: (resolve) => require(/* webpackChunkName: "login" */ ['@/views/user/login/register.vue'], resolve),
      meta: { hidden: true},
    },
    {
      path: '/forget',
      name: 'forget',
      component: (resolve) => require(/* webpackChunkName: "login" */ ['@/views/user/login/forget.vue'], resolve),
      meta: { hidden: true},
    },
    {
      path: '/404',
      name: '404',
      component: (resolve) => require(/* webpackChunkName: "404" */ ['@/views/error/404.vue'], resolve) ,
      meta: { hidden: true },
    },
    {
      path: '/',
      name: 'home',
      component: (resolve) => require(['@/views/home/home/index.vue'], resolve),
      meta: { hidden: true },
    },
    /* 公告列表 */
    {
      path: '/notice',
      name: 'notice',
      redirect: '/notice/index',
      component: (resolve) => require(['@/views/home/notice/index.vue'], resolve),
      meta: { hidden: true },
      children: [
        {
          path: 'index',
          name: 'noticeList',
          component: (resolve) => require(['@/views/home/notice/noticeList.vue'], resolve),
          meta: { hidden: true },
        },
        {
          path: 'detail',
          name: 'noticeDetail',
          component: (resolve) => require(['@/views/home/notice/noticeDetail.vue'], resolve),
          meta: { hidden: true },
        }
      ],
    },
    {
      path: '/course',
      name: 'course',
      component: (resolve) => require(['@/views/course/course/index.vue'],resolve),
      meta: { hidden: true },
    },
    {/* 商城路径 */
      path: '/strategy',
      name: 'malls',
      component: (resolve) => require(['@/views/malls/index.vue'], resolve),
      meta: { hidden: true },
    },
    {/* 商城路径 */
      path: '/robot',
      name: 'robot',
      component: (resolve) => require(['@/views/malls/robot.vue'], resolve),
      meta: { hidden: true },
    },
    {/* 商城路径 */
      path: '/server',
      name: 'server',
      component: (resolve) => require(['@/views/malls/serve.vue'], resolve),
      meta: { hidden: true },
    },
    {/* 商城详情 */
      path: '/mall/form',
      name: 'MallDetail',
      component: (resolve) => require(['@/views/malls/form.vue'], resolve),
      meta: { hidden: true },
    },
    {/* 商城详情 */
      path: '/mall/detail',
      name: 'MallDetail',
      component: (resolve) => require(['@/views/malls/detail.vue'], resolve),
      meta: { hidden: true },
    },
    {/* 商城续费商品 */
      path: '/mall/renew',
      name: 'MallRenew',
      component: (resolve) => require(['@/views/malls/renew.vue'], resolve),
      meta: { hidden: true },
    },
    {/* 工单路径 */
      path: '/order',
      component: Layout,
      redirect: '/order/index',
      name: 'Order',
      meta: { title: '我的工单', icon: 'myorder', category: 'order' },
      children: [
        {
          path: 'index',
          name: 'order',
          component: (resolve) => require(['@/views/order/index.vue'], resolve),
        }
      ],
    },
    {/* 工单详情 */
      path: '/orderDetail',
      component: Layout,
      redirect: '/orderDetail/detail',
      name: 'Order',
      meta: { title: '工单详情', category: 'order_detail' },
      children: [
        {
          path: 'detail',
          name: 'order_detail',
          component: (resolve) => require(['@/views/order/detail.vue'], resolve)
        }
      ],
    },
    
    {/* 提交工单 */
      path: '/ordersub',
      component: Layout,
      redirect: '/ordersub/index',
      name: 'Order',
      meta: { title: '提交工单', icon: 'form', category: 'order' },
      children: [{
        path: 'index',
        name: 'sub',
        component: (resolve) => require(['@/views/order/sub.vue'], resolve),
      }],
    },
    /* 用户基本资料 */
    {
      path: '/user',
      component: Layout,
      redirect: '/user/index',
      name: 'Info',
      meta: { title: '基本资料', icon: 'user', category: 'user' },
      children: [{
        path: 'index',
        name: 'userInfo',
        component: (resolve) => require(['@/views/user/info/index.vue'], resolve),
      }],
    },
    {
      path: '/userOrder',
      component: Layout,
      redirect: '/user/order',
      name: 'userOrder',
      meta: { title: '我的订单', icon: 'nested', category: 'user' },
      children: [{
        path: '/user/order',
        name: 'Order',
        component: (resolve) => require(['@/views/user/order/index.vue'], resolve),
      }],
    },
    {
      path: '/loginlog',
      component: Layout,
      redirect: '/user/loginlog',
      name: 'Log',
      meta: { title: '登录日志', icon: 'loginlog', category: 'user' },
      children: [{
        path: '/user/loginlog',
        name: 'userLog',
        component: (resolve) => require(['@/views/user/loginlog/index.vue'], resolve),
      }],
    },
    {
      path: '/userOperation',
      component: Layout,
      redirect: '/user/operation',
      name: 'userOperation', 
      meta: { title: '操作日志', icon: 'operation', category: 'user' },
      children: [{
        path: '/user/operation',
        name: 'Operation',
        component: (resolve) => require(['@/views/user/operation/index.vue'], resolve),
      }],
    },
    {
      path: "/userAgent",
      component: Layout,
      redirect: "/user/agent",
      name: "userAgent",
      meta: { title: "代理管理", icon: "test", category: "user" },
      children: [
        {
          path: "/user/agent",
          name: "Agent",
          component: (resolve) => require(["@/views/user/agent/index.vue"], resolve),
          meta: { title: "代理详情", icon: "test", category: "user" }
        },
        {
          path: "/user/deposit",
          name: "Deposit",
          component: (resolve) => require(["@/views/user/agent/deposit.vue"], resolve),
          meta: { title: "提取佣金", icon: "test", category: "user" }
        }
      ]
    },
    {
      path: '/userApple',
      component: Layout,
      redirect: '/user/apple',
      name: 'userApple',
      meta: { title: '申请管理', icon: 'test', category: 'user' },
      children: [{
        path: '/user/apple',
        name: 'Apple',
        component: (resolve) => require(['@/views/user/apple/index.vue'], resolve),
        meta: { title: '申请记录', icon: 'apply', category: 'user' },
      },
      // {
      //   path: '/user/progress',
      //   name: 'Progress',
      //   component: (resolve) => require('@/views/user/apple/progress.vue'),
      //   meta: { title: '申请进度', icon: 'test', category: 'user' },
      // }
    ]
    },
    {/* 全部消息 */
      path: '/message',
      name: 'Message',
      meta: { title: 'message', icon: 'email', category: 'message' },
      component: (resolve) => require(/* webpackChunkName: "dashboard" */ ['@/views/user/message/index.vue'], resolve),
    },
    {/* 已读消息 */
      path: '/message/read',
      name: 'Read',
      meta: { title: 'message', icon: 'email', category: 'message' },
      component: (resolve) => require(/* webpackChunkName: "dashboard" */ ['@/views/user/message/read.vue'], resolve),
    },
    {/* 未读消息 */
      path: '/message/unread',
      name: 'unread',
      meta: { title: 'message', icon: 'email', category: 'message' },
      component: (resolve) => require(/* webpackChunkName: "dashboard" */ ['@/views/user/message/unread.vue'], resolve),
    },
    {/* 我的资源 */
      path: '/resources',
      component: Layout,
      redirect: '/resources/index',
      name: 'resources',
      meta: { title: 'resources', icon: 'resources', category: 'console' },
      children: [
        {
          path: 'index',
          name: 'resources',
          component: (resolve) => require(/* webpackChunkName: "dashboard" */ ['@/views/consoles/resources/index.vue'], resolve),
        },
      ]
    },
    { /* 查看我的授权 */
      path: '/myauthor',
      name: 'myauthor',
      redirect: '/myauthor/index',
      component: Layout,
      meta:{ title: 'myauthor', category:'resources'},
      children:[{
        path: 'index',
        name: 'myauthor',
        component: (resolve) => require(['@/views/consoles/resources/my_authorization.vue'], resolve),
      }]
    },
    {
      path: '/service',
      component: Layout,
      redirect: '/service/index',
      name: 'Service',
      meta: { title: 'service', icon: 'test', category: 'console' },
      children: [{
        path: 'index',
        name: 'Log',
        component: (resolve) => require(/* webpackChunkName: "dashboard" */ ['@/views/consoles/service/index.vue'], resolve),
      }],
    },
    {/* 我的服务器 */
      path: '/myserver',
      name: 'myserver',
      component: Layout,
      redirect: '/myserver/index',
      meta: { title: 'myserver', icon: 'server', category: 'console' },
      children: [
        {
          path: 'index',
          name: 'index',
          component: (resolve) => require(['@/views/consoles//myserver/index.vue'], resolve),
        },
      ]
    },
    {
      path: '/accredit',
      name: 'accredit',
      redirect: '/accredit/index',
      component: Layout,
      meta:{ title: 'accredit', category:'resources'},
      children:[{
        path: 'index',
        name: 'accredit',
        component: (resolve) => require(['@/views/consoles/resources/accredit.vue'], resolve),
      }]
    },
    {/* 控制台下交易所列表 */
      path: '/exchange',
      name: 'exchange',
      component: Layout,
      redirect: '/exchange/index',
      meta: { title: 'exchange', icon: 'exchange', category: 'console'},
      children: [
        {
          path: 'index',
          name: 'index',
          component: (resolve) => require(['@/views/consoles/exchange/exchangelist/index.vue'], resolve),
        },
      ]
    },
    {/* api-key列表 */
      path: '/addkey',
      name: 'addkey',
      component: Layout,
      redirect: '/addkey/index',
      meta: { title:'api-key list', category:'exchange'},
      children: [
        {
          path: 'index',
          name: 'addkey',
          component: (resolve) => require(['@/views/consoles/exchange/keylist/index.vue'], resolve),
        },
      ]
    },
    {
      path:'/balance',
      name:'balance',
      component: Layout,
      redirect: '/balance/index',
      meta: {title: 'balance list', category: 'exchange'},
      children: [
        {
          path: 'index',
          name: 'balance',
          component: (resolve) => require(['@/views/consoles/exchange/balancelist/index.vue'], resolve),
        }
      ]
    },
    {/* 交易对列表 */
      path: '/addsymbol',
      name: 'addsymbol',
      component: Layout,
      redirect: '/addsymbol/index',
      meta: { title:'symbol list', category:'exchange'},
      children: [
        {
          path: 'index',
          name: 'addkey',
          component: (resolve) => require(['@/views/consoles/exchange/symbollist/index.vue'], resolve),
        },
      ]
    },
    {/* 机器人管理 */
      path: '/robots',
      name: 'robots',
      component: Layout,
      redirect: '/robots/index',
      meta: { title: 'robots', icon: 'robot', category: 'console'},
      children: [
        {
          path: 'index',
          name: 'index',
          component: (resolve) => require(['@/views/consoles/robots/robot/index.vue'], resolve),
        },
      ]
    },
    {/* 运行日志 */
      path: '/runninglog',
      name: 'runninglog',
      component: Layout,
      redirect: '/runninglog/index',
      meta: { title: 'runninglog', category: 'robots'},
      children: [
        {
          path: 'index',
          name: 'log',
          component: (resolve) => require(['@/views/consoles/robots/runninglog/index.vue'], resolve),
        },
      ]
    },
    {/* 添加机器人 */
      path: '/addrobot',
      name: 'addrobot',
      component: Layout,
      redirect: '/addrobot/index',
      meta: { title: 'addrobot', category: 'robots'},
      children: [
        {
          path: 'index',
          name: 'add',
          component: (resolve) => require(['@/views/consoles/robots/addrobot/index.vue'], resolve),
        },
      ]
    },
    {/* 自主交易 */
      path: '/transaction',
      name: 'transaction',
      component: Layout,
      redirect: '/transaction/index',
      meta: { title: 'transaction', icon: 'transaction', category: 'console'},
      children: [
        {
          path: 'index',
          name: 'index',
          component: (resolve) => require(['@/views/consoles/transaction/index.vue'], resolve),
        },
      ]
    },
    {/* 订单查询 */
      path: '/orderquery',
      name: 'orderquery',
      component: Layout,
      redirect: '/orderquery/index',
      meta: { title: 'orderquery',  category: 'transaction'},
      children: [
        {
          path: 'index',
          name: 'order',
          component: (resolve) => require(['@/views/consoles/transaction/order/index.vue'], resolve),
        },
      ]
    },
    {/* 机器人下单查询 */
      path: '/robotorderquery',
      name: 'robotorderquery',
      component: Layout,
      redirect: '/robotorderquery/index',
      meta: { title: 'robotorderquery',  category: 'transaction'},
      children: [
        {
          path: 'index',
          name: 'order',
          component: (resolve) => require(['@/views/consoles/transaction/robotorder/index.vue'], resolve),
        },
      ]
    },
    // {/* 摇杆控盘 */
    //   path: '/rocker',
    //   name: 'rocker',
    //   component: Layout,
    //   redirect: '/rocker/index',
    //   meta: { title: '摇杆控盘', icon: 'monitoring', category: 'console' },
    //   children: [
    //     {
    //       path: 'index',
    //       name: 'index',
    //       component: (resolve) => require(['@/views/consoles/rocker/index.vue'], resolve),
    //     },
    //   ]
    // },
    {/* 监控 */
      path: '/monitoring',
      name: 'monitoring',
      component: Layout,
      redirect: '/monitoring/index',
      meta: { title: 'monitoring', icon: 'monitoring', category: 'console'},
      children: [
        {
          path: 'index',
          name: 'index',
          component: (resolve) => require(['@/views/consoles/monitoring/robot/index.vue'], resolve),
        },
      ]
    },
    {/* 添加j监控 */
      path: '/addmonitoring',
      name: 'addmonitoring',
      component: Layout,
      redirect: '/addmonitoring/index',
      meta: { title: 'addmonitoring', category: 'robots'},
      children: [
        {
          path: 'index',
          name: 'add',
          component: (resolve) => require(['@/views/consoles/monitoring/addmonitoring/index.vue'], resolve),
        },
      ]
    },
    {/* 回收站 */
      path: '/recycled',
      name: 'recycled',
      component: Layout,
      redirect: '/recycled/index',
      meta: { title: '回收站', icon: 'recycled', category: 'console' },
      children: [
        {
          path: 'index',
          name: 'index',
          component: (resolve) => require(['@/views/consoles/recycled/index.vue'], resolve),
        },
      ]
    },
    {
      path: '*',
      redirect: '/404',
      meta: { hidden: true },
    },
  ],
});
