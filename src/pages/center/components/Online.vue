<template>
	<div class="online-box container">
		<div class="backbtn">
			<crumbs></crumbs>
			<!-- <button @click="backhandle">返回</button> -->
		</div>
		<h2>在线技术支持</h2>
		<release></release>
		<div class="wechart">
			<div class="inner" @mouseenter="hoverHandle('0')" @mouseleave="hoverHandle('1')">
				<i class="iconfont">&#xe63c;</i>
				<p><span>微</span><span>信</span><span>咨</span><span>询</span></p>
			</div>
			<div class="we-mask" :class="{ active: isActive }">
				<div class="jiao"></div>
				<img src="/static/images/indexImg/class-code.jpg">
			</div>
		</div>
	</div>
</template>

<script>
import release from '@/pages/work/components/Release'
import crumbs from '@/common/Crumbs'
export default {
	components: {
		release,
		crumbs
	},
	data() {
		return {
			isActive: false
		}
	},
	methods: {
		hoverHandle(type) {
			if(type == '0') {
				this.isActive = true
			}else {
				this.isActive = false
			}
		},
			backhandle() {
				this.$store.commit('userToggleHandel', 'A')
			}

	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.online-box
	.wechart
		position: fixed
		right: 0
		bottom: 105px
		background: $bgColor
		padding: 10px
		color: #fff
		cursor: pointer
		display: none
		i
			font-size: 24px
		p
			display: flex
			flex-direction: column
			text-align: center
		.we-mask
			position: absolute
			left: -250px
			bottom: 30px
			width: 200px
			border: 1px solid #ccc
			border-radius: 3px
			opacity: 0
			transition: all .3s
			img
				width: 100%
			div
				position: absolute
				right: -12px
				bottom: 12px
				width: 12px
				height: 12px
				background: url('/static/images/indexImg/code-jiao.png')
		.active
			opacity: 1
			left: -220px
	>>> .release
		position: inherit
		transform: translate(0, 0)
		margin-bottom: 15px
		.title
			display: none
		ul
			padding: 20px
			li
				&:last-child
					.typelist
						text-align: center
				button
					display: inline-block
				.typelist
					input, textarea
						width: 98%
	h2
		text-align: center
		font-size: 22px
	.backbtn
		margin-top: 25px
		button
			background: #f6f6f6
			padding: 8px 21px
			border: 1px solid #ccc
			color: #666
			font-size: 17px
			&:hover
				background: #dbd7d7
	>>> .release
		.title
			i
				display: none
</style>