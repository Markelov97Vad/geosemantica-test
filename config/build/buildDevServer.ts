import path from "path";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types/types";

function buildDevServer(options: BuildOptions): DevServerConfiguration {
  return {
    static: path.resolve(__dirname, "./build"),
    compress: true,
    port: options.port ?? 3000,
    open: true,
    // historyApiFallback: true
  }
}

export default buildDevServer;