import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:7002'

const request = (method, url, params, data, config) => {
  return new Promise((resolve, reject) => {
    axios({
      method: method || 'get',
      url,
      params,
      data,
      ...config,
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const get = (url, params = {}, data = {}, config = {}) => {
  return request('get', url, params, data, config)
}

const post = (url, params = {}, data = {}, config = {}) => {
  return request('post', url, params, data, config)
}

export { get, post }
