<template>
  <div
    class="has-logo"
    :style="{
      backgroundColor:
        sideTheme === 'theme-dark' ? variables.menuBg : variables.menuLightBg,
    }"
  >
    <Logo :collapse="isCollapse" />
    <a-menu
      mode="inline"
      :theme="sideTheme === 'theme-dark' ? 'dark' : 'light'"
      :inline-collapsed="isCollapse"
      v-model:selectedKeys="activeMenu"
    >
      <sidebar-item
        v-for="(route, index) in sidebarRouters"
        :key="route.path + index"
        :item="route"
        :base-path="route.path"
      />
    </a-menu>
  </div>
</template>
<script>
import { ref, watchEffect } from "vue";
import { mapGetters } from "vuex";
import { useRoute } from "vue-router";
import variables from "@/assets/styles/variables.less";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem.vue";
export default {
  name: "Sidebar",
  components: {
    Logo,
    SidebarItem,
  },
  setup() {
    const { meta, path } = useRoute();
    const activeMenu = ref([]);
    watchEffect(() => {
      if (meta.activeMenu) {
        activeMenu.value = [meta.activeMenu];
      }
      activeMenu.value = [path];
    });
    return {
      variables,
      activeMenu: ["/log/login"],
    };
  },
  computed: {
    ...mapGetters(["sidebarRouters", "sidebar", "sideTheme"]),
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
};
</script>
