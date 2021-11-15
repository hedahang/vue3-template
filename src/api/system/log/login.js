import request from "@/utils/request";

// 查询登录日志列表
export function list(query) {
  return request({
    url: "/system/ctidLogininfor/list",
    method: "post",
    data: query,
    params: query,
  });
}

// 删除登录日志
export function delLogininfor(infoIds) {
  return request({
    url: "/system/ctidLogininfor/delete",
    method: "post",
    data: infoIds,
  });
}

// 清空登录日志
export function cleanLogininfor() {
  return request({
    url: "/system/ctidLogininfor/removeAll",
    method: "post",
  });
}

// 导出登录日志
export function exportLogininfor(query) {
  return request({
    url: "/system/ctidLogininfor/export",
    method: "post",
    responseType: "blob",
    data: query,
  });
}
