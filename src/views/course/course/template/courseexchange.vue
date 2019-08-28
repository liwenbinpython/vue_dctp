<template>
  <div class="course-exchange">
    <h4>如何添加交易所</h4>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="第一步" name="1">
        <div>......</div>
        <div>......</div>
      </el-collapse-item>
      <el-collapse-item title="第二步" name="2">
        <div>......</div>
        <div>......</div>
      </el-collapse-item>
      <el-collapse-item title="第三步" name="3">
        <div>......</div>
        <div>......</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  @Component
  export default class CourseExchange extends Vue{
    private activeNames:any = '1'
    private handleChange(val:any){
      
    }
  }
</script>

 <style scoped>
  .course-exchange{
    width: 800px;
  }
  h4{
    padding: 10px 0;
    margin: 0;
  }
 </style>
 