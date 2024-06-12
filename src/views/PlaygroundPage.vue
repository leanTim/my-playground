<template>
    <layout>
        <template v-slot:left>
            <sql-editor :level="mainLevels[0]" :editor-style="{ height: 480 + 'px' }"
                :on-submit="onSubmit"></sql-editor>
            <el-card>
                <template #header>
                    <span style="font-weight: 800;">执行历史</span>
                </template>
                <el-collapse>
                    <el-collapse-item v-for="item in sqlHistoryList" :title="item.sql">
                        <sql-result-board :result="item.result" :errorMsg="item.errorMsg"></sql-result-board>
                    </el-collapse-item>
                </el-collapse>
            </el-card>
        </template>
        <template v-slot:right>
            <sql-result-board :result="result"></sql-result-board>
        </template>
    </layout>
</template>

<script setup lang="ts">
import mainLevels from '@/levels/mainLevels';
import type { QueryExecResult } from 'sql.js';

const result = ref<QueryExecResult[]>([])
const sqlHistoryList = ref<any[]>([])

const onSubmit = (
    sql: string,
    res: QueryExecResult[],
    answer: QueryExecResult[],
    errorMsg?: string
) => {
    result.value = res
    sqlHistoryList.value.push({
        sql,
        result: res,
        errorMsg,
    })
}
</script>

<style scoped></style>