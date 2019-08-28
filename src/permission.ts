import router from './router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Message } from 'element-ui';
import { getToken } from '@/utils/auth';
import { Route } from 'vue-router';
import { UserModule } from '@/store/modules/user';

NProgress.configure({ showSpinner: false });

const whiteList = ['/login', '/course', '/register', '/home' , '/' , '/order' , '/forget', '/strategy', '/robot', '/server'];

router.beforeEach((to: Route, from: Route, next: any) => {
  NProgress.start();
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done(); // If current page is dashboard will not trigger afterEach hook, so manually handle it
    } else {
      if (UserModule.role.length === 0) {
        UserModule.GetInfo().then((res :any) => {
          next();
        }).catch((err) => {
          UserModule.FedLogOut().then(() => {
            Message.error(err || 'Verification failed, please login again');
            next({ path: '/' });
          });
        });
      } else {
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}?${to.fullPath.split('?')[1]}`); // Redirect to login page
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
