import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { BuildOptions } from "./types/types";
import webpack, { Configuration, DefinePlugin } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import CopyPlugin from 'copy-webpack-plugin';

function buildPlugins({mode, paths , analyzer, platform, typeChecking} : BuildOptions): Configuration['plugins'] {
  const isDevelopment = mode === 'development'
  const isProduction = mode === 'production'

  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({
      template: paths.html,
      favicon: path.resolve(paths.public, 'favicon.ico')
    }),
    new DefinePlugin({
      __PLATFORM__: JSON.stringify(platform),
    })
  ]

  if(isDevelopment) {
    plugins.push(new webpack.ProgressPlugin());
    plugins.push(new ForkTsCheckerWebpackPlugin());
    plugins.push(new ReactRefreshWebpackPlugin());
  }

  if (isProduction) {
    plugins.push(new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    }));
    plugins.push(new CopyPlugin({
      patterns: [
        {
          from: path.resolve(paths.public, 'data'),
          to: path.resolve(paths.output, 'data')
        }
      ]
    }))
  }
  if(analyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
}

export default buildPlugins;