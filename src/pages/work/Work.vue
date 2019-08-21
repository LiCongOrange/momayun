<template>
	<div class="wordWrap">
		<index-header></index-header>
		<crumbs></crumbs>
		<div class="contenter">
			<!-- <router-view></router-view> -->
			<component :is="this.section[0]"></component>
		</div>
	</div>
</template>

<script>
import IndexHeader from '@/common/Header'
import crumbs from '@/common/Crumbs'
import release from './components/Release'
import workDetail from './components/Workdetail'
import myWork from './mywork/Mywork'
export default {
	data() {
		return {
			section: ['site1', 'site2', 'site3']
		}
	},
	methods: {
		getWroknum() {
			var urlSearch = window.location.search
      		var siteArr = urlSearch.split("?")
      		var siteId = siteArr[1]
      		if(siteArr.length > 1){
      			this.$store.state.workNum = siteId
      		}else{
      			this.$store.state.workNum = 0
      		}
      		
		}
	},
	components: {
		crumbs,
		IndexHeader,
		'site1': release,
		'site2': myWork,
		'site3': workDetail
	},
	mounted() {
		// this.$axios({
		// 	method: 'get',
		// 	url: '/home/passport/islogin'
		// }).then((res)=> {
		// 	if(res.data.code == '404') {
		// 		alert('未登录用户，请先登录')
  //       		window.location.href = '/index/index/login'
		// 	}
		// })
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.wordWrap
	width: 100%
	height: 100%
	background: $bgColor1
</style>