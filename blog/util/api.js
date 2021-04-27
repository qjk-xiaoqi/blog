import { get, post } from './request'

export const getArticleList = () => get('/blog/list')

export const getArticleById = params => get('/blog/detail', params)

export const getListById = params => get('/blog/typeList', params)

// 提交留言
export const submitArticleMessageApi = data => post('/blog/submitArticleMessage', {}, data)

// 初始化留言
export const initArticleMessageApi = data => post('/blog/initArticleMessage', {}, data)

// 用户注册
export const userRegister = data => post('/blog/register', {}, data)

// 用户登录
export const userLogin = data => post('/blog/login', {}, data)

// 检查用户是否注册重复
export const checkUsername = data => post('/blog/checkUsername', {}, data)
