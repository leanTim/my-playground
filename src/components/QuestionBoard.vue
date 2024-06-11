import { type } from '../types/declaration-files/auto-import';
<template>
    <div id="question-board-card">
        <el-card id="question-card">
            <md-viewer :value="level.content"></md-viewer>
            <el-divider></el-divider>
            <div class="level-control-box">
                <el-button v-if="levelNum > 0" style="float: left" @click="toPrevLevel">上一关</el-button>
                <el-button type="primary" :disabled="levelNum === mainLevels.length - 1" style="float: right"
                    @click="toNextLevel">下一关</el-button>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { getCurrentLevelNum, getNextLevel, getPreviousLevel } from '@/levels';
import mainLevels from '@/levels/mainLevels';
import { useRouter } from "vue-router";

interface Props {
    level: LevelType
}

const router = useRouter()
const props = withDefaults(defineProps<Props>(), {})
const { level } = toRefs(props)
// 当前关卡索引
const levelNum = computed(() => {
    return getCurrentLevelNum(level.value)
})

// 切换关卡时滚动条回到顶部
watch([levelNum], () => {
    window.scrollTo({
        top: 0,
    })
    const cardDom = document.getElementById("question-card")
    if (cardDom) {
        cardDom.scrollTop = 0
    }
})


const toNextLevel = () => {
    const toLevel = getNextLevel(level.value)
    if (toLevel) {
        router.push(`/learn/${toLevel.key}`)
    }
}

const toPrevLevel = () => {
    const toLevel = getPreviousLevel(level.value)
    if (toLevel) {
        router.push(`/learn/${toLevel.key}`)
    }
}


</script>

<style scoped>
.el-card {
    max-height: calc(100vh - 150px);
    min-height: 600px;
    overflow-y: auto;
}

.level-control-box {
    overflow: hidden;
}
</style>