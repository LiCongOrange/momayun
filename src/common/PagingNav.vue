<template>
	<div class="navigation-back container" v-if="this.$store.state.navigation1">
		<a href="javascript:;" @click="toProductCenter">&lt;返回</a>
		<p>
			<span>{{ this.$store.state.navigation1 }}</span>
			&gt;
			<span>{{ this.$store.state.navigation2 }}</span>
			<span v-if="this.$store.state.navigation3">&gt;  {{ this.$store.state.navigation3 }}</span>
			<span v-if="this.$store.state.navigation4">&gt;  {{ this.$store.state.navigation4 }}</span>
		</p>
	</div>
</template>

<script>
export default {
	methods: {
		toProductCenter() {
			if(!this.$store.state.navigation4) {
				if(!this.$store.state.navigation3) {
					this.$router.push({path: '/productCenter'})
					this.$store.state.navigation3 = ''
				}else if(this.$store.state.navigation3 == '产品升级') {
					this.$store.state.funcType = 'A'
					this.$store.state.navigation3 = ''
				}else if(this.$store.state.navigation2 == '充值中心' && this.$store.state.navigation3 == '支付方式') {
					this.$router.push({path: '/account/moneycenter'})
					this.$store.state.navigation3 = ''
				}else if(this.$store.state.navigation2 == '订单信息' && this.$store.state.navigation3 == '支付方式') {
					this.$router.push({path: '/account'})
					this.$store.state.navigation2 = '订单信息'
					this.$store.state.navigation3 = ''
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
		color: $fontColor
		font-size: 14px
	p
		margin-left: 25px
		float: left
</style>