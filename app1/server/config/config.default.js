/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1600140909702_2698';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 配置数据库
  config.mysql = {
    client: {
      //host
      host: "localhost",
      //端口
      port: "3306",
      //用户名
      user: "root",
      //密码
      password: "root",
      //数据库名
      database: "taobao"
    }
  };

  // 设置允许哪些源可以跨域访问当前服务器
  // credentials:true 跨域服务的页面去做cookies缓存
  config.cors = {
    origin: 'http://10.55.58.252:8080',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true//后端会去给前端返回缓存数据包 告诉浏览器 去做缓存
  };

  // 获取上传的文件
  config.multipart = {
    mode: 'file',
  };

  // 关闭安全验证
  config.security = {
    csrf: {
      enable: false
    }
  };

  //Session默认配置
  config.session = {
    key: 'EGG_SESS',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
  };

  return {
    ...config,
    ...userConfig,
  };
};
