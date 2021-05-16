/**
 * @param {中间件的配置项，框架会将 app.config[${middlewareName}] 传递进来} options
 * @param {当前应用 Application 的实例} app
 */
module.exports = (options, app) => {
  // 登录鉴权
  return async function auth(ctx, next) {
    const token = ctx.request.header.authorization
    if (token) {
      // token 认证
      try {
        app.jwt.verify(token, options.secret)
        await next()
      } catch (error) {
        ctx.status = 401
        ctx.body = {
          data: {
            message: error.message,
          },
        }
      }
    } else {
      ctx.status = 401
      ctx.body = {
        message: '没有token',
      }
    }
  }
}
