<template>
  <div class="">
    <div class="header">
      <div class="header_top">
        <span class="text">类型:</span>
        <el-select v-model="valueType" placeholder="请选择">
          <el-option
            v-for="item in optionsType"
            :key="item.type_id"
            :label="item.type_name"
            :value="item.type_id">
          </el-option>
        </el-select>
        <span class="text1" style="text-indent:10px;">删除时间:</span>
        <div class="search_box">
          <el-date-picker
            v-model="valueTime"
            type="daterange"
            range-separator="-"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="开始时间"
            end-placeholder="结束时间">
          </el-date-picker>
        </div>
        <el-button @click="search" type="primary">搜索</el-button>
      </div>
      <div class="header_bottom">
        <span class="text">批量操作:</span>
        <el-button type="primary" @click="allRestore" plain>还原</el-button>
        <el-button type="danger" @click="allDetele" plain>删除</el-button>
      </div>
    </div>
    <div class="content">
      <el-table
        ref="multipleTable"
        :data="tableData"
        :header-cell-style="{background:'#E9EEF4',color:'#7B85AB',fontWeight:'400',textAlign:'center'}"
        :cell-style="{color:'#1F2E4E',fontWeight:'400',textAlign:'center'}"
        tooltip-effect="dark"
        style="width: 100%"
        :header-align="'center'"
        @selection-change="handleSelectionChange">

        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column label="购买时间">
          <template slot-scope="scope">{{ scope.row[1] }}</template>
        </el-table-column>

        <el-table-column prop="2" label="商品名称"></el-table-column>
        <el-table-column prop="3" label="类型"></el-table-column>
        <el-table-column prop="4" label="授权编码"></el-table-column>
        <el-table-column label="删除时间">
          <template slot-scope="scope">{{ scope.row[5] }}</template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <div class="active_box">
              <div style="color:#409EFF;" @click="onlyRestore(scope.row[0])">还原</div>
              <div @click="onlyDetele(scope.row[0])">删除</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="this.page"
          :page-count="this.page_total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { getRecycle_bin,getRecycle_type,restoreRecycled,deleteRecycled,restoreSingleRecycled,deleteSingleRecycled } from "@/api/consoles";
export default {
  data() {
    return {
      optionsType: [],
      valueType: 1,    //类型
      valueTime:'',     //时间
      searchVal:'',
      tableData: [],
      multipleSelection: [],
      page:1, //页码
      page_total:0,//总页数
      singleList:[],
    }
  },
  created(){
    this.getType();
    this.getData();
  },
   methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    getData(){//获取数据列表
      getRecycle_bin({
        style:'all',   //获取最近
        type_id:this.valueType, //类型id
        page:this.page,
        start_time:this.valueTime[0],
        end_time:this.valueTime[1]
      }).then(res => {
        if(!!res){
          this.tableData = res.data.data;
        }
      })
    },
    getType(){//获取类型
      getRecycle_type().then(res => {
        if(!!res){
          this.optionsType = res.data;
        }
      })
    },
    search(){
      this.getData();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    onlyRestore(id){//单个还原
      this.$confirm('是否还原该记录？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          restoreSingleRecycled(id).then(res => {
            if(!!res){
              this.$message({type: 'success',message: '还原成功!'});
              this.getData();
            }
          })
        })
    },
    onlyDetele(id){//单个删除
      this.$confirm('是否删除该记录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        deleteSingleRecycled(id).then(res => {
          if(!!res){
            this.$message({type: 'success',message: '删除成功!'});
            this.getData();
          }
        })
      })
    },
    allRestore(){//还原所选
      if(this.multipleSelection.length == 0){
         this.$message({message: '请选择需还原的选项',type: 'warning'});
         return 
      }
      this.$confirm('是否还原所选记录？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          this.singleList = [];
          this.multipleSelection.forEach(item => this.singleList.push(item[0]))
          restoreRecycled(this.singleList.join(',')).then(res => {
            if(!!res){
              this.$message({type: 'success',message: '还原成功!'});
              this.getData();
            }
          })
        })
    },
    allDetele(){//删除所选
      if(this.singleList.length == 0){
         this.$message({message: '请选择需删除的选项',type: 'warning'});
         return 
      }
      this.$confirm('是否删除所选记录？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          this.singleList = [];
          this.multipleSelection.forEach(item => this.singleList.push(item[0]))
          deleteRecycled(this.singleList.join(',')).then(res => {
            if(!!res){
              this.$message({type: 'success',message: '删除成功!'});
              this.getData();
            }
          })
        })
    }
  },
  components: {

  }
}
</script>

<style lang="scss" scoped>
.header_top,.header_bottom{
  display: flex;
  align-items: center;
}
.header_bottom{
  margin-top: 20px;
}
.content{
  padding-top: 20px;
}
.page{
  display:flex;
  justify-content: center;
  margin-top: 20px;
}
.text{
  color:#7686A8;
  font-size: 14px;
  display: block;
  width: 80px;
  height: 40px;
  line-height: 40px;
}
.text1{
  color:#7686A8;
  font-size: 14px;
  display: block;
  width: 80px;
  height: 40px;
  line-height: 40px;
  text-indent: 30px;
}
.search_box{
  margin:0 20px;
}
.active_box{
  display: flex;
  justify-content: center;
  &>div:first-of-type{
    cursor: pointer;
  }
  &>div:last-of-type{
    color:#FF6173;
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>
