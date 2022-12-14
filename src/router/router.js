import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home'
import Index from '../views/Index'
import axios from '../axios'
import store from '../store'
Vue.use(VueRouter)

// 嵌套路由
const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    // home下的子路由
    children: [
      {
        path: '/index',
        name: 'Index',
        component: Index
      }
    ]
  },
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 挂载路由导航守卫(beforeEach),使用路由导航守卫控制访问权限
router.beforeEach((to, from, next) => {
//  to:将要访问的路径
//  from：代表从那个路径跳转而来
//  next：是一个函数，表示放行，两种放行方式：next () 放行  next('/login') 强制跳转
  let hasRoute = store.state.menus.hasRoute
  let token =localStorage.getItem("token")
  if (to.path === '/login') {
    next()
  }else if(!token) {
    next({path:'/login'})
  }
  else if (token && !hasRoute) {
    axios.get('/sys/menu/nav', {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }).then(res => {
      //  拿到menulist
      store.commit('setMenuList', res.data.data.nav)
      //  拿到用户权限
      store.commit('setPermList', res.data.data.authoritys)
      //  动态绑定路由
      let newRoutes = router.options.routes
      // debugger
      res.data.data.nav.forEach(menu => {
        if (menu.children) {
          menu.children.forEach(e => {
            //  转换成路由
            const route = menuToRoute(e)
            //  把路由添加到路由管理器中
            if (route) {
              newRoutes[0].children.push(route)
            }
          })
        }
      })
      router.addRoutes(newRoutes)
      hasRoute = true
      store.commit('changeRouteStatus', hasRoute)
    })
  }
  next()
})
// 路由懒加载的转换，导航转成路由
const menuToRoute = (menu) => {
  if (!menu.component) {
    return null
  }
  const route = {
    name: menu.name,
    path: menu.path,
    meta: {
      icon: menu.icon,
      title: menu.title
    }
  }
  route.component = () => import('@/views/' + menu.component + '.vue')
  return route
}
export default router
