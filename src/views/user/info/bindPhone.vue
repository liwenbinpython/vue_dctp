<template>
  <div>
    <el-dialog :title="!!phone ? '修改手机' : '绑定手机'" width="500px" :visible.sync="isShow">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item :label="!!phone ? '修改手机号' : '手机号码'" label-width="100" prop="phone">
          <el-input placeholder="请输入手机号码" v-model="form.phone" maxlength="11" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="短信验证" label-width="100" prop="code">
          <el-input placeholder="请输入验证码" v-model="form.code" maxlength="4" autocomplete="off">
            <el-button @click="sendCode('ruleForm')" v-text="form.text" slot="append"></el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submit('ruleForm')">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
  import {Component, Prop, Emit, Vue, Watch} from "vue-property-decorator";
  import {ElForm} from 'element-ui/types/form';
  import {getPhoneCode, checkPhoneCode, bindPhone ,changePhone} from '@/api/user.ts';

  @Component
  export default class userInfo extends Vue {
    private listLoading = true;
    private isShow = false;
    private form = {
      code: "",
      text: "获取验证码",
      count: 60,
      phone: ""
    };

    get phone() {
      return this.$store.state.user.phone;
    }

    private rules = {
      code: [
        {pattern: /^\d{4}$/, required: true, message: '你的验证码输入有误', trigger: 'blur'},
      ]
    };

    private sendCode(formName: any) {
      let phone:string = '';
      if(!!this.phone){
        phone = this.phone;
      }else{
        if (!/(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/.test(this.form.phone)) {
          this.$message({message: '你的手机号输入有误', type: 'error'});
          return;
        }
        phone = this.form.phone;
      }
      
      if (this.form.count == 60) {
        this.form.count--;
        this.form.text = `${this.form.count}秒后重新获取`;
        let timer = setInterval(() => {
          if (this.form.count == 0) {
            this.form.text = '获取验证码';
            this.form.count = 60;
            clearInterval(timer);
          } else {
            this.form.count--;
            this.form.text = `${this.form.count}秒后重新获取`;
          }
        }, 1000);
        getPhoneCode(phone).then((res: any) => {
          if (res.status === 200) {
            this.$message({message: '发送成功', type: 'success'});
          } else {
            this.$message({message: res.msg, type: 'error'});
          }
        });
      }
    }

    private submit(formName: any) {
      (this.$refs[formName] as ElForm).validate((valid: any) => {
        if (valid) {
          let phone = !!this.phone ? this.phone : this.form.phone;
          checkPhoneCode(phone, this.form.code).then((res: any) => {
            if (res.status === 200) {
              if(!!this.phone){
                changePhone(this.form.phone,this.form.code).then((resp:any) =>{
                  if (resp.status === 200) {
                    this.$message({message: resp.msg, type: 'success'});
                    //location.reload();
                  } else {
                    this.$message({message: resp.msg, type: 'error'});
                  }
                })
              }else{
                bindPhone(phone,this.form.code).then((resp: any) => {
                  if (resp.status === 200) {
                    this.$message({message: resp.msg, type: 'success'});
                    //location.reload();
                  } else {
                    this.$message({message: resp.msg, type: 'error'});
                  }
                });
              }
              this.isShow = false;
            } else {
              this.$message({message: res.msg, type: 'error'});
            }
          });
        }
      });
    }

    @Prop() isShowPhone: any;

    @Emit("postPhone") send(isShow: boolean) {
    }

    @Watch("isShowPhone")
    watchIsShowPhone(newVal: boolean) {
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
