const getters = {
  sidebar: (state) => state.app.sidebar,
  sideTheme: (state) => state.app.sideTheme,
  // device: (state) => state.app.device,
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  name: (state) => state.user.name,
  roles: (state) => state.user.roles,
  permissions: (state) => state.user.permissions,
  userinfo: (state) => state.user.userinfo,
  permission_routes: (state) => state.permission.routes,
  sidebarRouters: (state) => state.permission.sidebarRouters,
  refreshTips: (state) => state.common.refreshTips,
};
export default getters;
