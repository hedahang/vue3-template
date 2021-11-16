<template>
  <template
    v-if="
      hasOneShowingChild(item.children, item) &&
      (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
      !item.alwaysShow
    "
  >
    <a-menu-item :key="resolvePath(onlyOneChild.path)">
      <template #icon>
        <svg-icon
          :icon-class="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
        />
      </template>
      {{ onlyOneChild.meta.title }}
    </a-menu-item>
  </template>
  <a-sub-menu :key="resolvePath(item.path)" data-name="item.path" v-else>
    <template #icon>
      <svg-icon :icon-class="item.meta && item.meta.icon" />
    </template>
    <template #title>{{ item.meta && item.meta.title }}</template>
    <sidebar-item
      v-for="child in item.children"
      :key="child.path"
      :item="child"
      :base-path="resolvePath(child.path)"
    ></sidebar-item>
  </a-sub-menu>
</template>
<script>
import path from "path";
import { isExternal } from "@/utils/validate";

export default {
  name: "SidebarItem",
  components: {},
  props: {
    item: {
      type: Object,
      required: true,
    },
    basePath: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      onlyOneChild: null,
    };
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      if (!children) {
        children = [];
      }
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }

      return false;
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    },
  },
};
</script>
<style lang="less" scoped>
.el-submenu .el-menu-item {
  padding: 0 0 0 50px !important;
}
</style>
