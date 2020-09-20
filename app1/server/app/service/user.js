const { EggApplication } = require("egg");
const svgCaptcha = require('svg-captcha');

'use strict';

const Service = require('egg').Service;

class UserService extends Service {
    async yanzhengma() {
        //生成验证码，返回给调用者，
        const captcha = svgCaptcha.create({
            size: 4,
            fontSize: 50,
            width: 100,
            height: 40,
            bacground: '#cc9966'
        });
        //console.log('生成的验证码对象', captcha);//在后端打印
        //把生成的验证码里面的文字缓存起来（保存到后端的内存变量中）
        this.ctx.session.code = captcha.text;
        return captcha;//返回给前端
    }

    async login(loginUserinfo) {
        var sql = `select * from userinfo WHERE username='${loginUserinfo.username}' and pwd='${loginUserinfo.pwd}';`;
        var res = await this.app.mysql.query(sql);
        // console.log(res);
        return res;
    }

    async register(userinfo) {
        //前端传1的所有数据 username、pwd1、 yanzgengma、img
        //1.先取出yanzgengma，跟上一次的比较
        //2.去数据库查找username，如果有，用户名已注册
        //3.存入数据库
        console.log(userinfo);//用户提交时的数据
        console.log(this.ctx.session.code);//上一次的缓存验证码
        if (userinfo.yanzgengma.toUpperCase() != this.ctx.session.code.toUpperCase()) {
            return { code: 4001, info: '验证码错误！' };
        } else {
            var sql = `select * from userinfo where username='${userinfo.username}'`
            var res = await this.app.mysql.query(sql);
            if (res[0]) {
                return { code: 4002, info: '此账号已被注册！' };
            } else {
                var sql = `INSERT  INTO userinfo (username,  pwd,  tximg) VALUES('${userinfo.username}', '${userinfo.pwd1}', '${userinfo.img}')`
                var res = await this.app.mysql.query(sql);
                console.log(res);
                if (res.affectedRows > 0) {
                    return { code: 4003, info: '注册成功！' };
                }
            }

        }
    }

    async userinfo() {
        var sql = `select * from userinfo WHERE username='${this.ctx.session.username}';`;
        var res = await this.app.mysql.query(sql);
        // console.log(res);
        return res;
    }
}

module.exports = UserService;
