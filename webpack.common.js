const path = require('path');
const NodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

/********************************************************************
 *        Shared Config
 ********************************************************************/
const tsModule =   {
  module: {
    rules: [
      { 
        test: /\.tsx?$/, 
        use: {
        loader: "ts-loader",
        options: { experimentalWatchApi: true },
        },
      }
    ],
  },
}

const tsResolve = {
  resolve: {
    extensions: [".ts", ".tsx", ".js", "jsx", ".json"],
    plugins: [new TsconfigPathsPlugin({configFile: './tsconfig.json'})]
  }
}

/********************************************************************
 *        Client Config
 ********************************************************************/
const clientConfig = {
  entry: './src-client/index.ts',
  output: {
    path: path.resolve(__dirname, 'build', 'public'),
    filename: 'dist/index.bundle.js'
  },
  target: "web",
  plugins: [
    new CopyPlugin([
      {from: 'public', to: '.'}
    ])
  ],
  ...tsModule,
  ...tsResolve,
}

/********************************************************************
 *        Server Config
 ********************************************************************/
const serverConfig = {
  entry: "./src-server/main.ts",
  externals: [NodeExternals()],
  target: "node",
  node: {
    __dirname: false,
    __filename: false,
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: "main.js",
  },
  ...tsModule,
  ...tsResolve,
};

/********************************************************************
 *        Exports
 ********************************************************************/
module.exports.client = clientConfig;
module.exports.server = serverConfig;
