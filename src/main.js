// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import './common/rem'

import Vue from 'vue'

import Cookies from 'js-cookie'

import App from './App'
import router from './router'


import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '../static/css/icon.css'

import request from './utils/request'

// import VueResource from 'vue-resource'

Vue.config.productionTip = false
Vue.use(Element, { size: 'small', zIndex: 3000 })

Vue.use(VueAxios, axios)

// Vue.use(VueResource)

Vue.prototype.$request = request

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
