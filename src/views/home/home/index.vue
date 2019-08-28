<template>
  <div class="home-container">
    <div class="home_header">
      <div class="header_content">
        <div class="header_content_title">镰刀量化-专业的量化策略开发者</div>
        <p class="header_content_subhead">我们以专业的技术提供高效稳定的量化策略、机器人配置、技术咨询</p>
        <div class="header_content_btn">专业创造-高效稳定</div>
      </div>
    </div>
    <div class="home-ad">
      <el-row>
        <el-col :span="3" style="border-right: 1px solid #e9eff5;">
          <router-link to="/notice" tag="div" class="title">
            <svg-icon name="gonggao" class="gonggao" width="20" height="20"/>公告
          </router-link>
        </el-col>
        <el-col :span="6" v-for='(item, index) in data.list' v-show="index < 3" :key='index'>
          <div class="content" @click="showInfo('/notice/detail?id=' + item.anno_id)" v-if='item'>{{ item.title }}</div>
        </el-col>
        <el-col :span="3" v-show="data.list.length>=3">
          <router-link to="/notice" tag="div" class="ad_more">
            更多>
          </router-link>
        </el-col>
      </el-row>
    </div>
    <div class="box">
      <div class="box_content">
        <div class="box_content_item">
          <div class="box_content_item_left">
            <div class="item_num" style="background:linear-gradient(0deg,rgba(85,123,250,1),rgba(16,193,249,1));">01</div>
            <div class="item_title">
              量化策略
            </div>
            <div class="item_text">
              策略组合，稳定高效<br>
              机器人配置，自主操作，简单安全
            </div>
          </div>
          <div class="box_content_item_right">
            <img src="../../../assets/img/box1_img1.png" alt="">
          </div>
        </div>
        <div class="box_content_item">
          <div class="box_content_item_right" style="text-align:left;">
            <img src="../../../assets/img/box1_img2.png" alt="">
          </div>
          <div class="box_content_item_left" style="text-align:right;">
            <div class="item_num" style="background:linear-gradient(0deg,rgba(255,116,82,1),rgba(255,198,130,1));display:inline-block;">02</div>
            <div class="item_title">
              辅助工具
            </div>
            <div class="item_text">
              实时监控，邮件预警，电话通知，详细报表
            </div>
          </div>
        </div>
        <div class="box_content_item">
          <div class="box_content_item_left">
            <div class="item_num" style="background:linear-gradient(0deg,rgba(23,178,229,1),rgba(60,233,218,1));">03</div>
            <div class="item_title">
              技术服务
            </div>
            <div class="item_text">
              专业 / 稳定 / 安全<br>
              部署独立量化服务器、量化API接口开发
            </div>
          </div>
          <div class="box_content_item_right">
            <img src="../../../assets/img/box1_img3.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="box2">
      <div class="box2_content">
        <div class="box2_header">
          个性化定制开发
        </div>
        <div class="box2_content_subhead">
          根据市场需求、定制化开发，实现更完美的量化目标<br>
          手绘K线，使K线走势更精美化
        </div>
      </div>
    </div>
    <div class="box3">
      <div class="box3_content">
        <div class="content_top">
          <div class="content_top_header">
            关于我们
          </div>
          <div class="content_top_content">
            快速、稳定 、高效<br>
            全球合作项目超过<span style="font-weight: 700;margin:0 5px;">26</span>个
          </div>
        </div>
        <div class="content_bottom">
          <div class="content_bottom_item">
            <img style="width:193px;" src="../../../assets/img/box3_img1.png" alt="">
            <p>团队</p>
            <div>
              我们的团队具有10年以上的金融从业经历，5年以上的量化开发经验。我们致力于打造最简单、最高效稳定的交易所与项目方的量化策略。
            </div>
          </div>
          <div class="content_bottom_item">
            <img style="width:212px;" src="../../../assets/img/box3_img2.png" alt="">
            <p>技能</p>
            <div>
              对量化策略的开发以及优化是我们一直追求的目标，同时致力于为项目方提供更多的辅助工具以及技术服务。
            </div>
          </div>
          <div class="content_bottom_item">
            <img style="width:204px;" src="../../../assets/img/box3_img3.png" alt="">
            <p>目标</p>
            <div>
              在我们的商城中，通过开发推出机器人的不同等级套餐，实现量化领域的个性化定制开发。
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="box4">
      <div class="box4_content">
        <div class="content_top">
          <div class="content_top_header">
            对接全球 30 个交易所
          </div>
          <div class="content_top_content">
            AIP、AOEX、BINANCE、BCEX、BIBOX、BIT-Z、BITASIAEX、BITFOREX、BITKK、BTCDO、CEO、CHAOEX、COINTIGER、COINW、EXX、<br>
            GETEIO、GOKO、GOTCION、HB、HOTCOIN、HIEX、HUOBI、HUOBI-AU、IDCM、KKCOIN、OKEX、YEX、ZBG、ZZEX、WBFEX
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { getNoticeList } from '@/api/home';
import Footer from "@/components/Footer/index.vue";
import { isNull } from 'util';
@Component({
  components: {
    Footer
  }
})
export default class Home extends Vue {
  private data = {
    list:[]
  }
  private created() {
    let id = this.$route.params.id;
    getNoticeList(0,null,null).then(res => {
      console.log(res)
      if(res.status === 200){
        this.data.list = res.data;
      }
    })
  }
  private showInfo(url:string){
    this.$router.push({path: url})
  }

  // 返回默认会顶部
  private mounted () {
    this.$router.afterEach(() => {
      window.scrollTo(0, 0)
    })
  }

}
</script>

<style scoped lang="scss">
@import "src/styles/mixin.scss";
@import "src/styles/variables.scss";
.home_header{
  min-width: 1200px;
  height: 520px;
  background-image:url('../../../assets/img/home_banner.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  .header_content{
    color:#fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .header_content_title{
      font-size: 48px;
      margin-bottom: 40px;
    }
    .header_content_subhead{
      font-size: 18px;
      margin-bottom: 81px;
    }
    .header_content_btn{
      display: flex;
      align-items: center;
      justify-content: center;
      width:276px;
      height:51px;
      border-radius:6px;
      font-size:24px;
      background:linear-gradient(90deg,rgba(97,120,255,1),rgba(16,193,249,1));
    }
  }
}
.home-ad {
  @include clearfix;
  min-width: 1200px;
  border-bottom:1px solid #e9eff5;
  height: 60px;
  line-height: 60px;
  font-size: 14px;
  margin-top: -3px;
  background: #fff;
  cursor: pointer;
  .title {
    float: left;
    text-align: center;
    width: 100%;
    font-weight: bold;
  }
  .content {
    text-align: center;
    min-width: 100%;
    display: inline-block;
    position: relative;
    &::after{
      content:'/';
      position: absolute;
      right: 0;
      color: #7686A8;
      font-size: 14px;
    }
  }
  .content:last-of-type::after{
    display: none;
  }
  .gonggao {
    position: relative;
    margin-right: 5px;
    top: 5px;
    color: $fontGreenColor;
  }
  .ad_more{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color:#6388FF;
      border-left: 1px solid #e9eff5;
    }
}
.box{
  min-width: 1200px;
  background: #ffffff;
  display: flex;
  justify-content: center;
  .box_content{
    min-width: 1200px;
    padding: 0 50px;
    .box_content_item{
      padding: 40px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .box_content_item_left{
        width: 50%;
        .item_num{
          width: 60px;
          height:60px;
          font-size: 20px;
          color: #ffffff;
          font-weight: 700;
          border-radius: 50%;
          text-align: center;
          line-height: 60px;
          margin-bottom: 30px;
        }
        .item_title{
          color:#1F2E4E;
          font-size: 24px;
          margin-bottom: 50px;
        }
        .item_text{
          font-size:20px;
          color:#7686A8;
          line-height: 36px;
        }
      }
      .box_content_item_right{
        width: 50%;
        text-align: right;
        img{
          width:90%;
        }
      }
    }
  }
}
.box2{
  min-width: 1200px;
  height: 620px;
  background-image:url('../../../assets/img/box2_img1.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  display: flex;
  justify-content: center;
  .box2_content{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 66px;
    .box2_header{
      font-size: 24px;
      color: #ffffff;
      font-weight: 700;
      margin-bottom: 41px;
    }
    .box2_content_subhead{
      font-size: 16px;
      line-height:36px;
      color: #ffffff;
      text-align: center;
    }
  }
}
.box3{
 min-width: 1200px;
  display: flex;
  justify-content: center;
  background: #ffffff;
  .box3_content{
    width: 1300px;
    padding: 0 50px;
    margin-bottom: 186px;
    .content_top{
      padding-top: 105px;
      .content_top_header{
        color:#1F2E4E;
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 38px;
        text-align: center;
      }
      .content_top_content{
        font-size: 16px;
        color:#1F2E4E;
        text-align: center;
        margin-bottom: 100px;
        line-height: 24px;
      }
    }
    .content_bottom{
      display: flex;
      justify-content: space-between;
      .content_bottom_item{
        flex-flow: 1;
        flex-shrink: 1;
        width: 33.33%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 50px;
        img{
          width: 70%;
        }
        p{
          margin-top: 0;
          margin-bottom: 40px;
          color:#1F2E4E;
          font-size: 18px;
          font-weight: 700;
        }
        div{
          font-size:14px;
          line-height: 24px;
        }
      }
    }
  }
}
.box4{
  min-width: 1200px;
  display: flex;
  justify-content: center;
  background: #ffffff;
  .box4_content{
    width: 1300px;
    padding: 0 50px;
    .content_top{
      .content_top_header{
        color:#1F2E4E;
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 38px;
        text-align: center;
      }
      .content_top_content{
        font-size: 16px;
        color:#1F2E4E;
        text-align: center;
        margin-bottom: 100px;
        line-height: 24px;
      }
    }
    .content_bottom{
      display: flex;
      justify-content: space-between;
      .content_bottom_item{
        flex-flow: 1;
        flex-shrink: 1;
        width: 20%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 10px;
        justify-content: center;
        border:1px solid #E4EBF2;
        border-radius:6px;
        padding: 55px 0 46px 0;
        span{
          display: block;
          width: 74px;
          height: 74px;
          border-radius: 50%;
          margin-bottom: 43px;
        }
        p{
          margin-top: 0;
          margin-bottom: 16px;
          color:#1F2E4E;
          font-size: 18px;
          font-weight: 700;
        }
        div{
          font-size:14px;
          line-height: 24px;
          color: #7686A8;
        }
      }
    }
  }
}
</style>
