import { createRouter, createWebHashHistory } from "vue-router";

/**
 * @description: default layout
 */
const LAYOUT = () => import("@/layout");

// 公共路由
export const constantRoutes = [
  // {
  //   path: "/",
  //   name: "Root",
  //   redirect: "/home",
  // },
  {
    path: "/",
    component: LAYOUT,
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
    component: () => import("@/views/login.vue"),
    hidden: true,
  },
  {
    path: "/about",
    name: "About",
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
