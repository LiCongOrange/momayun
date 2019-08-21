import Vue from 'vue'
import Usercenter from './UserCenter'
import router from '@/router/index.js'
import store from '@/store/index.js'
import axios from 'axios'
import '@/assets/styles/reset.styl'
import '@/assets/styles/iconfont.css'
import '@/assets/styles/bootstrap.css'
import '@/assets/js/bootstrap.js'
import 'babel-polyfill'

Vue.config.productionTip = false
Vue.prototype.$axios= axios

new Vue({
	el: '#usercenter',
	router,
	store,
	template: '<Usercenter/>',
	components: {Usercenter}
})