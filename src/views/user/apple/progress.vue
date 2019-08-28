<template>
  <div class="app-container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>申请进度</span>
        </div>
        <div>
            <el-steps :active="active" finish-status="success" simple style="margin-top: 20px">
            <el-step title="提交申请" ></el-step>
            <el-step title="已受理" ></el-step>
            <el-step title="结果反馈" ></el-step>
            <el-step title="关闭" ></el-step>
            </el-steps>
        </div>
        <div style="height: 200px;margin-top:40px;">
        <el-steps direction="vertical" finish-status="wait" process-status="finish" :active="active">
            <el-step title="2019/4/14 08:22 —— 提交了申请" description="申请内容：XXXXXXXXXXXXXXXXXXXX"></el-step>
            <el-step title="2019/4/14 08:23 —— 已受理"  description="正在受理所提交信息，请等待......"></el-step>
        </el-steps>
        </div>
        </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({
  components: {}
})
export default class List extends Vue {
    private active = 1;
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
