import type { QueryExecResult } from 'sql.js'
// 处理sql结果的一些逻辑

// 执行结果的枚举
enum ResultStatus {
  DEFAULT,
  ERROR,
  SUCCEED
}

export const RESULT_STATUS_ENUM = ResultStatus
// 执行结果的映射
export const RESULT_STATUS_INFO_MAP = ['未执行', '❌ 错误', '✅ 正确']

/**
 *
 * @param result 用户执行结果
 * @param answer  正确答案
 * @returns
 */
export const checkResult = (result: QueryExecResult[], answer: QueryExecResult[]) => {
  if (!result?.[0] || !answer?.[0]) {
    return RESULT_STATUS_ENUM.ERROR
  }
  // 列表columns需要一致
  const resColumns = result[0].columns
  const ansColumns = answer[0].columns
  if (JSON.stringify(resColumns) !== JSON.stringify(ansColumns)) {
    return RESULT_STATUS_ENUM.ERROR
  }
  // values 需要一致
  const resValues = result[0].values
  const ansValues = answer[0].values
  if (JSON.stringify(resValues) === JSON.stringify(ansValues)) {
    return RESULT_STATUS_ENUM.SUCCEED
  }
  return RESULT_STATUS_ENUM.ERROR
}
