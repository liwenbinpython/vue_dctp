<template>
  <div class="app-container exchange">
    <div class="title">
        <h4>交易所列表</h4>
        <el-button type="primary" size="small" @click='add' style="float:right">添加交易所</el-button>
    </div>
    <addbox :visible.sync="isShow" @sendData='getChildData'></addbox>
    <el-table
    :data="tableData"
    :header-cell-style="{background:'#E9EEF4',color:'#7B85AB',fontWeight:'400'}"
    >
      <el-table-column label="ID" align="center" prop="exchange_id"></el-table-column>
      <el-table-column label="交易所" align="center" prop="exchange_name"></el-table-column>
      <el-table-column label="API-KEY" align="center" prop="api_key">
        <template slot-scope="scope">
          <p style="color:#409EFF;" @click="go('/addkey?id=' + scope.row.exchange_id)">点击查看</p>
        </template>
      </el-table-column>
      <el-table-column label="交易对" align="center" prop='symbol'>
        <template slot-scope="scope">
          <p style="color:#409EFF;" @click="go('/addsymbol?id=' + scope.row.exchange_id)">点击查看</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" prop='exchange_id'>
        <template slot-scope="scope">
          <span style="color: #FE667C;" @click="delExchange(scope.row.exchange_id, scope.row.exchange_name)">删除</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang='ts'>
  import { Component, Prop, Vue } from "vue-property-decorator";
  import { getExchange, delExchange } from '@/api/consoles'
  import addbox from './addbox.vue'
  @Component({
    components: {
      addbox
    }
  })
  export default class ExchangeIndex extends Vue{
    private isShow:boolean = false
    private tableData:object[] = []
    private data(){
      return {}
    }

    // 获取子组件传递过来的值
    private getChildData(data:any){
      this.tableData = data
    }
    private created(){
      this.myExchange();
    }

    // 获取我的交易所
    private myExchange(){
      getExchange().then((res) => {
        if(res.status === 200){
          this.tableData = res.data
        }
      })
    }

    // 添加交易所弹框
    private add(){
      this.isShow = !this.isShow
    }

    // 删除交易所
    private delExchange(id:number, name:string){
      this.$alert('确定删除 '+ name +' 交易所吗？', '温馨提示').then(() => {
        delExchange(id).then(() => {
          this.myExchange();
        })
      })
    }

    // 路由跳转
    private go(url:string){
      this.$router.push({path:url})
    }
  }
</script>

<style scoped>
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
  p, span{
    cursor: pointer;
    margin: 0;
  }
</style>
