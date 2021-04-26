import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:7002'

const request = (url, params = {}, data, method) => {
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
  return request(url, params, config, 'get')
}

const post = (url, params = {}, config = {}) => {
  return request(url, params, config, 'post')
}

export { get, post }
