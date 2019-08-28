<template>
  <div class="app-container robotorder">
    <div class="title">
        <h4>机器人下单查询
          <button class='back ret' @click="back()">返回 <i class="el-icon-refresh-left"></i></button>
        </h4>
    </div>
    <el-form  size="mini" style="margin-top:20px;">
      <el-form-item>
        <label for="">机器人</label>
        <el-select v-model="robot_id" style="height:24px;margin-left:10px;" @change="getRobotList(1)">
          <el-option v-for='(opt, index) of selectRobot' :key='index' :label="opt.name" :value="opt.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData.order_list"
      :header-cell-style="{background:'#E9EEF4',color:'#7B85AB',fontWeight:'400'}"
      >
        <el-table-column label="ID" align="center" prop="id"></el-table-column>
        <el-table-column label="交易所" align="center" prop="exchange_name"></el-table-column>
        <el-table-column label="交易对" align="center" prop='symbol_code'></el-table-column>
        <el-table-column label="订单ID" align="center" prop="order_id"></el-table-column>
        <el-table-column label="Key名字" align="center" prop="access_key"></el-table-column>
        <el-table-column label="操作" align="center" prop="bundle">
          <template slot-scope="scope">
            <span style="color:#409EFF;cursor:pointer" @click="particulars(scope.row.id)">订单详情</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-show="tableData.page_total > 0"
        background
        layout="prev, pager, next, jumper, ->, total"
        @current-change="currentPage"
        :total="tableData.page_total">
      </el-pagination>
      <part :visible.sync='isShow' :order_id='order_id'></part>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from "vue-property-decorator";
  import { selectRobotOrder, robotOrderList } from '@/api/consoles'
  import part from './particulars.vue'
  @Component({
    components:{
      part
    }
  })
  export default class Transaction extends Vue{
    private isShow:boolean = false
    private selectRobot:any = ''
    private robot_id:any = ''
    private tableData:any[] = []
    private order_id:any = ''
    private created(){
      this.getRobotOrder()
    }

    // 获取机器人下拉列表
    private getRobotOrder(){
      selectRobotOrder().then((res) => {
        if(res.status === 200){
          this.selectRobot = res.data
        }
      })
    }
    // 下单机器人列表
    private getRobotList(page:number){
      robotOrderList(this.robot_id, page).then((res) => {
        if(res.status === 200){
          this.tableData = res.data
        }
      })
    }

    // 分页处理
    private currentPage(page:number){
      this.getRobotList(page)
    }

    // 订单详情
    private particulars(order_id:number){
      this.order_id = order_id
      this.isShow = !this.isShow
    }
    private back(){
      this.$router.go(-1)
    }
  }
</script>

<style scoped lang='scss'>
  @import '@/styles/back.scss';
  .robotorder{
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
  .el-pagination{
    text-align: center;
    margin-top:20px;
  }
</style>
