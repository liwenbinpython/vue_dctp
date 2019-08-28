<template>
  <div class="home-container">
    <img class="header_img" src="../../assets/img/mall_banner.jpg" alt>
    <div class="home-func">
      <el-tabs v-model="Stype" @tab-click="fetchData" style="font-size:16px;">
        <el-tab-pane label="普通策略" name="0">
          <div class="strategy">
            <div class="strategy-row" v-for=" item in list" :key="item.mall_id">
              <div class="list">
                <div class="list-title">策略名称</div>
                <div class="list-content-one">{{item.title}}</div>
              </div>
              <div class="list" style="overflow: hidden;">
                <div class="list-title">策略简介</div>
                <div class="list-content-two" style="margin-top:30px;overflow-y:auto">{{item.description}}</div>
              </div>
              <div class="list">
                <div class="list-title">收费标准</div>
                <div class="list-content-three">{{item.price}} USDT / {{item.billing_method}}</div>
              </div>
              <div class="list">
                  <div class="price">
                    <el-button type="shape" style="width:220px" @click="buy(item.mall_id)">立即购买</el-button>
                  </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="白银策略" name="1">
          <div class="strategy">
            <div class="strategy-row" v-for=" item in list" :key="item.mall_id">
              <div class="list">
                <div class="list-title">策略名称</div>
                <div class="list-content-one">{{item.title}}</div>
              </div>
              <div class="list" style="overflow: hidden;">
                <div class="list-title">策略简介</div>
                <div class="list-content-two" style="margin-top:30px;overflow-y:auto">{{item.description}}</div>
              </div>
              <div class="list">
                <div class="list-title">收费标准</div>
                <div class="list-content-three">{{item.price}} USDT / {{item.billing_method}}</div>
              </div>
              <div class="list">
                  <div class="price">
                    <el-button type="shape" style="width:220px" @click="buy(item.mall_id)">立即购买</el-button>
                  </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="黄金策略" name="2">
          <div class="strategy">
            <div class="strategy-row" v-for=" item in list" :key="item.mall_id">
              <div class="list">
                <div class="list-title">策略名称</div>
                <div class="list-content-one">{{item.title}}</div>
              </div>
              <div class="list" style="overflow: hidden;">
                <div class="list-title">策略简介</div>
                <div class="list-content-two" style="margin-top:30px;overflow-y:auto">{{item.description}}</div>
              </div>
              <div class="list">
                <div class="list-title">收费标准</div>
                <div class="list-content-three">{{item.price}} USDT / {{item.billing_method}}</div>
              </div>
              <div class="list">
                  <div class="price">
                    <el-button type="shape" style="width:220px" @click="buy(item.mall_id)">立即购买</el-button>
                  </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { fetchList } from "@/api/mall";
@Component
export default class Exchange extends Vue {
  private Rtype = 0; // 0: 获取策略(需要参数:'request_type'),1:获取机器人信息, 2:获取服务类信息, 3 :获取商品详细信息(需要参数:'detail_id')
  private Stype = 0; // 0(普通策略) 1（白银策略）2（黄金策略））

  private list = [];

  private mounted() {
    this.fetchData();
  }

  private handleClick() {
    this.fetchData();
  }
  private fetchData(): void {
    fetchList({ request_type: this.Rtype, strategy_type: this.Stype }).then(
      (response: any) => {
        this.list = response.data;
      }
    );
  }

  private buy(id: string): void {
    this.$router.push({path: '/mall/form' , query: { id , request_type: this.Rtype + '', strategy_type: this.Stype + '' } });
  }
}
</script>



<style scoped lang="scss">
@import "src/styles/mixin.scss";
@import "src/styles/variables.scss";
@import "src/styles/btn.scss";
.home-container{
  min-width: 1200px;
}
.home-ad {
  @include clearfix;
  height: 60px;
  line-height: 60px;
  font-size: 14px;
  margin-top: -3px;
  background: #fff;
  .title {
    float: left;
    text-align: center;
    min-width: 200px;
    font-weight: bold;
    max-width: 160px;
    border-right: 1px solid #e9eff5;
  }
  .content {
    text-align: center;
    min-width: 400px;
    float: left;
    border-right: 1px solid #e9eff5;
  }
  .gonggao {
    position: relative;
    margin-right: 5px;
    top: 5px;
    color: $fontGreenColor;
  }
}
.header_img{
  max-width:100%;
  min-width:1000px;
}

.home-func {
  max-width: 1200px;
  min-width: 1000px;
  margin: 20px auto;
  min-height: 500px;
  background: #fff;
  .strategy {
    padding: 0 20px 20px;
    .strategy-row {
      margin-top: 20px;
      @include clearfix;
      display: flex;
      border:1px solid #e4ebf2;
      & .list:last-of-type{
        border-right: none;
      }
      .list {
        float: left;
        width: 25%;
        min-width: 260px;
        height: 210px;
        border-right:1px solid #e4ebf2;
        .list-title {
          font-size: 14px;
          margin-top: 20px;
          padding-left: 20px;
          color: #7686a8;
        }
        .list-content-one {
          margin-top: 50px;
          text-align: center;
        }
        .list-content-two {
          margin-top: 50px;
          text-align: left;
          font-size: 15px;
          width: 106%;
          height: 120px;
          padding-left: 20px;
          padding-right: 26px;
        }
        .list-content-three {
          margin-top: 50px;
          font-size: 18px;
          text-align: center;
        }
        .list-content-four {
          text-align: center;
          padding: 20px;
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
        .price {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ff6173;
        }
      }
      &:nth-child(1) {
        margin-top: 8px;
      }
    }
  }
}
</style>