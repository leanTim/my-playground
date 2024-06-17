<template>
    <div ref="container" class="split-pane" @mousemove="dragMove" @mouseup="dragEnd" @mouseleave="dragEnd">
        <div class="left" :style="{ 'width': `${boundSplit}%` }">
            <div class="dragger" @mousedown="dragStart"></div>
        </div>
        <div class="right" :style="{ 'width': `${100 - boundSplit}%` }"></div>
    </div>
</template>

<script setup lang="ts">
const container = ref()
const state = reactive({
    dragging: false,
    split: 50,
    viewHeight: 0,
    viewWidth: 0
})

const boundSplit = computed(() => {
    const { split } = state
    return split < 20 ? 20 : split > 80 ? 80 : split
})

let startPosition = 0
let startSplit = 0
const dragStart = function (e: MouseEvent) {
    state.dragging = true
    startPosition = e.pageX
    startSplit = boundSplit.value
}

const dragMove = function (e: MouseEvent) {
    if (state.dragging) {
        const position = e.pageX
        const totalSize = container.value.offsetWidth
        const dp = position - startPosition
        state.split = startSplit + +((dp / totalSize) * 100).toFixed(2)
    }
}
const dragEnd = function () {
    state.dragging = false
}
</script>

<style scoped>
.split-pane {
    display: flex;
    height: 100%;
    position: relative;
}

.split-pane.dragging {
    cursor: ew-resize;
}

.dragging .left,
.dragging .right {
    pointer-events: none;
}

.left,
.right {
    box-sizing: border-box;
    position: relative;
    height: 100vh;
}

.left {
    border: 1px solid black;
    background: pink;
}

.right {
    background-color: yellowgreen;
}

∏ .dragger {
    position: absolute;
    z-index: 3;
    top: 0;
    bottom: 0;
    right: -5px;
    width: 10px;
    background-color: black;
    cursor: ew-resize;
}

.split-pane.dragging {
    cursor: ew-resize;
}
</style>