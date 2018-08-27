import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import axios from 'axios'
import VueAxios from 'vue-axios'
var VueTouch = require('vue-touch')
Vue.use(VueTouch, {
  name: 'v-touch'
})

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
