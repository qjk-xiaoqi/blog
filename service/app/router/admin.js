'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app
  console.log(app.jwt, 'pppp=>>>>')
  const jwt = middleware.auth(app.config.jwt, app)
  router.post('/admin/login', controller.admin.index.login)
  router.get('/admin/getInfo', jwt, controller.admin.index.getTypeInfo)
  router.post('/admin/addArticle', controller.admin.index.addArticle)
  router.post('/admin/updateArticle', controller.admin.index.updateArticle)
  router.get('/admin/getArticleList', controller.admin.index.getArticleList)
  router.get('/admin/delArticle', controller.admin.index.delArticle)
  router.get('/admin/getArticleById', controller.admin.index.getArticleById)
  router.get('/admin/getCommentList', controller.admin.index.getCommentList)
  router.get('/admin/delComment', controller.admin.index.delComment)
}
