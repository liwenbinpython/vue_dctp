<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="header_num">
          <span>工单编号：</span><el-input style="width:200px;" v-model="data.orderNum" placeholder="请输入内容"></el-input>
        </div>
        <div class="header_time">
          <span style="width:55px;">时间：</span>
          <el-date-picker
            v-model="data.time"
            type="datetimerange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00', '08:00:00']">
          </el-date-picker>
        </div>
        <div class="keyword">
          <span>关键字：</span><el-input style="width:200px;" v-model="data.keyword" placeholder="请输入内容"></el-input>
        </div>
        <div>
          <el-button type="primary" style="width:80px;" size="small">查询</el-button>
        </div>
      </div>
      <div>
        <el-table 
          :data="list" 
          :loading="listLoading" 
          style="width: 100%;border:1px solid #EBEEF5;border-bottom:none;"
          :header-cell-style="{background:'#E9EEF4',color:'#7B85AB',fontWeight:'400'}"
          >
          <el-table-column align="center" prop="id" label="工单编号"></el-table-column>
          <el-table-column align="center" prop="content" label="工单内容"></el-table-column>
          <el-table-column align="center" prop="create_time" label="提交时间"></el-table-column>
          <el-table-column align="center" label="状态">
            <template slot-scope="scope">
              <span style="color:#f56c6c;" v-if="scope.row.status == 0">未受理</span>
              <span style="color:#67c23a;" v-if="scope.row.status == 1">处理中</span>
              <span style="color:#f56c6c;" v-if="scope.row.status == 2">待评价</span>
              <span style="color:#323232;" v-if="scope.row.status == 3">已处理</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button @click="lookInfo(scope.row.id, scope.row.status)" type="text" size="small">详情</el-button>
              <el-button
                @click="deleteOrder(scope.row.id)"
                style="color:#F56C6C"
                type="text"
                size="small"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <!-- <Detail @postDetail="postDetail" @sendData='getChildData' :status='status' :order_id='id' :data="data" :isShowDetail = "isShowDetail"></Detail> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { getWorkOrder, deleteWorkOrder ,getWorkOrderInfo } from "@/api/user";
@Component({
})
export default class Order extends Vue {
  private list = [];
  private listLoading = true;
  private isShowDetail= false;
  private id:any = ''
  private status:any = ''
  private data = {
      orderNum:'',  //工单编号
      time:'',      //时间
      keyword:'',   //关键字
  }

  private created() {
    this.fetchData();
  }

  private getChildData(){
    this.fetchData()
  }

  private fetchData() {
    this.listLoading = true;
    getWorkOrder().then((res: any) => {
      this.list = res.data;
      this.listLoading = false;
    });
  }

  private lookInfo(id: any, status:any) {
    this.$router.push({
      path:'/orderDetail',
      query:{id,status}
    })
    // this.id = id
    // this.status = status
    // getWorkOrderInfo(id).then((res:any) => {
    //     if(res.status === 200){
    //         this.data = res.data;
    //         this.isShowDetail= true;
    //     }else{
    //         this.$message({ message: res.msg, type: "error" });
    //     }
    // })
  }

  private deleteOrder(id: any) {
    this.$confirm("是否要删除该条工单？", "确认信息", {
      distinguishCancelAndClose: true,
      confirmButtonText: "确定",
      cancelButtonText: "取消"
    }).then(() => {
        deleteWorkOrder(id).then((res: any) => {
          if (res.status === 200) {
            this.$message({ message: "删除成功", type: "success" });
            this.fetchData();
          } else {
            this.$message({ message: res.msg, type: "error" });
          }
        });
      })
      .catch(() => {
        return;
      });
  }

  private postDetail(val : boolean) {
      this.isShowDetail = val;
  }
}
</script>
<style lang="scss" scoped>
.page {
  height: 57px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.clearfix{
  display: flex;
  div{
    span{
      display: inline-block;
      width: 80px;
      flex-grow: 0;
      flex-shrink: 0;
      color: #1F2E4E;
      font-weight: 700;
    }
    margin-right: 10px;
    display: flex;
    align-items: center;
  }
}
</style>
