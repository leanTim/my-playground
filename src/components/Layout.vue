import router from '../router/index';
<template>
    <div class="layout">
        <el-container class="container">
            <el-container>
                <el-header>
                    <!-- menu组件设置属性router=true时 decault-active值设置为route.path
                     组件的默认active样式才会生效。
                     之所以第一个item的index要设置动态的，是因为有两种path: /learn 和 /learn/level1
                     -->
                    <el-menu :router="true" mode="horizontal" :default-active="route.path">
                        <el-menu-item :index="route.path.includes('learn') ? route.path : 'learn'">学习</el-menu-item>
                        <el-menu-item index="/levels">关卡</el-menu-item>
                        <el-menu-item index="/playground">广场</el-menu-item>
                    </el-menu>
                </el-header>
                <el-divider />
                <div class="content">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <slot name="left"></slot>
                        </el-col>
                        <el-col :span="12">
                            <slot name="right"></slot>
                        </el-col>
                    </el-row>
                </div>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
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