const path = require('path');
const NodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const clientConfig = {
  entry: './src-client/index.js',
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: 'index.bundle.js'
  },
  target: "web",
}
const serverConfig = {
  entry: "./src-server/main.ts",
  externals: [NodeExternals()],
  target: "node",
  module: {
    rules: [
      { test: /\.tsx?$/, use: "ts-loader", exclude: '/node_modules/' }
    ],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: "main.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    plugins: [new TsconfigPathsPlugin({configFile: './tsconfig.json'})]
  },
};

module.exports.client = clientConfig
module.exports.server = serverConfig;
