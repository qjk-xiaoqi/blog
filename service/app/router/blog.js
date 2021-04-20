'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/blog/list', controller.blog.home.getArticleList)
  router.get('/blog/detail', controller.blog.home.getArticleById)
  router.get('/blog/typeList', controller.blog.home.getListById)
}
