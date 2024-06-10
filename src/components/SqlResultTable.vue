<template>
    <div>
        <el-table :data="tableData">
            <el-table-column v-for="col in columns" :prop="col.title" :label="col.title"></el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts">
import type { QueryExecResult } from 'sql.js';

interface SqlResultProps {
    data: QueryExecResult[]
}

const props = withDefaults(defineProps<SqlResultProps>(), {
    data: () => []
})

// [{columns: [a, b], values: [['1', '2'], ['3', '4']]}]
const { data } = toRefs(props)

// 表头
const columns = computed(() => {
    if (data?.value?.[0]?.columns) {
        return data.value[0].columns.map((cloumn, index) => {
            return {
                title: cloumn,
            }
        })
    }
    return []
})

// 表的数据
const tableData = computed(() => {
    if (!data?.value?.[0]?.values) {
        return []
    }
    const columns = data.value[0].columns
    return data.value[0].values.map((item, index) => {
        const rowData: Record<string, any> = {}
        item.forEach((col, i) => {
            rowData[columns[i]] = col
        })
        return rowData
    })

})

</script>

<style scoped></style>