'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/p1', controller.user.register);
  router.get('/yanzhengma', controller.user.yanzhengma);
  router.post('/login', controller.user.login);
  router.get('/userinfo', controller.user.userinfo);
};
