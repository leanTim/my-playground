import mainLevels from './mainLevels'

/**
 *
 * @param levelKey 关卡的唯一key
 * @returns level: levelType
 * 根据key返回相应的关卡
 */
export const getLevelByKey = (levelKey: string) => {
  return (
    mainLevels.find((level) => {
      return level.key === levelKey
    }) || mainLevels[0]
  )
}

// 获取当前关卡的索引
export const getCurrentLevelNum = (currentLevel: LevelType) => {
  return mainLevels.findIndex((level: LevelType) => {
    level.key === currentLevel.key
  })
}

// 获取上一关卡的level
export const getPreviousLevel = (currentLevel: LevelType) => {
  const num = getCurrentLevelNum(currentLevel)
  if (num <= 0) {
    return
  }
  return mainLevels[num - 1]
}

// 获取下一关卡的level
export const getNextLevel = (currentLevel: LevelType) => {
  const num = getCurrentLevelNum(currentLevel)
  const levelsLen = mainLevels.length
  if (num >= levelsLen) return

  return mainLevels[num + 1]
}
