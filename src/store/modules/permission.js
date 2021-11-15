import { constantRoutes } from "@/router";
import Layout from "@/layout/index";
import ParentView from "@/components/ParentView";
import dynamicRoute from "@/router/dynamic";

const permission = {
  state: {
    routes: [],
    addRoutes: [],
    sidebarRouters: [],
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes;
      state.routes = constantRoutes.concat(routes);
    },
    SET_SIDEBAR_ROUTERS: (state, routers) => {
      state.sidebarRouters = constantRoutes.concat(routers);
    },
  },
  actions: {
    // 生成路由
    GenerateRoutes({ commit }, { roles }) {
      return new Promise((resolve) => {
        let res = dynamicRoute || [];
        // TODO: 如果不是admin用户 隐藏部分菜单
        if (Array.isArray(roles) && roles.indexOf("admin") === -1) {
          res = dealRouter(res);
        }
        // 处理路由数据
        const sdata = JSON.parse(JSON.stringify(res));
        const rdata = JSON.parse(JSON.stringify(res));
        const sidebarRoutes = filterAsyncRouter(sdata);
        const rewriteRoutes = filterAsyncRouter(rdata, true);
        rewriteRoutes.push({ path: "*", redirect: "/404", hidden: true });
        commit("SET_ROUTES", rewriteRoutes);
        commit("SET_SIDEBAR_ROUTERS", sidebarRoutes);
        resolve(rewriteRoutes);
      });
    },
  },
};
// 删除不符合要求的数组元素
function dealRouter(arr) {
  var args = [];
  if (Array.isArray(arr)) {
    arr.forEach((item) => {
      if (Array.isArray(item.children)) {
        item.children = dealRouter(item.children);
        if (item.children.length > 0) args.push(item);
      } else if (item.meta && !item.meta.isAdmin) {
        args.push(item);
      }
    });
  }
  return args;
}

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap, isRewrite = false) {
  return asyncRouterMap.filter((route) => {
    if (isRewrite && route.children) {
      route.children = filterChildren(route.children);
    }
    if (route.component) {
      // Layout ParentView 组件特殊处理
      if (route.component === "Layout") {
        route.component = Layout;
      } else if (route.component === "ParentView") {
        route.component = ParentView;
      } else {
        route.component = loadView(route.component);
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, isRewrite);
    }
    return true;
  });
}

// 原始的过滤方法
function filterChildren(childrenMap) {
  var children = [];
  childrenMap.forEach((el) => {
    if (el.children && el.children.length) {
      if (el.component === "ParentView") {
        el.children.forEach((c) => {
          c.path = el.path + "/" + c.path;
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c));
            return;
          }
          children.push(c);
        });
        return;
      }
    }
    children = children.concat(el);
  });
  return children;
}
export const loadView = (view) => {
  // 路由懒加载
  return (resolve) => require([`@/views/${view}`], resolve);
};

export default permission;
