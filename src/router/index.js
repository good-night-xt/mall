import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: { // 元数据(描述数据)
      title: '首页'
    }
  },
  {
    path: '/category',
    component: Category,
    meta: {
      title: '分类'
    }
  },
  {
    path: '/cart',
    component: Cart,
    meta: {
      title: '购物车'
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      title: '我的'
    }
  },
  {
    path: '/detail/:iid',
    component: Detail,
    meta: {
      title: '详情'
    }
  }

]

const router = new VueRouter({
  routes,
  mode: 'history'   // 模式，默认路由路径是hash格式(#)
})
// 导航守卫 
// 前置钩子 (跳转之前回调)
router.beforeEach((to, from, next) => {
  // 从from挑战到to
  document.title = to.matched[0].meta.title // matched[0]取到当前路由,同时能解决子路由引起的路径不匹配问题
  next() //必须调用 不然不会进行下一步
})

export default router