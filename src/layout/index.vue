<template>
  <div class="app-wrapper">
    <Sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: true }" class="main-container">
      <AppMain />
    </div>
  </div>
</template>
<script>
import { AppMain, Sidebar } from "./components";
export default {
  name: "Layout",
  components: {
    AppMain,
    Sidebar,
  },
  setup() {},
};
</script>
<style lang="less" scoped>
@import "~@/assets/styles/variables.less";

.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  background: #e8edf7;
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  // width: calc(100% - @sideBarWidth);
  width: 100%;
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  // width: calc(100% - 54px);
  width: 100%;
}

.mobile .fixed-header {
  width: 100%;
}
</style>
