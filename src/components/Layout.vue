import router from '../router/index';
<template>
    <div class="layout">
        <el-container class="container">
            <el-container>
                <el-header>
                    <el-menu :router="true" mode="horizontal" default-active="learn">
                        <el-menu-item index="learn">学习</el-menu-item>
                        <el-menu-item index="level">关卡</el-menu-item>
                        <el-menu-item index="playground">广场</el-menu-item>
                    </el-menu>
                </el-header>
                <el-divider />
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.el-divider {
    margin-top: 0;
    margin-bottom: 0;
}

.el-menu {
    border-bottom: none;
}

.container {
    height: 100vh;
}
</style>