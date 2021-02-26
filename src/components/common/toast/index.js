// 插件
import Toast from './Toast' //引入对象

const obj = {}

obj.install = function(Vue) {  //会主动传入Vue作为参数
  // 有自己的模板（需要在body中显示内容）需要将模板挂载到body上
  // 1.创建组件构造器
  const toastConstructor = Vue.extend(Toast)
  // 2.new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastConstructor()
  // 3.将组件对象，手动挂载到某一个DOM元素上
  toast.$mount(document.createElement('div'))
  // 4.toast.$el对应的就是div
  document.body.appendChild(toast.$el) 

  Vue.prototype.$toast = toast
}

export default obj