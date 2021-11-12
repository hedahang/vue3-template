const req = require.context("./svg", false, /\.svg$/);
console.log(req.keys().map(req));
const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);

requireAll(req);
