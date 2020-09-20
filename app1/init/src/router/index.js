import Vue from 'vue'
// import axios from 'axios'
import VueRouter from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'


//配置axios
//以后所有组件要用的$axios 请求数据 相对网址路径 就是基于baseURL
//绝对网路路径就按照绝对网络路径去请求
// axios.defaults.baseURL = " http://10.55.58.252:7001/"
//允许浏览器请求时携带cookie
// axios.defaults.withCredentials = true

// Vue.prototype.$axios = axios

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HelloWorld
    },
    {
      path: '/p1',
      component: () => import('../views/p1.vue'),
    },
    {
      path: '/p2',
      component: () => import('../views/p2.vue'),
      children: [
        {
          path: 'pp2',
          component: () => import('../views/pp2/pp2.vue'),
        },
        {
          path: 'pp2pp',
          component: () => import('../views/pp2/pp2pp.vue'),
        },
      ]
    },
    {
      path: '/p3',
      component: () => import('../views/p3.vue')
    },
    {
      path: '/p4',
      component: () => import('../views/p4.vue')
    },
  ]
})


//路由守卫
router.beforeEach((to1, from1, next1) => {
  if (to1.path == "/" || to1.path == "/p1" || to1.path == "/p2" || to1.path == "/p3") {

    next1();// 放行
  } else {
    var flag = localStorage.getItem("isLogin");
    if (flag) {//登录过
      next1();
    } else {
      next1("/p1");
    }
  }
})
export default router
