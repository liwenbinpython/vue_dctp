<template>
   <div class="app-container exchange">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="最近删除" name="first">
        <recentlyDeleted></recentlyDeleted>
      </el-tab-pane>
      <el-tab-pane label="查看全部" name="last">
        <lookAll></lookAll>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import recentlyDeleted  from "./recentlyDeleted";
import lookAll  from "./lookAll";
  export default {
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
    components:{
      recentlyDeleted,
      lookAll
    }
  };
</script>

<style lang="scss" scoped>
.exchange{
  color: #212D4F;
  padding-top:10px;
  background: #fff;
  border: 15px solid #E9EEF4;
}
</style>
