<template>
    <div class="index-page">
        <el-row :gutter="20">
            <el-col :span="12" class="grid-content ep-bg-purple">
                <question-board :value="md"></question-board>
            </el-col>
            <el-col :span="12" class="grid-content ep-bg-purple">
                <code-editor :init-value="level.initSQL" :editor-style="{ minHeight: '400px' }"></code-editor>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import md from '@/levels/main/level1/README.md?raw'
import level from '@/levels/main/level1'

// const code = ref(level
console.log(level)
</script>

<style scoped></style>