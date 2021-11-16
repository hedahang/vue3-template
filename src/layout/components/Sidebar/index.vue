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
      :inline-collapsed="status"
      v-model:selectedKeys="activeMenu"
      v-model:openKeys="openKeys"
      @openChange="onOpenChange"
      @click="menuClick"
    >
      >
      <sidebar-item
        v-for="(route, index) in routersNoHidden"
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
    const route = useRoute();
    const { meta, path, matched } = route;
    const activeMenu = ref([]);
    const openKeys = ref([]);
    openKeys.value = matched.map((v) => v.path);
    watchEffect(() => {
      if (meta.activeMenu) {
        activeMenu.value = [meta.activeMenu];
      }
      activeMenu.value = [path];
    });
    return {
      variables,
      activeMenu,
      openKeys,
    };
  },
  computed: {
    ...mapGetters(["sidebarRouters", "sidebar", "sideTheme"]),
    isCollapse() {
      return !this.sidebar.opened;
    },
    routersNoHidden() {
      return this.sidebarRouters.filter((item) => !item.hidden);
    },
  },
  data() {
    return {
      status: false,
    };
  },
  methods: {
    // 点击菜单，路由跳转,注意的是当点击MenuItem才会触发此函数
    menuClick({ item, key, keyPath }) {
      console.log(item);
      console.log(key);
      console.log(keyPath);
      // 获取到当前的key,并且跳转
      this.$router.push({
        path: key,
      });
    },
    onOpenChange(openKeys) {
      console.log(openKeys);
    },
  },
};
</script>
