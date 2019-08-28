<template>
  <div class="app-container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>工单详情</span>
            <el-button @click="next" style="float: right; padding: 3px 0" type="text">关闭工单（下一步）</el-button>
        </div>
        <div>
            <el-steps :active="active" finish-status="success" simple>
                <el-step title="已受理" ></el-step>
                <el-step title="正在处理" ></el-step>
                <el-step title="未确认" ></el-step>
                <el-step title="待您评价" ></el-step>
            </el-steps>
        </div>
        <div class="content">
            <step1 v-show="active == 0"></step1>
            <step3 v-show="active == 2"></step3>
        </div>
      </el-card>
  </div>
</template>

<script type="text/javascript">
import { getWorkOrderInfo } from "@/api/user";
import step1 from "./step/step1.vue";
import step3 from "./step/step3.vue";
export default {
  data() {
    return {
        id:"",  //工单ID
        data:"",
        active:0,
    }
  },
  created(){
      this.id = this.$route.query.id;
      //this.active = this.$route.query.status-1;
      this.getInfo();
  },
  methods:{
      getInfo(){
          getWorkOrderInfo(this.id).then((res) => {
              this.data = res.data;
              console.log(this.data);
          })
      },
      next(){
          this.active++;
          if(this.active == 5){this.active = 0};
      }
  },
  components: {
      step1,
      step3
  }
}
</script>

<style lang="scss" scoped>
.content{
    padding-top: 30px;
}
</style>
