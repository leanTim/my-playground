// build时要用到的一些脚本
import { resolve } from 'path'
import { cwd } from 'process'

export function getRootPath() {
  return resolve(cwd())
}

//
export function getEnvDir() {
  const rootPath = getRootPath()
  return resolve(rootPath, 'env')
}

export const envDir = getEnvDir()
