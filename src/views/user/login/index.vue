<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <h3 class="title">欢迎登录</h3>
      <div class="input-desc">账号：</div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon name="user" />
        </span>
        <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on" placeholder="请输入用户名或者邮箱" />
      </el-form-item>
      <div class="input-desc">密码：</div>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon name="password" />
        </span>
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="请输入密码"
          @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :name="pwdType === 'password' ? 'eye-off' : 'eye-on'" />
        </span>
      </el-form-item>
      <!-- <div class="input-desc">滑动验证：</div>
      <el-form-item prop="verify">
        <el-input>3213123</el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button :loading="loading" type="shape" style="width:100%;height:50px;" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
      <div class="forget" >
        <router-link to="/forget" >忘记密码？</router-link>
      </div>

    </el-form>
  </div>
</template>

<script lang="ts">
import { isValidUsername } from '@/utils/validate';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { UserModule } from '@/store/modules/user';
import { Route } from 'vue-router';
import { ElForm } from 'element-ui/types/form';
import { setInterval } from 'timers';
import util from '@/utils/session';
import router from '../../../router';

const validateUsername = (rule: any, value: string, callback: any) => {
  // if (!isValidUsername(value)) {
  //   callback(new Error('请输入正确的用户名'));
  // } else {
  //   callback();
  // }
  callback();
};
const validatePass = (rule: any, value: string, callback: any) => {
  if (value.length < 6) {
    callback(new Error('密码不能小于6位'));
  }else if(value.indexOf(" ")!=-1){
    callback(new Error('密码不能含有空格'));
  } else {
    callback();
  }
};

@Component
export default class Login extends Vue {
  private loginForm = {
    username: '',
    password: '',
  };
  private loginRules = {
    username: [{ required: true, trigger: 'blur', validator: validateUsername }],
    password: [{ required: true, trigger: 'blur', validator: validatePass }],
  };
  private loading = false;
  private pwdType = 'password';
  private redirect: string | undefined = undefined;

  @Watch('$route', { immediate: true })
  private OnRouteChange(route: Route) {
    this.redirect = route.query && route.query.redirect as string;
  }

  private showPwd() {
    if (this.pwdType === 'password') {
      this.pwdType = '';
    } else {
      this.pwdType = 'password';
    }
  }

  private handleLogin() {
    (this.$refs.loginForm as ElForm).validate((valid: boolean) => {
      if (valid) {
        this.loading = true;
        UserModule.Login(this.loginForm).then(() => {
          this.loading = false;
          const routes = (this.$router as any).options.routes;
          for(let i in routes){
            if('/'+String(this.redirect).split('/')[1] === routes[i].path){
              util.set('category', routes[i].meta.category)
            }
          }
          this.$router.push({ path: this.redirect || '/'});
        }).catch((err) => {
          this.loading = false;
        });
      } else {
        return false;
      }
    });
  }
}
</script>

<style lang="scss">
@import "src/styles/variables.scss";
@import "src/styles/btn.scss";
.login-container {
  position: relative !important;
  min-width: 1000px;
  height: 100vh !important;
  overflow: auto;
  background-image: url(../../../assets/img/login_bg.jpg);
  background-size: cover;
  .el-input {
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #fff inset !important;
        -webkit-box-shadow: 0 0 0px 1000px #fff  inset !important;
        -webkit-text-fill-color: #1F2E4E !important;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
@import "src/styles/variables.scss";

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  // background-color: $loginBg;

  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 600px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 220px auto;
    background: #fff;
  }

  .el-input {
    display: inline-block;
    width: 85%;
  }

  .el-form-item {
    border: 1px solid #E4EBF2;
    // background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $darkGray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title {
    font-size: 30px;
    font-weight: 400;
    // color: $lightGray;
    color:#1F2E4E;
    margin: 0px auto 40px auto;
    text-align: center;
  }
  .input-desc {
    margin-bottom:10px;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $darkGray;
    cursor: pointer;
    user-select: none;
  }

  .forget{
    text-align: center;
    margin-bottom: 5px;
    color:$fontGreenColor;
    cursor: pointer;
  }
}
</style>
