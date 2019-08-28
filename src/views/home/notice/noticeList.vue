<template>
    <div class="noticeList">
      <!-- 面包屑导航 -->
      <div class="crumbs">
        <el-card shadow="hover">
          <el-breadcrumb separator="-">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>官方公告</el-breadcrumb-item>
          </el-breadcrumb>
        </el-card>
      </div>
      <!-- 公告列表 -->
      <ul class="list">
        <li v-for="item in data.list" :key="item.id" class="item" @click="goDetail(item.anno_id)" :to="{path:'detail/:id'}">
          <div class="header">
            <div class="title">{{item.title}}</div>
            <div class="time">{{item.create_time}}</div>
          </div>
          <div class="content">
              {{item.content}}
          </div>
        </li>
      </ul>
      <div class="page">
        <el-pagination
         @current-change="handleCurrentChange"
          prev-text = "上一页"
          next-text = "下一页"
          layout="prev, pager, next, jumper"
          :total="data.total"
          :page-size="data.page_size"
          :current-page = "currentPage"
        >
        </el-pagination>
      </div>
    </div>
</template>

<script lang="ts">
  import { getNoticeList } from '@/api/home';
  import { Component, Prop, Vue } from 'vue-property-decorator';
  @Component
  export default class NoticeList extends Vue {
  	private data = {
      page_size:10,              // 每页条数
      total:0,                  // 数据总数
      list:[]                   // 公告列表
    };
	  private currentPage = 1;    // 当前页码
		private created() {
    	this.fetchData();
  	}
    // 获取公告列表
 		private fetchData() {
    	getNoticeList(1,this.currentPage,null).then((res:any) => {
        if(res.status === 200){
          this.data.total = res.data[0].count;
          this.data.list = res.data[1].info;
        }
			})
    }		
    // 页码发生改变
    private handleCurrentChange(page : number) {
      this.currentPage = page;
      this.fetchData();
    }
    // 前往详情页
		private goDetail(id : any) {
      this.$router.push({ path: 'detail', query: { id }});
    }
  }
</script>

<style lang="scss" scoped>
@import 'src/styles/variables.scss';
.noticeList{
  .crumbs{
    margin: 20px 0;
  }
  .list{
    padding:0;
    margin:0;
    list-style: none;
    .item{
      padding: 30px;
      position: relative;
      background: #fff;
      color: $fontColor;
      font-size: 14px;
      cursor: pointer;
      .header{
        display: flex;
        justify-content: space-between;
        margin-bottom:20px;
        .title{
          color: $titleColor;
          font-size: 16px;
          font-weight: 700;
          flex-grow: 1;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        .time{
          flex-grow: 0;
          flex-shrink: 0;
          width: 140px;
          text-align: right;
        }
      }
      .content{
        height: 45px;
        line-height: 1.5;
        overflow: hidden;
      }
      &:hover{
        background: $globalBg;
        .title{
          color: #409EFF;
        }
      }
      &:after{
        content:'';
        display: block;
        position: absolute;
        bottom:0;
        height: 1px;
        width: calc(100% - 60px);
        background: #eee;
      }
    }
  }
  .page{
    height: 100px;
    width: 100%;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
  
</style>
