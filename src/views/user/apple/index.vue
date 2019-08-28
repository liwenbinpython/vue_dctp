<template>
  <div class="app-container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>申请记录</span>
        </div>
        <div>
            <el-table
                :data="data.list"
                border
                style="width: 100%">
                <el-table-column
                align="center"
                    prop="create_time"
                    label="时间">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="application_info"
                    label="申请内容">
                </el-table-column>
                <el-table-column
                align="center"
                    label="状态">
                    <template slot-scope="scope">
                        <span style="color:red;" v-if="scope.row.state == 0">未通过</span>
                        <span style="color:#67c23a;" v-if="scope.row.state == 1">审核通过</span>
                        <span v-if="scope.row.state == 2">已失效</span>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button @click="deleteItem(scope.row.id)" style="color:#F56C6C" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
                </el-table>
                <!-- <div class="page">
                    <el-pagination
                    prev-text = "上一页"
                    next-text = "下一页"
                    layout="prev, pager, next, jumper"
                    :total="2"
                    :page-size="2"
                    :current-page = "1"
                    >
                    </el-pagination>
                </div> -->
        </div>

        </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { getApplication,deleteApplication } from '@/api/user'
@Component({
  components: {}
})
export default class List extends Vue {
    private data = {
        list:[]
    }
    created() {
        this. getList();
    }
    private getList() {
        getApplication().then((res:any) => {
            if(res.status === 200){
                this.data.list = res.data;
            }
        })
    }

    private deleteItem(id:any) {
        this.$confirm('是否要删除该条申请记录？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        }).then(() => {
            deleteApplication(1).then((res:any) => {
                if(res.status === 200){
                    this.$message({message: '删除成功',type: 'success',});
                    this. getList();
                }else{
                    this.$message({message: res.msg,type: 'error',});
                }
            })
        }).catch(() => {
            return;
        });
    }
}
</script>

<style lang="scss" scoped>
.page{
        height: 57px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
