<template>
    <layout>
        <template v-slot:left>
            <question-board :level="level" :resultStatus="resultStatus"></question-board>
        </template>
        <template v-slot:right>
            <sql-editor :level="level" :editor-style="{ 'min-height': '400px' }" :result-status="resultStatus"
                :on-submit="onSubmit"></sql-editor>
            <el-card>
                <el-collapse v-model="collapseActiveKeys">
                    <el-collapse-item title="查看执行结果" name="result">
                        <sql-result-board :result="result" :error-msg="errorMsg"
                            :resultStatus="resultStatus"></sql-result-board>
                    </el-collapse-item>
                    <el-collapse-item title="查看提示" name="hint">
                        <p>{{ level.hint }}</p>
                    </el-collapse-item>
                    <el-collapse-item title="查看建表语句" name="initSQL">
                        <code-editor :init-value="level.initSQL"
                            :editor-style="{ 'min-height': '400px' }"></code-editor>
                    </el-collapse-item>
                    <el-collapse-item title="查看答案" name="answer">
                        <pre v-html="highlightCode(format(level.answer))"></pre>
                    </el-collapse-item>
                </el-collapse>
            </el-card>
        </template>
    </layout>
</template>

<script setup lang="ts">
import hljs from 'highlight.js';
import { format } from "sql-formatter";
import type { QueryExecResult } from 'sql.js';
import { getLevelByKey } from '@/levels';
import mainLevels from '@/levels/mainLevels';
import { checkResult } from '@/utils/sqlResult';

/**
 * @levelKey 关卡的唯一key，
 * @example levelKey = 'level1'
 *  根据key加载相应的question db等
 */
interface LevelKeyProps {
    levelKey?: string
}

const props = defineProps<LevelKeyProps>()
const level = computed(() => {
    if (props.levelKey) {
        return getLevelByKey(props.levelKey)
    }
    return mainLevels[0]
})

// 用户执行结果
const result = ref<QueryExecResult[]>([])
// 答案
const answerResult = ref<QueryExecResult[]>([])
const errorMsg = ref<string>()
// 用户执行结果的状态 0 1 2 分别代表默认、失败、成功
const resultStatus = ref<number>(0)
// el-collapse 默认展开的item
const defaultCollapseActiveKeys: string[] = []
const collapseActiveKeys = ref([...defaultCollapseActiveKeys])

// 切换到新关卡时重制collapse组件为折叠状态
watch([level], () => {
    collapseActiveKeys.value = [...defaultCollapseActiveKeys]
})

const onSubmit = (
    sql: string,
    res: QueryExecResult[],
    answerRes: QueryExecResult[],
    errMsg?: string
) => {
    result.value = res
    answerResult.value = answerRes
    errorMsg.value = errMsg
    resultStatus.value = checkResult(res, answerRes)
}

const highlightCode = (code: string) => {
    return hljs.highlightAuto(code).value
}
</script>

<style></style>