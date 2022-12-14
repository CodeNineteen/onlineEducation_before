import Vue from 'vue'
// 使用vuex进行事件的通信,全局状态管理
import Vuex from 'vuex'
// vuex全局注入
Vue.use(Vuex)

// 将store对外暴露，创建一个实例
export default {
  state: {
    menuList: [],
    permList: [],
    hasRoute: false,
    editableTabsValue: 'Index',
    editableTabs: [{
      title: '首页',
      name: 'Index'
    }]
  },
  mutations: {
    setMenuList (state, menus) {
      state.menuList = menus
    },
    setPermList (state, perms) {
      state.permList = perms
    },
    changeRouteStatus (state, hasRoute) {
      state.hasRoute = hasRoute
      sessionStorage.setItem('hasRoute', hasRoute)
    },
    // 动态标签页
    addTab (state,tab) {
      let index = state.editableTabs.findIndex(e =>e.name===tab.name)
      if(index===-1) {
        state.editableTabs.push({
          title: tab.title,
          name: tab.name
        })
      }
      state.editableTabsValue = tab.name
    },
    resetState: (state) => {
      state.menuList = []
      state.permList = []
      state.hasRoute = false
      state.editableTabsValue = 'Index'
      state.editableTabs = [{
        title: '首页',
        name: 'Index'
      }]
    }
  },
  actions: {},
  modules: {

  }
}
