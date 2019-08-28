<template>
    <div class="noticeDetail">
      <!-- 面包屑导航 -->
      <div class="crumbs">
        <el-card shadow="hover">
          <el-breadcrumb separator="-">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'noticeList' }">官方公告</el-breadcrumb-item>
            <el-breadcrumb-item>详情</el-breadcrumb-item>
          </el-breadcrumb>
        </el-card>
      </div>
      <div class="detail">
          <div class="title">
              <h3>{{data.title}}</h3>
              <p class="time">{{data.create_time}}</p>
          </div>
          <div v-html="data.content" class="content">

          </div>
      </div>
    </div>
</template>

<script lang="ts">
  import { getNoticeList } from '@/api/home';
  import { Component, Prop, Vue } from 'vue-property-decorator';
  @Component
  export default class Detail extends Vue {
    private data = {
      content:'',
      create_time:'',
      title:'',
    } 
    private created() {
      let id = this.$route.query.id;
    	getNoticeList(2,null,id).then(res => {
        if(res.status === 200){
          this.data = res.data[0];
        }
      })
  	}
  }
</script>

<style lang="scss" scoped>
@import 'src/styles/variables.scss';
  .noticeDetail{
    .crumbs{
      margin: 20px 0;
    }
    .detail{
      background: #fff;
      padding: 30px;
      .title{
        text-align: center;
        border-bottom:1px solid #eee;
        h3{
          margin-top:0;
          color: $titleColor;
        }
        .time{
          color:$fontColor;
        }
      }
      .content{
        margin-top: 30px;
        color: $fontColor;
        text-indent: 2em;
      }
    }
  }
</style>
