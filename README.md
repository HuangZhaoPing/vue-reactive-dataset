# tiny-dict-vue

一个基于 vue，集中式管理字典数据的插件。

## 解决问题

项目中经常会看到一些枚举型数据，比如：

```js
const sex = [
  { label: '男', value: 1 },
  { label: '女', value: 2 }
]

const status = [
  { label: '正常', value: 1 },
  { label: '禁用', value: 2 }
]
```

又或者服务器返回的异步数据，比如：

```js
function getChannel () {
  return new Promise((resolve, reject) => {
    const data = [
      { channelName: '苹果', value: 1 },
      { channelName: '小米', value: 2 },
      { channelName: '华为', value: 3 },
      { channelName: 'oppo', value: 4 },
      { channelName: 'vivo', value: 5 }
    ]
    resolve(data)
  })
}
```

这些数据会在很多场景中都会用到，比如 select、checkbox、radio 等表单中，还有各种过滤如表格，很多项目没有统一去管理这些数据，而是各做各的，相当零散，造成数据冗余，降低开发效率，且不易维护。

tiny-dict-vue 就是为了集中管理这些数据而出现。

## 特性

- 集中式
- 高度复用
- 响应式
- 同时支持 vue2 和 vue3
- 异步数据缓存
- 数据过滤缓存

## 使用

### 安装

```shell
# tiny-dict-vue 依赖 memoizee
npm i memoizee tiny-dict-vue -S
```

### 初始化

新建一个 dict.js 文件，将同步/异步数据都集中到这里管理，如：

```js
import TinyDict from 'tiny-dict-vue'

export default new TinyDict({
  // 同步数据
  sex: {
    data: [
      { label: '男', value: 1 },
      { label: '女', value: 2 }
    ]
  },
  // 异步数据
  channel: {
    async: true,
    data: () {
      channel: {
        // 异步
        async: true,
        // data 为一个返回 promise 的函数 
        data: () => {
          // 模拟请求
          return new Promise(resolve => {
            setTimeout(() => {
              resolve([
                { channelName: '苹果', channelId: 1 },
                { channelName: '小米', channelId: 2 },
                { channelName: '华为', channelId: 3 },
                { channelName: 'oppo', channelId: 4 },
                { channelName: 'vivo', channelId: 5 }
              ])
            }, 1000)
          })
        },
        // 自定义 props，用于 filter，默认值为 { label: 'label', value: 'value', children: 'children' }
        props: {
          label: 'channelName',
          value: 'channelId'
        }
      }
    }
  },
  // 树结构异步数据
  foodCategory: {
    async: true,
    data: () => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([
            {
              name: '主食',
              id: 1,
              children: [
                { name: '面食类', id: 11 },
                { name: '面包类', id: 12 },
                { name: '米饭类', id: 13 }
              ]
            },
            {
              name: '粤菜',
              id: 2,
              children: [
                { name: '炒河粉', id: 21 },
                { name: '清蒸石斑', id: 22 },
                { name: '白切鸡', id: 23 }
              ]
            }
          ])
        }, 1000)
      })
    },
    props: {
      label: 'name',
      value: 'id',
      children: 'children'
    }
  }
})
```

后面我们都会用到这个文件来做示例。

### 在模板中获取数据（响应式）

通过 dict.reactive.get(key) 获取字典数据，比如渠道下拉框，可以这样：

```html
<el-select v-model="channel">
  <el-option
    v-for="item in dict.reactive.get('channel')"
    :key="item.channelId"
    :label="item.channelName"
    :value="item.channelId" /> 
</el-select>
```

```js
import dict from '@/dict'

export default {
  // options api
  // data () {
  //   return {
  //     dict
  //   }
  // }

  setup () {
    return {
      dict
    }
  }
}
```

数据为响应式，请求完成后会重新渲染。

在表格中通常会遇到一种情况，后端返回数据时，只返回了渠道 id，没返回渠道 name，这时需要前端请求渠道接口，拿到渠道数据后进行遍历，根据表格中返回的渠道 id 拿到渠道名称，当中可能还需考虑接口请求的顺序，既麻烦又浪费性能，使用 tiny-dict-vue 只需：

```html
<el-table :data="tableData" border>
  <el-table-column label="用户姓名" prop="username" />
  <el-table-column label="年龄" prop="age" />
  <el-table-column label="渠道">
    <template #default="{ row }">
      <!-- 最终渲染出渠道名称 -->
      {{ dict.reactive.filter({ key: 'channel', value: row.channelId, returnLabel: true }) }}
    </template>
  </el-table-column>
</el-table>
```

```js
import dict from '@/dict'

export default {
  setup () {
    return {
      dict,
      tableData: [
        { username: '张三', age: 20, channelId: 1 },
        { username: '李四', age: 19, channelId: 2 },
        { username: '王五', age: 21, channelId: 3 }
      ]
    }
  }
}
```

dict.reactive.filter(options) 可以对字典中的同步/异步数据进行过滤，异步数据会自动发起请求，最终返回过滤后的值（响应式），且过滤结果会被缓存，同一个值下次直接从缓存中返回结果，跳过遍历，提高性能。

options 字段：

字段 | 类型 | 必须 | 说明
:--: | :--: | :--: | --
key | string |是 | 字典的 key，数据源
value | string | 是 | 数据 value 的值
returnLabel | boolean | 否 | 为 true 时返回 label 字段的值，可以在 props 中设置 label 字段的名称，默认为 false 即返回整个对象
propKey | string \| string[] | 否 | 返回指定字段的值，如果为数组，则返回数组，默认为空则返回整个对象

更多示例：

```html
<el-table :data="tableData" border>
  <el-table-column label="用户姓名" prop="username" />
  <el-table-column label="年龄" prop="age" />
  <el-table-column label="渠道">
    <template #default="{ row }">
      <!-- 渲染为：渠道name_渠道id -->
      {{ filter(row.channelId) }}
    </template>
  </el-table-column>
</el-table>
```

```js
import dict from '@/dict'

export default {
  setup () {
    // 封装一下
    const filter = channelId => {
      const values = dict.reactive.filter({
        key: 'channel',
        value: channelId,
        propKey: [ 'channelName', 'channelId' ]
      })
      return values && values.join('_')
    }
    return {
      tableData: [
        { username: '张三', age: 20, channelId: 1 },
        { username: '李四', age: 19, channelId: 2 },
        { username: '王五', age: 21, channelId: 3 }
      ],
      filter
    }
  }
}
```

filter 对于树形结构的值也有效果，比如上面的 foodCategory：

```html
<!-- 渲染为：面食类 -->
<div>{{ dict.reactive.filter({ key: 'foodCategory', value: 11, returnLabel: true }) }}</div>
```

### 在 js 中获取数据

dict.reactive.get 是响应式的，如果需要在 js 中获取数据，可以使用 dict.get：

```js
dict.get('sex').then(data => {
  // [{label:'男',value:1},{label:'女',value:2}]
  console.log(data)
})

// 异步数据只会在第一次调用时发起请求
dict.get('channel').then(data => {
  console.log(data)
})
// 第二次调用会拿缓存数据
dict.get('channel').then(data => {
  console.log(data)
})

// 如果不希望从缓存中获取数据，使用 fetch 每次都重新发起请求
dict.fetch('channel').then(data => {
  console.log(data)
})
```

同样的，dict.reactive.filter 是响应式的，如果需要在 js 中过滤数据，可以使用 dict.filter：

```js
// 基本用法
dict.filter({ key: 'channel', value: 1 }).then(data => {
  // { channelName: '苹果', channelId: 1 }
  console.log(data)
})

// returnLabel 返回 props 中设置的 label 的值，默认字段为 label
dict.filter({ key: 'channel', value: 1, returnLabel: true }).then(data => {
  // 苹果
  console.log(data)
})

// 返回指定字段
dict.filter({ key: 'channel', value: 1, propKey: 'channelName' }).then(data => {
  // 苹果
  console.log(data)
})

// 可以为数组
dict.filter({ key: 'channel', value: 1, propKey: [ 'channelName', 'channelId' ] }).then(data => {
  // [苹果, 1]
  console.log(data)
})
```

### 异步数据请只会请求一次

假设有一个页面如下：

```html
<el-select v-model="channel">
  <el-option
    v-for="item in dict.reactive.get('channel')"
    :key="item.channelId"
    :label="item.channelName"
    :value="item.channelId" /> 
</el-select>

<div>渠道 id 为 1 的渠道名称为：{{ dict.reactive.filter({ key: 'channel', value: 1, returnLabel: true }) }}</div>
```

```js
import dict from '@/dict'

export default {
  setup () {
    dict.get('channel').then(data => {
      console.log(data)
    })
    dict.filter({ key: 'channel', value: 1, propKey: ['channelName', 'channelId'] }).then(data => {
      console.log(data.join('_'))
    })
    return {
      dict
    }
  }
}
```

上面页面多次引用了 channel 字典，但最终只会发起请求一次。

### 与后端字典系统配合

有的公司会有字典系统，tiny-dict-vue 也可以很好的与之配合使用：

```js
import axios from 'axios'
import TinyDict from 'tiny-dict-vue'

getDict (type, props) {
  return {
    async: true,
    data: () => {
      // 从公司的配置系统中获取
      return axios({
        url: '/api/getDict',
        method: 'POST',
        data: { type }
      }).then(({ data }) => {
        return data
      })
    },
    props
  }
}

export default new TinyDict({
  channel: getDict('channel', { label: 'channelName', value: 'channleId' })
})
```

## api

### constructor (options)

构造函数

```js
const dict = new TinyDict(options)
```

| Param |          Type          |                         Default                          | Description                                     |
| :---: | :--------------------: | :------------------------------------------------------: | ----------------------------------------------- |
| async |        boolean         |                          false                           | 是否为异步数据                                  |
| data  | array \| () => Promise |                            -                             | asnyc 为 true 时，必须是一个返回 Promise 的函数 |
| props |         object         | { label: 'label', value: 'value', children: 'children' } | 配置对象                                        |

### get (key): Promise

获取指定 key 的数据

```js
dict.get('sex').then(data => {
  console.log(data)
})
```

| Param |  Type  | Default | Description      |
| :---: | :----: | :-----: | :--------------- |
|  key  | string |    -    | 字典中对应的 key |

### filter (options): Promise

过滤指定 key、value 的数据

```js
dict.filter({ key: 'sex', value: 1 }).then(data => {
  console.log(data)
})
```

|    Param    |        Type        | Default | Description                                   |
| :---------: | :----------------: | :-----: | :-------------------------------------------- |
|     key     |       string       |    -    | 字典中对应的 key                              |
|    value    |  string \| number  |    -    | 要查找的数据的 value                          |
| returnLabel |      boolean       |  false  | 是否要返回 label，可以在 props 中设置对应字段 |
|   propKey   | string \| string[] |    -    | 返回指定的字段，如果为数组，则返回数组        |

### fetch (key): Promise

异步数据不走缓存，每次都获取

```js
dict.fetch('sex').then(data => {
  console.log(data)
})
```

| Param |  Type  | Default | Description      |
| :---: | :----: | :-----: | :--------------- |
|  key  | string |    -    | 字典中对应的 key |

### getConfig (key): object

获取配置

```js
const config = dict.getConfig('sex')
```

| Param |  Type  | Default | Description      |
| :---: | :----: | :-----: | :--------------- |
|  key  | string |    -    | 字典中对应的 key |

### deleteAsyncCache (key)

删除已缓存的异步数据

```js
dict.deleteAsyncCache('sex')
// 重新发起请求
dict.get('sex').then(data => {
  console.log(data)
})
```

| Param |  Type  | Default | Description      |
| :---: | :----: | :-----: | :--------------- |
|  key  | string |    -    | 字典中对应的 key |

### reactive.get(key)

响应式在模板中获取数据，参数与 get 一致

```html
<el-select>
  <el-option v-for="item in dict.reactive.get('sex')" />
</el-select>
```

或者

```html
<el-select>
  <el-option v-for="item in sexList" />
</el-select>

<el-select>
  <el-option v-for="item in getChannel()" />
</el-select>
```

```js
import dict from '@/dict'
import { computed } from 'vue'

export default {
  setup () {
    return {
      // computed 模式
      sexList: computed(() => dict.reactive.get('sex')),
      // 函数模式
      getChannel: () => dict.reactive.get('channel')
    }
  }
}
```

### reactive.filter(options)

响应式在模板中过滤数据，参数与 filter 一致

```html
<div>{{ dict.reactive.filter({ key: 'sex', value: 1, returnLabel: true }) }}</div>

<div>{{ dict.reactive.filter({ key: 'sex', value: 1, propKey: ['label', 'value'] }) }}</div>
```
