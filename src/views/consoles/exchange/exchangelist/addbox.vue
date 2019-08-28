<template>
  <div class="popupbox">
    <el-dialog :visible.sync="visible" :show-close="false" width="600px" :modal="true" :close-on-click-modal="false" :close-on-press-escape="false">
    <h4 slot="title">添加交易所</h4>
    <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click.stop="cancelModal"><i class="el-dialog__close el-icon el-icon-close"></i></button>
      <el-form>
        <el-form-item>
          <el-select placeholder="请选择所要添加的交易所" style="width:500px;margin:30px 30px;" v-model="exchange_name">
            <el-option v-for='(opt, index) of exchangeList' :key='index' :label="opt.exchange_name" :value="opt.exchange_name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:500px;margin:0 30px;margin-top:100px;" @click="addExchange(exchange_name)">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop ,Vue } from "vue-property-decorator";
  import { addExchangeList, addExchange, getExchange} from '@/api/consoles'
  @Component
  export default class addbox extends Vue{
    @Prop({ default: false }) private visible!: boolean;
    private exchangeList:object[] = []
    private exchange_name = ''
    private data(){
      return {
        exchange: {}
      }
    }
    private created(){
      this.addExchangeList();
    }
    private addExchangeList(){
      addExchangeList().then((res) => {
        if(res.status === 200){
          this.exchangeList = res.data
        }
      })
    }
    private addExchange(exchange_name:string){
      addExchange(exchange_name).then((res) => {
        if(res.status === 200){
          this.cancelModal()
          getExchange().then((res) => {
            if(res.status === 200){
              this.$emit('sendData',res.data)
            }
          })
        }
      })
    }
    private cancelModal(){
        // 关闭弹窗，触发父组件修改visible值
        this.$emit('update:visible', false);
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
