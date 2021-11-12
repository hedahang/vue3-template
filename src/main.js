import { createApp } from "vue";
import Antd from "ant-design-vue";
import App from "./App.vue";
import "ant-design-vue/dist/antd.css";

import "@/assets/styles/index.less"; // 全局样式

import router from "./router";
import store from "./store";

import "./assets/icons"; // icon

import SvgIcon from "@/components/SvgIcon"; // svg components

const app = createApp(App);

app.use(Antd);

// 组件注册
app.component("svg-icon", SvgIcon);
app.use(store).use(router).mount("#app");
