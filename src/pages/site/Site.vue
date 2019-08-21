<template>
	<div class="siteWrap">
		<index-header></index-header>
		<crumbs v-if="userType !='5'"></crumbs>
		<site-admin></site-admin>
		<!-- <component :is="section[this.$store.state.newsiteNum]"></component> -->
		<!-- <router-view></router-view> -->
	</div>
</template>

<script>
import { mapState } from 'vuex'
import IndexHeader from '@/common/Header'
import crumbs from '@/common/Crumbs'
import siteAdmin from './components/SiteAdmin'
export default {
	components: {
		crumbs,
		siteAdmin,
		IndexHeader
	},
	mounted() {
		// this.$axios({
		// 	method: 'get',
		// 	url: '/home/passport/islogin'
		// }).then((res)=> {
		// 	if(res.data.code == '404') {
		// 		alert('未登录用户，请先登录')
		// 		window.location.href = '/index/index/dllogin'
		// 	}
		// })
	},
	computed: {
		...mapState({
			userType: state => state.userType
		})
	}
}
</script>