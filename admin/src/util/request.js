import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:7002'

const request = (method, url, params = {}, data) => {
  return new Promise((resolve, reject) => {
    axios({
      method: method || 'get',
      url,
      params,
      data,
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const get = (url, params = {}, config = {}) => {
  return request('get', url, params, config)
}

const post = (url, params = {}, config = {}) => {
  return request('post', url, params, config)
}

export { get, post }
