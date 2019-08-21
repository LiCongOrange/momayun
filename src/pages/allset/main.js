import Vue from 'vue'
import Allset from './Allset'
import router from '@/router/index.js'
import store from '@/store/index.js'
import axios from 'axios'
import ElementUi from 'element-ui'
import BaiduMap from 'vue-baidu-map'
import {BmlMarkerClusterer} from 'vue-baidu-map'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/styles/reset.styl'
import '@/assets/styles/iconfont.css'
import '@/assets/styles/bootstrap.css'
import '@/assets/js/bootstrap.js'
import 'babel-polyfill'

Vue.use(ElementUi)
Vue.config.productionTip = false
Vue.prototype.$axios= axios
Vue.use(BaiduMap, {
  ak: 'GBz1c2FKHnEKBl8BBMM0ialgn7xS2gtq'
})
Vue.component('bml-marker-cluster', BmlMarkerClusterer)

new Vue({
	el: '#allset',
	router,
	store,
	template: '<Allset/>',
	components: {Allset}
})