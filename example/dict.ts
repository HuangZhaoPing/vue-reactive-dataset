import TinyDict from '@/index'

export default new TinyDict({
  sex: {
    data: [
      { label: '男', value: 1 },
      { label: '女', value: 2 }
    ]
  },
  status: {
    data: [
      { label: '正常', value: 1 },
      { label: '禁用', value: 2 }
    ]
  },
  channel: {
    async: true,
    data: () => {
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
    props: {
      label: 'channelName',
      value: 'channelId'
    }
  },
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
      value: 'id'
    }
  }
})