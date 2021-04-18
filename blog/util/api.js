import { get, post } from './request'

export const getArticleList = () => {
  return get('/blog/list')
}

export const getArticleById = params => {
  return get('/blog/detail', params)
}

export const getListById = params => {
  return get('/blog/typeList', params)
}
