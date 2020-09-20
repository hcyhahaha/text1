<template>
  <div id="app">
    <div class="bottom">
      <!-- <button>home</button> -->
      <!-- <button>about</button> -->
      <!-- <a href="http://192.168.3.113:8080/">home</a> &nbsp; 
      <a href="http://192.168.3.113:8080/about">about</a>-->

      <!-- <a href="/">home</a> &nbsp;
      <a href="/about">about</a>-->

      <!-- <router-link to="/">home</router-link>&nbsp; 
      <router-link to="/about">about</router-link>-->
      <router-link to="/">首页</router-link>&nbsp;
      <router-link to="/p1">登录</router-link>&nbsp;
      <router-link to="/p2">推荐</router-link>&nbsp;
      <router-link to="/p3">购物车</router-link>&nbsp;
      <router-link to="/p4">个人中心</router-link>&nbsp;
    </div>

    <router-view />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
#app {
  width: 600px;
  height: 600px;
  position: relative;
  font-family: '幼圆';
  text-align: center;
  border-radius: 5px;
  box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.35);
  background-color: #e0ece4;
}
.bottom {
  left: 50%;
  bottom: 10px;
  width: 300px;
  position: absolute;
  transform: translate(-50%, 0);
}
</style>
