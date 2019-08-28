<template>
    <div>
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
              <el-table-column label="方向" align="center" prop="type">
                <template slot-scope="scope">
                  <p style="color:#F56C6C" v-if='scope.row.type === "sell"'>卖出</p>
                  <p style="color:green" v-else>买入</p>
                </template>
              </el-table-column>
              <el-table-column label="价格" align="center" prop='price'></el-table-column>
              <el-table-column label="数量" align="center" prop="volume"></el-table-column>
              <el-table-column label="总额" align="center" prop="total"></el-table-column>
            </el-table>
          </div>
    </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import {
  selectExchange,
  getSelectKeyList,
  selectSymbol,
  getHistoryTable
} from "@/api/consoles";
import { ElForm } from "element-ui/types/form";
@Component
export default class Transaction extends Vue {
  private data:any = {
    exchangeList: [], //交易所列表
    exchange_id: "", //交易所ID
    keyList: [], //key列表
    key_id: "", //keyID
    symbolList: [], //symbol列表
    symbol_id: "", //symbolID
    table : [], //当前委托列表
  }
  select=''
  private created() {
    this.getExchangeList(); //初始化
  }

  private refresh(){
    this.getTable()
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
        // this.getTable();
      }
    });
  }
  // 获取单个交易所下的symbol
  private getSymbol(exchange_id: any) {
    selectSymbol(exchange_id).then((res: any) => {
      if (res.status === 200) {
        this.data.symbolList = res.data;
        // this.data.symbol_id = res.data.length === 0 ? "" : res.data[0].id;
        // this.getTable();
      }
    });
  }

  // 获取当前委托相关数据
  private getTable() {
    if (!this.data.key_id || !this.data.symbol_id) {
      return;
    }
    getHistoryTable({
      key_id: this.data.key_id,
      symbol_id: this.data.symbol_id
    }).then((res: any) => {
      if (res.status === 200) {
        this.data.table = res.data;
        for(let i of this.data.table){
          i['total'] = (i.price * i.volume).toFixed(4)
        }
      }else{
        this.$message.error(res.msg);
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
