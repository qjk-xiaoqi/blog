'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/blog/list', controller.blog.article.getArticleList)
  router.get('/blog/detail', controller.blog.article.getArticleById)
  router.get('/blog/typeList', controller.blog.article.getListById)
  router.get('/blog/commentListById', controller.blog.comment.getCommentList)
  router.post('/blog/submitComment', controller.blog.comment.submitArticleComment)
  router.post('/blog/register', controller.blog.user.register)
  router.post('/blog/login', controller.blog.user.login)
  router.post('/blog/checkUsername', controller.blog.user.checkUsername)
}
