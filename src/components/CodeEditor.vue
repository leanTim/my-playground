<template>
    <div class="code-editor">
        <div ref="editorRef" :style="editorStyle"></div>
    </div>
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import type { CSSProperties } from "vue";
import { createATA } from "@/utils/ata";
type IStandaloneCodeEditor = monaco.editor.IStandaloneCodeEditor;

// @ts-ignore
(self as any).MonacoEnvironment = {
    getWorker(_: string, label: string) {
        if (label === 'json') return new jsonWorker()
        if (label === 'css' || label === 'scss' || label === 'less') return new cssWorker()
        if (label === 'html' || label === 'handlebars' || label === 'razor') return new htmlWorker()
        if (['typescript', 'javascript'].includes(label)) return new tsWorker()
        return new EditorWorker();
    },
}

// @ts-ignore
interface Props {
    lang?: string
    initValue?: string
    readOnly?: boolean
    editorStyle?: CSSProperties
}

const props = withDefaults(defineProps<Props>(), {
    initValue: '',
    lang: 'typescript',
    readOnly: false,
    editorStyle: { 'minHeight': '400px' } as any
})

// 编译器对象
let inputEditor: IStandaloneCodeEditor
// 编译器ref
const editorRef = ref<HTMLElement>()
// const language = ref<string>('typescript')


onMounted(async () => {
    // 初始化monaco编译器
    if (editorRef.value) {
        monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: true,
            noSyntaxValidation: true,
            // noSuggestionDiagnostics: true
        });
        props.lang === 'typescript' &&
            monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
                target: monaco.languages.typescript.ScriptTarget.ES2016,
                allowNonTsExtensions: true,
                /**
                 * 默认js引入cjs的包要  import * as fs from 'fs'
                 * 设置了esModuleInterop后会在编译的时候自动加上default属性
                 * 就能直接import fs from 'fs'了
                 */
                esModuleInterop: true,
                /**
                 * ts能识别jsx语法
                 */
                jsx: 1
            })

        // 编译时的选项
        inputEditor = monaco.editor.create(editorRef.value, {
            value: props.initValue, // 初始化编译器显示的内容
            language: props.lang, // 语言
            theme: 'vs-dark', // vs-dark\hc-black\vs 三种主题
            readOnly: props.readOnly, // 只读
            formatOnPaste: true,
            automaticLayout: true, // 自适应布局
            renderLineHighlight: 'all', // 行亮
            selectOnLineNumbers: true, // 显示行号
            overviewRulerBorder: false,
            scrollBeyondLastLine: false, // 取消代码后面一大段空白
            fontSize: 15,
            minimap: {
                enabled: false
            },
        })
        if (props.lang === 'typescript') {

            const ata = createATA((code, path) => {
                monaco.languages.typescript.typescriptDefaults.addExtraLib(code, `file://${path}`)
            })
            inputEditor.onDidChangeModelContent((e) => {
                ata(inputEditor.getValue())
            })
            ata(inputEditor.getValue())
        }
    }


})

watch(
    () => props.initValue,
    () => {
        if (editorRef.value && inputEditor) {
            toRaw(inputEditor).setValue(props.initValue)
        }
    }
)

onUnmounted(() => {
    // 销毁编译器
    if (inputEditor) {
        toRaw(inputEditor).dispose()
    }

})

/***
* editor.setValue(newValue)
editor.getValue()
editor.onDidChangeModelContent((val)=>{ //监听值的变化  })
editor.getAction('editor.action.formatDocument').run() //格式化代码
editor.dispose() //销毁实例
editor.onDidChangeOptions //配置改变事件
editor.onDidChangeLanguage //语言改变事件
*/
</script>

<style scoped></style>