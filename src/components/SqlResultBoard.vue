<template>
    <el-card>
        <template #header>
            执行结果
        </template>
        <sql-result-table v-if="!errorMsg" :data="result"></sql-result-table>
        <div v-else>❌ 语句错误：{{ errorMsg }}</div>
    </el-card>
</template>

<script setup lang="ts">
import type { QueryExecResult } from 'sql.js';

interface Props {
    result: QueryExecResult[]
    errorMsg: string
    level?: LevelType
}

const props = withDefaults(defineProps<Props>(), {
    result: () => [],
    errorMsg: () => ''
})

const { result } = toRefs(props)
</script>

<style scoped>
.el-card {
    max-height: 420px;
    overflow-y: auto;
}
</style>