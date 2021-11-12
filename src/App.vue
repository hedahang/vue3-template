<template>
  <ConfigProvider :locale="getAntdLocale">
    <RouterView />
  </ConfigProvider>
</template>

<script>
import { ConfigProvider } from "ant-design-vue";
export default {
  name: "App",
  components: {
    ConfigProvider,
  },
  data() {
    return {
      getAntdLocale: {
        locale: "zh-cn",
        prefixCls: "sw",
      },
    };
  },
  methods: {},
};
</script>
