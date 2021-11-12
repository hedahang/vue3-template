import { createVNode } from "vue";
import axios from "axios";
import { Modal, message, notification } from "ant-design-vue";
import { InfoCircleFilled } from "@ant-design/icons-vue";
import { getToken } from "@/utils/auth";
import errorCode from "@/utils/errorCode";

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_BASE_API,
  // 超时
  timeout: 10000,
});
// request拦截器
service.interceptors.request.use(
  (config) => {
    console.log(config);
    let AUTH_TOKEN = getToken();
    if (AUTH_TOKEN) {
      config.headers["Authorization"] = AUTH_TOKEN; // 让每个请求携带token
    }
    // get请求映射params参数
    if (config.method === "get" && config.params) {
      let url = config.url + "?";
      for (const propName of Object.keys(config.params)) {
        const value = config.params[propName];
        var part = encodeURIComponent(propName) + "=";
        if (value !== null && typeof value !== "undefined") {
          if (typeof value === "object") {
            for (const key of Object.keys(value)) {
              let params = propName + "[" + key + "]";
              var subPart = encodeURIComponent(params) + "=";
              url += subPart + encodeURIComponent(value[key]) + "&";
            }
          } else {
            url += part + encodeURIComponent(value) + "&";
          }
        }
      }
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;
    }
    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use((res) => {
  // 未设置状态码则默认成功状态
  const code = res.data.code || 200;
  // const code = 501;
  // 获取错误信息
  const msg = errorCode[code] || res.data.msg || errorCode["default"];
  if (code === 401) {
    Modal.confirm({
      title: "系统提示",
      content: "登录状态已过期，您可以继续留在该页面，或者重新登录",
      centered: true,
      okText: "重新登录",
      cancelText: "取消",
      icon: createVNode(InfoCircleFilled),
      onOk() {
        this.$store.dispatch("LogOut").then(() => {
          this.$router.push("/login");
        });
      },
    });
  } else if (code === 500) {
    message.error(msg);
    return Promise.reject(new Error(msg));
  } else if (code !== 200) {
    notification.error({
      message: msg,
    });
    return Promise.reject("error");
  } else {
    return res.data;
  }
});

export default service;
