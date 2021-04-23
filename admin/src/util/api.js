import { get, post } from './request'

export const checkLogin = data => {
  return post('/admin/login', {}, data)
}

export const getTypeInfo = () => {
  return get(
    '/admin/getInfo',
    {},
    {},
    {
      withCredentials: true,
    }
  )
}

export const addArticle = data => {
  return post('/admin/addArticle', {}, data, {
    withCredentials: true,
  })
}

export const updateArticle = data => {
  return post('/admin/updateArticle', {}, data, {
    withCredentials: true,
  })
}

export const getArticleList = () => {
  return get(
    '/admin/getArticleList',
    {},
    {},
    {
      withCredentials: true,
    }
  )
}

export const delArticle = data => {
  return get(
    '/admin/delArticle',
    data,
    {},
    {
      withCredentials: true,
    }
  )
}

export const getArticleById = data => {
  return get(
    '/admin/getArticleById',
    data,
    {},
    {
      withCredentials: true,
    }
  )
}
