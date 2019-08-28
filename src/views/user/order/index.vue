<template>
  <div class="app-container order">
    <el-card shadow="always">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部订单" name="all">
          <OrderList></OrderList>
        </el-tab-pane>
        <el-tab-pane label="续费记录" name="renew">
          <RenewList></RenewList>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import OrderList from "./orderList.vue";
import RenewList from "./renewList.vue";
@Component({
  components: {
    OrderList,
    RenewList
  }
})
export default class userInfo extends Vue {
  private list = [];
  private listLoading = true;
  private activeName = "all";
  private handleClick(tab: any, event: any) {
    //console.log(tab, event);
  }
}
</script>

<style scoped lang="scss">

</style>