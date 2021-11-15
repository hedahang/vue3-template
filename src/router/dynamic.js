const route = [
  {
    path: "/customer",
    component: "Layout",
    children: [
      {
        path: "/customer",
        component: "customer",
        name: "customer",
        meta: { title: "客户管理", icon: "user", noCache: true },
      },
    ],
  },
  {
    path: "/log",
    component: "Layout",
    name: "Log",
    meta: { title: "日志管理", icon: "log", noCache: true },
    children: [
      {
        path: "operation",
        component: "log/operation",
        name: "LogOperation",
        meta: { title: "操作日志", icon: "", noCache: true },
      },
      {
        path: "login",
        component: "log/login",
        name: "Logogin",
        meta: { title: "登录日志", icon: "", noCache: true },
      },
    ],
  },
];

export default route;
