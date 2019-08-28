<template>
  <div class="header" v-if="show">
    <div class="header-title">
      <div class="web-name">
        <div class="left div-one">
          <img src="../../assets/img/logo.png" alt>
          <span>{{$t('header.plat_name')}}</span>
        </div>
        <div class="left div-two">
          <ul class="header-ul">
            <li>
              <span
                @click="changeCategory('home','/')"
                :class="type == 'home'? 'header-style':''"
              >{{$t('route.dashboard')}}</span>
            </li>
            <li>
              <el-dropdown  @command="changeRoute">
                <span class="el-dropdown-link" :class="type == 'mall'? 'header-style':''">
                  商城
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" >
                  <el-dropdown-item command="strategy">策略类</el-dropdown-item>
                  <el-dropdown-item command="robot">机器人</el-dropdown-item>
                  <el-dropdown-item command="server">服务类</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
            <li>
              <span
                @click="changeCategory('console','/resources')"
                :class="type == 'console'? 'header-style':''"
              >控制台</span>
            </li>
            <li>
              <span
                @click="changeCategory('order','/order')"
                :class="type == 'order'? 'header-style':''"
              >工单</span>
            </li>
            <li>
              <span
                @click="changeCategory('course','/course')"
                :class="type == 'course'? 'header-style':''"
              >教程</span>
            </li>
          </ul>
        </div>
        <div class="right">
          <ul class="header-ul" v-if="token">
            <li>
              <el-dropdown trigger="click" @command="changeUser">
                <span class="el-dropdown-link">
                   <img src="../../assets/img/user_img.png" width="26" height="26" class="header-ul-img">
                  {{name}}
                  <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item  command="user">基本资料</el-dropdown-item>
                  <el-dropdown-item  command="userOrder">我的订单</el-dropdown-item>
                  <el-dropdown-item  command="loginlog">登录日志</el-dropdown-item>
                  <el-dropdown-item  command="userOperation">操作日志</el-dropdown-item>
                  <el-dropdown-item  command="userApple">申请记录</el-dropdown-item>
                  <el-dropdown-item  command="userAgent" v-if="role === '分销商用户'">代理管理</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <!-- <img src="../../assets/img/user_img.png" width="26" height="26" class="header-ul-img">
              {{name}} -->
            </li>
            <li>
              <el-dropdown trigger="click" @command="changeLanguage">
                <span class="el-dropdown-link">
                  {{langName}}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :disabled="language==='zh'" command="zh">简体中文</el-dropdown-item>
                  <el-dropdown-item :disabled="language==='en'" command="en">English</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
            <li @click="go('/message')">消息 <svg-icon name="gonggao" width="18" height="18" style="position:relative;top:4px" /></li>
            <li @click="logout">{{$t('header.loginout')}}</li>
            <li style="clear:both"></li>
          </ul>
          <div v-else class="header-div">

            <div class="login" @click="go('/login')">登录</div>
            <div class="register" @click="go('/register')">注册</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import util from "@/utils/session";
import { UserModule } from "@/store/modules/user";
import { getToken } from '@/utils/auth';
import Session from "@/utils/session";
@Component
export default class HeaderIndex extends Vue {
  // private show: boolean = true;
  // private menuType = "home";
  private language = Session.get("language") || "zh";
  private langName = "简体中文";
  private created() {
    if (this.language) {
      this.getlangName(this.language);
    }
  }

  private mounted(){
    const token = getToken();
    if(token){
     UserModule.setToken(token) ;
      // UserModule.token = token;
    }
  }

  private get role(){
    return this.$store.state.user.role[0];
  }

  private getlangName(val: string) {
    let lang: string;
    switch (val) {
      case "zh":
        lang = "简体中文";
        break;
      case "en":
        lang = "English";
        break;
      default:
        lang = "简体中文";
    }
    this.langName = lang;
  }

  private get name() {
    return UserModule.name;
  }

  private get token() {
    return UserModule.token;
  }

  private get type() {
    return UserModule.type;
  }

  // 计算属性（等同与computed）
  get show(): boolean {
    const currentRoute = this.$route.path;
    // if (currentRoute == "/login" || currentRoute == "/register") {
    //   return false;
    // }
    return true;
  }

  private changeCategory(str: string, path: string): void {
    util.set("category", str);
    // this.menuType = str;
    UserModule.setType(str) ;
    this.go(path);
  }
  private go(path: string, params?: any) {
    if (params) {
      this.$router.push({
        path: path,
        query: {
          activeName: params
        }
      });
    } else {
      this.$router.push({ path: path });
    }
  }
  private logout() {
    UserModule.LogOut()
    UserModule.FedLogOut().then(() => {
      this.go("/login");
      // location.reload();  // 为了重新实例化vue-router对象 避免bug
    });
  }

  private changeLanguage(val: string) {
    this.$i18n.locale = val;
    this.language = val;
    this.getlangName(val);
    Session.set("language", val);
  }

  private changeRoute(val: string, str?: string) {
    util.set("category", 'mall');
    UserModule.setType('mall') ;
    this.go('/' + val);
  }

  private changeUser(val: string) {
    util.set("category", 'user');
    UserModule.setType('user') ;
    this.go('/' + val);
  }
}
</script>

<style scoped lang="scss">
.left {
  float: left;
}
.right {
  float: right;
}
.header-title {
  position: fixed;
  background: #181C2A;
  height: 60px;
  width: 100%;
  min-width: 1200px;
  text-align: left;
  z-index: 100;
}
.web-name .div-one img {
  // position: relative;
  // top: 12px;
  width: 50px;
  height: 50px;
  font-weight: bold;
}
.web-name .div-one span {
  margin-left: 8px;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
}
.div-one {
  margin-left: 30px;
  height: 60px;
  display: flex;
  align-items: center;
  letter-spacing: 3px;
}
.div-two {
  margin-left: 40px;
}
.header-ul {
  list-style: none;
  margin-top: 0px;
}
.header-ul li {
  float: left;
  margin: 0 15px;
  cursor: pointer;
  color: #d7e0f5;
  font-size: 16px;
  height: 60px;
  line-height: 60px;
}
.header-ul li:hover {
  color: #22a8ee;
}
.header-div{
  font-size: 16px;
  // height: 60px;
  // line-height: 60px;
  margin-top:15px;
  border:1px solid #6388FF;
  border-radius:5px;
  color:#fff;
  text-align: center;
  margin-right:60px;
  .login {
    display: inline-block;
    width:60px;
    height:30px;
    line-height:30px;
    background:#6388FF;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
  .register {
    display: inline-block;
    border-left:1px solid #6388FF;
    width:60px;
    height:30px;
    line-height:30px;
    color:#5F82F5;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
}
a {
  color: #d7e0f5;
}
a:hover {
  color: #22a8ee;
}
.index-content {
  width: 150px;
}
.index-content div {
  height: 40px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}
.index-content div:hover {
  background: #f2f5fa;
  color: #22a8ee;
}
.el-dropdown {
  color: #d7e0f5;
  font-size:16px;
}
.header-ul-img {
  position: relative;
  top: 8px;
  margin-right: 5px;
}
.header-style {
  color: #22a8ee;
}
</style>
