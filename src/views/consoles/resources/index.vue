<template>
  <div class="app-container resources">
    <el-container>
      <el-aside width='50%'>
        <el-row>
          <el-col :span='12'><span class='sname'>策略授权</span></el-col>
          <el-col :span='12'><span class='number'>{{ myResource.strategy }}</span></el-col>
        </el-row>
        <el-row>
          <el-col :span='12'><span class='sname'>策略机器人授权</span></el-col>
          <el-col :span='12'><span class='number'>{{ myResource.robot }}</span></el-col>
        </el-row>
        <el-row>
          <el-col :span='12'><span class='sname'>服务器</span></el-col>
          <el-col :span='12'>
            <span class='number goto' v-if='myResource.host !== 0' @click="go('/myserver')">{{ myResource.host }}</span>
            <span class='number' v-else>{{ myResource.host }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'><span class='sname'>服务</span></el-col>
          <el-col :span='12'>
            <span class='number goto' v-if="myResource.service !== 0"
                  @click="go('/service')">{{ myResource.service }}</span>
            <span class='number' v-else>{{ myResource.service }}</span>
          </el-col>
        </el-row>
      </el-aside>
      <el-main width='50%'>
        <div class="msg_head">
          <span>未读消息</span>
          <font @click="go('/message')">全部消息<i class="el-icon-arrow-right"></i></font>
        </div>
        <ul class="msg_content">
          <li v-for="(m, index) of message" :key='index'
              style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
            <span v-if='m.state === 0'>{{ m.content }}</span>
          </li>
        </ul>
      </el-main>
    </el-container>
    <el-container>
      <el-main>
        <div class="msg_head">
          <span>我的授权情况</span>
          <font @click="go('/accredit')">查看更多<i class="el-icon-arrow-right"></i></font>
        </div>
        <el-table
          :data="currentData"
          style="width: 100%">
          <el-table-column label="购买时间" prop="create_time" align="center">
          </el-table-column>
          <el-table-column label="商品名称" prop="name" align="center">
          </el-table-column>
          <el-table-column label="类型" prop="authorization_type" align="center">
          </el-table-column>
          <el-table-column label="授权编码" prop='id' align="center">
          </el-table-column>
          <el-table-column label="授权使用率" prop='authorization_rate' align="center">
          </el-table-column>
          <el-table-column label="到期时间" prop="expired_time" align="center">
          </el-table-column>
          <el-table-column label="操作" prop="order_id" align="center">
            <template slot-scope="scope">
              <a href="#" style='color: #688AFF;margin-left:10px;' @click="go('/myauthor', {id: scope.row.id,authorization_rate:scope.row.authorization_rate})">查看</a>
              <a href="#" style="color: #FE667C; margin-left:10px;"
                 @click="go('/mall/renew',{order_id: scope.row.order_id, id: scope.row.goods_id, request_type: 3,resource_id:scope.row.id,onlyBack:'renew'})"> 续费</a>
              <span  style='color: #323232;cursor: pointer;margin-left:10px;' @click="deleteGoods(scope.row.id)">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </el-main>

    </el-container>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from "vue-property-decorator";
  import {getMyResource, Accredit, getMymessage,deleteAccredit} from '@/api/consoles';

  @Component
  export default class resources extends Vue {
    private myResource: object = {};
    private currentData: any = [];
    private message: any = [];

    private data() {
      return {};
    }

    private created() {
      this.getResource();
      this.getAccredit();
      this.getMessage();
    }

    private getResource() {
      getMyResource().then((res) => {
        if (res.status === 200) {
          this.myResource = res.data;
        }
      });
    }
    private deleteGoods(good_id:any) {
      this.$confirm('您确定要删除此条授权信息以及授权机器人或授权策略吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteAccredit(good_id).then(res => {
            if(!!res){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          })
        })
    }
    private getAccredit() {
      Accredit().then((res) => {
        if (res.status === 200) {
          if (res.data) {
            this.currentData = res.data.resource_list.slice(0, 6);
            for (let i in this.currentData) {
              if (this.currentData[i].authorization_rate * 100 !== 0) {
                this.currentData[i].authorization_rate = (this.currentData[i].authorization_rate * 100).toFixed(2) + '%';
              } else {
                this.currentData[i].authorization_rate = this.currentData[i].authorization_rate * 100 + '%';
              }
            }
          }
        }
      });
    }

    private getMessage() {
      getMymessage().then((res) => {
        if (res.status === 200) {
          if (res.data) {
            for (let i of res.data) {
              if (i.state === 0) {
                this.message.push(i);
              }
            }
          }
        }
      });
    }

    private go(url: string, params: any) {
      this.$router.push({path: url, query: params});
    }

  }
</script>

<style scoped>
  .resources {
    height: auto;
    border: 15px solid #E9EEF4;
    color: #212D4F;
    background: #fff;
  }

  .el-aside, .el-footer, .el-main {
    border: 0.5px solid #E9EEF4;
  }

  .el-aside + .el-main {
    margin-left: 20px;
  }

  .el-container:last-child {
    margin-top: 20px;
  }

  .grid-content {
    margin-left: 50px;
    line-height: 36px;
  }

  .el-row {
    height: 50px;
    width: 96%;
    background: #E9EEF4;
    margin: 15px auto;
    line-height: 50px;
  }

  .goto {
    cursor: pointer;
  }

  .goto:hover {
    color: #409EFF;
    text-decoration: underline;
  }

  .el-col {
    padding-left: 20px;
  }

  .number {
    font-size: 20px;
    font-family: "Helvetica";
  }

  .sname {
    font-size: 14px;
  }

  .el-main, .el-footer {
    padding: 0;
  }

  .msg_head {
    height: 50px;
    background: #E9EEF4;
    line-height: 50px;
    padding-left: 20px;
    font-weight: 600;
    font-size: 14px;
  }

  .msg_content {
    list-style: none;
  }

  .msg_content li {
    padding: 10px 30px;
    font-size: 14px;
  }

  font {
    font-weight: 400;
    float: right;
    margin-right: 10px;
    color: #688AFF;
  }

  font:hover {
    cursor: pointer;
  }

  .cell {
    text-align: center;
  }
</style>
