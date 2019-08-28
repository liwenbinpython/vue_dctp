<template>
  <div>
    <el-dialog title="修改邮箱地址" width="500px" :visible.sync="isShow">
      <el-steps :active="active" align-cente="true" finish-status="success">
        <el-step title="验证邮箱"></el-step>
        <el-step title="输入新邮箱"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <div class="view">
        <div v-if="active == 0" class="st">
          <el-form :model="form" :rules="rules1" ref="ruleForm">
            <el-form-item label="动态验证" label-width="100" prop="code">
              <el-input placeholder="请输入邮箱验证码" :maxlength="4" v-model="form.code"  autocomplete="off">
                <el-button @click="sendCode1(oldEmail)" v-text="form.text" slot="append"></el-button>
              </el-input>
            </el-form-item>
          </el-form>
          <div class="btn">
            <el-button @click="next(0,'ruleForm')" style="width:100%;" type="primary">下一步</el-button>
          </div>
        </div>

        <div v-if="active == 1" class="st">
          <el-form :model="form" :rules="rules" ref="ruleForm">
            <el-form-item label="新邮箱" label-width="100" prop="email">
              <el-input placeholder="请输入新邮箱" v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="动态验证" label-width="100" prop="code">
              <el-input placeholder="请输入验证码" v-model="form.code" autocomplete="off">
                <el-button @click="sendCode(form.email)" v-text="form.text" slot="append"></el-button>
              </el-input>
            </el-form-item>
          </el-form>
          <div class="btn">
            <el-button @click="next(1,'ruleForm')" style="width:100%;" type="primary">下一步</el-button>
          </div>
        </div>

        <div v-if="active == 2" class="st">
          <div class="over">修改成功图标</div>
          <div class="btn">
            <el-button @click="next(2)" style="width:100%;" type="primary">完成</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Emit, Vue, Watch } from "vue-property-decorator";
import { ElForm } from 'element-ui/types/form';
import { getEmailCode, checkEmailCode ,bindEmail } from '@/api/user.ts';
import { UserModule } from '@/store/modules/user';
@Component
export default class userInfo extends Vue {
  private listLoading = true;
  private isShow = false;
  private active = 0;
  private timer:any = 0;
  private form = {
    code: "",
    text: "获取验证码",
    count:60,
    email:'',
  };
  private rules1 = {
      code: [
        { pattern:/^\d{4}$/, required: true, message: '你的验证码输入有误', trigger: 'blur' },
      ],
  }
  private rules = {
      email: [
        { type:'email', required: true, message: '你的邮箱输入有误', trigger: 'blur' }
      ],
  }

  private form2 = {
    email: "",
    code: "",
    date1: "获取验证码"
  };
  private sendCode(email:any) {
    (this.$refs['ruleForm'] as ElForm).validate((valid : any ) => {
      if(valid){
        if(this.form.count == 60){
          this.form.count--;
          this.form.text = `${this.form.count}秒后重新获取`;
          this.timer = setInterval(()=>{
            if(this.form.count == 0){
              this.form.text = '获取验证码';
              this.form.count = 60;
              clearInterval(this.timer);
            }else{
              this.form.count--;
              this.form.text = `${this.form.count}秒后重新获取`;
            }
          },1000);
          getEmailCode(email).then((res :any) => {
              if(res.status === 200){
                this.$message({message: '发送成功',type: 'success'});
              }else{
                this.$message({message: res.msg , type: 'error'});
              }
          })
        }
      }
    })
  }

  private sendCode1(email:any) {
    if(this.form.count == 60){
      this.form.count--;
      this.form.text = `${this.form.count}秒后重新获取`;
      this.timer = setInterval(()=>{
        if(this.form.count == 0){
          this.form.text = '获取验证码';
          this.form.count = 60;
          clearInterval(this.timer);
        }else{
          this.form.count--;
          this.form.text = `${this.form.count}秒后重新获取`;
        }
      },1000);
      getEmailCode(email).then((res :any) => {
          if(res.status === 200){
            this.$message({message: '发送成功',type: 'success'});
          }else{
            this.$message({message: res.msg , type: 'error'});
          }
      })
    }
  }

  private next(val: number,formName?: any) {
    let email = '';
    if(this.active === 0){
      email = this.oldEmail;
    }else{
      email = this.form.email;
    }
    if(this.active == 0 || this.active == 1){
      (this.$refs[formName] as ElForm).validate((valid : any ) => {
      if (valid) {
          checkEmailCode(email,this.form.code).then((res:any) => {
              if(res.status === 200){
                this.active = val + 1;
                this.form.code ='';
                this.form.count = 60;
                this.form.text = '获取验证码';
                clearInterval(this.timer);
              }else{
                this.$message({message: res.msg , type: 'error'});
              }
          })
        }
      });
    }
    if(this.active == 2){
      bindEmail(this.form.email, this.form.code).then((res:any) => {
        if(res.status == 200){
          this.$message({message: '修改成功',type: 'success'});
          UserModule.GetInfo();
        }else{
          this.$message({message: res.msg , type: 'error'});
        }
      })
    }
    if (this.active >= 3) {
      this.isShow = false;
      let self = this;
      setTimeout(() => {
        self.active = 0;
      }, 200);
    }
  }

  get oldEmail(){
    return this.$store.state.user.email;
  }

  @Prop() isShowEmail: any;

  @Emit("postEmail") send(isShow: boolean) {}

  @Watch("isShowEmail")
  watchIsShowEmail(newVal: boolean) {
    this.isShow = newVal;
  }
  @Watch("isShow")
  watchIsShow(newVal: boolean) {
    this.send(newVal);
  }
}
</script>
<style lang="scss">
.el-dialog__body {
  padding: 30px 50px;
}
</style>

<style scoped lang="scss">
.view {
  width: 100%;
  padding-top: 20px;
  height: 280px;
  position: relative;
  .btn {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
}
.over {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: paleturquoise;
}
</style>
