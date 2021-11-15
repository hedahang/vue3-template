import request from "@/utils/request";

// 查询操作日志列表
export function list(query) {
  return request({
    url: "/tlog/list",
    method: "get",
    params: query,
  });
}

// 删除操作日志
export function delOperlog(operId) {
  return request({
    url: "/tlog/delete",
    data: operId,
    method: "post",
  });
}

// 清空操作日志
export function cleanOperlog() {
  return request({
    url: "/tlog/clean",
    method: "get",
  });
}

// 导出操作日志
export function exportOperlog(query) {
  return request({
    url: "/tlog/export",
    method: "get",
    params: query,
    responseType: "blob",
  });
}
