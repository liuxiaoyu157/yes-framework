import startDevServer from './designer/devserver';
import path from 'path';
import webpackConfig from './config/webpack.config.designer';
import uiWebpackConfig from './config/webpack.config.designer.ui';

startDevServer(3001, __dirname, path.resolve(__dirname, './src'), webpackConfig, uiWebpackConfig);