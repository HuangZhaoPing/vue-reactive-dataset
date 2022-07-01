import ReactiveDataset from '../src'
import { getGradeList, getChannelList } from './api'

const config = {
  sex: {
    data: () => ([
      { name: '男', value: 1 },
      { name: '女', value: 2 }
    ])
  },
  gradeList: {
    data: async (params) => {
      const { data } = await getGradeList(params)
      return data
    },
    props: {
      name: 'name',
      value: 'id'
    }
  },
  channelList: {
    data: async (params) => {
      const { data } = await getChannelList(params)
      return data
    },
    props: {
      name: 'name',
      value: 'id'
    }
  }
}

export default new ReactiveDataset({
  config
})
