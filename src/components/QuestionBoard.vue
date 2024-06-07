<template>
    <div id="question-board-card">
        <el-card>
            <md-viewer :value="value"></md-viewer>
        </el-card>
    </div>
</template>

<script setup lang="ts">
interface Props {
    value: string
}

const props = withDefaults(defineProps<Props>(), {
    value: ''
})
</script>

<style scoped>
#question-board-card {
    max-height: calc(100vh - 150px);
    min-height: 600px;
    overflow-y: auto;
}
</style>