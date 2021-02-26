import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

var state = {
  cartList: [],
  isSelectAll: false
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
  // state: {
    
  // },
  // mutations唯一的目的就是修改state中状态
  // mutation中的每个方法尽可能完成的事件比较单一一点
  // mutations: {
  //   // addcart(state, payload) {
  //   //   // payload添加商品
  //   //   // 1.查找之前数组中是否有该商品
  //   //   let oldproduct = state.cartList.find(function(item) {
  //   //     return item.iid === payload.iid
  //   //   })

  //   //   // 2.判断oldProduct
  //   //   if(oldproduct) {
  //   //     oldproduct.count += 1
  //   //   }else {
  //   //     payload.count = 1
  //   //     state.cartList.push(payload)
  //   //   }
  //   // }
    
  // },
  // actions: {
    
  // }
})

export default store