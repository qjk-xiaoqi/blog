'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'api接口'
  }
  async list() {
    this.ctx.body = 'api list接口'
  }
}

module.exports = HomeController
