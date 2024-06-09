<template>
    <div class="code-editor">
        <div ref="editorRef" :style="editorStyle"></div>
    </div>
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import type { CSSProperties } from "vue";
type IStandaloneCodeEditor = monaco.editor.IStandaloneCodeEditor;

(self as any).MonacoEnvironment = {
    getWorker(_: any, label: any) {
        return new EditorWorker();
    },
}

interface Props {
    initValue?: string
    readOnly?: boolean
    editorStyle?: CSSProperties
}

const props = withDefaults(defineProps<Props>(), {
    initValue: '',
    readOnly: false,
    editorStyle: undefined
})


// 编译器对象
const inputEditor = ref<IStandaloneCodeEditor>()
// 编译器ref
const editorRef = ref<HTMLElement>()

onMounted(async () => {
    // 初始化monaco编译器
    if (editorRef.value) {
        inputEditor.value = monaco.editor.create(editorRef.value, {
            value: props.initValue,
            language: 'sql',
            theme: 'vs-dark',
            readOnly: props.readOnly,
            formatOnPaste: true,
            automaticLayout: true,
            fontSize: 15,
            minimap: {
                enabled: false
            }
        })
    }
})

watch(
    () => props.initValue,
    () => {
        if (editorRef.value && inputEditor.value) {
            toRaw(inputEditor.value).setValue(props.initValue)
        }
    }
)

onUnmounted(() => {
    if (inputEditor.value) {
        toRaw(inputEditor.value).dispose()
    }
})

</script>

<style scoped></style>