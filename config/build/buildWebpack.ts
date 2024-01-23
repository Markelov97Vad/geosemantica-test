import webpack from 'webpack';
import buildDevServer from './buildDevServer';
import buildLoaders from './buildLoaders';
import buildPlugins from './buildPlugins';
import buildResolvers from './buildResolvers';
import { BuildOptions } from './types/types';

function buildWebpack(option: BuildOptions) : webpack.Configuration {
  const { mode, paths } = option;
  const isDev = mode === 'development';
  console.log('IsDevelop', isDev);

  return {
    mode: mode,
    entry: paths.entry,
    output: {
      path: paths.output,
      filename: "[name].[contenthash].js",
      clean: true,
      assetModuleFilename: 'images/[hash][ext][query]',
    },
    devtool: isDev ? 'eval' : undefined,
    devServer: isDev ? buildDevServer(option) : undefined,
    module: {
      rules: buildLoaders(option)
    },
    resolve: buildResolvers(option),
    plugins: buildPlugins(option),
  };
}

export default buildWebpack