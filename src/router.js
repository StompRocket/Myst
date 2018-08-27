import Vue from 'vue'
import Router from 'vue-router'
import Forecast from './views/forecast.vue'
import About from './views/About.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'forecast',
      component: Forecast
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
