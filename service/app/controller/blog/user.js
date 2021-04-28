'use strict'

const Controller = require('egg').Controller

class UserController extends Controller {
  async register() {
    const data = this.ctx.request.body
    const result = await this.app.mysql.insert('user', data)
    const isSuccess = result.affectedRows === 1
    const insertId = result.insertId
    this.ctx.body = {
      data: { insertId },
      success: isSuccess,
      message: isSuccess ? '注册成功' : '注册失败',
    }
  }

  async checkUsername() {
    const data = this.ctx.request.body
    const result = await this.app.mysql.select('user', {
      where: { username: data.username },
    })
    this.ctx.body = {
      data: { userList: result },
      message: result.length ? '用户名重复' : '用户名可用',
    }
  }

  async login() {
    const data = this.ctx.request.body
    const result = await this.app.mysql.get('user', {
      username: data.username,
    })
    const res = await this.app.mysql.get('user', {
      username: data.username,
      password: data.password,
    })
    let message = ''
    let success = false
    if (!result) {
      message = '先注册，再登录'
    } else if (result.username && !res) {
      message = '密码错误'
    } else if (res.username) {
      message = '登录成功'
      success = true
    }
    this.ctx.body = {
      data: { user_info: result },
      success,
      message,
    }
  }
}

module.exports = UserController
