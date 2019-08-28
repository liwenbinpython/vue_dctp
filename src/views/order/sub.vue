<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">创建工单</div>
      <div class="content">
        <div
          class="hint"
        >温馨提示：您所提交的工单类型的服务时间为：星期一~星期五9：30-18：00（除法定节假日），我们会在工作日时间及时处理，请您耐心等待，感谢您的大力支持，谢谢！若有紧急事项需要处理，请直接联系我们。</div>
        <div class="form">
          <el-form
            :model="form"
            :rules="rules"
            ref="ruleForm"
            label-width="120px"
            class="only_form"
          >
            <el-form-item label="选择工单类型：" prop="type">
              <el-select style="margin-right:20px;" v-model="form.type" placeholder="请选择工单类型">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.type_name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="问题描述：" prop="content">
              <el-input style="width:600px;" :autosize="{ minRows: 6, maxRows: 8}" type="textarea" v-model="form.content"></el-input>
            </el-form-item>

            <el-form-item label="手机号：" prop="phone">
              <el-input style="width:300px;" v-model="form.phone"></el-input>
            </el-form-item>

            <el-form-item label="邮箱：" prop="email">
              <el-input style="width:300px;" v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="上传文件：" prop="email">
              <el-upload
                class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              </el-upload>
            </el-form-item>
            
            <el-form-item>
              <el-button :loading="btnLoading" size="small" type="primary" >提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { subWorkOrder, getWorkOrderType } from "@/api/user";
@Component({
  components: {}
})
export default class Sub extends Vue {
  private form = {
    type: "",     //工单类型
    content: "",  //问题描述
    phone:"",     //手机号
    email:"",     //邮箱
  };
  private rules = {
    
  }
  private btnLoading = false;
  private options = [];

  created() {
    this.getOrderType();
  }

  private getOrderType() {
    getWorkOrderType().then((res: any) => {
      if (res.status === 200) {
        this.options = res.data;
        this.form.type = (this.options[0] as any).id;
      }
    });
  }

  private submit() {
    // if (this.form.title == "") {
    //   this.$message({ message: "请输入标题", type: "error" });
    //   return;
    // }
    // if (this.form.content == "") {
    //   this.$message({ message: "请输入工单描述", type: "error" });
    //   return;
    // }
    // this.btnLoading = true;
    // subWorkOrder(this.form.title, this.form.content, this.form.type).then(
    //   (res: any) => {
    //     if (res.status === 200) {
    //       this.$message({ message: "工单提交成功", type: "success" });
    //       this.form.title = "";
    //       this.form.content = "";
    //     } else {
    //       this.$message({ message: res.msg, type: "error" });
    //     }
    //     this.btnLoading = false;
    //   }
    // );
  }
}
</script>
<style>
.only_form .el-form-item__label{
    color: #7686a8;
}
</style>
<style lang="scss" scoped>
@import "src/styles/mixin.scss";
@import "src/styles/variables.scss";
.content {
  border: 1px solid #e4ebf2;
  .hint {
    padding-left: 36px;
    color: #7686a8;
    font-size: 12px;
    background: #f2f5fa;
    height: 50px;
    line-height: 50px;
  }
  .form {
    padding-left: 30px;
    padding-top: 20px;
  }
  .upload-demo{
    width: 500px;
  }
}
</style>
