import Vue from 'vue'
import DlLogin from './DlLogin'
import router from '@/router/index.js'
import store from '@/store/index.js'
import axios from 'axios'
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
	el: '#dllogin',
	router,
	store,
	template: '<DlLogin/>',
	components: {DlLogin}
})