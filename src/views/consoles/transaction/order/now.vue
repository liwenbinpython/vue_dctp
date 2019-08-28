<template>
  <div class="order">
    <div class="content" style='padding-left:30px'>
            <el-form  size="mini">
              <el-form-item>
                <label for="">交易所</label>
                <el-select v-model="data.exchange_id" @change="exchangeChange" placeholder="请选择交易所">
                  <el-option
                    v-for="(item,index) in data.exchangeList"
                    :key="index"
                    :label="item.exchange_name"
                    :value="item.exchange_id"
                  ></el-option>
                </el-select>

                <label for="" style="margin-left:20px;">API_KEY</label>
                <el-select v-model="data.key_id" @change="keyChange" placeholder="请选择API_KEY">
                  <el-option
                    v-for="(item,index) in data.keyList"
                    :key="index"
                    :label="item.key_name"
                    :value="item.id"
                  ></el-option>
                </el-select>

                <label for="" style="margin-left:20px;">交易对</label>
                <el-select v-model="data.symbol_id" @change="symbolChange" placeholder="请选择交易对">
                  <el-option
                    v-for="(item,index) in data.symbolList"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <el-button size="mini" style="margin-left:20px" type="primary" plain @click="refresh">刷新</el-button>
              </el-form-item>
            </el-form>

            <el-table
            :data="data.table"
            :header-cell-style="{background:'#E9EEF4',color:'#7B85AB',fontWeight:'400'}"
            >
              <el-table-column label="订单ID" align="center" prop="id"></el-table-column>
              <el-table-column label="时间" align="center" prop="time"></el-table-column>
              <el-table-column label="方向" align="center" >
                <template slot-scope="scope">
                    <p style="color:green;" v-if='scope.row.type === "buy"'>买入</p>
                    <p style="color:#F56C6C;" v-else>卖出</p>
                </template>
              </el-table-column>
              <el-table-column label="价格" align="center" prop='price'></el-table-column>
              <el-table-column label="数量" align="center" prop="volume"></el-table-column>
              <!-- <el-table-column label="总额" align="center" prop="total"></el-table-column> -->
              <el-table-column label="成交量" align="center" prop="deal_count"></el-table-column>
              <el-table-column label="状态" align="center">
                  <template slot-scope="scope">
                    <span style="color:#F56C6C" v-if="scope.row.status ==0">未成交</span>
                    <span style="color:#E6A23C" v-else-if="scope.row.status ==1">部分成交</span>
                    <span style="color:#67C23A" v-else-if="scope.row.status ==2">完全成交</span>
                    <span style="color:#303133" v-else-if="scope.row.status ==3">已撤销</span>
                  </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button @click="repeal(scope.row.id)" type='default'  size="small" style="color:#409EFF;border:1px solid #409EFF;">撤单</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="btngrop">
            <el-button type="primary" @click="deleteAll" size="small" v-if='allFlag'>全部撤单</el-button>
            <el-button v-else type="primary" size="small" disabled>正在撤单</el-button>
            <el-input type="text" size="small" style="margin-left:20px;" placeholder="最小价格" v-model="min"></el-input>
            <span style="padding:0 10px"> — </span>
            <el-input type="text" size="small" placeholder="最大价格" v-model="max"></el-input>
            <el-button type="default" size="small" style="margin-left:20px;color:#409EFF;border:1px solid #409EFF;cursor:pointer" @click="revoke" v-if='flag'>区间撤单</el-button>
            <el-button v-else type="primary" style="margin-left:20px" size="small" plain disabled>正在撤单</el-button>
          </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import {
  selectExchange,
  getSelectKeyList,
  selectSymbol,
  getQueryTable,
  deleteAllQuery,
  repealQuery,
  sectionRevoke,
  isRevokeComplete
} from "@/api/consoles";
import { ElForm } from "element-ui/types/form";
import { Message } from 'element-ui';
import { create } from 'domain';
import { setTimeout, setImmediate } from 'timers';
@Component
export default class Transaction extends Vue {
  private data = {
    exchangeList: [], //交易所列表
    exchange_id: "", //交易所ID
    keyList: [], //key列表
    key_id: "", //keyID
    symbolList: [], //symbol列表
    symbol_id: "", //symbolID
    table : [], //当前委托列表
  }
  select='';
  private min:any = ''
  private max:any = ''
  private flag:boolean = true
  private allFlag:boolean = true
  private isRevoke:string = ''

  private refresh(){
    this.getTable()
  }

  private created() {
    this.getExchangeList(); //初始化
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
        this.getTable();
      }
    });
  }
  // 获取单个交易所下的symbol
  private getSymbol(exchange_id: any) {
    selectSymbol(exchange_id).then((res: any) => {
      if (res.status === 200) {
        this.data.symbolList = res.data;
        // this.data.symbol_id = res.data.length === 0 ? "" : res.data[0].id;
        this.getTable();
      }
    });
  }

  // 获取当前委托相关数据
  private getTable() {
    if (!this.data.key_id || !this.data.symbol_id) {
      this.$message.error('请填写交易所，API_KEY和交易对');return;
    }
    getQueryTable({
      key_id: this.data.key_id,
      symbol_id: this.data.symbol_id
    }).then((res: any) => {
      if (res.status === 200) {
        this.data.table = res.data;
      }else{
        this.$message.error(res.msg);
      }
    })
  }
  //撤单
  private repeal(id:any) {
      if(this.check()){return};
      repealQuery({
          key_id: this.data.key_id,
          symbol_id: this.data.symbol_id,
          order_id:id
      }).then((res :any) => {
          console.log('撤单返回数据：',res)
          this.$message.success(res.msg);
          if(this.data.table.length === 1){
            this.data.table = []
          }else{
            this.getTable()
          }
      })
    }
  // 全部撤单
  private deleteAll(){
    if(!this.data.symbol_id){this.$message.error('请选择交易对');return;}
    if(!this.data.key_id){this.$message.error('请选择API_KEY');return;}
    this.allFlag = false
    if(this.check()){return};
    deleteAllQuery({
    key_id: this.data.key_id,
    symbol_id: this.data.symbol_id
    }).then((res: any) => {
        if (res.status === 200) {
          let check = setInterval(() => {
            this.checkRevoke('all')
            if(this.isRevoke === '全部撤单完成'){
              this.allFlag = true
              this.data.table = []
              this.$message.success('全部撤单撤单成功');
              clearInterval(check)
              this.isRevoke = ''
           }
          },1000)
        }
    })
  }

  // 区间撤单
  private revoke(){
    let reg = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
    if(!this.data.symbol_id){this.$message.error('请选择交易对');return;}
    if(!this.data.key_id){this.$message.error('请选择API_KEY');return;}
    if(!this.min){this.$message.error('请输入最小区间价格');return;}
    if(!reg.test(this.min)){this.$message.error('你的最小区间价格输入有误');return;}
    if(!this.max){this.$message.error('请输入最大区间价格');return;}
    if(!reg.test(this.max)){this.$message.error('你的最大区间价格输入有误');return;}
    if(this.min > this.max){this.$message.error('最大区间价格不能小于最小区间价格');return;}
    sectionRevoke({
      key_id: this.data.key_id,
      symbol_id: this.data.symbol_id,
      order_price_min: Number(this.min),
      order_price_max: Number(this.max)}).then((res) => {
        if(res.status === 200){
          this.min = ''
          this.max = ''
          this.flag = false
          let check = setInterval(() => {
            this.checkRevoke('section')
            if(this.isRevoke === '价格区间撤单完成'){
              this.flag = true
              if(this.data.table.length === 1){
                this.data.table = []
              }else{
                this.getTable()
              }
              this.$message.success('区间撤单成功');
              clearInterval(check)
              this.isRevoke = ''
            }
          },1000)
        }
      })
    }

    private checkRevoke(revokeType:any){
      isRevokeComplete({
        key_id: this.data.key_id,
        symbol_id: this.data.symbol_id
      }).then((res) => {
        if(res.status === 200){
          if(revokeType === 'all'){
            this.isRevoke = res.data.order_all
          }else{
            this.isRevoke = res.data.order_section
          }
        }
      })
    }

    //交易所change事件
    private exchangeChange(exchange_id: any) {
      this.data.table = []
      this.data.key_id = "";
      this.data.symbol_id = "";
      this.getKey(exchange_id);
      this.getSymbol(exchange_id);
    }
    // key change事件
    private keyChange() {
      this.getTable();
    }
    // symbol change事件
    private symbolChange() {
      this.getTable();
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
}
</script>

<style scoped>

  .btngrop{
    position: absolute;
    top:0px;
    right:30px;
  }
  .btngrop .el-input{
    width:100px;
    height:32px;
    float: left;
  }
  .btngrop span{
    float: left;
    line-height: 30px;
  }
  .el-select{
    margin-left:10px;
    width: 120px;
  }
  .btngrop .el-button{
    float: left;
  }
  td{
    padding: 0
  }
</style>
