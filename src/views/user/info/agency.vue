<template>
  <div>
    <el-dialog title="申请成为代理" width="500px" :visible.sync="isShow">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="姓名" label-width="100" prop="name">
          <el-input placeholder="请输入姓名" :maxlength="4" v-model="form.name"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100" prop="telephone">
          <el-input placeholder="请输入电话" :maxlength="11" v-model="form.telephone"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100" prop="email">
          <el-input placeholder="请输入邮箱" v-model="form.email"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" label-width="100" prop="application_info">
          <el-input placeholder="请输入内容" 
                    v-model="form.application_info" 
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}" 
                    autocomplete="off">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" :loading="isLoading" type="primary" @click="submitForm('ruleForm')">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Emit, Vue, Watch } from "vue-property-decorator";
import { ElForm } from 'element-ui/types/form';
@Component
export default class userInfo extends Vue {
  private listLoading = true;
  private isShow = false;
  private form = {
    name: "",
    telephone: "",
    email: "",
    application_info: ""
  };

  private rules = {
      name: [
        { required: true, min: 2, max: 5, message: '长度在 2 到 4 个字符', trigger: 'blur' },
        { required:true,pattern:/^[\u4E00-\u9FA5]{2,4}$/, message:'你的姓名输入有误',trigger: 'blur'}
      ],
      telephone: [
        { required: true, len:11, message: '请输入11位手机号码', trigger: 'blur' },
        { required:true, pattern:/(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/, message:'你的手机号码输入有误',trigger: 'blur'}
      ],
      email: [
        { type:'email', required: true, message: '你的邮箱输入有误', trigger: 'blur' }
      ],
      application_info: [
        { required: true, min: 2, message: '至少输入2个字符', trigger: 'blur' }
      ],
  }

  private submitForm(formName : any) {
    (this.$refs[formName] as ElForm).validate((valid : any ) => {
      if (valid) {
        this.submit(this.form);
      }
    });
  }

  @Prop() isShowAgency: any;
  @Prop() isLoading: any;


  @Emit("postAgency") send(isShow: boolean) {};

  @Emit("subAgency") submit(form: any) {};

  @Watch("isShowAgency")
  watchIsShowAgency(newVal: boolean) {
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
