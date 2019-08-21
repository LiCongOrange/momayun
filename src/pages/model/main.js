import Vue from 'vue'
import Model from './Model'

Vue.config.productionTip = false

new Vue({
	el: '#model',
	template: '<Model/>',
	components: {Model}
})