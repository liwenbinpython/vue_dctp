<template>
  <div class="app-container userInfo">
    <div>
        <el-card shadow="always">
            <div class="user">
                <div class="info">
                    <div class="avatar">
                        <img src="/img/icons/favicon-32x32.png" alt="">
                    </div>
                    <div class="info-text">
                        <p>账户名称: {{userName}}</p>
                        <p>账户类型: {{role}}</p>
                        <p>账号ID: {{userID}}</p>
                    </div>
                </div>
                <div class="agency">
                    <el-button @click="isShowAgency = true" type="primary" v-if='role !== "分销商用户"'>申请成为代理</el-button>
                </div>
            </div>
            <div class="line"></div>
            <div class="safety">
                <h3>安全设置</h3>
                <div class="safety-list">
                    <!-- <div class="safety-item">
                        <div class="safety-msg">
                            <div class="safety-msg-label">
                                <i class="el-icon-success success"></i>登录密码
                            </div>
                            <div></div>
                        </div>
                        <div class="safety-btn">
                            <el-button type="primary" size="small" >点击修改</el-button>
                        </div>
                    </div> -->
                    <div class="safety-item">
                        <div class="safety-msg">
                            <div class="safety-msg-label">
                                <i class="el-icon-success success"></i>绑定邮箱
                            </div>
                            <div>{{email}}</div>
                        </div>
                        <div class="safety-btn">
                            <el-button @click="isShowEmail = true" type="primary" size="small">点击修改</el-button>
                        </div>
                    </div>

                    <div class="safety-item" v-if='phone'>
                        <div class="safety-msg">
                            <div class="safety-msg-label">
                                <i class="el-icon-success success"></i>绑定手机
                            </div>
                            <div>{{ phone }}</div>
                        </div>
                        <div class="safety-btn">
                            <el-button @click="isShowPhone = true" type="primary" size="small">点击修改</el-button>
                        </div>
                    </div>
                    <div class="safety-item" v-else>
                        <div class="safety-msg">
                            <div class="safety-msg-label">
                                <i class="el-icon-warning warning"></i>绑定手机
                            </div>
                            <div></div>
                        </div>
                        <div class="safety-btn">
                            <el-button @click="isShowPhone = true" type="primary" size="small">点击绑定</el-button>
                        </div>
                    </div>
    
                </div>
            </div>
        </el-card>
    </div>
    <Agency @postAgency="postAgency" @subAgency = "subAgency" :isLoading ="isLoadingAgency"  :isShowAgency = "isShowAgency"></Agency>
    <BindEmail @postEmail="postEmail" :isShowEmail = "isShowEmail"></BindEmail>
    <BindPhone @postPhone="postPhone" :isShowPhone = "isShowPhone"></BindPhone>
    
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { subAgency } from '@/api/user.ts';
  import BindPhone from './bindPhone.vue';
  import BindEmail from './bindEmail.vue';
  import Agency from './agency.vue';
  @Component({
    components: {
      Agency,
      BindEmail,
      BindPhone
    },
  })
  export default class userInfo extends Vue {
    private isShowAgency = false;
    private isLoadingAgency = false;
    private isShowEmail = false;
    private isShowPhone = false;
    
    get userName () {
      return this.$store.state.user.name;
    }
    get role(){
        return this.$store.state.user.role[0];
    }
    get userID () {
      return this.$store.state.user.userID;
    }

    get email(){
        return this.$store.state.user.email;
    }

    get phone(){
        return this.$store.state.user.phone;
    }

    // 申请代理
    private postAgency(val : boolean) {
        this.isShowAgency = val;
    }

    private subAgency(data : any) {
        this.isLoadingAgency = true;
        subAgency(data).then((res:any) =>{
            if(res.status === 200){
                this.$message({message: '提交成功，请耐心等待审核',type: 'success'});
            }else{
                this.$message({message: res.msg , type: 'error'});
            }
        })
        this.isLoadingAgency = false;
    }
    
    // 绑定邮箱
    private postEmail(val : boolean) {
        this.isShowEmail = val;
    }
    // 绑定手机
    private postPhone(val : boolean) {
        this.isShowPhone = val;
    }
  }
  
</script>

<style scoped lang="scss">
  .userInfo{
      .user{
          display: flex;
          justify-content: space-between;
          height: 120px;
          .info{
              display: flex;
              .avatar{
                  width: 100px;
                  height: 100px;
                  text-align: center;
                  vertical-align: middle;
                  border-radius: 50%;
                  overflow: hidden;
                  margin-right: 20px;
                img{
                    width:100%;
                    height: 100%;
                }
              }
              .info-text{
                  height: 100px;
                  p{
                      font-size: 14px;
                      color: #555;
                      margin: 10;
                  }
              }
          }
          .agency{
              height: 100px;
              display: flex;
              flex-direction: column;
              justify-content: center;
          }
      }
      .line{
          height: 1px;
          background: #eee;
      }
      .safety{
          .safety-list{
              .safety-item{
                  position: relative;
                  display: flex;
                  justify-content: space-between;
                  padding: 15px 0;
                  &:after{
                      content:'';
                      display: block;
                      height: 1px;
                      background: #eee;
                      position: absolute;
                      width: 100%;
                      bottom:0;
                  }
                  .safety-msg{
                      display: flex;
                      line-height: 32px;
                      .safety-msg-label{
                          margin-right: 100px;
                          .success{
                              color: #67c23a;
                          }
                          .warning{
                              color:#e6a23c;
                          }
                          i{
                              margin-right: 20px;
                          }
                      }
                  }
              }
          }
      }
  }
</style>