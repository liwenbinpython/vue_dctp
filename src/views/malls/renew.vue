<template>
  <div class="detail home-container">
    <div class="title">
      <span>{{ lTitle }}</span> -
      <span>{{ rTitle }}</span>
    </div>
    <div class="body">
      <div class="body-title">{{data.title}}</div>
      <div class="body-content">
        <div class="form">
          <div class="item">
            <span>商品名称 :</span>
            <span>{{data.title}}</span>
          </div>
          <div class="item">
            <span>商品价格 :</span>
            <span>{{data.price}} USDT/ {{data.billing_method}}</span>
          </div>
          <div class="item">
            <span>商品描述 :</span>
            <span>{{data.description}}</span>
          </div>
          <div class="item">
            <span>购买折扣 :</span>
            <span>暂无折扣</span>
          </div>
          <div class="item settle">
            <div class="settle-title">购买时长 :</div>
            <div class="settle-content">
              <div class="input">
                <div class="count" @click="change('reduce')">
                  <svg-icon name="reduce" class="svg" width="20" height="20"/>
                </div>
                <div class="count">{{num}}个月</div>
                <div class="count" @click="change('sum')">
                  <svg-icon name="plus" class="svg" width="20" height="20"/>
                </div>
              </div>
            </div>
          </div>
          <div class="item">
            <span>结算币种 :</span>
            <el-select v-model="symbol" placeholder="选择币种类型" style="margin-left:6px;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="item">
            <span>预估金额 :</span>
            <span class="price">
              <span>{{total.toFixed(4)}} {{symbol}}</span>（此价格为预估金额，实际金额已提交订单之后的汇率为准！）
            </span>
          </div>
          <div class="item">
            <el-button style="width:220px;height:50px;" @click="del()">取消</el-button>
            <el-button type="shape" style="width:220px;height:50px;" @click="submit()">提交订单</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { fetchList, fetchRate, create, del, renewal } from "@/api/mall";
import value from "*.json";
@Component
export default class MallForm extends Vue {
  private symbol: string = "usdt";
  private data:object = { price: "" };
  private num:any = 1;
  private total:any = 0;
  private lTitle:string = ''
  private rTitle:string = ''
  private rate:any = { btc: 1, eth: 1 };
  private options:any = [
    { value: "usdt", label: "USDT" },
    { value: "btc", label: "BTC" },
    { value: "eth", label: "ETH" }
  ];
  private mall_type:object = {
    strategy: {
      title: "策略类",
      mall_attribute_type: ["普通策略", "白银策略", "黄金策略"]
    },
    robot: {
      title: "机器人类",
      mall_attribute_type: ["普通机器人", "白银机器人", "黄金机器人"]
    },
    server: {
      title: "服务器类",
      mall_attribute_type: ["购买电话", "其他服务"]
    }
  };

  private mounted() {
    this.fetchData();
    this.fetchRate();
  }
  private get id() {
    return this.$route.query.id;
  }

  private get order_id() {
    return this.$route.query.order_id;
  }

  private get strategy_type() {
    return this.$route.query.strategy_type;
  }

  private get request_type() {
    return this.$route.query.request_type;
  }
  private get resource_id () {
    return this.$route.query.resource_id;
  }

  @Watch("num")
  private getPriceByNum() {
    if (this.symbol === "btc") {
      this.total = this.num * (this.data as any).price * this.rate.btc;
    } else if (this.symbol === "eth") {
      this.total = this.num * (this.data as any).price * this.rate.eth;
    } else if (this.symbol === "usdt") {
      this.total = this.num * (this.data as any).price;
    }
  }

  @Watch("symbol")
  private getPriceByRate(val: string) {
    if (val === "btc") {
      this.total = this.num * (this.data as any).price * this.rate.btc;
    } else if (val === "eth") {
      this.total = this.num * (this.data as any).price * this.rate.eth;
    } else if (this.symbol === "usdt") {
      this.total = this.num * (this.data as any).price;
    }
  }

  private fetchData(): void {
    fetchList({
      request_type: this.request_type,
      strategy_type: this.strategy_type,
      mall_id: this.id
    }).then((response: any) => {
      this.data = response.data[0];
      this.lTitle = (this.mall_type as any)[(this.data as any).mall_type].title
      this.rTitle = (this.mall_type as any)[(this.data as any).mall_type].mall_attribute_type[(this.data as any).mall_attribute_type]
      this.total = this.num * (this.data as any).price;
    });
  }

  private fetchRate(): void {
    fetchRate({
      symbol: this.symbol
    }).then((response: any) => {
      this.rate = response.exchange_rate;
      // console.log(this.rate);
    });
  }

  private change(type: string) {
    if (type === "sum") {
      this.num++;
    } else {
      if (this.num > 1) {
        this.num--;
      }
    }
  }

  private submit() {
    if (!!this.order_id || this.order_id =='0') {
      renewal({
        order_id: this.order_id,
        volume_or_duration: this.num,
        symbol: this.symbol,
        resource_id :this.resource_id 
      }).then((response: any) => {
        this.$router.push({
          path: "/mall/detail",
          query: { mall_order_id: response.data.mall_order_id ,title:(this.data as any).title}
        });
      });
    } else {
      create({
        mall_id: this.id,
        volume_or_duration: this.num,
        symbol: this.symbol
      }).then((response: any) => {
        this.$router.push({
          path: "/mall/detail",
          query: { mall_order_id: response.data.mall_order_id }
        });
      });
    }
  }

  private del() {
    let back = this.$route.query.onlyBack;
    if(back == 'renew'){
      this.$router.go(-2);
    }else{
      this.$router.go(-1);
    }
    // del({
    //   mall_order_id: this.id,
    // }).then((response: any) => {
    //   console.log(response);
    // });
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
    margin-top: 20px;
    height: 60px;
    line-height: 60px;
    padding-left: 30px;
    font-size: 18px;
    background: #fff;
    span:nth-child(2) {
      font-size: 16px;
    }
  }
  .body {
    margin-top: 20px;
    background: #fff;
    min-height: 700px;
    font-size: 14px;
    .body-title {
      height: 60px;
      line-height: 60px;
      padding-left: 30px;
      font-size: 16px;
      border-bottom: 1px solid #e4ebf2;
    }
    .body-content {
      padding: 30px;
      .form {
        margin: 0 auto;
        width: 500px;
        .item {
          margin-top: 40px;
          .count {
            text-align: center;
          }
        }
        .settle {
          @include clearfix;
          .settle-title {
            float: left;
            height: 30px;
            line-height: 36px;
          }
          .settle-content {
            float: left;
            margin-left: 10px;
          }
          .input {
            @include clearfix;

            margin: 0 auto;
            width: 220px;
            .count {
              float: left;
              width: 36px;
              height: 36px;
              line-height: 36px;
              font-size: 14px;
              border: 1px solid #e4ebf2;
              &:nth-child(2) {
                width: 144px;
                font-size: 16px;
                border-left: 0;
                border-right: 0;
              }
              &:nth-child(1) {
                cursor: pointer;
                color: #6388ff;
              }
              &:nth-child(3) {
                position: relative;
                cursor: pointer;
                color: #6388ff;
              }
              .svg {
                position: relative;
                top: 3px;
              }
            }
          }
        }
        .price {
          color: #ff6173;
          font-size: 12px;
          span:nth-child(1) {
            font-size: 16px;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>