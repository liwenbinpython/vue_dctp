<template>
  <div class="course home-container">
    <img src="../../../assets/img/coursebg.jpg" alt="" width="100%">
	  <div class="body">
      <div class="body-left">
        <div class="left-content">
          <div>基础设置</div>
          <div class="hr"></div>
          <div class="left-title">
            <i class="el-icon-arrow-right"></i>
            <span @click="changeContent('exchange')">如何添加交易所？ </span>
          </div>
          <div class="left-title">
            <i class="el-icon-arrow-right"></i>
            <span @click="changeContent('symbol')">如何添加symbol？ </span>
          </div>
          <div class="left-title">
            <i class="el-icon-arrow-right"></i>
            <span @click="changeContent('pay')">如何支付？ </span>
          </div>
        </div>
        <div class="left-content" style="margin-top:30px">
          <div>策略参数</div>
          <div class="hr"></div>
          <div class="left-title">
            <i class="el-icon-arrow-right"></i>
            <span @click="changeContent('')">行情跟随策略 </span>
          </div>
          <div class="left-title">
            <i class="el-icon-arrow-right"></i>
            <span @click="changeContent('')">中间价刷量策略  </span>
          </div>
          <div class="left-title">
            <i class="el-icon-arrow-right"></i>
            <span @click="changeContent('')">对冲刷量策略 </span>
          </div>
        </div>
      </div>
      <div class="body-right">
        <transition>
          <coursePay v-show='content === "pay"'></coursePay>
        </transition>
        <transition>
          <courseSymbol v-show='content === "symbol"'></courseSymbol>
        </transition>
        <transition>
          <courseExchange v-show='content === "exchange"'></courseExchange>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

  import { Component, Prop, Vue } from 'vue-property-decorator';
  import coursePay from './template/pay.vue'
  import courseSymbol from './template/symbol.vue'
  import courseExchange from './template/courseexchange.vue'
  @Component({
    components:{
      coursePay, 
      courseSymbol, 
      courseExchange
    }
  })
  export default class Course extends Vue {
    private content:string = 'exchange'
    private changeContent(data:any){
      this.content = data
    }
  }
</script>

<style scoped lang="scss">
@import "src/styles/mixin.scss";
@import "src/styles/variables.scss";
  .v-enter,.v-leave-to{ 
    opacity:0;
    transform:translateX(100px);
  }
  .v-enter-active,.v-leave-active{
    transition:all 0.5s
  }
  .body {
    @include clearfix;
    max-width:1200px;
    min-width: 1200px;
    margin:20px auto;
    background: #fff;
    min-height:500px;
    border:1px solid #E4EBF2;
    &-left {
      float:left;
      width:260px;
      border-right:1px solid #E4EBF2;
      min-height:500px;
      padding:20px 30px;
      .hr {
        height:1px;background:#E4EBF2;
        margin-top:15px;
      }
      .left-title {
        margin-top:20px;
        padding-left:10px;
        font-size:14px;
        span {
          padding-left:10px;
          cursor: pointer;
        }
        span:hover{
          color: #409EFF;
        }
      }
    }
    &-right {
      float:left;
      padding:50px;
      min-height:500px;
    }
  }
</style>