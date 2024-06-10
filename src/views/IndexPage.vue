<template>
    <div class="index-page">
        <el-row :gutter="20">
            <el-col :span="12" class="">
                <question-board :level="level"></question-board>
            </el-col>
            <el-col :span="12" class="right-panel">
                <sql-editor :level="level" :editor-style="{ 'min-height': '400px' }" :result-status="2"
                    :on-submit="onSubmit"></sql-editor>
                <el-card>
                    <el-collapse>
                        <el-collapse-item title="查看执行结果" name="result">
                            <sql-result-board :level="level" :result="result" :error-msg="errorMsg"></sql-result-board>
                        </el-collapse-item>
                        <el-collapse-item title="查看提示" name="hint">
                            <p>{{ level.hint }}</p>
                        </el-collapse-item>
                        <el-collapse-item title="查看建表语句" name="initSQL">
                            <code-editor :init-value="level.initSQL"
                                :editor-style="{ 'min-height': '400px' }"></code-editor>
                        </el-collapse-item>
                        <el-collapse-item title="查看答案" name="answer ">
                            <pre v-html="highlightCode(format(level.answer))"></pre>
                        </el-collapse-item>
                    </el-collapse>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import hljs from 'highlight.js';
import { format } from "sql-formatter";
import type { QueryExecResult } from 'sql.js';
import { getLevelByKey } from '@/levels';

/**
 * @levelKey 关卡的唯一key，
 * @example levelKey = 'level1'
 *  根据key加载相应的question db等
 * 
 */
interface LevelKeyProps {
    levelKey: string
}

const props = defineProps<LevelKeyProps>()
const level = getLevelByKey(props.levelKey)
console.log(level)

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

const highlightCode = (code: string) => {
    return hljs.highlightAuto(code).value
}
</script>

<style></style>