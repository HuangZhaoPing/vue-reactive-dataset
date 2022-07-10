# vue-reactive-dataset

## 安装

```bash
npm i vue-reactive-dataset -S
```

## 使用

dataset.js：

```js
import Dataset from 'vue-reactive-dataset'

export default new Dataset({
  config: {
    // 固定数据
    sex: {
      data: () => {
        return [
          { name: '男', value: 1 },
          { name: '女', value: 2 }
        ]
      }
    },
    // 动态数据
    channel: {
      data: () => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve([
              { name: '苹果', id: 1 },
              { name: '华为', id: 2 }
            ])
          }, 2000);
        })
      }
    }
  }
})
```

```html
<template>
  <ul>
    <li v-for="item in dataset.get({ name: 'sex' })" :key="item.id">{{ item.name }}</li>
  </ul>

  <ul>
    <li v-for="item in dataset.get({ name: 'channel' })" :key="item.id">{{ item.name }}</li>
  </ul>
</template>

<script setup>
import dataset from './dataset.js'
</script>
```

## API

### constructor(options)

```js
import Dataset from 'vue-reactive-dataset'

export default new Dataset({
  max: 100, // 最大缓存，默认100
  config: {
    sex: {
      data: () => {}, // 数据，可返回 promise
      // props，用于 filter
      props: {
        name: 'name',
        value: 'value',
        children: 'children'
      }
    }
  }
})
```

### get(options)

获取数据。

```html
<template>
  <!-- 模板形式 -->
  <div>{{ dataset.get({ name: 'channel' }) }}</div>
</template>

<script setup>
import dataset from './dataset.js'

// promise 形式
dataset.get({ name: 'channel', promise: true }).then(data => {
  console.log(data)
})
</script>
```

### filter(options)

过滤数据，默认返回 name

```html
<template>
  <!-- 苹果 -->
  <div>{{ dataset.filter({ name: 'channel', value: 1 }) }}</div>

  <!-- { name: '苹果', id: 1 } -->
  <div>{{ dataset.filter({ name: 'channel', value: 1, original: true }) }}</div>

  <!-- [ '苹果', 1 ] -->
  <div>{{ dataset.filter({ name: 'channel', value: 1, fields: ['name', 'id'] }) }}</div>
</template>

<script setup>
import dataset from './dataset.js'

// promise 形式
dataset.filter({ name: 'channel', promise: true, value: 1 }).then(data => {
  console.log(data) // 苹果
})
</script>
```

### delete(options)

清除某个字段的缓存，下次调用 get 或 filter 时，重新获取数据。

```js
dataset.deleteCache({ name: 'channel' })
dataset.deleteCache({ name: 'channel', params: { id: 1 } })
```

### clear()

清除所有缓存。

### 带参数

如果接口需要传参，可以这样做：

```js
import Dataset from 'vue-reactive-dataset'

export default new Dataset({
  config: {
    channel: {
      data: params => {
        console.log('参数为：', params)
        return new Promise(resolve => {
          setTimeout(() => {
            resolve([
              { name: '苹果', id: 1 },
              { name: '华为', id: 2 }
            ])
          }, 2000);
        })
      }
    }
  }
})
```

```html
<template>
  <div>{{ dataset.get({ name: 'channel', params: { id: 1 } }) }}</div>
</template>
```
