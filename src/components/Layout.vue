import router from '../router/index';
<template>
    <div class="layout">
        <el-container class="container">
            <el-container>
                <el-header>
                    <el-menu :router="true" mode="horizontal" :default-active="$route.path">
                        <el-menu-item index="/learn">学习</el-menu-item>
                        <el-menu-item index="/levels">关卡</el-menu-item>
                        <el-menu-item index="/playground">广场</el-menu-item>
                    </el-menu>
                </el-header>
                <el-divider />
                <div class="content">
                    <slot name="content"></slot>
                </div>
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
    height: auto;
}

.container {
    height: 100vh;
}

.content {
    padding: 20px;
}
</style>