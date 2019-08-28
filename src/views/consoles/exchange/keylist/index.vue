<template>
  <div class="app-container exchange">
    <div class="title">
        <h4>API-KEY列表
          <button class='back' @click="back()">返回 <i class="el-icon-refresh-left"></i></button>
        </h4>
        <el-button type="primary" size="small" @click='add' style="float:right">添加密钥</el-button>
    </div>
    <keybox :visible.sync="isAddExchange" :id='exchange_id' @sendDataToParent='childData'></keybox>
    <el-table
    :data="keyList"
    :header-cell-style="{background:'#E9EEF4',color:'#7B85AB',fontWeight:'400'}"
    >
      <el-table-column label="ID" align="center" prop="key_id"></el-table-column>
      <el-table-column label="API_KEY名" align="center" prop="key_name"></el-table-column>
      <el-table-column label="交易所" align="center" prop="exchange_name"></el-table-column>
      <el-table-column label="Access Key" align="center" prop="access_key"></el-table-column>
      <el-table-column label="余额" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type='primary' @click="go('/balance?id=' + scope.row.key_id)">查看余额</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
        <span style="color: #FE667C;" @click="delKey(scope.row.key_id)">删除</span> 
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from "vue-property-decorator";
  import { getKeyList, delSecretKey } from '@/api/consoles'
  import keybox from './keybox.vue'
  @Component({
    components: {keybox}
  })
  export default class Keylist extends Vue{
    @Prop({ default: false }) private visible!: boolean;
    private isAddExchange:boolean = false
    private exchange_id:number = 0
    private keyList:object[] = []
    private data(){
      return {}
    }

    // 获取子组件传递的参数
    private childData(data:any){
      this.keyList = data
    }
    private created(){
      this.getExchangeKey();
    }

    // 添加密钥弹框
    private add(){
      this.isAddExchange = !this.isAddExchange
    }

    private back(){
      this.$router.go(-1)
    }
    
    // 删除密钥
    private delKey(id:number){
      this.$alert('确定要删除 id为：'+ id +'密钥吗？', '温馨提示').then(() => {
        delSecretKey(id).then((res) => {
          if(res.status === 200){
            this.getExchangeKey()
          }
        })
      })
    }
    private go(url:string){
      this.$router.push({path: url})
    }
    
    // 获取密钥列表
    private getExchangeKey(){
      let id = this.$route.query.id;
      this.exchange_id = Number(id)
      getKeyList(Number(id)).then((res) => {
        if(res.status === 200){
          this.keyList = res.data
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
  span:hover{
    cursor: pointer;
  }
</style>
