/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1618567493980_2515'

  // add your middleware config here
  config.middleware = []

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }

  // // 配置session
  // config.session = {
  //   // 设置session cookie里面的key
  //   key: 'SESSION_ID',
  //   // 设置最大的过期时间
  //   maxAge: 30 * 1000 * 60,
  //   // 设置是否只服务端可以访问
  //   httpOnly: true,
  //   // 设置是否加密
  //   encrypt: true,
  //   // 设置为true每次刷新页面的时候session都会被延期
  //   renew: true,
  // }

  // 配置数据库
  config.mysql = {
    // database configuration
    client: {
      // host
      host: 'localhost',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: '123456',
      // database
      database: 'blog',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  }

  // 配置安全机制
  config.security = {
    csrf: { enable: false },
    domainWhiteList: ['*'],
  }

  // 允许跨域
  config.cors = {
    origin(ctx) {
      // return "*"; // 允许来自所有域名请求
      // return ctx.header.origin;// 当*无法使用时，使用这句,同样允许所有跨域
      // return 'http://localhost:8080'; //单个跨域请求
      // 允许多个跨域
      const allowCors = ['http://localhost:3000', 'http://127.0.0.1:3000']
      return allowCors.indexOf(ctx.header.origin) > -1 ? ctx.header.origin : ''
    },
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  }

  // 自定义 token 的加密条件
  config.jwt = {
    secret: '123456',
  }

  return {
    ...config,
    ...userConfig,
  }
}
