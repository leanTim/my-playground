import { type } from '../types/declaration-files/auto-import';
<template>
    <div id="question-board-card">
        <el-card id="question-card">
            <md-viewer :value="level.content"></md-viewer>
            <el-divider></el-divider>
            <div class="level-control-box">
                <el-button @click="toPrevLevel">上一关</el-button>
                <el-button type="primary" @click="toNextLevel">下一关</el-button>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { getCurrentLevelNum, getNextLevel, getPreviousLevel } from '@/levels';
import { useRouter } from "vue-router";

interface Props {
    level: LevelType
}

const router = useRouter()
const props = withDefaults(defineProps<Props>(), {})
const { level } = toRefs(props)
const levelNum = computed(() => {
    return getCurrentLevelNum(level.value)
})

// 切换关卡时滚动条回到顶部
watch([levelNum], () => {
    // console.log(scrollTo)
    window.scrollTo({
        top: 0,
    })
    const card = document.getElementById("question-card")
    if (card) {
        console.log(card)
        card.scrollTop = 0
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
    display: flex;
    justify-content: space-between;
}
</style>