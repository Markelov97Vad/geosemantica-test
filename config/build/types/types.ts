export type BuildMode = 'production' | 'development'
export type PlatformType = 'desktop' | 'mobile'

export interface BuildPaths {
  entry: string;
  html: string;
  output: string;
  public: string;
  src: string
}

export interface BuildOptions {
  port: number;
  paths:  BuildPaths;
  mode: BuildMode;
  analyzer?: boolean;
  platform: PlatformType
  typeChecking?: boolean
}