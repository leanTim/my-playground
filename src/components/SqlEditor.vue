<template>
    <div id="sql-editor">
        <div ref="editorRef" :style="editorStyle"></div>
        <el-space :size="18">
            <el-button type="primary" @click="doSubmit">运行</el-button>
            <el-button @click="doFormat">格式化</el-button>
            <el-button @click="doReset">重置</el-button>
        </el-space>
    </div>
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import type { CSSProperties } from "vue";
type IStandaloneCodeEditor = monaco.editor.IStandaloneCodeEditor;
import type { QueryExecResult } from 'sql.js';
import { initDB, runSQL } from "@/utils/sqlExecutors";
import { format } from "sql-formatter";
import { ElMessage } from "element-plus";

(self as any).MonacoEnvironment = {
    getWorker(_: any, label: any) {
        return new EditorWorker();
    },
}

interface SqlEditorProps {
    level: LevelType,
    editorStyle: CSSProperties
    resultStatus?: number
    onSubmit?: (
        sql: string,
        resule: QueryExecResult[],
        answerResult: QueryExecResult[],
        errorMsg?: string,
    ) => void
}

const props = withDefaults(defineProps<SqlEditorProps>(), {})
const { level, onSubmit } = toRefs(props)
const db = ref()
const inputEditor = ref<IStandaloneCodeEditor>()
const editorRef = ref<HTMLElement>()

watchEffect(async () => {
    if (inputEditor.value) {
        toRaw(inputEditor.value).setValue(
            '-- 请在此输入 SQL\n' + level.value.defaultSQL
        )
    }
    // 初始化/更新数据库
    try {
        db.value = await initDB(level.value.initSQL)
        doSubmit()
    } catch (error) {
        console.log(error)
    }
    // console.log(db.value, '------------')
})

/**
 * SQL 格式化
 * @link https://www.npmjs.com/package/sql-formatter
 */
const doFormat = () => {
    if (!inputEditor.value) return

    const inputStr = toRaw(inputEditor.value).getValue()
    const resultStr = format(inputStr, { language: 'sqlite' })
    toRaw(inputEditor.value).setValue(resultStr)
}

const doReset = () => {
    if (inputEditor.value) {
        toRaw(inputEditor.value).setValue(level.value.defaultSQL)
        doSubmit()
    }
}

const doSubmit = () => {
    if (!inputEditor.value) return

    const inputStr = toRaw(inputEditor.value).getValue()
    // console.log(db.value)
    try {
        const res = runSQL(db.value, inputStr)
        const answer = runSQL(db.value, level.value.answer)
        console.log(res, answer)
    } catch (error: any) {
        ElMessage.error(`语句错误${error.message}`)
    }
}

onMounted(async () => {
    // 初始化编译器
    if (editorRef.value) {
        const initValue = ''
        inputEditor.value = monaco.editor.create(editorRef.value, {
            value: initValue,
            language: 'sql',
            theme: 'vs-dark',
            formatOnPaste: true,
            automaticLayout: true,
            fontSize: 16,
            minimap: {
                enabled: false
            }
        })
    }
})
onUnmounted(() => {
    if (inputEditor.value) {
        toRaw(inputEditor.value).dispose()
    }
})
</script>

<style scoped>
.el-space {
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>