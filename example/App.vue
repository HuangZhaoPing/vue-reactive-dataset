<template>
  <div>
    <!-- <div>{{ dict1.reactive.get('status') }}</div>
    <div>{{ dict1.reactive.get('channel') }}</div> -->

    <div>{{ dict2.reactive.get('status') }}</div>
    <div>{{ dict2.reactive.get('channel') }}</div>
    <div>
      <el-button @click="test1">status</el-button>
      <el-button @click="test2">channel</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { dict1, dict2 } from './dict'

export default defineComponent({
  setup () {
    return {
      dict1,
      dict2,
      test1 () {
        dict1.filter({ key: 'status', value: 1 }).then(data => console.log(data))
      },
      test2 () {
        dict1.filter({ key: 'channel', value: 1 }).then(data => console.log(data))
      }
    }
  }
})
</script>
