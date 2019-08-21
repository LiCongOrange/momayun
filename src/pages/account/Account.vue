<template>
	<div class="accountWrap">
		<index-header></index-header>
		<crumbs></crumbs>
		<component :is="section[this.$store.state.accountType]"></component>
		<!-- <router-view></router-view> -->
	</div>

</template>

<script>
import { mapState } from 'vuex'
import IndexHeader from '@/common/Header'
import crumbs from '@/common/Crumbs'
import order from './components/Order'
import moneyCenter from './components/MoneyCenter'
export default {
	data() {
		return {
			section: ['site1', 'site2']
		}
	},
	computed: {
		...mapState({
			userType: state => state.userType
		})
	},
	components: {
		crumbs,
		IndexHeader,
		'site1': order,
		'site2': moneyCenter
	},
	mounted() {
		if(this.userType == '5' || this.userType == '6') {
			window.location.href = '/index/index/site'
		}
		// this.$axios({
		// 	method: 'get',
		// 	url: '/home/passport/islogin'
		// }).then((res)=> {
		// 	if(res.data.code == '404') {
		// 		alert('未登录用户，请先登录')
		// 		window.location.href = '/index/index/dllogin'
		// 	}
		// })
	}
}
</script>

<style lang="stylus" scoped>
.accountWrap
	position: absolute
	width: 100%
	height: 100%
	background: #fff
</style>