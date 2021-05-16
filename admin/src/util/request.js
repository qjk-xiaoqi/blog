import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:7002'

// const service = axios.create({
//   baseURL: process.env.BASE_API, // api 的 base_url
//   timeout: 5000, // request timeout  设置请求超时时间
//   responseType: 'json',
//   withCredentials: true, // 是否允许带cookie这些
//   headers: {
//     'Content-Type': 'application/json;charset=utf-8',
//   },
// })

// 添加请求拦截器
axios.interceptors.request.use(config => {
  console.log(config, '->>>>>')
  //  获取token
  const token = localStorage.getItem('Authorization')
  if (token) {
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
      Accept: 'application/json',
      Authorization: token,
    }
    config.headers = headers
  }
  return config
})

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
