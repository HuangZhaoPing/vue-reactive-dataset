import TinyDict from '@/index'

export default new TinyDict({
  max: 5,
  config: {
    sex: {
      data: [
        { name: '男', value: 1, children: [{ name: '男11', value: 11 }, { name: '男12', value: 12 }] },
        { name: '女', value: 2, children: [{ name: '女21', value: 21 }, { name: '女22', value: 22 }] },
      ]
    },
    channel: {
      data: () => {
        console.log('sadfasdf')
        return new Promise(resolve => {
          setTimeout(() => {
            resolve([
              { channelName: '苹果', channelId: 1 },
              { channelName: '小米', channelId: 2 }
            ])
          }, 3000)
        })
      },
      props: {
        name: 'channelName',
        value: 'channelId'
      }
    }
  }
})
