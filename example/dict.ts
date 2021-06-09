import TinyDict from '@/index'

const dict1 = new TinyDict({
  config: {
    sex: {
      data: [
        { label: '男', value: 1 },
        { label: '女', value: 2 }
      ]
    },
    channel: {
      async: true,
      data: () => {
        return new Promise((resolve, reject) => {
          console.log('fetch channel')
          setTimeout(() => {
            const data = [
              { channelName: '苹果', channelId: 1 },
              { channelName: '小米', channelId: 2 }
            ]
            resolve(data)
          }, 3000)
        })
      },
      props: { label: 'channelName', value: 'channelId' }
    },
    status: {
      async: true,
      data: () => {
        return new Promise((resolve, reject) => {
          console.log('fetch status')
          setTimeout(() => {
            const data = [
              { name: '正常', id: 1 },
              { name: '禁用', id: 2 }
            ]
            resolve(data)
          }, 3000)
        })
      },
      props: { label: 'name', value: 'id' }
    }
  }
})

async function getRemoteDict (type: string) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      switch (type) {
        case 'status':
          resolve([
            { name: '正常', id: 1 },
            { name: '禁用', id: 2 }
          ])
          break
        case 'channel':
          resolve([
            { name: '苹果', id: 1 },
            { name: '小米', id: 2 }
          ])
          break
      }
    }, 1000)
  })
}

const dict2 = new TinyDict({
  config: new Proxy({}, {
    get: (target, key) => {
      return {
        async: true,
        data: () => getRemoteDict(key as string),
        props: { label: 'name', value: 'id' }
      }
    }
  })
})

export { dict1, dict2 }
