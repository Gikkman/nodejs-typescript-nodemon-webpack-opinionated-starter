const path = require('path');
const NodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const clientConfig = {
  entry: './src-client/index.js',
  output: {
    path: path.resolve(__dirname, 'build', 'public', 'dist'),
    filename: 'index.bundle.js'
  },
  target: "web",
  plugins: [
    new CopyPlugin([
      {from: 'public', to: '..'}
    ])
  ]
}
const serverConfig = {
  entry: "./src-server/main.ts",
  externals: [NodeExternals()],
  target: "node",
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      { 
        test: /\.tsx?$/, 
        use: {
         loader: "ts-loader",
         options: { experimentalWatchApi: true },
        },
         exclude: '/node_modules/' 
      }
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

module.exports.client = clientConfig;
module.exports.server = serverConfig;
