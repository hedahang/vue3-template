import { createRouter, createWebHashHistory } from "vue-router";

/**
 * @description: default layout
 */
const Layout = () => import("@/layout");

// 公共路由
export const constantRoutes = [
  {
    path: "/",
    component: Layout,
    redirect: "home",
    children: [
      {
        path: "home",
        component: () => import("@/views/home/index.vue"),
        name: "Home",
        meta: { title: "首页", icon: "dashboard", noCache: true, affix: true },
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login.vue"),
    hidden: true,
  },
  {
    path: "/404",
    component: () => import("@/views/error/404"),
    hidden: true,
  },
  {
    path: "/401",
    component: () => import("@/views/error/401"),
    hidden: true,
  },
  {
    path: "/about",
    name: "About",
    hidden: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
});

export default router;
