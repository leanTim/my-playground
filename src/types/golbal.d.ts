declare global {
  type Recordable<T = any> = Record<string, T>
  declare module '*.md'
}

export {}
