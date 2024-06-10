<template>
    <div class="index-page">
        <el-row :gutter="20">
            <el-col :span="12" class="">
                <question-board :value="md"></question-board>
            </el-col>
            <el-col :span="12" class="right-panel">
                <sql-editor :level="level1" :editor-style="style" :result-status="2" :on-submit="onSubmit"></sql-editor>
                <el-card>
                    <el-collapse>
                        <el-collapse-item title="查看执行结果" name="result">
                            <sql-result-table :data="answerResult"></sql-result-table>
                        </el-collapse-item>
                        <el-collapse-item title="查看提示" name="hint"></el-collapse-item>
                        <el-collapse-item title="查看建表语句" name="initSQL"></el-collapse-item>
                        <el-collapse-item title="查看答案" name="answer "></el-collapse-item>
                    </el-collapse>
                </el-card>
                <!-- <code-editor :init-value="level.initSQL" :editor-style="{ minHeight: '400px' }"></code-editor> -->
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import level1 from '@/levels/main/level1';
import md from '@/levels/main/level1/README.md?raw'
import type { QueryExecResult } from 'sql.js';

const style = {
    'min-height': '400px'
}

// 用户执行结果
const result = ref<QueryExecResult[]>([])
// 答案
const answerResult = ref<QueryExecResult[]>([])
const errorMsg = ref<string>()

const onSubmit = (
    sql: string,
    res: QueryExecResult[],
    answerRes: QueryExecResult[],
    errMsg?: string
) => {
    result.value = res
    answerResult.value = answerRes
    errorMsg.value = errMsg
}
</script>

<style></style>