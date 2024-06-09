<template>
    <div id="sql-editor">
        <div ref="editorRef" :style="editorStyle"></div>
        <el-space :size="18">
            <el-button type="primary">运行</el-button>
            <el-button type="default">格式化</el-button>
            <el-button type="default">重制</el-button>
        </el-space>
    </div>
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import type { CSSProperties } from "vue";
type IStandaloneCodeEditor = monaco.editor.IStandaloneCodeEditor;
import type { QueryExecResult } from 'sql.js';
import { initDB } from "@/utils/sqlExecutors";

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
            '-- 请在此输入 SQL\n'
        )
    }
    db.value = await initDB(level.value.initSQL)
})

onMounted(async () => {
    // 初始话编译器
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
</script>

<style scoped></style>