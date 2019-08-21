<template>
	<div class="header">
		<div class="logo">
			<div class="text-wrap">
				<h5 v-html="modelInfo.wsname || modelInfo.default"></h5>
			</div>
		</div>
		<div class="nav">
			<ul>
				<li v-for='item of this.$store.state.threeStep.columnList' v-if="item.onOff">
					<a v-if="item.type !== 'header' && item.type != 'details' && item.type != 'footer'" >{{item.name}}</a>
				</li>
			</ul>
		</div>
		<div class="footbg">
			<img src="/static/images/head/155.png">
		</div>
	</div>
</template>

<script>
export default {
	props: ['pid'],
	data() {
		return {
			modelInfo: ''
		}
	},
	mounted() {
		for(let i=0; i<this.$store.state.stepPages.head.length; i++) {
			if(this.$store.state.stepPages.head[i].lmid == this.pid) {
				this.modelInfo = this.$store.state.stepPages.head[i]
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
	.header
		width: 100%
		height: auto
		z-index:2
		border-bottom: 1px solid #ccc
		position: relative
		padding-bottom: 14px
		.logo
			width: 500px
			min-height: 70px
			margin: 0 auto
			padding-top: 15px
			font-size: 40px
			text-align: center
			color:#333
			.text-wrap
				h5
					font-size: 40px
					color: #333
		.nav
			width: 1200px
			min-height: 30px
			text-align: center
			margin:0 auto
			li
				display: inline-block
				margin:0 10px
				line-height:40px
				a
					color: #333
					font-size: 16px
					text-decoration: none
		.footbg
			width: 70px
			height: 50px
			position: absolute
			left: 50%
			bottom: 0
			background: url('/static/images/head/headbg.png') no-repeat
			background-position: left bottom
			transform: translate(-50%, 60%)
			text-align: center
			img
				width: 50%
</style>