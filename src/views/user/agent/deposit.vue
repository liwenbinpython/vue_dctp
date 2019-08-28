<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        申请提取佣金
      </div>
      <div class="content">
        <div class="box">
            <el-form :model="form">
              <div class="label">收款地址</div>
              <el-input placeholder="请输入收款地址" v-model="form.addr" autocomplete="off"></el-input>

              <div class="label">币种</div>
                <el-select @change = "change" style="width:100%" v-model="form.currency" placeholder="请选择币种">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              <p>提示:收款地址请确认是否为同一币种地址，如因填写错误导致损失概不负责。</p>

              <div class="hint">
                <div>可提取佣金 <span v-if="form.allMoney<1 && !!form.allMoney">(不可提取佣金: {{form.allMoney}})</span></div>
                <div v-if="form.allMoney<1 && !!form.allMoney">* 佣金数量少于1不可提取</div>
              </div>
              <el-input readonly  v-model="form.allMoney" autocomplete="off"></el-input>

              <div class="label">申请提现佣金</div>
                <el-input placeholder="请输入提现佣金" v-model="form.money" autocomplete="off"></el-input>
            </el-form>
            <div class="footer">
              <el-button size="small" @click="$router.go(-1)">取 消</el-button>
              <el-button size="small" @click="submit" type="primary">提 交</el-button>
            </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { getProxy,withdraw } from '@/api/user';
@Component({
  components: {}
})
export default class List extends Vue {
  private form = {
    addr: "",           //收款地址
    currency:"",        //币种
    allMoney: "",      //可提取佣金
    money:"",           //申请提取佣金
  };
  private data:any = {
    usdt:"",
    btc:"",
    eth:""
  };
  private options = [{
    value: 'usdt',
    label: 'USDT'
  }, {
    value: 'btc',
    label: 'BTC'
  }, {
    value: 'eth',
    label: 'ETH'
  }]

  created() {
    getProxy().then((res :any) =>{
      if(res.status === 200){
        this.data.usdt = res.data.usdt_available;
        this.data.btc = res.data.btc_available;
        this.data.eth = res.data.eth_available;
      }
    })
  }

  private submit() {
    if(this.form.addr == ''){this.$message({message: "请输入收款地址",type: 'error',});return;}
    if(!/^[0-9a-zA-Z]+$/.test(this.form.addr)){this.$message({message: "收款地址输入有误",type: 'error',});return;}
    if(this.form.currency == ''){this.$message({message: "请选择币种",type: 'error',});return;}
    if(this.form.money == ''){this.$message({message: "请输入提现佣金",type: 'error',});return;}
    if(!/^\d+(?=\.{0,1}\d+$|$)/.test(this.form.money)){this.$message({message: "你的佣金输入有误",type: 'error',});return;}
    if((this.form.money as any) < 1){this.$message({message: "申请提现佣金数至少大于1",type: 'error',});return;}
    if(this.form.money > this.form.allMoney){this.$message({message: "申请提现佣金超过可提现佣金数",type: 'error',});return;}
    withdraw(this.form.addr,this.form.currency,this.form.money).then((res:any) => {
      if(res.status === 200){
        this.$message({message: "申请提现成功",type: 'success',});
        this.form.addr = "";
        this.form.currency ="";
        this.form.allMoney = "";
        this.form.money ="";
      }else{
        this.$message({message: res.msg,type: 'error',});
      }
    })
  }

  private change(active:any) {
    this.form.allMoney = this.data[active];
  }
}
</script>
<style lang="scss" scoped>
@import "src/styles/mixin.scss";
@import "src/styles/variables.scss";
.content{
  display: flex;
  justify-content: center;
  align-content: center;
  .box{
    width: 500px;
    height: 500px;
    p{
      font-size: 12px;
    }
    .hint{
      border-top:1px solid #eee;
      display: flex;
      justify-content: space-between;
      padding: 15px 0;
      font-size: 14px;
      color: #7686A8;
      & > div:nth-of-type(2){
        color: red;
      }
    }
    .label{
      padding: 15px 0;
      font-size: 14px;
      color: #7686A8;
    }
  }
}
.footer{
  margin-top:20px;
}
</style>
