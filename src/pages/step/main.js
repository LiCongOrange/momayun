import Vue from 'vue'
import Step from './Step'
import router from '@/router/index.js'
import store from '@/store/index.js'
import axios from 'axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import ElementUi from 'element-ui'
import '@/assets/styles/reset.styl'
import '@/assets/styles/iconfont.css'
import '@/assets/styles/bootstrap.css'
import '@/assets/js/bootstrap.js'
import 'swiper/dist/css/swiper.css'
import 'babel-polyfill'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUi)
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false
Vue.prototype.$axios= axios

new Vue({
	el: '#step',
	router,
	store,
	template: '<Step/>',
	components: {Step}
})