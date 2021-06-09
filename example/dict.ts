import TinyDict from '@/index'

function getRemoteDict (type: string) {
  console.log('xxxxxxxxxxxxxxxxxxx')
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      switch (type) {
        case 'channel':
          resolve([
            { name: '苹果', id: 1 },
            { name: '小米', id: 2 }
          ])
          break
        case 'status':
          resolve([
            { name: '正常', id: 1 },
            { name: '禁用', id: 2 }
          ])
          break
      }
    }, 2000)
  })
}

export default new TinyDict(new Proxy({}, {
  get (target, key) {
    return {
      async: true,
      data: () => getRemoteDict(key as string),
      props: {
        label: 'name',
        value: 'id'
      }
    }
  }
}))
