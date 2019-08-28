<template>
  <div class="popupbox">
    <el-dialog :visible.sync="visible" :show-close="false" width="600px" :modal="true" :close-on-click-modal="false" :close-on-press-escape="false">
    <h4 slot="title">温馨提示</h4>
    <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click.stop="cancelModal"><i class="el-dialog__close el-icon el-icon-close"></i></button>
      <el-form>
        <el-form-item>
          <p>确定要删除 xxxx 密钥吗？</p>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="float:right;margin-right:30px;width:120px;">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
        
      }
    },
    methods: {
      cancelModal(){
        // 关闭弹窗，触发父组件修改visible值
        this.$emit('update:visible', false);
      }
    }
  }
</script>

<style lang="scss" scoped>
  h4{
    padding: 0;
    margin-top:0px;
  }
  .el-dialog{
    height:300px;
  }
  .el-input, label{
    width:500px;
    margin:0px 30px;
  }
  p{
    font-size:18px;
    margin-left: 30px;
  }
</style>