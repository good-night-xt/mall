import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from './components/common/toast'

// 图片懒加载
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false
// 事件总线
Vue.prototype.$bus = new Vue()

// 安装toast插件(自定义)
Vue.use(toast) //使用use时，会自动调用toast的install方法

// 使用图片懒加载插件 添加默认占位图
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/defaultBacImg/bacImg.jpg')
})


new Vue({
  render: h => h(App),
  router,
  store,
  toast
}).$mount('#app')
