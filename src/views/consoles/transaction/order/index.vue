<template>
  <div class="order_box">
    <button class='back ret' @click="back()">返回 <i class="el-icon-refresh-left"></i></button>
    <el-card shadow="always">
      <el-tabs v-model="activeName">
        <el-tab-pane label="当前委托" name="all">
          <now></now>
        </el-tab-pane>
        <el-tab-pane label="历史委托" name="renew">
          <history></history>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import now from "./now.vue";
import history from "./history.vue";
@Component({
  components: {
    now,
    history
  }
})
export default class userInfo extends Vue {
  private list = [];
  private listLoading = true;
  private activeName = "all";
  private back(){
    this.$router.go(-1)
  }
}
</script>
<style>


</style>
<style scoped lang="scss">
.order_box{
  overflow: auto;
  min-width: 1200px;
  position: relative;
}
  @import '@/styles/back.scss';
  .order{
    position: relative;
  }
  .ret{
    position: absolute;
    left: 230px;
    top:43px;
    z-index: 999;
  }
</style>