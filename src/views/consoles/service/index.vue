<template>
  <div class="service app-container">
	  <div class="title">
        <h4>我的服务</h4>
    </div>
    <el-table
    :data="service"
    :header-cell-style="{background:'#E9EEF4',color:'#7B85AB',fontWeight:'400'}"
    >
      <el-table-column label="时间" align="center" prop="create_time"></el-table-column>
      <el-table-column label="服务名称" align="center" prop="server_name"></el-table-column>
      <el-table-column label="到期时间" align="center" prop="expired_time"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <span style="color:#F56C6C;cursor:pointer" @click="go('/mall/renew',{order_id: scope.row.order_id, id: scope.row.mall_id, request_type: 3})">续费</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { getService } from '@/api/consoles'
  import service from '../../../utils/request';
  @Component
  export default class Service extends Vue {
    private service:any = []
    private data(){
      return {}
    }
    private created(){
      this.Myservice();
    }
    private Myservice(){
      getService().then((res) => {
        if(res.status === 200){
          this.service = res.data
        }
      })
    }

    private go(url:string, params:any){
      this.$router.push({path: url, query:params})
    }
  }
</script>

<style scoped lang="scss">
  .service{
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
    margin-top:20px;
  }
</style>