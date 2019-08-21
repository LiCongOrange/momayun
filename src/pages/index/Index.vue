<template>
	<div class="homePage" id="homePage">
		<!-- <index-header v-if="this.headToggle"></index-header> -->
		<keep-alive>
			<router-view v-if="this.$store.state.toLoginType"></router-view>
			<wrap-section v-else></wrap-section>
		</keep-alive>
	</div>
</template>

<script>
import IndexHeader from '@/common/Header'
import IndexLogin from '@/pages/login/Login'
export default {
	name: 'homePage',
	components: {
		IndexHeader,
		IndexLogin
	},
	data() {
		return {
			headToggle: true,
			navList: []
		}
	},
	methods: {
			// getDomain() {
			// 	this.$axios.get('/api/showsite')
			// 		.then(this.getDomainSucc)
			// 		.catch(this.getDomainErrors)
			// },
			// getDomainSucc(res) {
			// 	if(res.data.code == '200') {
			// 		this.headToggle = false
			// 		this.$store.state.toLoginType = ''
			// 	}
			// },
			// getDomainErrors(res) {
			// 		this.headToggle = true
			// 		this.$store.state.toLoginType = 'A'
			// }
	}
}
</script>

<style lang="stylus" scoped>
.homePage
	// overflow: hidden	
	// position: fixed
	// height: 100%
	// background: #f1f1f1
	width: 100%
</style>