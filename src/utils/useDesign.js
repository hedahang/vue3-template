const prefixCls = "sw";

export function useDesign(scope) {
  return {
    prefixCls: `${prefixCls}-${scope}`,
    prefixVar: prefixCls,
  };
}
