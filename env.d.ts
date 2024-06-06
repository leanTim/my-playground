/// <reference types="vite/client" />

declare interface ImportMetaEnv {
  VITE_PUBLIC_PATH: string
  VITE_PORT: number
  VITE_API_BASE_URL: string
  VITE_MOCK_ENABLED: boolean
  VITE_MOCK_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
