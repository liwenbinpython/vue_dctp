<template>
<div class="footer_box">
  <div class="footer">
	  <div class="left">
		  <div class="left-space">邮箱：customer_service@sicklequant.com</div>
	  </div>
	  <div class="right">
      <div>微信公众号：</div>
      <img src="../../assets/img/qrcode.jpg" alt="">
	  </div>
  </div>
</div>

</template>

<script lang="ts">

  import { Component, Prop, Vue } from 'vue-property-decorator';
  @Component
  export default class Footer extends Vue {
  }
</script>

<style scoped lang="scss">
@import "src/styles/mixin.scss";
.footer_box{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #181C2A;
}
  .footer{
    height: 120px;
    padding: 0 50px;
    width: 1200px;
    color:#CAD0ED;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    .left{
      display: flex;
      align-items: center;
    }
    .right{
      display: flex;
      align-items: center;
      img{
        width: 85px;
        height: 85px;
      }
    }
  }
</style>
