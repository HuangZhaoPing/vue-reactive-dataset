import axios from 'axios'

export function getGradeList (params) {
  return axios({
    url: 'https://www.fastmock.site/mock/61b51f966a9c4d7affc1b62642306e2e/api/getGradeList',
    method: 'GET',
    params
  }).then(res => {
    return res.data
  })
}
