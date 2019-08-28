<template>
  <div class="app-container exchange">
    <div class="title">
        <h4>交易对列表
          <button class='back' @click="back()">返回 <i class="el-icon-refresh-left"></i></button>
        </h4>
        <el-button type="primary" size="small" @click='add' style="float:right">添加交易对值</el-button>
    </div>
    <addsymbol :visible.sync="isShow" :id='exchange_id' @childSymbolList='getChildSymbolList'></addsymbol>
    <modify :visible.sync='isshow' :childparams='params' :id='exchange_id' @childModifyData='modifReturnyData'></modify>
    <el-table
    :data="mySymbolList"
    :header-cell-style="{background:'#E9EEF4',color:'#7B85AB',fontWeight:'400'}"
    >
      <el-table-column label="交易对" align="center" prop="symbol"></el-table-column>
      <el-table-column label="交易对象名" align="center" prop="symbol_name"></el-table-column>
      <el-table-column label="交易对交易代码" align="center" prop="code"></el-table-column>
      <el-table-column label="价格小数位数" align="center" prop="digits"></el-table-column>
      <el-table-column label="价格最小变动值" align="center" prop='price_step'></el-table-column>
      <el-table-column label="最小下单数量" align="center" prop='min_lot'></el-table-column>
      <el-table-column label="最大下单数量" align="center" prop='max_lot'></el-table-column>
      <el-table-column label="下单数量最小变动值" align="center" prop='lot_step'></el-table-column>
      <el-table-column label="操作" align="center" prop='symbol_id'>
        <template slot-scope="scope">
          <span style='color: #688AFF;' @click="modify(
          scope.row.symbol_id,
          scope.row.symbol,
          scope.row.symbol_name,
          scope.row.code,
          scope.row.digits,
          scope.row.price_step,
          scope.row.min_lot,
          scope.row.lot_step,
          scope.row.max_lot
          )">修改</span>
          <span style="color: #FE667C; margin-left:20px;" @click="delSymbol(scope.row.symbol_id)">删除</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from "vue-property-decorator";
  import { getSymbolList, delSymbol } from '@/api/consoles'
  import addsymbol from './addsymbol.vue'
  import modify from './modify.vue'
  @Component({
    components: {
      addsymbol,
      modify
    }
  })
  export default class Symbollist extends Vue{
    private isShow:boolean = false
    private isshow:boolean = false
    private exchange_id:number = 0
    private mySymbolList:object[] = []
    private params:object = {}
    private created(){
      this.symbolList();
    }

    private back(){
      this.$router.go(-1)
    }

    // 获取子组件传递的数据(添加组件)
    private getChildSymbolList(data:any){
      this.mySymbolList = data
    }
    // 获取子组件传递的数据(修改组件)
    private modifReturnyData(data:any){
      this.mySymbolList = data
    }

    // 添加symbol弹框
    private add(){
      this.isShow = !this.isShow
    }
    private delSymbol(id:number){
      this.$alert('确定删除此交易对吗？', '温馨提示',{}).then(() => {
        delSymbol(id).then((res) => {
          if(res.status === 200){
            this.symbolList()
          }
        })
      })
    }
    private modify(symbol_id:number, symbol:string, symbol_name:string, code:string, digits:number, price_step:number, min_lot:number, lot_step:number, max_lot:number){
      this.isshow = !this.isshow
      let sym:object = {
        symbol_id: symbol_id,
        symbol: symbol,
        symbol_name : symbol_name,
        code: code,
        digits: digits,
        price_step: price_step,
        min_lot: min_lot,
        lot_step: lot_step,
        max_lot: max_lot
      }
      console.log(this.params)
      this.params = sym
    }
    private symbolList(){
      let id = Number(this.$route.query.id);
      this.exchange_id = id
      getSymbolList(id).then((res) => {
        if(res.status === 200){
          this.mySymbolList = res.data
        }
      })
    }
  }
</script>

<style scoped lang='scss'>
  @import '@/styles/back.scss';
  .exchange{
    color: #212D4F;
    padding-top:10px;
    background: #fff;
    border: 15px solid #E9EEF4;
  }
  h4{
    padding: 10px 0;
    margin: 0;
    float: left;
  }
  .title{
    overflow: hidden;
    border-bottom: 1px solid #E9EEF4;
  }
  .el-table{
    border: 1px solid #E9EEF4;
  }
  .el-table td{
    border: none;
  }
  span{
    cursor: pointer;
  }
</style>
