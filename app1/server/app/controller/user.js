'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');

class UserController extends Controller {
    async register() {
        const { ctx } = this;
        console.log(ctx.request.queries, ctx.request.files, ctx.request.body);

        //处理前端发送过来的数据
        if (ctx.request.files) {//判断一下，当用户选择了文件再进行下面11操作
            //图片临时路径
            var oldpath = `${ctx.request.files[0].filepath}`;
            //把图片移动到新路径
            var filename1 = path.basename(ctx.request.files[0].filepath);//文件名
            var newpath = `${__dirname}/../public/upload/${filename1}`;
            fs.copyFileSync(oldpath, newpath);
            var imgurl = `http:///10.55.58.252:7001/public/upload/${filename1}`;
            ctx.request.body.img = imgurl;
            //把处理之后的结果传给service工具函数，让它去处理 把处理的结果发给前端
            ctx.body = await ctx.service.user.register(ctx.request.body);
        }
    }

    async yanzhengma() {
        const { ctx } = this;
        ctx.body = await ctx.service.user.yanzhengma()
    }

    async login() {
        const { ctx } = this;
        // console.log(ctx.request.body);
        var res = await ctx.service.user.login(ctx.request.body);
        // console.log(res);
        if (res[0]) {//验证通过，用户输入正确

            ctx.session.username = ctx.request.body.username;//浏览器做缓存
            ctx.body = { code: 2002, info: res[0] };
        } else {
            ctx.body = { code: 4004, info: "账号密码错误！" };
        }
        return '66666';
    }

    async userinfo() {
        const { ctx } = this;
        console.log(ctx.session.username);
        var res = await ctx.service.user.userinfo()
        ctx.body = res;
    }
}

module.exports = UserController;
