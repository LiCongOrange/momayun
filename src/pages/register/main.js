import Vue from 'vue'
import Register from './Register'
import router from '@/router/index.js'
import store from '@/store/index.js'
import axios from 'axios'
import navBus from '@/assets/js/navBus.js'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/styles/reset.styl'
import '@/assets/styles/iconfont.css'
import '@/assets/styles/bootstrap.css'
import '@/assets/js/bootstrap.js'
import 'babel-polyfill'

Vue.use(ElementUi)
Vue.config.productionTip = false
Vue.prototype.$axios= axios

new Vue({
	el: '#register',
	router,
	store,
	template: '<Register/>',
	components: {Register}
})