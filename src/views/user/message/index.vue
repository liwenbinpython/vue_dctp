<template>
  <div class="message home-container">
    <div class="title">
      <span>全部消息</span>
    </div>
    <div class="body">
      <div class="body-title">
        <div class="title-left">
          <el-checkbox v-model="checked" @change="toggleAllSelection()">全选</el-checkbox>
        </div>
        <div class="title-left read" @click="updateAll()">标记为已读</div>
        <div class="title-left del" @click="delelteAll()">全部删除</div>
        <div class="title-right">
          <el-button type="shape" @click="$router.push({path:'/message/unread'})">未读消息</el-button>
        </div>
        <div class="title-right">
          <el-button type="shape" @click="$router.push({path:'/message/read'})">已读消息</el-button>
        </div>
      </div>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column align="center" label="时间">
          <template slot-scope="scope">{{ scope.row.message_id }}</template>
        </el-table-column>
        <el-table-column align="center" label="内容">
          <template slot-scope="scope">{{ scope.row.content }}</template>
        </el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">{{ scope.row.state | stateFilter }}</template>
        </el-table-column>
        <el-table-column align="center" prop="oper" label="操作">
          <template slot-scope="scope">
            <div @click="deleteOne(scope.row.message_id)" class="oper">删除</div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="hc-pagination">
      <el-pagination
        :current-page.sync="pages.page"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="pages.total"
        layout="prev, pager, next, jumper"
      ></el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { getMessage, delMessage, updateMessage } from "@/api/log";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Message } from "element-ui";
@Component({
  filters: {
    stateFilter(status: number) {
      const stateMap: any = ["未读", "已读"];
      return stateMap[status];
    }
  }
})
export default class MessageIndex extends Vue {
  private list = []; // 数据列表
  private listLoading = true;
  private listQuery = {};
  private pages = { pageSize: 10, page: 1, total: 0 };
  private checked = false;
  private multipleSelection = [];
  private message_id_list: number[] = [];

  private created() {
    this.fetchData();
  }

  // 监控选中数据的变化，获取对应ID列表
  @Watch("multipleSelection")
  private getSelectId(rows: any) {
    // const arr: string[] = [];
    // const ob: object = {};
    this.message_id_list = [];
    rows.forEach((row: any) => {
      this.message_id_list.push(row.message_id);
    });
  }

  private fetchData() {
    this.checked = false;
    this.listLoading = true;
    getMessage({ page: this.pages.page, all_message: "all_message" }).then(
      (response: any) => {
        this.list = response.data;
        if(response.data.total){
          this.pages.total = response.data.total;
        }
        this.listLoading = false;
      }
    );
  }

  // 更新数据
  private updateMessage(data?: any) {
    this.listLoading = true;
    updateMessage(data).then((response: any) => {
      this.fetchData();
      this.listLoading = false;
    });
  }

  private delelteAll() {
    if (this.message_id_list.length < 1) {
      Message({
        message: "选项不能为空",
        type: "warning",
        duration: 2 * 1000
      });
      return false;
    }
    this.delelteMessage({ message_id_list: this.message_id_list });
  }

  private updateAll() {
    if (this.message_id_list.length < 1) {
      Message({
        message: "选项不能为空",
        type: "warning",
        duration: 2 * 1000
      });
      return false;
    }
    this.updateMessage({ message_id_list: this.message_id_list });
  }

  private delelteMessage(data?: any) {
    delMessage(data).then((response: any) => {
      Message({
        message: response.msg,
        type: "success",
        duration: 2 * 1000
      });
      this.fetchData();
      this.listLoading = false;
    });
  }

  private deleteOne(message_id: number) {
    this.delelteMessage({ message_id });
  }

  // 当分页变动时调用的函数
  private handleSizeChange(val: any) {
    this.fetchData();
  }

  private handleCurrentChange(val: any) {
    this.fetchData();
  }

  private handleSelectionChange(val: any) {
    this.multipleSelection = val;
  }

  private toggleSelection(rows: any) {
    if (rows) {
      rows.forEach((row: any) => {
        (this.$refs.multipleTable as any).toggleRowSelection(row);
      });
    } else {
      (this.$refs.multipleTable as any).clearSelection();
    }
  }

  private toggleAllSelection() {
    (this.$refs.multipleTable as any).clearSelection();
    if (this.checked) {
      (this.$refs.multipleTable as any).clearSelection();
      this.list.forEach((row: any) => {
        (this.$refs.multipleTable as any).toggleRowSelection(row);
      });
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/styles/mixin.scss";
@import "src/styles/btn.scss";

.message {
  max-width: 1200px;
  margin: 0 auto;
  .title {
    margin-top: 20px;
    height: 60px;
    line-height: 60px;
    padding-left: 30px;
    font-size: 18px;
    background: #fff;
    span:nth-child(2) {
      font-size: 16px;
    }
  }
  .body {
    margin-top: 20px;
    .body-title {
      @include clearfix;
      background: #fff;
      height: 60px;
      line-height: 60px;
      font-size: 14px;
      .title-left {
        margin-left: 30px;
        float: left;
        cursor: pointer;
      }
      .title-right {
        float: right;
        margin-right: 30px;
        cursor: pointer;
      }
      .read {
        color: #6388ff;
      }
      .del {
        color: #ff6173;
      }
    }
  }
}
.hc-pagination {
  margin-top: 20px;
  text-align: center;
}
.oper {
  color: #ff6173;
  font-size: 14px;
  cursor: pointer;
}
</style>