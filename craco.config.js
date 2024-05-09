const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  webpack: {
    // 建立路徑別名
    alias: {
      // 將 "@" 設置為別名, 指向根目錄下src作為絕對路徑
      "@": path.resolve(__dirname, "src"),
    },
    plugins: [
      new NodePolyfillPlugin(),
    ],
  },
};
