<template>
  <div>
    <br>

    {{ dict.reactive.get('channel') }}

    <br>

    {{ dict.reactive.get('status') }}

    <el-button @click="test1">adf</el-button>
    <el-button @click="test2">vvv</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import dict from './dict'

export default defineComponent({
  setup () {
    dict.get('channel').then(data => {
      console.log('vvvvv', data)
    })

    return {
      dict,
      test1 () {
        dict.filter({ key: 'channel', value: 1 }).then(data => {
          console.log('vvvvv', data)
        })
      },
      test2 () {
        dict.fetch('channel').then(data => {
          console.log('vvvvv', data)
        })
      }
    }
  }
})
</script>
