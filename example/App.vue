<template>
  <div>
    <!-- <div>{{ dict.reactive.get('sex') }}</div>
    <div>{{ dict.reactive.filter({ key: 'sex', value: 1, returnLabel: true }) }}</div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import dict from './dict'

export default defineComponent({
  setup () {
    dict.filter({ key: 'channel', value: 1 }).then(data => {
      console.log(data)
    })
    return {
      dict
    }
  }
})
</script>
