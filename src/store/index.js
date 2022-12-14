import Vue from 'vue'
// 使用vuex进行事件的通信,状态管理
import Vuex from 'vuex'
import menus from './modules/menus'
// vuex全局注入
Vue.use(Vuex)

// 将store对外暴露，创建一个实例
export default new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      localStorage.setItem('token', token)
    }
  },
  actions: {
  },
  modules: {
    menus
  }
})
