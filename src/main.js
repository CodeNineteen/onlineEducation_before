import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import axios from './axios'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import './plugins/element.js'
import store from './store'
Vue.prototype.$axios = axios
Vue.config.productionTip = false
// require('./mock.js')
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
