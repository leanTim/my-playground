<template>
    <div class="index-page">
        <el-row :gutter="20">
            <el-col :span="12" class="grid-content ep-bg-purple">
                <question-board :value="md"></question-board>
            </el-col>
            <el-col :span="12" class="grid-content ep-bg-purple"></el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import md from '@/levels/main/level1/README.md?raw'

console.log(md)

</script>

<style scoped></style>