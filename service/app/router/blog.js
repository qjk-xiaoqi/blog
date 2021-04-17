'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/blog/home', controller.blog.home.index)
  router.get('/blog/list', controller.blog.home.list)
}
