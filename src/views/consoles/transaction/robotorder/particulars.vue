<template>
  <div class="popupbox">
    <el-dialog :visible.sync="visible" :show-close="false" width="500px" :modal="true" :close-on-click-modal="false" :close-on-press-escape="false"> 
    <h4 slot="title">订单详情</h4>
    <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click.stop="cancelModal"><i class="el-dialog__close el-icon el-icon-close"></i></button>
      <el-form style="margin-top:-20px">
        <el-form-item>
          <label for="">ID</label>
          <el-input disabled="disabled" :value="order_id"></el-input>
        </el-form-item>
        <el-form-item>
          <label for="">类型</label>
          <el-input disabled="disabled" value="卖单" v-if='showData.type === "sell"'></el-input>
          <el-input disabled="disabled" value="买单" v-else></el-input>
        </el-form-item>
        <el-form-item>
          <label for="">交易所</label>
          <el-input disabled="disabled" :value="showData.exchange"></el-input>
        </el-form-item>
        <el-form-item>
          <label for="">交易对</label>
          <el-input disabled="disabled" :value="showData.symbol"></el-input>
        </el-form-item>
        <el-form-item>
          <label for="">价格</label>
          <el-input disabled="disabled" :value="showData.price"></el-input>
        </el-form-item>
        <el-form-item>
          <label for="">成交数量</label>
          <el-input disabled="disabled" :value="showData.deal_count"></el-input>
        </el-form-item>
        <el-form-item>
          <label for="">时间</label>
          <el-input disabled="disabled" :value="showData.time"></el-input>
        </el-form-item>
        <el-form-item>
          <label for="">状态</label>
          <el-input disabled="disabled" value="未成交" v-if='showData.status === 0'></el-input>
          <el-input disabled="disabled" value="部分成交" v-else-if='showData.status === 1'></el-input>
          <el-input disabled="disabled" value="完全成交" v-else-if='showData.status === 2'></el-input>
          <el-input disabled="disabled" value="已撤销" v-else></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue, Watch } from "vue-property-decorator";
  import { orderDetails } from '@/api/consoles'
  @Component
  export default class Particulars extends Vue{
    @Prop({ default: false }) private visible!: boolean;
    @Prop({ default: '' }) private order_id!: any;
    
    private showData:any = ''

    @Watch('visible')
    private watchVisible(newVal:any, oldVal:any){
      if(newVal === true){
        this.getOrderDetails(this.order_id)
      }
    }

    private cancelModal(){
      // 关闭弹窗，触发父组件修改visible值
      this.$emit('update:visible', false);
    }

    private getOrderDetails(order_id:number){
      orderDetails(order_id).then((res) => {
        if(res.status === 200){
          this.showData = res.data
        }
      })
    }
    
  }
</script>

<style lang="css" scoped>
  h4{
    padding: 0;
    margin-top:0px;
  }
  .el-dialog{
    height:300px;
  }
  .el-input, label{
    width:400px;
    margin:0px 30px;
  }
  .el-form-item{
    margin-bottom: 0;
  }
  .el-form-item__content{
    line-height: 20px;
  }
  .el-dialog__body{
    padding: 20px;
  }
  .el-input.is-disabled >>> .el-input__inner {
    color:#999;
  }
</style>