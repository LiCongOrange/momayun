// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import VueDND from 'awe-dnd'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueQuillEditor from 'vue-quill-editor'
import VeeValidate, {Validator} from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
import store from './store/index.js'
import $ from 'jquery'
import axios from 'axios'
import layer from 'vue-layer'
import Sortable from 'vue-sortable'
import navBus from '@/assets/js/navBus.js'
import '@/assets/js/bootstrap.js'
import '@/assets/js/editor.js'
import ElementUi from 'element-ui'
import animated from 'animate.css'
import BaiduMap from 'vue-baidu-map'
import {BmlMarkerClusterer} from 'vue-baidu-map'
import 'babel-polyfill'


import '@/assets/styles/reset.styl'
import '@/assets/styles/iconfont.css'
import '@/assets/styles/bootstrap.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import 'swiper/dist/css/swiper.css'

Vue.use(animated)
Vue.use(Vuex)
Vue.use(Sortable)
Vue.use(VueDND)
Vue.use(VueAwesomeSwiper)
Vue.use(VueQuillEditor)
Vue.use(VeeValidate)
Vue.use(ElementUi)
Vue.config.productionTip = false
Vue.prototype.$axios= axios
Vue.prototype.$layer = layer(Vue)


Vue.use(BaiduMap, {
  ak: 'GBz1c2FKHnEKBl8BBMM0ialgn7xS2gtq'
})
Vue.component('bml-marker-cluster', BmlMarkerClusterer)
/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})