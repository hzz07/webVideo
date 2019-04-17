// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import FastClick from 'fastclick'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import '@/comon/reset.css'
import '@/comon/fonts.css'
FastClick.attach(document.body);
Vue.use(VueAwesomeSwiper)
Vue.use(Mint);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
