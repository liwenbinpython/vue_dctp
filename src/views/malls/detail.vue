<template>
  <div class="detail home-container">
	  <div class="title">
		  <!-- <span>策略类</span> - <span>普通策略</span> -->
		  <span>订单详情</span>
	  </div>
	  <div class="body">
		  <div class="body-title">
			  {{title? title : data['title']}}
		  </div>
		  <div class="body-content">
			  <div class="form" style="position:relative">
          <input name="input-name" v-model="data.settlement_address"  id="address" style="width:1px;height:0px;border:none" />
				  <div class="item"> <span>收款方式 : </span> <span style="color:#6388FF" id="address1">{{data.settlement_address}}</span> <span class="copy" @click="copy('address')"> 点击复制</span> </div>
				  <div class="item"> <span>支付金额 : </span> <span> {{data.amount}} {{ data.settlement_currency?data.settlement_currency.toUpperCase():'' }} </span> </div>
				  <div class="item notice">提示：禁止使用非支付币种支付，如使用非支付币种进行了支付，产生任何损失由自己承担(USDT只支持OMNI)。 </div>
          <hr style="margin-top:30px;border:0.5px solid #E4EBF2" />

          <div class="item">
					  <span>{{ data.settlement_currency?data.settlement_currency.toUpperCase():'' }}充值地址 </span>
					  <span class="notice"> （付款成功后，可在控制台查看自己所购买的商品）</span>
					</div>
          <div class="item" style="text-align:center">
            <img :src="data['image_url']"  width="160" height="160" alt="">
            <!-- <img src='../../assets/img/logo.png'  width="160" height="160" alt=""> -->
          </div>
          <div class="item">
            <el-button style="width:220px;height:50px;" @click="del">取消 </el-button>
            <el-button type="shape" style="width:220px;height:50px;margin-left:60px;" @click="confirm">确认收款（{{dateTime.m}}:{{dateTime.s}}） </el-button>
          </div>
			  </div>
		  </div>
	  </div>


    <el-dialog
      title="温馨提示"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="setVisible"
      center>
    <div class="tips">
      <el-row class="row-style">
        系统正在确认收款，请稍后......
      </el-row>
      <el-row class="row-style">
        <div class="timer">
          {{dateTime.m}}:{{dateTime.s}}
        </div>

      </el-row>
      <el-button type="shape" class="submit" @click="submit" v-loading="loading">
          确认
      </el-button>
    </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">

  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { fetchOrder, orderPay, del , orderDetail } from '@/api/mall';
  import { Message, MessageBox } from 'element-ui';

  @Component({
    filters: {
      toUpper: (val: string) => {
        return val.toUpperCase();
      }
    }
  })
  export default class MallsDetail extends Vue {
    private coinType: string = "";
    private dialogVisible: boolean = false;
    private loading: boolean = false;
    private dateTime = {};
    private data = {}; // 数据详情
    private timer: any;

    private get mall_order_id() {
      return this.$route.query.mall_order_id;
    }

    private get title() {
      return this.$route.query.title;
    }

    private mounted() {
      this.getData();
    }


    private getData() {
      const that = this;
      orderDetail({
        order_id: this.mall_order_id,
      }).then((response: any) => {
        this.data =  response.data;
        const time = response.data.create_time;
        const endTime = (new Date(time).getTime() ) + 20 * 60 * 1000;
        that.timer = setInterval( () => {
            that.currentTime(endTime);
        }, 1000);

      });
    }

    private submit() {
      orderPay({
        mall_order_id: this.mall_order_id,
      }).then((response: any) => {
        this.dialogVisible = false;
        Message({
          message: response.msg,
          type: 'success',
          duration: 2 * 1000,
        });
        this.$router.push({path: `/${(this.data as any ).mall_type}`});
      });
    }

    public del() {
      MessageBox.confirm(
          '你是否确定取消订单',
          '取消订单',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
          },
        ).then(() => {

          del({
              mall_order_id: this.mall_order_id,
          }).then((response: any) => {
            if (response.status === 200) {
              Message({
                message: response.msg,
                type: 'success',
                duration: 2 * 1000,
              });
              this.$router.push({path: `/${(this.data as any ).mall_type}`});
            }

          });

        });

    }

    private confirm() {
      this.dialogVisible = true;
    }

    private setVisible() {
      this.dialogVisible = false;
    }

    private copy(id: string) {
      const Url2 = document.getElementById(id);
      (Url2 as any).select();
      document.execCommand("Copy");
      Message({
        message: "复制成功",
        type: 'success',
        duration: 2 * 1000,
      });
    }

    private currentTime(endTime: number) {
        const that = this;
        const dateDiff = Math.floor(( endTime  - new Date().getTime() ) / 1000);
        if ( dateDiff <= 0) {
          that.dateTime = {
            // d: '00', h: '00',
            m: '00', s: '00' };
          clearInterval(that.timer);
          return;
        }
        // let d = parseInt(dateDiff / (60*60*24) );
        // let h = parseInt(dateDiff / (60*60) % 24 );
        const m = Math.floor( dateDiff / 60) % 60;
        const s = dateDiff  % 60;
        that.dateTime = {
          // d: d >= 10 ? d : '0'+d,
          // h: h >= 10 ? h : '0'+h,
          m: m >= 10 ? m : '0'+m,
          s: s >= 10 ? s : '0'+s
        };
      }

    private destroyed() {
       clearInterval(this.timer);
    }
  }
</script>

<style scoped lang="scss">
@import "src/styles/mixin.scss";
@import "src/styles/btn.scss";
  .detail {
	max-width: 1200px;
	margin: 0 auto;
	.title {
		margin-top:20px;
		height:60px;
		line-height:60px;
		padding-left:30px;
		font-size:18px;
		background: #fff;
		span:nth-child(2){
			font-size:16px;
		}
	}
	.body {
		margin-top:20px;
    background: #fff;
    min-height: 700px;
    font-size:14px;
		.body-title {
			height: 60px;
			line-height: 60px;
      padding-left:30px;
      font-size:16px;
			border-bottom: 1px solid #E4EBF2;
		}
		.body-content {
      padding:30px;
      font-size:16px;
			.form {
				margin:0 auto;
        width:500px;
        .item {
          margin-top:40px;
          .count {
            text-align:center;
          }
          .copy {
            position:absolute;
            right:-10px;
            color:#6388FF;
            cursor: pointer;
          }
        }
        .notice {
          font-size:12px;
          color:#7686A8;
        }
			}
		}
  }

  .tips{
    text-align: center;
    font-size:16px;
    .row-style{
      margin-top:30px;
      .timer {
        font-size:30px;
        color:#6388FF;
      }
    }
    .submit{
      margin-top:50px;
      width:400px;
      height:50px;
    }
  }
  }
</style>
