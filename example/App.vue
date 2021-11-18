<template>
  <div>
    {{ dict.reactive.get('sex') }}

    <div>{{ dict.reactive.get('channel') }}</div>

    <div>{{ dict.reactive.filter({key: 'channel', value: 1, fields: ['channelId', 'channelName']}) }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import dict from './dict'

export default defineComponent({
  setup () {
    console.log(dict.get('sex'))
    console.log(dict.filter({key: 'sex', value: 21, fields: 'name'}))
    dict.get('channel').then((data: any) => {
      console.log(data)
    })
    dict.get('channel').then((data: any) => {
      console.log(data)
    })
    dict.deleteCache('channel')
    dict.get('channel').then((data: any) => {
      console.log(data)
    })
    return {
      dict
    }
  }
})
</script>
