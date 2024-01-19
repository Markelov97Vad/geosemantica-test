import { BuildOptions } from "../types/types";
import removeDataTestIdBabelPlugin from "./removeDataTestIdBabelPlugin";

function babelLoader(options: BuildOptions) {
  const { mode } = options;
  const isDev = mode === 'development';
  const isProd = mode === 'production';

  const plugins = []

  if(isDev) {
    
  }

  if(isProd) {
    plugins.push([
      removeDataTestIdBabelPlugin, // кастомный плагин для удаления пропсов, которые не нужны в prod сборке
      {
        props: ['data-testid'] // тот пропс, который нужно удалить
      }
    ])
  }
  return {
    test: /\.tsx?$/,
    // при обработке этих файлов нужно использовать babel-loader
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          "@babel/preset-typescript",
          ["@babel/preset-react", {
            runtime: isDev ? 'automatic' : 'classic'
          }]
        ],
        plugins: plugins.length ? plugins : undefined,
      }
    },
    // исключает папку node_modules, файлы в ней обрабатывать не нужно
    exclude: '/node_modules/'
  }
}

export default babelLoader