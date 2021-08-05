import TinyDict from '@/index'

const dict = new TinyDict({
  max: 2,
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
          console.log('执行。。。。')
          setTimeout(() => {
            resolve([
              { label: '苹果', value: 1 },
              { label: '安卓', value: 2 }
            ])
          }, 3000)
        })
      }
    }
  }
})

export default dict
