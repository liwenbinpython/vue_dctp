<template>
  <div class="register-container">
    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="registerRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <h3 class="title">欢迎注册</h3>
      <div class="input-desc">用户名：</div>
      <el-form-item prop="user_name">
        <span class="svg-container">
          <svg-icon name="user"/>
        </span>
        <el-input
          v-model="registerForm.user_name"
          name="user_name"
          type="text"
          auto-complete="on"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <div class="input-desc">电子邮箱：</div>
      <el-form-item prop="email">
        <span class="svg-container">
          <svg-icon name="email"/>
        </span>
        <el-input
          type="text"
          v-model="registerForm.email"
          name="text"
          auto-complete="on"
          placeholder="请输入电子邮箱"
        />
      </el-form-item>
      <div class="input-desc">密码：</div>
      <el-form-item prop="password1">
        <span class="svg-container">
          <svg-icon name="password"/>
        </span>
        <el-input
          :type="pwdType1"
          v-model="registerForm.password1"
          name="password1"
          auto-complete="on"
          placeholder="请确认密码"
        />
        <span class="show-pwd" @click="showPwd1">
          <svg-icon :name="pwdType1 === 'password' ? 'eye-off' : 'eye-on'"/>
        </span>
      </el-form-item>
      <div class="input-desc">确认密码：</div>
      <el-form-item prop="password2">
        <span class="svg-container">
          <svg-icon name="password"/>
        </span>
        <el-input
          :type="pwdType2"
          v-model="registerForm.password2"
          name="password2"
          auto-complete="on"
          placeholder="确认交易密码"
        />
        <span class="show-pwd" @click="showPwd2">
          <svg-icon :name="pwdType2 === 'password' ? 'eye-off' : 'eye-on'"/>
        </span>
      </el-form-item>
      <div class="input-desc">邀请码：<span>（选填）</span></div>
      <el-form-item prop="邀请码">
        <span class="svg-container">
          <svg-icon name="invite"/>
        </span>
        <el-input
          :type="pwdType"
          v-model="registerForm.invitation_code"
          name="password"
          auto-complete="on"
          placeholder="请输入邀请码"
        />

      </el-form-item>
      <div class="input-desc">验证码：</div>
      <el-form-item prop="code">
          <span class="svg-container">
            <svg-icon name="user"/>
          </span>

          <el-input
            v-model="registerForm.code"
            name="code"
            type="text"
            auto-complete="on"
            placeholder="邮箱验证码"
          />
          <span class="gv-container" @click="send" v-show="codeFlag">获取验证码</span>
          <span class="gv-container" v-show="!codeFlag" style="color:#999;cursor:default">{{ second }} 秒之后重新获取验证码</span>
        </el-form-item>
      <!-- <div class="input-desc">滑动验证：</div>
      <el-form-item prop="verify">
        <el-input>3213123</el-input>
      </el-form-item> -->

      <el-form-item>
        <el-button
          :loading="loading"
          type="shape"
          style="width:100%;height:50px;"
          @click.native.prevent="handleRegister"
        >注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { isValidUsername } from "@/utils/validate";
import { Component, Vue, Watch } from "vue-property-decorator";
import { Registers, emailSend ,checkEmail } from "@/api/login";
import { Route } from "vue-router";
import { ElForm } from "element-ui/types/form";
import { isEmail } from "@/utils/index";
import { Message} from 'element-ui';
import { clearTimeout } from 'timers';

const validateUsername = (rule: any, value: string, callback: any) => {
  callback();
};
const validatePass = (rule: any, value: string, callback: any) => {
  if (value.length < 6) {
    callback(new Error("密码不能小于6位"));
  }else if(value.indexOf(" ")!=-1){
    callback(new Error('密码不能含有空格'));
  } else {
    callback();
  }
};
const validateEmail = (rule: any, value: string, callback: any) => {
  if (!isEmail(value)) {
    callback(new Error("邮箱格式不正确"));
  } else {
    callback();
  }
};

@Component
export default class Register extends Vue {
  private codeFlag:boolean = true
  private second:number = 0
  private registerForm:any = {
    user_name: "",
    email: "",
    password1: "",
    password2: "",
    invitation_code: "",
    code: ""
  };

  private registerRules = {
    user_name: [
      { required: true, trigger: "blur", message:'请输入用户名' },
      { max:32,  required: true, trigger: "blur",message:'用户名过长'}
    ],
    email: [{ required: true, trigger: "blur", validator: validateEmail }],
    password1: [{ required: true, trigger: "blur", validator: validatePass }],
    password2: [
      {
        required: true,
        trigger: "blur",
        validator: (rule: any, value: string, callback: any) => {
          if (this.registerForm.password1 !== value) {
            callback(new Error("密码不一致"));
          } else {
            callback();
          }
        }
      }
    ]
  };
  private loading = false;
  private pwdType = "password";
  private pwdType1 = "password";
  private pwdType2 = "password";
  private redirect: string | undefined = undefined;

  // @Watch("$route", { immediate: true })
  // private OnRouteChange(route: Route) {
  //   this.redirect = route.query && (route.query.redirect as string);
  // }

  private created(){
    if(this.$route.query.code){
      let code = this.$route.query.code
      console.log('邀请码：', code)
      this.registerForm.invitation_code = code
    }
  }

  private showPwd1() {
    if (this.pwdType1 === "password") {
      this.pwdType1 = "";
    } else {
      this.pwdType1 = "password";
    }
  }

  private showPwd2() {
    if (this.pwdType2 === "password") {
      this.pwdType2 = "";
    } else {
      this.pwdType2 = "password";
    }
  }

  private handleRegister() {
    (this.$refs.registerForm as ElForm).validate((valid: boolean) => {
      console.log(valid);
      if (valid) {
        // this.loading = true;
        //console.log(this.registerForm);
        Registers(this.registerForm).then((response: any) => {
          Message({
            message: response.msg,
            type: 'success',
            duration: 2 * 1000,
            });
          this.$router.push({path: "/login"} )
        });
      } else {
        return false;
      }
    });
  }

  private countDown(){
    this.codeFlag = false
    this.second = 60
    let seconds = setInterval(() => {
      this.second -= 1
      if(this.second <= 0){
        this.codeFlag = true
        clearInterval(seconds)
      }
    }, 1000)
  }

  private send() {
    if (!this.registerForm.email) {
      Message({
        message: "邮箱不能为空",
        type: 'error',
        duration: 2 * 1000,
        });
      return false;
    }
    checkEmail(this.registerForm.email).then((res:any) => {
      if(res.status === 200){
        this.countDown()
        emailSend(this.registerForm.email).then((response: any) => {
          Message({
            message: response.msg,
            type: 'success',
            duration: 2 * 1000,
            });
        });
      }
    })
  }
}
</script>



<style lang="scss">
@import "src/styles/variables.scss";
@import "src/styles/btn.scss";

.register-container {
  position: relative !important;
  min-width: 1000px;
  height: 100vh !important;
  overflow: auto;
  background-image: url(../../../assets/img/login_bg.jpg);
  background-size: cover;
  .login-form{
    position: relative !important;
  }
  .el-input {
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      // color: $lightGray;

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

.register-container {
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
    margin: 100px auto;
    background: #fff;
  }
  .input-desc {
    font-size: 14px;
    color: #7686a8;
  }

  .el-input {
    display: inline-block;
    width: 85%;
  }

  .el-form-item {
    border: 1px solid #e4ebf2;
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
    color: #1f2e4e;
    margin: 0px auto 40px auto;
    text-align: center;
  }
  .input-desc {
    margin-bottom: 10px;
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
  .gv-container {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    color: $fontGreenColor;
    cursor: pointer;
    user-select: none;
    padding-left: 20px;
    padding-right: 12px;
    border-left: 1px solid #e4ebf2;
  }
}
</style>
