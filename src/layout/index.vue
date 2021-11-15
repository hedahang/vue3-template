<template>
  <div class="app-wrapper">
    <Sidebar class="sidebar-container" />
    <span>223125</span>
    <AppMain />
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
