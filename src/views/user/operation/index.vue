<template>
  <div class="app-container operation">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="用户名" width="300">
        <template slot-scope="scope">{{ scope.row.op_name }}</template>
      </el-table-column>
      <el-table-column align="center" label="操作时间" width="300">
        <template slot-scope="scope">{{ scope.row.create_time }}</template>
      </el-table-column>
      <el-table-column label="操作类型" width="300" align="center">
        <template slot-scope="scope">{{ scope.row.operate_log_type  }}</template>
      </el-table-column>
      <el-table-column align="center" label="内容">
        <template slot-scope="scope">
          <span>{{ scope.row.operate_log }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
//后续更换为操作日志接口
import { getOperateLog } from "@/api/user";
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class logIndex extends Vue {
  private list = [];
  private listLoading = true;

  private created() {
    this.fetchData();
  }

  private fetchData() {
    this.listLoading = true;
    getOperateLog().then((res :any) => {
      this.list = res.data;
      this.listLoading = false;
    });
  }
}
</script>

<style scoped lang="scss">

</style>