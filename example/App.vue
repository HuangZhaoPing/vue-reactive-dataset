<template>
  <div>
    <el-select v-model="formData.sex">
      <el-option
        v-for="item in dict.reactive.get('sex')"
        :key="item.value"
        :label="item.label"
        :value="item.value" />
    </el-select>

    <el-select v-model="formData.channel">
      <el-option
        v-for="item in dict.reactive.get('channel')"
        :key="item.channelId"
        :label="item.channelName"
        :value="item.channelId" />
    </el-select>

    <el-cascader v-model="formData.foodCategory" :options="dict.reactive.get('foodCategory')" :props="{ label: 'name', value: 'id' }" />
  
    <el-table :data="tableData" border>
      <el-table-column label="性别">
        <template #default="{ row }">
          {{ dict.reactive.filter({ key: 'sex', value: row.sex, returnLabel: true }) }}
        </template>
      </el-table-column>
      <el-table-column label="渠道">
        <template #default="{ row }">
          {{ filter(row.channel) }}
        </template>
      </el-table-column>
      <el-table-column label="性别">
        <template #default="{ row }">
          {{ dict.reactive.filter({ key: 'foodCategory', value: row.foodCategory, propKey: ['id', 'name'] }) }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import dict from './dict'

export default defineComponent({
  setup () {
    dict.filter({ key: 'channel', value: 1, returnLabel: true }).then(data => {
    })
    const formData = ref({
      sex: '',
      channel: '',
      foodCategory: ''
    })
    const tableData = [
      { sex: 1, channel: 1, foodCategory: 1 },
      { sex: 2, channel: 3, foodCategory: 11 },
      { sex: 1, channel: 1, foodCategory: 1 }
    ]
    return {
      formData,
      tableData,
      dict,
      filter: (value: number) => {
        const values = dict.reactive.filter({ key: 'channel', value, propKey: ['channelName', 'channelId'] })
        return values && values.join('-')
      }
    }
  }
})
</script>
