<template>
  <div class="home-container">
    <img class="header_img" src="../../assets/img/mall_banner.jpg" alt>
    <div class="home-func">
      <div class="strategy" v-for=" item in list" :key="item.mall_id">
        <div class="strategy-row">
          <div class="list">
            <div class="list-title">服务名称</div>
            <div class="list-content-one">{{item.title}}</div>
          </div>
          <div class="list" style="overflow: hidden;">
            <div class="list-title">服务简介</div>
            <div
              class="list-content-two" style="margin-top:30px;overflow-y:auto"
            > {{item.description}}</div>
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
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { fetchList } from "@/api/mall";

@Component
export default class Serve extends Vue {
  private activeName: string = "first";
  private list = [];
  private handleClick() {
    console.log("handleClick");
  }

  private mounted() {
    this.fetchData();
  }

  private fetchData(): void {
    fetchList({ request_type: 2 }).then((response: any) => {
      this.list = response.data;
    });
  }

  private buy(id: string): void {
    this.$router.push({
      path: "/mall/form",
      query: { id, request_type: 2 + "" }
    });
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
    padding: 20px;
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