import Vue from 'vue'
import Login from './Login'
import router from '@/router/index.js'
import store from '@/store/index.js'
import axios from 'axios'
import '@/assets/styles/reset.styl'
import '@/assets/styles/iconfont.css'
import '@/assets/styles/bootstrap.css'
import '@/assets/js/bootstrap.js'

Vue.config.productionTip = false
Vue.prototype.$axios= axios

new Vue({
	el: '#login',
	router,
	store,
	template: '<Login/>',
	components: {Login}
})