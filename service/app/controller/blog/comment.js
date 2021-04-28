'use strict'

const Controller = require('egg').Controller

class CommentController extends Controller {
  async getCommentList() {
    const type = this.ctx.query.id
    const result = await this.app.mysql.select('comment', {
      where: { type: type },
    })
    this.ctx.body = {
      data: { list: result },
    }
  }

  async submitArticleComment() {
    const data = this.ctx.request.body
    const result = await this.app.mysql.insert('comment', data)
    const success = result.affectedRows === 1
    this.ctx.body = {
      data: {},
      success,
      message: success ? '评论成功' : '评论失败',
    }
  }
}

module.exports = CommentController
