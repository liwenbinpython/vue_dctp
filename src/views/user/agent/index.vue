<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="header-left">
          代理等级 :
          <span class="textColor">{{data.proxy_grade}}</span>
        </div>
        <div class="header-right">
          邀请码 :
          <span class="textColor">{{data.invitation_code}}</span>
          <input style="width:1px;height:0px;border:none" v-model="data.invitation_code" ref="code"/>
          <el-button @click="copy('code')" size="mini" type="primary" style="margin-right:20px;">点击复制</el-button>

          邀请链接:
          <span class="textColor" v-if='showUrl'>{{invitation_url}}</span>
          <el-button size="mini" v-if='!showUrl' @click="getUrl" style="margin-right:10px;">获取邀请链接</el-button>
          <input style="width:1px;height:0px;border:none" v-model="invitation_url" ref="url"/>
          <el-button @click="copy('url')" style="margin-left:10px;" size="mini" type="primary">点击复制</el-button>
        </div>
      </div>
      <div class="statistical">
        <el-row>
          <el-col :span="8">
            <div class="grid-content bg-purple client">
              <div class="title">客户数量</div>
              <div class="client-content">{{ data.user_volume}}</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light client">
              <div class="title">已获得佣金</div>
              <div class="commission-list">
                <div class="commission-item">
                  <div>ETH:</div>
                  <div>{{data.eth_obtain}}</div>
                </div>
                <div class="commission-item">
                  <div>BTC:</div>
                  <div>{{data.btc_obtain}}</div>
                </div>
                <div class="commission-item">
                  <div>USDT:</div>
                  <div>{{data.usdt_obtain}}</div>
                </div>
                <div style="width:70%;margin:0 auto;">
                  <el-button @click="deposit" size="small" style="width:100%;" type="primary">申请提取佣金</el-button>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <div class="newTitle">
                <div></div>
                <div>已提取佣金</div>
                <div>剩余佣金</div>
              </div>
              <div class="three-list">
                <div class="three-item">
                  <div>ETH:</div>
                  <div>{{data.eth_extract}}</div>
                  <div>{{data.eth_available}}</div>
                </div>
                <div class="three-item">
                  <div>BTC:</div>
                  <div>{{data.btc_extract}}</div>
                  <div>{{data.btc_available}}</div>
                </div>
                <div class="three-item">
                  <div>USDT:</div>
                  <div>{{data.usdt_extract}}</div>
                  <div>{{data.usdt_available}}</div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="get-com com">
          <div class="com-header">
              获取佣金记录<span style="color:#7686A8;">（记录只保存半年以内）</span>
          </div>
          <div>
              <getCom></getCom>
          </div>
      </div>
      <div class="set-com com">
          <div class="com-header">
              提取佣金记录
          </div>
          <div>
              <exCom></exCom>
          </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import getCom from './getCom.vue';
import exCom from './exCom.vue'
import { getProxy } from '@/api/user';
@Component({
  components: {
    getCom,
    exCom
  },
  filters: {
    toUpper: (val: string) => {
      return val.toUpperCase();
    }
  }
})
export default class List extends Vue {
  private data = {
    proxy_grade: "", //  代理等级
    eth_obtain: 0, // 已经获取的佣金eth
    btc_obtain: 0, // 已经获取的佣金btc
    usdt_obtain: 0, // 已经获取的佣金usdt
    eth_extract: 0,// 已经提取的佣金eth
    btc_extract: 0,// 已经提取的佣金btc
    usdt_extract: 0,// 已经提取的佣金usdt
    eth_available: 0, // 剩余佣金eth
    btc_available: 0, // 剩余佣金btc
    usdt_available: 0,//  剩余佣金usdt
    invitation_code: "", //  邀请码
  }
  private showUrl:boolean = false
  private invitation_url:any = '' // 邀请链接

  created() {
    getProxy().then((res :any) =>{
      if(res.status === 200){
        this.data = res.data;
      }
    })
  }

  // 获取邀请链接
  private getUrl(){
    this.showUrl = true
    this.invitation_url = window.location.href.split('#')[0] + "#" + '/register?code=' + this.data.invitation_code
  }

  private copy(id:string) {
    (this.$refs[id] as any).select();
    document.execCommand("Copy");
    this.$message({
      message: "复制成功",
      type: 'success',
    });
    if(id === 'url'){
      this.showUrl = false
      this.invitation_url = ''
    }
  }
  
  private deposit() {
      this.$router.push({ path: '/user/deposit' });
  }
}
</script>
<style lang="scss" scoped>
@import "src/styles/mixin.scss";
@import "src/styles/variables.scss";
.clearfix {
  display: flex;
  justify-content: space-between;
  .header-left{
    width: 30%;
  }
  .header-right {
    width: 70%;
    text-align: right;
    .textColor {
      margin-right: 20px;
    }
  }
}
.statistical {
  border: 1px solid #eee;
  .client {
    border-right: 1px solid #eee;
  }
  .title {
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
  }
  .client-content {
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px;
  }
  .commission-list {
    height: 200px;
    .commission-item {
      display: flex;
      height: 50px;
      line-height: 50px;
      div {
        width: 50%;
        text-align: center;
        font-weight: 700;
      }
    }
  }
  .newTitle {
    display: flex;
    div {
      height: 50px;
      line-height: 50px;
      text-align: center;
      width: 33.33%;
    }
  }
  .three-list {
    .three-item {
      display: flex;
      height: 50px;
      line-height: 50px;
      div {
        width: 33.33%;
        text-align: center;
        font-weight: 700;
      }
    }
  }
}
.com{
    border:1px solid #eee;
    margin-top: 20px;
    .com-header{
        border-bottom: 1px solid #eee;
        background: #e9eef4;
        height: 50px;
        line-height: 50px;
        padding-left: 20px;
    }
}

.textColor {
  color: $fontGreenColor;
  font-weight: 700;
}
</style>
