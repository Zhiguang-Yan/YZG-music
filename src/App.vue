<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
const MHeader = () => import("components/m-header/m-header");
const Tab = () => import("components/tab/tab");
export default {
  name: "App",
  components: {
    MHeader,
    Tab
  }
};
</script>

<style lang="stylus">
@import '~common/stylus/variable';

#app {
  color: $color-theme;
}
</style>

