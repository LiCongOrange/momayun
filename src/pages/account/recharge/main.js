import Vue from 'vue'
import Recharge from './Recharge'
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
	el: '#recharge',
	router,
	store,
	template: '<Recharge/>',
	components: {Recharge}
})