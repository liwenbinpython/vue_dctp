<template>
  <div class="app-container more_accredit">
    <span style='font-weight:bold'>我的授权</span>
    <button class='back' @click="back()">返回 <i class="el-icon-refresh-left"></i></button>
    <el-divider></el-divider>
    <el-container style="margin-top:20px;">
      <el-main>
        <el-table
          :data="tableData"
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
              <a href="#" style='color: #688AFF;' @click="go('/myauthor', {id: scope.row.id,authorization_rate:scope.row.authorization_rate})">查看</a>
              <a href="#" style="color: #FE667C; margin-left:10px;"
                 @click="go('/mall/renew',{order_id: scope.row.order_id, id: scope.row.goods_id, request_type: 3,onlyBack:'renew'})">续费</a>
              <span  style='color: #323232;cursor: pointer;margin-left:10px;' @click="deteleItem(scope.row.id)">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <el-pagination
      background
      :page-size="pageSize"
      @current-change="currentPage"
      layout="prev, pager, next, jumper"
      :total="pageNum">
    </el-pagination>
  </div>
</template>

<script lang='ts'>
  import {Component, Prop, Vue, Watch} from "vue-property-decorator";
  import {Accredit,deleteAccredit} from '@/api/consoles';

  @Component
  export default class accredit extends Vue {
    private tableData: any = [];
    private pageNum: number = 1;
    private pageSize: number = 10;

    private created() {
      this.getAccredit();
    }

    private deteleItem(id:any) {
      this.$confirm('您确定要删除此条授权信息以及授权机器人或授权策略吗？', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          deleteAccredit(id).then(res => {
            if(!!res){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          })
        })
    }

    private getAccredit(page: number = 1) {
      Accredit(page).then((res) => {
        if (res.status === 200) {
          this.tableData = res.data.resource_list;
          for (let i in this.tableData) {
            if (this.tableData[i].authorization_rate * 100 !== 0) {
              this.tableData[i].authorization_rate = (this.tableData[i].authorization_rate * 100).toFixed(2) + '%';
            } else {
              this.tableData[i].authorization_rate = this.tableData[i].authorization_rate * 100 + '%';
            }
          }
          this.pageNum = res.data.page_total;
        }
      });
    }

    private currentPage(page: number) {
      this.getAccredit(page);
    }

    private go(url: string, params: any) {
      this.$router.push({path: url, query: params});
    }

    private back() {
      this.$router.go(-1);
    }
  }
</script>

<style scoped lang='scss'>
  @import '@/styles/back.scss';

  .el-pagination {
    text-align: center;
    margin-top: 20px;
  }

  .more_accredit {
    height: auto;
    border: 15px solid #E9EEF4;
    color: #212D4F;
    background: #fff;
  }

  .cell {
    text-align: center;
  }

  .el-main {
    border: 1px solid #E9EEF4;
    padding: 0px 0px;

  }

  .el-table {
    border: none;
  }

  .el-table td {
    border: none;
  }
</style>
