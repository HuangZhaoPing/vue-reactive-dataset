import axios from 'axios'

const request = axios.create({
  baseURL: 'https://www.fastmock.site/mock/61b51f966a9c4d7affc1b62642306e2e/api'
})

export function getGradeList (params) {
  return request({
    url: '/getGradeList',
    method: 'GET',
    params
  }).then(res => {
    return res.data
  })
}
export function getChannelList (params) {
  return request({
    url: '/getChannelList',
    method: 'GET',
    params
  }).then(res => {
    return res.data
  })
}
