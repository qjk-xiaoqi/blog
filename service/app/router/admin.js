'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app
  const auth = middleware.auth()
  router.post('/admin/login', controller.admin.index.login)
  router.get('/admin/getInfo', controller.admin.index.getTypeInfo)
  router.post('/admin/addArticle', controller.admin.index.addArticle)
  router.post('/admin/updateArticle', controller.admin.index.updateArticle)
  router.get('/admin/getArticleList', controller.admin.index.getArticleList)
  router.get('/admin/delArticle', controller.admin.index.delArticle)
  router.get('/admin/getArticleById', controller.admin.index.getArticleById)
}
