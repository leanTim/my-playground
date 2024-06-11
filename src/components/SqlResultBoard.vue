<template>
    <el-card>
        <template #header>
            执行结果：<span class="result-span">{{ RESULT_STATUS_INFO_MAP[resultStatus] }}</span>
        </template>
        <sql-result-table v-if="!errorMsg" :data="result"></sql-result-table>
        <div v-else>❌ 语句错误：{{ errorMsg }}</div>
    </el-card>
</template>

<script setup lang="ts">
import { RESULT_STATUS_INFO_MAP } from '@/utils/sqlResult';
import type { QueryExecResult } from 'sql.js';

interface Props {
    result: QueryExecResult[]
    errorMsg: string
    resultStatus: number
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

.result-span {
    float: right;
}
</style>