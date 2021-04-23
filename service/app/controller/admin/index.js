'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  async login() {
    const { userName, password } = this.ctx.request.body
    const sql = "SELECT userName FROM admin_user WHERE userName = '" + userName + "' AND password = '" + password + "'"
    const res = await this.app.mysql.query(sql)
    if (res.length > 0) {
      const openId = new Date().getTime()
      // this.ctx.cookies.set('openId', openId, {
      //   httpOnly: false,
      //   signed: false,
      //   // widget_session=abc123,
      //   // SameSite=None,
      // })
      this.ctx.session.openId = { openId }
      this.ctx.body = { data: '登录成功', openId, status: 0 }
    } else {
      this.ctx.body = { data: '登录失败', status: 1 }
    }
  }
  // 获取文章类型
  async getTypeInfo() {
    const res = await this.app.mysql.select('type')
    this.ctx.body = { data: res }
  }

  // 添加文章
  async addArticle() {
    const result = this.ctx.request.body
    const res = await this.app.mysql.insert('article', result)
    const isSuccess = res.affectedRows === 1
    const insertId = res.insertId
    this.ctx.body = {
      data: {
        isSuccess,
        insertId,
      },
    }
  }

  // 修改文章
  async updateArticle() {
    const result = this.ctx.request.body
    const res = await this.app.mysql.update('article', result)
    const isSuccess = res.affectedRows === 1
    this.ctx.body = {
      data: {
        isSuccess,
      },
    }
  }

  // 获取文章列表
  async getArticleList() {
    const sql =
      'SELECT article.id as id,' +
      'article.title as title,' +
      'article.content as content,' +
      'article.introduce as introduce,' +
      'article.time as add_time,' +
      'article.count as view_count,' +
      'type.typeName as type_name,' +
      'type.id as type_id ' +
      'FROM article LEFT JOIN type ON article.type_id = type.id ' +
      'ORDER BY article.id DESC '
    // 查询数据库
    const res = await this.app.mysql.query(sql)
    this.ctx.body = {
      data: res,
    }
  }

  // 删除文章
  async delArticle() {
    const result = this.ctx.query
    const res = await this.app.mysql.delete('article', result)
    const isSuccess = res.affectedRows === 1
    this.ctx.body = {
      data: isSuccess,
    }
  }

  // 获取单个文章，根据文章ID获取文章内容
  async getArticleById() {
    // 获取get请求后的参数
    const id = this.ctx.query.id
    const sql =
      'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      'article.content as article_content,' +
      'article.time as add_time,' +
      'article.count as view_count,' +
      'type.typeName as typeName,' +
      'type.id as type_id ' +
      'FROM article LEFT JOIN type ON article.type_id = type.id ' +
      'WHERE article.id=' +
      id
    // 查询数据库
    const res = await this.app.mysql.query(sql)
    this.ctx.body = {
      data: res,
    }
  }
}

module.exports = HomeController
