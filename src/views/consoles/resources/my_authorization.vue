<template>
  <div class='app-container myAuthor'>
    <div class="header">
      <div class="header_item">
        <div style="color:#1F2E4E;font-size:16px;">授权编码</div>    
        <div>{{num}}</div>
      </div>
      <div class="header_item">
        <div style="color:#1F2E4E;font-size:16px;">授权使用率</div>    
        <div>{{authorization_rate}}</div>
        <button class='back' @click="back()">返回 <i class="el-icon-refresh-left"></i></button>
      </div>
    </div>
    <el-table :data="info" :header-cell-style="{background:'#E9EEF4',color:'#7B85AB',fontWeight:'400'}">
      <el-table-column label="机器人ID" prop="id" align="center"></el-table-column>
      <el-table-column label="机器人名称" prop="name" align="center"></el-table-column>
      <el-table-column label="策略名称" prop="authorization_type" align="center"></el-table-column>
      <el-table-column label="策略类型" prop="authorization_type" align="center"></el-table-column>
      <el-table-column label="授权使用占比" prop="authorization_rate" align="center"></el-table-column>
      <el-table-column label="授权时间" prop="create_time" align="center"></el-table-column>
      <!-- <el-table-column label="过期时间" prop="expired_time" align="center"></el-table-column> -->
    </el-table>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from "vue-property-decorator";
  import { getMyAuthorization } from '@/api/consoles'
  @Component
  export default class MyAuthor extends Vue{
    private info:any[] = [];
    private num:any = 0;
    private authorization_rate:any = null;
    private created(){
      let id = Number(this.$route.query.id)
      this.num = id;
      this.authorization_rate = this.$route.query.authorization_rate;
      this.getMyAuthor(id)
    }
    private getMyAuthor(id:number){
      getMyAuthorization(id).then((res) => {
        if(res.status === 200){
          this.info = res.data;
        }
      })
    }
    private back(){
      this.$router.go(-2)
    }
  }
</script>

<style scoped lang='scss'>
  @import '@/styles/back.scss';
  .myAuthor{
    height: auto;
    border: 15px solid #E9EEF4;
    color: #212D4F;
    background: #fff;
  }
  .header{
    .header_item{
      display: flex;
      align-items: center;
      div{
        width: 140px;
        height: 40px;
        line-height: 40px;
        padding-left: 10px;
        color: #0A0A0A;
        background: #F2F5FA;
        font-size: 14px;
        margin-bottom: 20px;
      }
    }
  }
  .el-table{
    margin-top:20px;
  }
</style>
