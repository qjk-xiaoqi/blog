/**
 * @param {中间件的配置项，框架会将 app.config[${middlewareName}] 传递进来} options
 * @param {当前应用 Application 的实例} app
 */
module.exports = (options, app) => {
  return async function auth(ctx, next) {
    if (ctx.session.openId) {
      await next()
    } else {
      ctx.body = { data: '没有登录' }
    }
  }
}
