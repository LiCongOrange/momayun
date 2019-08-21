import Vue from 'vue'
import Pre from './Pre'
import router from '@/router/index.js'
import store from '@/store/index.js'
import $ from 'jquery'
import axios from 'axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import ElementUi from 'element-ui'
import BaiduMap from 'vue-baidu-map'
import {BmlMarkerClusterer} from 'vue-baidu-map'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/styles/reset.styl'
import '@/assets/styles/iconfont.css'
import '@/assets/styles/bootstrap.css'
import '@/assets/js/bootstrap.js'
import 'swiper/dist/css/swiper.css'
import animated from 'animate.css'

Vue.use(ElementUi)
Vue.use(animated)
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false
Vue.prototype.$axios= axios
Vue.use(BaiduMap, {
  ak: 'GBz1c2FKHnEKBl8BBMM0ialgn7xS2gtq'
})
Vue.component('bml-marker-cluster', BmlMarkerClusterer)
new Vue({
	el: '#pre',
	router,
	store,
	template: '<Pre/>',
	components: {Pre}
})