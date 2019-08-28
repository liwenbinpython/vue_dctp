<template>
  <div class="app-container myserver">
    <div class="title">
        <h4>我的服务器 <span>（系统自动匹配公有服务器）</span> </h4>
    </div>
    <div class="title_box">
      公有服务器
    </div>
    <el-table
    :data="publicServer"
    :header-cell-style="{background:'#E9EEF4',color:'#7B85AB',fontWeight:'400'}"
    >
      <el-table-column label="服务器名称" align="center" prop="name"></el-table-column>
      <el-table-column label="CPU使用率" align="center" prop="cpu"></el-table-column>
      <el-table-column label="内存使用率" align="center" prop="ram"></el-table-column>
      <el-table-column label="硬盘使用率" align="center" prop="disk"></el-table-column>
    </el-table>
    <div class="title_box">
      私有服务器
    </div>
    <el-table
    :data="privateServer"
    :header-cell-style="{background:'#E9EEF4',color:'#7B85AB',fontWeight:'400'}"
    >
      <el-table-column label="服务器名称" align="center" prop="name"></el-table-column>
      <el-table-column label="CPU使用率" align="center" prop="cpu"></el-table-column>
      <el-table-column label="内存使用率" align="center" prop="ram"></el-table-column>
      <el-table-column label="硬盘使用率" align="center" prop="disk"></el-table-column>
    </el-table>
  </div>
</template>
<script lang='ts'>
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { getMyServer } from '@/api/consoles'
  @Component
  export default class Myserver extends Vue{
    private publicServer:any = []

    private privateServer:any = []
    
    private created(){
      this.getServer();
    }

    private changeType(arr:any[]){
      for(let i in arr){
        if(typeof arr[i].cpu === 'number'){
          arr[i].cpu = arr[i].cpu + '%'
        }
        if(typeof arr[i].ram === 'number'){
          arr[i].ram = arr[i].ram + '%'
        }
        if(typeof arr[i].disk === 'number'){
          arr[i].disk = arr[i].disk + '%'
        }
      }
    }

    private getServer(){
      getMyServer().then((res) => {
        if(res.status === 200){
          this.publicServer = res.data.public_host
          this.changeType(this.publicServer)
          this.privateServer = res.data.private_host
          this.changeType(this.privateServer)
        }
      })
    }
  }
</script>

<style scoped>
  .title span{
    font-size:12px;
    font-weight: 400;
  }
  .title h4{
    padding: 0 0;
    margin:0 0;
  }
  .title{
    border-bottom: 1px solid #E4EBF2;
    padding-bottom: 20px;
  }
  .el-table__body{
    border-top: 1px solid #CCCCCC;
  }
  .title_box{
    height: 40px;
    line-height: 40px;
  }
</style>
