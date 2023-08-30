/// <reference types="vite/client" />
declare module 'element-plus'
interface ImportMetaEnv { 
  readonly VITE_DEFAULTICON: string
  readonly VITE_BASEURL: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
