import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from 'react-refresh-typescript';

function buildLoaders(options: BuildOptions ): ModuleOptions['rules'] {
  const {mode, typeChecking} = options;
  const isDev = mode === 'development'
  const isProd = mode === 'production'

  const cssLoadersMod = {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: isDev ? '[name]__[local]' : '[hash:base64:8]'
      }
    }
  }
  
  const styleLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      cssLoadersMod,
      "sass-loader"
    ],
  }
  
  const tsLoader = {
      exclude: /node_modules/,
      test: /\.tsx?$/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: !typeChecking,
            getCustomTransformers: () => ({
              before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
            }),
          }
        }
      ]
  }

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif|woff(2)?|eot|ttf|otf)$/,
    type: "asset/resource",
  }

  const svgLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [
      { 
        loader: '@svgr/webpack', 
        options: { 
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: 'convertColors',
                params: {
                  currentColor: true
                }
              }
            ]
          }
        } 
      }
    ],
  }

  return [
    assetLoader,
    styleLoader,
    tsLoader,
    svgLoader
  ]
}

export default buildLoaders;