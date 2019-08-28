<template>
  <div class="app-container transaction">
    <div class="title">
      <h4>自主交易</h4>
      <div class="btngrop" style="float:right">
        <el-button type="primary" size="small">自主下单</el-button>
        <el-button type="default" size="small" @click="go('/orderquery')">查看订单</el-button>
        <!-- <el-button type="default" size="small" @click="go('/robotorderquery')">机器人下单查询</el-button> -->
      </div>
    </div>
    <div class="content">
      <div class="left">
        <h5>深度<small style="font-weight:400;">（间隔10秒自动刷新）</small></h5>
        <div v-show="data.depth.ask.length>0 || data.depth.bid.length>0">
          <ul class="sell">
            <span
              @click="getDepth"
              style="position:absolute;right:0;top:-24px;font-size:14px;color:#409EFF;cursor:pointer"
            >刷新</span>
            <li>
              <el-row>
                <el-col :span="6" :offset="6">
                  <span>价格</span>
                </el-col>
                <el-col :span="6">
                  <span>数量</span>
                </el-col>
                <el-col :span="6">
                  <span>累计</span>
                </el-col>
              </el-row>
            </li>
            <li v-for="(val, index) of (data.depth.ask.slice(0, 4)).reverse()" :key="index">
              <el-row>
                <el-col :span="6">
                  <span style="color:#F56C6C">卖{{4-index}}</span>
                </el-col>
                <el-col :span="6">
                  <span>{{val[0]}}</span>
                </el-col>
                <el-col :span="6">
                  <span>{{val[1]}}</span>
                </el-col>
                <el-col :span="6">
                  <span>{{val[2]}}</span>
                </el-col>
              </el-row>
            </li>
          </ul>
          <p class="price">{{ data.depth.realtime_price }}</p>
          <ul class="buy">
            <li v-for="(val, index) of data.depth.bid.slice(0, 4)" :key="index">
              <el-row>
                <el-col :span="6">
                  <span style="color:green">买{{index+1}}</span>
                </el-col>
                <el-col :span="6">
                  <span>{{val[0]}}</span>
                </el-col>
                <el-col :span="6">
                  <span>{{val[1]}}</span>
                </el-col>
                <el-col :span="6">
                  <span>{{val[2]}}</span>
                </el-col>
              </el-row>
            </li>
          </ul>
        </div>
        <div class="none" v-show="data.depth.ask.length==0 && data.depth.bid.length==0">
            暂无数据
        </div>
      </div>
    </div>

    <div class="right">
      <el-form>
        <el-form-item>
          <p style="margin-top:23px;line-height:30px">交易所</p>
          <el-select v-model="data.exchange_id" @change="exchangeChange" placeholder="请选择交易所">
            <el-option
              v-for="(item,index) in data.exchangeList"
              :key="index"
              :label="item.exchange_name"
              :value="item.exchange_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <p style="margin-top:0;line-height:30px">API_KEY</p>
          <el-select v-model="data.key_id" @change="keyChange" placeholder="请选择API_KEY">
            <el-option
              v-for="(item,index) in data.keyList"
              :key="index"
              :label="item.key_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <p style="margin-top:0;line-height:30px">交易对</p>
          <el-select v-model="data.symbol_id" @change="symbolChange" placeholder="请选择交易对">
            <el-option
              v-for="(item,index) in data.symbolList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div width="100%" style="margin-top:10px;">
        <div width="50%" style="float:left">
          <el-form :model="data.buyForm" ref="buyForm" :rules="data.rules">
            <el-form-item label="买入价" prop="price">
              <el-input v-model="data.buyForm.price"></el-input>
            </el-form-item>
            <el-form-item label="买入数量" prop="volume">
              <el-input v-model="data.buyForm.volume"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="success"
                :loading="data.buyForm.loading"
                @click="buy('buyForm')"
                style="width:100%"
              >买入</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div width="50%" style="float:right">
          <el-form :model="data.sellForm" ref="sellForm" :rules="data.rules">
            <el-form-item label="卖出价" prop="price">
              <el-input v-model="data.sellForm.price"></el-input>
            </el-form-item>
            <el-form-item label="卖出数量" prop="volume">
              <el-input v-model="data.sellForm.volume"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="danger"
                :loading="data.sellForm.loading"
                @click="sell('sellForm')"
                style="width:100%"
              >卖出</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import {
  selectExchange,
  getSelectKeyList,
  selectSymbol,
  getDepthTable,
  orderSend
} from "@/api/consoles";
import { ElForm } from "element-ui/types/form";
import { setInterval, clearInterval } from 'timers';
@Component
export default class Transaction extends Vue {
  private data = {
    exchangeList: [], //交易所列表
    exchange_id: "", //交易所ID
    keyList: [], //key列表
    key_id: "", //keyID
    symbolList: [], //symbol列表
    symbol_id: "", //symbolID
    buyForm: {
      price: "", //买入价格
      volume: "", //买入价格
      loading: false
    },
    sellForm: {
      price: "", //卖出价格
      volume: "", //卖出数量
      loading: false
    },
    depth: {    //深度列表
      ask: [], //卖方深度
      bid: [], //买方深度
      realtime_price: "" //最新成交价
    },
    rules: {
      price: [
        { required: true, min: 0, message: "请输入价格", trigger: "blur" },
        {
          pattern: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,9})?$/,
          required: true,
          message: "你的价格输入有误",
          trigger: "blur"
        }
      ],
      volume: [
        { required: true, message: "请输入数量", trigger: "blur" },
        {
          // pattern: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,4})?$/,
          pattern: /(^[\-0-9][0-9]*(.[0-9]+)?)$/,
          required: true,
          message: "你的价格输入有误",
          trigger: "blur"
        }
      ]
    }
  };
  private refreshOnOff:boolean = false
  private created() {
    this.getExchangeList(); //初始化
  }
  private destroyed(){
    this.refreshOnOff = true
  }
  // 获取交易所列表
  private getExchangeList() {
    selectExchange().then((res: any) => {
      if (res.status === 200) {
        this.data.exchangeList = res.data;
        if (res.data.length !== 0) {
          // this.data.exchange_id = res.data[0].exchange_id;
          // this.getKey(this.data.exchange_id);
          // this.getSymbol(this.data.exchange_id);
        }
      }
    });
  }
  // 获取单个交易所下的key
  private getKey(exchange_id: any) {
    getSelectKeyList(exchange_id).then((res: any) => {
      if (res.status === 200) {
        this.data.keyList = res.data;
        // this.data.key_id = res.data.length === 0 ? "" : res.data[0].id;
        this.getDepth();
        this.autoRefresh()
      }
    });
  }
  // 获取单个交易所下的symbol
  private getSymbol(exchange_id: any) {
    selectSymbol(exchange_id).then((res: any) => {
      if (res.status === 200) {
        this.data.symbolList = res.data;
        // this.data.symbol_id = res.data.length === 0 ? "" : res.data[0].id;
        this.getDepth();
      }
    });
  }

  // 自动刷新
  private autoRefresh(){
    this.refreshOnOff = false
    let refresh = setInterval(() => {
      if(this.refreshOnOff){
        clearInterval(refresh)
        return
      }
      this.getDepth()
    }, 10000)
  }

  // 获取深度相关数据
  private getDepth() {
    if (!this.data.key_id || !this.data.symbol_id) {
      return;
    }
    getDepthTable({
      key_id: this.data.key_id,
      symbol_id: this.data.symbol_id
    }).then((res: any) => {
      if (res.status === 200) {
        this.data.depth = res.data;
      }else{
        this.$message.error(res.msg);
      }
    })
  }
  //交易所change事件
  private exchangeChange(exchange_id: any) {
    this.data.key_id = "";
    this.data.symbol_id = "";
    this.data.depth.ask = [];
    this.data.depth.bid = [];
    this.getKey(exchange_id);
    this.getSymbol(exchange_id);
    this.refreshOnOff = true
  }
  // key change事件
  private keyChange() {
    this.getDepth();
  }
  // symbol change事件
  private symbolChange() {
    this.getDepth();
  }

  // 下单
  private placeOrder(type: any) {
    let obj: any = {
      key_id: this.data.key_id,
      symbol_id: this.data.symbol_id,
      op_type: null,
      price: null,
      volume: null
    };
    if (type == "buyForm") {
      obj.op_type = "buy";
      obj.price = this.data.buyForm.price;
      obj.volume = this.data.buyForm.volume;
    } else {
      obj.op_type = "sell";
      obj.price = this.data.sellForm.price;
      obj.volume = this.data.sellForm.volume;
    }
    orderSend(obj).then((res: any) => {
      if (res.status === 200) {
        this.$message.success(res.msg);
      }
    });
  }

  // 买入
  private buy(formName: any) {
    (this.$refs[formName] as ElForm).validate(valid => {
      if (this.check()) {
        return;
      }
      if (valid) {
        this.placeOrder("buyForm");
      }
    });
  }
  // 卖出
  private sell(formName: any) {
    (this.$refs[formName] as ElForm).validate(valid => {
      if (this.check()) {
        return;
      }
      if (valid) {
        this.placeOrder("sellForm");
      }
    });
  }
  //验证是否选择key_id和symbol_id
  private check() {
    if (!this.data.symbol_id) {
      this.$message.error("请选择symbol");
    }
    if (!this.data.key_id) {
      this.$message.error("请选择key");
    }
    return !(this.data.key_id && this.data.symbol_id);
  }
  private go(url: string) {
    this.refreshOnOff = true
    this.$router.push({ path: url });
  }
}
</script>
<style scoped>
ul {
  list-style: none;
}
.none{
  height: 490px;
  text-align: center;
  line-height: 490px;
  color: #cccccc;
  border:1px solid #eee;
}
.transaction {
  color: #212d4f;
  padding-top: 10px;
  background: #fff;
  border: 15px solid #e9eef4;
  overflow: hidden;
}
.el-button--default {
  color: #409eff;
  border: 1px solid #409eff;
}
h4 {
  padding: 10px 0;
  margin: 0;
  float: left;
}
.title {
  overflow: hidden;
  border-bottom: 1px solid #e9eef4;
}
.content {
  width: 80%;
  margin: 0 auto;
}
.content .left,
.content .right {
  width: 50%;
  overflow: hidden;
}
.content .left p,
.content .left h5 {
  text-align: center;
}
h5 {
  margin: 18px 0;
  font-size: 16px;
}
.sell {
  border: 1px solid #e9eef4;
  margin: 0 0;
  position: relative;
}
.sell li {
  padding: 15px 0;
}
.sell li:not(:nth-child(1)) span {
  font-size: 13px;
}
.sell li:first-child span {
  color: #666;
  font-size: 14px;
}
.price {
  font-size: 18px;
  color: #f56c6c;
  font-weight: bold;
  border-left: 1px solid #e9eef4;
  border-right: 1px solid #e9eef4;
  margin: 0 0;
  padding: 16px 0;
}
.buy {
  border: 1px solid #e9eef4;
  margin-top: 0;
}
.buy li {
  padding: 15px 0;
}
.buy li span {
  font-size: 13px;
}
.left {
  float: left;
}
.right {
  float: left;
  margin-left: 30px;
}
.el-select {
  width: 500px;
}
.el-input {
  width: 200px;
}
.right p {
  margin-bottom: 0;
  color: #666;
  font-size: 14px;
}
</style>

