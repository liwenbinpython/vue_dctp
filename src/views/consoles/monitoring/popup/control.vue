<template>
  <div class="popupbox">
    <el-dialog :visible.sync="visible" :show-close="false" width="500px" :modal="true" :close-on-click-modal="false" :close-on-press-escape="false">
    <h4 slot="title">温馨提示</h4>
    <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click.stop="cancelModal"><i class="el-dialog__close el-icon el-icon-close"></i></button>
      <el-form>
        <h2 style="margin-left:30px;color:#F56C6C" v-if="text.status === 'stop' && text.msg === 'success'">停止成功</h2>
        <h2 style="margin-left:30px;color:#67C23A" v-else-if="text.status === 'start' && text.msg === 'success'">启动成功</h2>
        <p style="padding:0 30px;" v-if="text.status === 'stop' && text.msg === 'success'">ID为：{{ text.robot_id }} 的监控停止成功！</p>
        <p style="padding:0 30px;" v-else-if="text.status === 'start' && text.msg === 'success'">ID为：{{ text.robot_id }} 的监控启动成功！</p>
        <el-form-item>
          <el-button type="primary" style="width:150px;float:right;margin:0 30px;margin-top:50px;" @click='closePop'>确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from "vue-property-decorator";
  @Component
  export default class CotrolStart extends Vue{
    @Prop({ default: false }) private visible!: boolean;
    @Prop({ default: {} }) private text!: object;

    private cancelModal(){
      // 关闭弹窗，触发父组件修改visible值
      this.$emit('update:visible', false);
    }
    
    private closePop(){
      this.cancelModal()
      console.log(this.text)
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
</style>
