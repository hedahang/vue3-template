const route = [
  {
    path: "/warningmonitoring",
    component: "Layout",
    meta: { title: "预警监控", icon: "warning", noCache: false },
    children: [
      {
        path: "/personnelcontrastwarning",
        component: "warningMonitoring/personnelContrastWarning",
        name: "personnelContrastWarning",
        meta: { title: "人员比对异常提醒", icon: "", noCache: true },
      },
      {
        path: "/lowStockWaining",
        component: "warningMonitoring/lowStockWaining",
        name: "lowStockWaining",
        meta: { title: "低存量预警", icon: "", noCache: true },
      },
    ],
  },
  {
    path: "/customermanagement",
    component: "Layout",
    children: [
      {
        path: "/customermanagement",
        component: "customerManagement",
        name: "customerManagement",
        meta: { title: "客户管理", icon: "user", noCache: true },
      },
    ],
  },
  {
    path: "/configurationManagement",
    component: "Layout",
    name: "configurationManagement",
    meta: { title: "配置管理", icon: "config", noCache: true },
    children: [
      {
        path: "/customerconfiguration",
        component: "configurationManagement/customerConfiguration",
        name: "customerConfiguration",
        meta: { title: "客户配置", icon: "", noCache: true },
      },
      {
        path: "/warningconfiguration",
        component: "configurationManagement/warningConfiguration",
        name: "warningConfiguration",
        meta: { title: "预警配置", icon: "", noCache: true },
      },
      {
        path: "/dataupdate",
        component: "configurationManagement/dataUpdate",
        name: "dataUpdate",
        meta: { title: "数据更新", icon: "", noCache: true, isAdmin: true },
      },
    ],
  },
  {
    path: "/LogManagement",
    component: "Layout",
    name: "LogManagement",
    meta: { title: "日志管理", icon: "log", noCache: true },
    children: [
      {
        path: "/operationlog",
        component: "logManagement/operationLog",
        name: "operationLog",
        meta: { title: "操作日志", icon: "", noCache: true },
      },
      {
        path: "/loginLog",
        component: "logManagement/loginLog",
        name: "loginLog",
        meta: { title: "登录日志", icon: "", noCache: true },
      },
    ],
  },
];

export default route;
