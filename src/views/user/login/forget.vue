<template>
  <div class="login-container">
    <el-form
      ref="forget"
      :model="forgetForm"
      :rules="forgetRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <h3 class="title">找回密码</h3>
      <div class="input-desc">电子邮箱</div>
      <el-form-item prop="email">
        <span class="svg-container">
          <svg-icon name="email"/>
        </span>
        <el-input
          v-model="forgetForm.email"
          name="email"
          type="text"
          auto-complete="on"
          placeholder="请输入邮箱"
        />
      </el-form-item>
      <div class="input-desc">新密码：</div>
      <el-form-item prop="password1">
        <span class="svg-container">
          <svg-icon name="password"/>
        </span>
        <el-input
          :type="pwdType1"
          v-model="forgetForm.password1"
          name="password"
          auto-complete="on"
          placeholder="请输入新密码"
        />
        <span class="show-pwd" @click="showPwd1">
          <svg-icon :name="pwdType === 'password' ? 'eye-off' : 'eye-on'"/>
        </span>
      </el-form-item>
      <div class="input-desc">确认密码：</div>
      <el-form-item prop="password2">
        <span class="svg-container">
          <svg-icon name="password"/>
        </span>
        <el-input
          :type="pwdType2"
          v-model="forgetForm.password2"
          name="password2"
          auto-complete="on"
          placeholder="请确认新密码"
        />
        <span class="show-pwd" @click="showPwd2">
          <svg-icon :name="pwdType === 'password' ? 'eye-off' : 'eye-on'"/>
        </span>
      </el-form-item>
      <div class="input-desc">动态验证：</div>
      <el-form-item prop="verify">
        <!-- <div class="gv-container"> 获取验证码 </div> -->
        <span class="svg-container">
          <svg-icon name="user"/>
        </span>

        <el-input
          v-model="forgetForm.code"
          name="username"
          type="text"
          auto-complete="on"
          placeholder="验证码"
        />
        <span class="gv-container" @click="send" v-show="codeFlag">获取验证码</span>
          <span class="gv-container" v-show="!codeFlag" style="color:#999;cursor:default">{{ second }} 秒之后重新获取验证码</span>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          type="shape"
          style="width:100%;height:50px;"
          @click.native.prevent="handle"
        >提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { isValidUsername } from "@/utils/validate";
import { Component, Vue, Watch } from "vue-property-decorator";
import { UserModule } from "@/store/modules/user";
import { Forgets, emailSend,checkEmail} from "@/api/login";
import { Route } from "vue-router";
import { ElForm } from "element-ui/types/form";
import { Message} from 'element-ui';
import { isEmail } from "@/utils/index";
import axios from 'axios';

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
export default class Forget extends Vue {
  private codeFlag:boolean = true
  private second:number = 0
  private forgetForm = {
    email: "",
    password1: "",
    password2: "",
    code: "",
  };
  private forgetRules = {
    email: [{ required: true, trigger: "blur", validator: validateEmail }],
    password1: [{ required: true, trigger: "blur", validator: validatePass }],
    password2: [{ required: true, trigger: "blur", validator: (rule: any, value: string, callback: any) => {
          if (this.forgetForm.password1 !== value) {
            callback(new Error("密码不一致"));
          } else {
            callback();
          }
        } }]
  };
  private loading = false;
  private pwdType = "password";
  private pwdType1 = "password";
  private pwdType2 = "password";
  private redirect: string | undefined = undefined;

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
  private handle() {
    (this.$refs.forget as ElForm).validate((valid: boolean) => {
      if (valid) {
        this.loading = true;

        Forgets(this.forgetForm)
          .then((response: any) => {
            this.loading = false;
            Message({
              message: response.msg,
              type: 'success',
              duration: 2 * 1000,
              });
            this.$router.push({ path: "/login" });
          })
          .catch((err: Error) => {
            this.loading = false;
          });
      } else {
        return false;
      }
    });
  }

  private send() {
    if (!this.forgetForm.email) {
      Message({
        message: "邮箱不能为空",
        type: 'success',
        duration: 2 * 1000,
        });
      return false;
    }
    checkEmail(this.forgetForm.email).then((response: any) => {
      if(response.status !== 200){
        emailSend(this.forgetForm.email).then((response: any) => {
          Message({
            message: response.msg,
            type: 'success',
            duration: 2 * 1000,
          });
        });
        this.countDown()
      }else{
        Message({
          message: '该邮箱尚未注册',
          type: 'error',
          duration: 2 * 1000,
        });
      }
    });
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/variables.scss";
@import "src/styles/btn.scss";

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

  .forget {
    text-align: center;
    margin-bottom: 5px;
    color: $fontGreenColor;
    cursor: pointer;
  }
}
</style>
