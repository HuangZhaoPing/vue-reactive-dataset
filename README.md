# tiny-dict-vue

一个基于 vue，集中式管理字典数据的插件，支持 vue2 与 vue3。

## Features

- 集中式
- 高度复用
- 响应式，同时支持 vue2 与 vue3
- 支持异步数据
- 支持数据过滤
- 支持数据缓存，提高性能

## Usage

tiny-dict-vue 依赖 memoizee

```shell
npm i memoizee tiny-dict-vue -S
```

```js
import TinyDict from 'tiny-dict-vue'

const dict = new TinyDict({})

export default dict
```

## Api

### constructor (options)

构造函数。

示例：

```js
import TinyDict from 'tiny-dict-vue'

const dict = new TinyDict({
  // 同步数据
  sex: {
    data: [
      { label: '男', value: 1 },
      { label: '女', value: 2 }
    ]
  },
  // 异步数据，假设接口返回 { "code": 200, data: [{ "channelName": "苹果", "channelId": 1 }, { "channelName": "小米", "channelId": 2 }] }
  channel: {
    async: true,
    data: async () => {
      const { data } = await axios({ url: '/api/channel', methods: 'GET' })
      return data || []
    },
    props: {
      label: 'channelName',
      value: 'channelId'
    }
  }
})

export default dict
```

| Param |          Type          |                         Default                          | Required | Description                                    |
| :---: | :--------------------: | :------------------------------------------------------: | :------: | ---------------------------------------------- |
| async |        boolean         |                          false                           |  false   | 是否为异步数据                                 |
| data  | array \| () => Promise |                            -                             |   true   | 当 async 为 true 时，必须是返回 Promise 的函数 |
| props |         object         | { label: 'label', value: 'value', children: 'children' } |  false   | 数据的配置对象，调用 filter 方法时需要用到     |

### reactive.get (key)

响应式的获取一个字典数据。

```html
<template>
  <div>
    <el-select v-model="channelId">
      <el-option
        v-for="item in dict.reactive.get('channel')"
        :key="item.channelId"
        :label="item.channelName"
        :value="item.channelId" />
    </el-select>
  </div>
</template>
```

```js
// 引用上方数据
import dict from '@/dict'
import { ref } from 'vue'

export default {
  // vue2
  // data () {
  //   return {
  //     dict,
  //     channelId: ''
  //   }
  // }
  setup () {
    const channelId = ref('')
    return {
      channelId,
      dict
    }
  }
}
```

### reactive.filter(options)

响应式的过滤一个字典数据。

```html
<template>
  <!-- 最终渲染为：苹果 -->
  <div>{{ dict.reactive.filter({ key: 'channel', value: 1, returnLabel: true }) }}</div>
</template>
```

```js
import dict from '@/dict'

export default {
  setup () {
    return {
      dict
    }
  }
}
```

|    Param    |        Type        | Default | Required | Description                                                  |
| :---------: | :----------------: | :-----: | :------: | ------------------------------------------------------------ |
|     Key     |       string       |    -    |   true   | 从哪个字典中过滤数据                                         |
|    value    |  string \| number  |    -    |   true   | value 的值                                                   |
| returnLabel |      boolean       |  false  |  false   | 若为 true，返回 label 的值，默认为 false 即返回整个对象      |
|   propKey   | string \| string[] |    -    |  false   | 返回指定字段的值，如果为数组则返回多个，默认为空即返回整个对象 |

### get(key): Promise

在 js 中获取字典数据，返回 Promise。

```js
import dict from '@/dict'

export default {
  setup () {
    dict.get('sex').then(data => {
      // [{ label: '男', value: 1 }, { label: '女', value: 2 } ]
      console.log(data)
    })
    dict.get('channel').then(data => {
      // [{ channelName: '苹果', channelId: 1 }, { channelName: '小米', channelId: 2 }]
      console.log(data)
    })
  }
}
```

### filter(options): Promise

在 js 中过滤字典数据，返回 Promise。参数与 reactive.filter 一致。

```js
import dict from '@/dict'

export default {
  setup () {
    dict.filter({ key: 'sex', value: 1, returnLabel: true }).then(data => {
      // 男
      console.log(data)
    })
    dict.filter({ key: 'channel', value: 1 }).then(data => {
      // { channelName: '苹果', channelId: 1 }
      console.log(data)
    })
    dict.filter({ key: 'channel', value: 1, returnLabel: true }).then(data => {
      // 苹果
      console.log(data)
    })
    dict.filter({ key: 'channel', value: 1, propKey: 'channelName' }).then(data => {
      // 苹果
      console.log(data)
    })
    dict.filter({ key: 'channel', value: 1, propKey: [ 'channelName', 'channelId' ] }).then(data => {
      // [ '苹果', 1 ]
      console.log(data)
    })
  }
}
```

### getConfig(key): object

获取一个字典的配置。

```js
import dict from '@/dict'

export default {
  setup () {
    // { async: false, data: [{ label: '男', value: 1 },{ label: '女', value: 2 }], props: { label: 'label', value: 'value', children: 'children' } }
    console.log(dict.getConfig('sex'))
  }
}
```

### fetch(key): Promise

get 方法获取异步数据是有缓存的，只会在第一次请求异步数据，之后都会从缓存中获取，fetch 方法则每次都请求异步数据。

```js
import dict from '@/dict'

export default {
  setup () {
    dict.fetch('channel').then(data => {
      // [{ channelName: '苹果', channelId: 1 }, { channelName: '小米', channelId: 2 }]
      console.log(data)
    })
  }
}
```

