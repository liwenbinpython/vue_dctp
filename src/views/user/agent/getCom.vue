<template>
    <div>
        <el-table
        :data="data.list"
        style="width: 100%">
        <el-table-column
            prop="create_time"
            label="时间">
        </el-table-column>
        <el-table-column
            prop="user_name"
            label="账号">
        </el-table-column>
        <el-table-column
            prop="volume"
            label="佣金">
        </el-table-column>
        <el-table-column
            label="币种">
            <template slot-scope="scope">
                <span>{{scope.row.symbol? scope.row.symbol.toUpperCase() : ''}}</span>
            </template>
        </el-table-column>
        <el-table-column
            label="操作">
            <template slot-scope="scope">
                <el-button :data="scope" style="color:#F56C6C" type="text" size="small">删除</el-button>
            </template>
        </el-table-column>
        </el-table>
        <div class="page">
            <el-pagination
            prev-text = "上一页"
            next-text = "下一页"
            layout="prev, pager, next, jumper"
            :total="data.total"
            :page-size="data.page_size"
            :current-page="data.currentPage"
            @current-change='handleCurrentChange'
            >
            </el-pagination>
        </div>
    </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { getCom } from '@/api/user';
@Component({
  components: {},
  filters: {
    toUpper: (val: string) => {
      return val.toUpperCase();
    }
  }
})
export default class Com extends Vue {
    private data = {
        list:[],
        page_size:10,              // 每页条数
        total:0,                  // 数据总数
        currentPage : 1          // 当前页码
    }

  created() {
    this.getList();
  }
  
  private getList(page:number=1) {
      getCom(page).then((res :any) =>{
        if(res.status === 200){
            this.data.list = res.data;
            this.data.total = res.volume;
        }
      })
  }
  // 页码发生改变
  private handleCurrentChange(page : number) {
    this.getList(page);
  }

    

}
</script>
<style lang="scss" scoped>
    .page{
        height: 57px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right:20px;
    }
</style>
