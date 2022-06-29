<template>
  <div>
    <ul>
      <li v-for="item in dataset.get({ name: 'gradeList' })" :key="item.id">{{ item.name }}</li>
    </ul>

    <h1>{{ dataset.filter({ name: 'gradeList', value: 1 }) }}</h1>

    <h1>{{ dataset.filter({ name: 'gradeList', value: 1, params: { id: 1 } }) }}</h1>

    <ul>
      <li v-for="item in dataset.get({ name: 'sex' })" :key="item.value">{{ item.name }}</li>
    </ul>

    <h1>{{ dataset.filter({ name: 'sex', value: 1 }) }}</h1>
  </div>
</template>

<script lang="ts" setup>
import dataset from './dataset'
</script>
