<template>
  <div class="app-container exchange">
    <div class="title">
        <h4>账户余额
          <button class='back' @click="back()">返回 <i class="el-icon-refresh-left"></i></button>
        </h4>
    </div>
    <el-table
    :data="balance"
    :header-cell-style="{background:'#E9EEF4',color:'#7B85AB',fontWeight:'400'}"
    >
      <el-table-column label="币种" align="center" prop="name"></el-table-column>
      <el-table-column label="总余额" align="center" prop="total"></el-table-column>
      <el-table-column label="可用余额" align="center" prop="available"></el-table-column>
    </el-table>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from "vue-property-decorator";
  import { getBalanceList } from '@/api/consoles'
  @Component
  export default class BalanceList extends Vue{
    private balance:any[] = []
    private created(){
      let keyId = Number(this.$route.query.id)
      getBalanceList(keyId).then((res) => {
        if(res.status === 200){
          for(let i in res.data){
            this.balance.push({name: i, total: res.data[i].total, available: res.data[i].available})
          }
        }
      })
    }

    private back(){
      this.$router.go(-1)
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
  span:hover{
    cursor: pointer;
  }
</style>
