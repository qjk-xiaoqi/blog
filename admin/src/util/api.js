import { get, post } from './request'

export const checkLogin = data => {
  return post('/admin/login', {}, data)
}
