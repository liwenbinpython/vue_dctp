<template>
  <div class="popupbox">
    <el-dialog :visible.sync="visible" :show-close="false" width="600px" :modal="true" :close-on-click-modal="false" :close-on-press-escape="false">
    <h4 slot="title">配置密钥</h4>
    <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click.stop="cancelModal"><i class="el-dialog__close el-icon el-icon-close"></i></button>
      <el-form>
        <el-form-item>
          <label for="">Key的名字</label>
          <el-input placeholder="请输入key的名字" v-model="key_name"></el-input>
        </el-form-item>
        <el-form-item>
          <label for="">Access key值</label>
          <el-input placeholder="请输入access key值" v-model="access_key"></el-input>
        </el-form-item>
        <el-form-item>
          <label for="">Secret key值</label>
          <el-input placeholder="请输入secret key值" v-model="secret_key"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:500px;margin:0 30px;margin-top:50px;" @click="addKey">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from "vue-property-decorator";
  import { addSecretKey, getKeyList } from '@/api/consoles'
  @Component
  export default class Keybox extends Vue{
    @Prop({ default: false }) private visible!: boolean;
    @Prop({ default: 1 }) private id!: number;
    private key_name:string = ''
    private access_key:string = ''
    private secret_key:string = ''
    
    private cancelModal(){
      // 关闭弹窗，触发父组件修改visible值
      this.$emit('update:visible', false);
    }
    private addKey(){
      addSecretKey(this.id, this.key_name, this.access_key, this.secret_key).then((res) => {
        this.cancelModal();
        if(res.status === 200){
          console.log(this.id)
          getKeyList(this.id).then((res) => {
            this.$emit('sendDataToParent', res.data)
          })
        }
      })
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
</style>