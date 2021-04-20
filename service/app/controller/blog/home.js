'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
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
      'FROM article LEFT JOIN type ON article.type_id = type.id'
    // 查询数据库
    const res = await this.app.mysql.query(sql)
    this.ctx.body = {
      data: res,
    }
  }

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

  // 得到类别和名称编号
  async getTypeInfo() {
    const res = await this.app.mysql.select('type')
    this.ctx.body = {
      data: res,
    }
  }

  async getListById() {
    const typeId = this.ctx.query.type
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
      'WHERE article.type_id=' +
      typeId
    const res = await this.app.mysql.query(sql)
    this.ctx.body = {
      data: res,
    }
  }
}

module.exports = HomeController
