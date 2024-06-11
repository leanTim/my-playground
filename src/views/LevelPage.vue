<template>
    <layout>
        <template v-slot:left>
            <el-card>
                <template #header>
                    <div>
                        <h3>主线关卡</h3>
                    </div>
                </template>
                <div v-for="(level, index) in mainLevels" class="item">
                    <h4 v-html="`${index + 1}、 ${level.title}`"></h4>
                    <el-button @click="doSubmit(level.key)">挑战</el-button>
                </div>
            </el-card>
        </template>
        <template v-slot:right>
            <el-card>
                bbbb
            </el-card>
        </template>
    </layout>
</template>

<script setup lang="ts">
import mainLevels from '@/levels/mainLevels';
import router from '@/router';

const doSubmit = (key: string) => {
    router.push(`learn/${key}`)
}
</script>

<style scoped>
.item {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>