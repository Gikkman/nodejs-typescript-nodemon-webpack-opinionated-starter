const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const clientConfig = merge(common.client, {
  mode: 'production',
});

const serverConfig = merge(common.server, {
  mode: 'production',
});

module.exports = [clientConfig, serverConfig]