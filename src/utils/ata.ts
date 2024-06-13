/**
 * @name TypeScript - Automatic Type Acquisition
 * @link https://www.npmjs.com/package/@typescript/ata
 * @effect 传入源码，自动分析出需要的 ts 类型包，然后自动下载。
 */

import { setupTypeAcquisition } from '@typescript/ata'
import typescript from 'typescript'

// export default ata
export function createATA(onDownloadFile: (code: string, path: string) => void) {
  const ata = setupTypeAcquisition({
    projectName: 'My ATA Project',
    typescript: typescript,
    logger: console,
    delegate: {
      receivedFile: (code: string, path: string) => {
        console.log('自动下载的包', path)
        onDownloadFile(code, path)
      },
      started: () => {
        console.log('ATA start')
      },
      progress: (downloaded: number, total: number) => {
        console.log(`Got ${downloaded} out of ${total}`)
      },
      finished: (vfs) => {
        console.log('ATA done', vfs)
      }
    }
  })

  return ata
}
