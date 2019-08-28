<template>
    <div class="home-container">
        <router-view class="view"></router-view>
    </div>
</template>

<script lang="ts">

  import { Component, Prop, Vue } from 'vue-property-decorator';
  @Component({
    components: {
      
    }
  })
  export default class List extends Vue {

  }
</script>

<style lang="scss" scoped>
@import "src/styles/mixin.scss";
@import "src/styles/variables.scss";
.view{
    max-width: 1440px;
    margin: 0 auto;
}
</style>
