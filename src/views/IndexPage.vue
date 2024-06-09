<template>
    <div class="index-page">
        <el-row :gutter="20">
            <el-col :span="12" class="">
                <question-board :value="md"></question-board>
            </el-col>
            <el-col :span="12" class="right-panel">
                <sql-editor :level="level1" :editor-style="style" :result-status="2"></sql-editor>
                <el-card>
                    <el-collapse>
                        <el-collapse-item v-for="item in collapseData" :title="item.title"></el-collapse-item>
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

const style = {
    'min-height': '400px'
}

const collapseData = [
    { title: '查看这行结果', name: 'result' },
    { title: '查看提示', nama: 'prompts' },
    { title: '查看简表语句', name: 'initSQL' },
    { title: '查看答案', name: 'answer' }
]

</script>

<style>
.right-panel .el-space {
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>