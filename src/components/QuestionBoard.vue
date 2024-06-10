import { type } from '../types/declaration-files/auto-import';
<template>
    <div id="question-board-card">
        <el-card>
            <md-viewer :value="level.content"></md-viewer>
            <el-divider></el-divider>
            <div class="level-control-box">
                <el-button>上一关</el-button>
                <el-button type="primary">下一关</el-button>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
interface Props {
    level: LevelType
}

const props = withDefaults(defineProps<Props>(), {})
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