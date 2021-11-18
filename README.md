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

```shell
npm i tiny-dict-vue -S
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
  // 异步数据最大缓存数
  max: 100,
  config: {
    // 同步数据
    sex: {
      data: [
        { name: '男', value: 1 },
        { name: '女', value: 2 }
      ]
    },
    // 异步数据，假设接口返回 { "code": 200, data: [{ "channelName": "苹果", "channelId": 1 }, { "channelName": "小米", "channelId": 2 }] }
    channel: {
      data: async () => {
        const { data } = await axios({ url: '/api/channel', method: 'GET' })
        return data || []
      },
      props: {
        name: 'channelName',
        value: 'channelId'
      }
    }
  }
})

export default dict
```

max 参数（可选）：

| Param |          Type          |                         Default                          | Required | Description                                    |
| :---: | :--------------------: | :------------------------------------------------------: | :------: | ---------------------------------------------- |
| max |        number         |                          100                           |  false   | 异步数据最大缓存个数                                 |

config 参数：

| Param |          Type          |                        Default                         | Required | Description                                |
| :---: | :--------------------: | :----------------------------------------------------: | :------: | ------------------------------------------ |
| data  | array \| () => Promise |                           -                            |   true   | 数据源                                     |
| props |         object         | { name: 'name', value: 'value', children: 'children' } |  false   | 数据的配置对象，调用 filter 方法时需要用到 |

### reactive.get (key)

响应式的获取一个字典数据，对于异步数据，会自动请求接口，同一时间多次请求会合并成一次，请求成功后会将数据缓存，下次访问取缓存。

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

<script>
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
</script>
```

### reactive.filter (options)

响应式的过滤一个字典数据，对于异步数据，会自动请求接口，同一时间多次请求会合并成一次，请求成功后会将数据缓存，下次访问取缓存，第一次过滤会缓存过滤结果，下次过滤取缓存。

```html
<template>
  <!-- 最终渲染为：苹果 -->
  <div>{{ dict.reactive.filter({ key: 'channel', value: 1, fields: 'channelName' }) }}</div>
</template>

<script>
import dict from '@/dict'

export default {
  setup () {
    return {
      dict
    }
  }
}
</script>
```

| Param  |        Type        | Default | Required | Description                                                  |
| :----: | :----------------: | :-----: | :------: | ------------------------------------------------------------ |
|  Key   |       string       |    -    |   true   | 从哪个字典中过滤数据                                         |
| value  |  string \| number  |    -    |   true   | value 的值                                                   |
| fields | string \| string[] |    -    |  false   | 返回指定字段的值，如果为数组则返回多个，默认为空即返回整个对象 |

### get (key)

在 js 中获取字典数据，如果是异步数据，返回 Promise。

```js
import dict from '@/dict'

export default {
  setup () {
    // [{ name: '男', value: 1 }, { name: '女', value: 2 } ]
    console.log(dict.get('sex'))
    
    dict.get('channel').then(data => {
      // [{ channelName: '苹果', channelId: 1 }, { channelName: '小米', channelId: 2 }]
      console.log(data)
    })
  }
}
```

### filter (options)

在 js 中过滤字典数据，如果是异步数据，返回 Promise。参数与 reactive.filter 一致。

```js
import dict from '@/dict'

export default {
  setup () {
    // 男
    console.log(dict.filter({ key: 'sex', value: 1, fields: 'name' }))
    
    dict.filter({ key: 'channel', value: 1 }).then(data => {
      // { channelName: '苹果', channelId: 1 }
      console.log(data)
    })
    
    dict.filter({ key: 'channel', value: 1, fields: 'channelName' }).then(data => {
      // 苹果
      console.log(data)
    })
    
    dict.filter({ key: 'channel', value: 1, fields: [ 'channelName', 'channelId' ] }).then(data => {
      // [ '苹果', 1 ]
      console.log(data)
    })
  }
}
```

### getProps (key)

获取一个字典的配置。

```js
import dict from '@/dict'

export default {
  setup () {
    // { name: 'name', value: 'value', children: 'children' }
    console.log(dict.getConfig('sex'))
  }
}
```

### deleteCache(key)

对于异步数据，调用 get、filter、reactive.get、reactive.filter 后，会将异步数据存入缓存，如果需要清除缓存，可以调用此方法。

```js
import dict from '@/dict'

export default {
  setup () {
    // 请求接口
    dict.get('channel').then(data => {
      console.log(data)
    })
    
    // 命中缓存
    dict.get('channel').then(data => {
      console.log(data)
    })
    
    // 清除缓存
    dict.deleteCache('channel')
    
    // 请求接口
    dict.get('channel').then(data => {
      console.log(data)
    })
  }
}
```

### clearCache()

清除所有异步数据缓存。

## 浅谈组件封装

此文档仅提供简单思路，不深入封装细节，以抛砖引玉。

### 下拉框

下拉框在后台管理系统中很常见，配合 tiny-dict-vue 封装一个字典下拉框：

DictSelect.vue：

```html
<template>
  <el-select v-bind="$attrs">
    <el-option
      v-for="item in data"
      :key="item[value]"
      :label="item[name]"
      :value="item[value]" />
  </el-select>
</template>

<script>
import { computed } from 'vue'
import dict from '@/dict'

export default {
  props: {
    dictKey: {
      type: String,
      required: true
    }
  },
  setup ({ dictKey }) {
    const data = computed(() => dict.reactive.get(dictKey) || [])
    const { name, value } = dict.getProps(dictKey)
    return {
      data,
      name,
      value
    }
  }
}
</script>
```

使用：

```html
<template>
  <div>
    <dict-select v-model="formData.sex" dict-key="sex" />
    <dict-select v-model="formData.channel" dict-key="channel" />
  </div>
</template>

<script>
import { ref } from 'vue'
import DictSelect from './components/DictSelect.vue'

export default {
  components: {
    DictSelect
  },
  setup () {
    const formData = ref({
      sex: '',
      channel: ''
    })
    return {
      formData
    }
  }
}
</script>
```

### 表格

有时后端返回的表格数据只有 id，没有 name，如果想要 name，就需要前端去请求接口，再根据每行数据的 id 进行遍历取得 name，不仅麻烦性能也差，配合 tiny-dict-vue 封装一个表格列，相同的 value，只会在第一次进行遍历，之后取缓存：

DictTableColumn.vue：

```html
<template>
  <el-table-column v-bind="$attrs" :prop="prop" :formatter="formatter" />
</template>

<script>
import dict from '@/dict'

export default {
  props: {
    dictKey: String,
    prop: String,
    formatter: Function
  },
  setup ({ dictKey, prop, formatter }) {
    const dictFilter = row => {
      return dict.reactive.filter({
        key: dictKey,
        value: row[prop],
        fields: dict.getProps().name
      }) || '-'
    }
    return {
      formatter: dictKey ? dictFilter : formatter
    }
  }
}
</script>
```

使用：

```html
<template>
  <el-table :data="tableData">
    <dict-table-column label="姓名" prop="name" />
    <dict-table-column label="性别" prop="sex" dict-key="sex" />
    <dict-table-column label="渠道" prop="channel" dict-key="channel" />
  </el-table>
</template>

<script>
import DictTableColumn from './components/DictTableColumn.vue'

export default {
  components: {
    DictTableColumn
  },
  setup () {
    const tableData = [
      { name: '张三', sex: 1, channel: 1 },
      { name: '李四', sex: 2, channel: 2 },
      { name: '王五', sex: 1, channel: 1 }
    ]
    return {
      tableData
    }
  }
}
</script>
```

## 接入后端字典

如果项目本身有字典系统，获取字典的接口为：

```js
axios({
  url: '/api/getDict',
  method: 'GET',
  params: {
    type: 'channel'
  }
})
```

返回数据格式为：

```js
{
  code: 200,
  data: [
    { name: '苹果', value: 1 },
    { name: '小米', value: 2 }
  ],
  msg: 'success'
}
```

创建 dict：

```js
import TinyDict from 'tiny-dict-vue'

// 从接口中获取数据
async function getRemoteDict (type) {
  const { data } = await axios({
    url: '/api/getDict',
    method: 'GET',
    params: { type }
  })
  return data
}

function getDictConfig (type) {
  return {
    async: true,
    data: () => getRemoteDict(type),
    props: {
      name: 'name',
      value: 'id'
    }
  }
}

const remoteDict = new TinyDict({
  config: {
    channel: getDictConfig('channel'),
    status: getDictConfig('status')
  }
})

export default remoteDict
```

之后每新增一个字典，加一行代码就行，但这种方式可能比较繁琐，可以使用 Proxy 解决此问题，如：

```js
const remoteDict = new TinyDict({
  config: new Proxy({}, {
    get: (target, key) => getDictConfig(key)
  })
})
```

完
