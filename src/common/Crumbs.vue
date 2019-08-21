<template>
	<div class="navigation-back container" v-if="userType != 5 && userType != 6">
		<!-- <a href="javascript:;" @click="toProductCenter">&lt;返回</a> -->
		<el-button type="info" icon="el-icon-arrow-left" @click="handleBack">返回</el-button>
		<!-- <p v-if="userType != '5'">
			<span>{{ this.$store.state.navigation1 }}</span>
			&gt;
			<span>{{ this.$store.state.navigation2 }}</span>
			<span v-if="this.$store.state.navigation3">&gt;  {{ this.$store.state.navigation3 }}</span>
			<span v-if="this.$store.state.navigation4">&gt;  {{ this.$store.state.navigation4 }}</span>
		</p> -->
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	computed: {
		...mapState({
			userType: state => state.userType
		})
	},
	methods: {
		handleBack() {
			window.location.href = '/index/index/center?site=' + 'cen'
		},
		toProductCenter() {
			if(!this.$store.state.navigation4) {
				if(!this.$store.state.navigation3 && this.$store.state.navigation2 != '智能建站') {
					// window.location.href = '/index/index/center'
					window.location.href = '/index/index/center?site=' + 'user'
					this.$store.state.navigation3 = ''
				}else if(!this.$store.state.navigation3 && this.$store.state.navigation2 == '智能建站') {
					window.location.href = '/index/index/center?site=' + 'cen'
				}else if(this.$store.state.navigation2 == '充值中心' && this.$store.state.navigation3 == '支付方式') {
					window.location.href = '/index/index/recharge'
					// this.$router.push({path: '/account/moneycenter'})
					// this.$store.state.navigation3 = ''
				}else if(this.$store.state.navigation2 == '订单信息' && this.$store.state.navigation3 == '支付方式') {
					// this.$router.push({path: '/account'})
					// this.$store.state.navigation2 = '订单信息'
					// this.$store.state.navigation3 = ''
				}else if(this.$store.state.navigation2 == '智能建站' && this.$store.state.navigation3 == '新建站点') {
					window.location.href = '/index/index/site'
					// this.$store.state.navigation2 = '智能建站'
					// this.$store.state.navigation3 = ''
				}else if(this.$store.state.navigation2 == '智能建站' && this.$store.state.navigation3 == '新建模板') {
					window.location.href = '/index/index/site'
					// this.$store.state.navigation2 = '智能建站'
					// this.$store.state.navigation3 = ''
				}else if(this.$store.state.navigation2 == '我的工单' && this.$store.state.navigation3 == '工单详情') {
					this.$store.commit('detailToggleHandel', true)
				}else if(this.$store.state.navigation2 == '智能建站' && this.$store.state.navigation3 == '管理账户') {
					window.location.href = '/index/index/site'
				}
			}else if(this.$store.state.navigation4 == '基础版' || this.$store.state.navigation4 == '专业版' || this.$store.state.navigation4 == '企业版') {
				this.$store.state.funcType = 'E'
				this.$store.state.navigation4 = ''
			}
		},
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.navigation-back
	margin-top: 20px
	line-height: 28px
	a
		float: left
		border: 1px solid #ccc
		border-radius: 3px
		background: #f6f6f6
		padding: 8px 21px
		color: #666
		font-size: 17px
		text-decoration: none
		transition: all .3s
		&:hover
			background: #dbd7d7
	p
		margin-left: 25px
		margin-bottom: 2px
		float: left
</style>