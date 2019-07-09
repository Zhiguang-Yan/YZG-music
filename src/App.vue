<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
const MHeader = () => import("components/m-header/m-header");
const Tab = () => import("components/tab/tab");
const Player = () => import("components/player/player.vue");
export default {
  name: "App",
  components: {
    MHeader,
    Tab,
    Player
  }
};
</script>

<style lang="stylus">
@import '~common/stylus/variable';

#app {
  color: $color-theme;
}
</style>

