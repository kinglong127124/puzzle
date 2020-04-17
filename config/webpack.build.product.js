const _common = require("./webpack.build.common");
// 获取参数
let product = process.env.npm_config_name;

// 构建单个
if (product) module.exports = _common("products", product);

// 构建所有
// TODO
