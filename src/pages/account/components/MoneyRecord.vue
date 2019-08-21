<template>
	<div class="monerBox">
		<div class="box-title"><h1>充值记录</h1><i class="iconfont" @click="closeHandle">&#xe625;</i></div>
		<div class="box-content">
			<div class="title">本月</div>
			<ul>
				<li>
					<div class="img">
						<i class="iconfont">&#xe649;</i>
					</div>
					<div class="text">
						<h3>电脑充值</h3>
						<h6>[网上物流]</h6>
						<p>06-11  &nbsp&nbsp  11:00</p>
					</div>
					<div class="right">
						<h3>288元</h3>
						<p>交易关闭</p>
					</div>
				</li>
			</ul>
			<div class="title">五月</div>
			<ul>
				<li>
					<div class="img">
						<i class="iconfont">&#xe649;</i>
					</div>
					<div class="text">
						<h3>电脑充值</h3>
						<h6>[网上物流]</h6>
						<p>06-11  &nbsp&nbsp  11:00</p>
					</div>
					<div class="right">
						<h3>288元</h3>
						<p>交易关闭</p>
					</div>
				</li>
				<li>
					<div class="img">
						<i class="iconfont">&#xe649;</i>
					</div>
					<div class="text">
						<h3>电脑充值</h3>
						<h6>[网上物流]</h6>
						<p>06-11  &nbsp&nbsp  11:00</p>
					</div>
					<div class="right">
						<h3>288元</h3>
						<p>交易关闭</p>
					</div>
				</li>
			</ul>
		</div>
		<pages
			:total="total"
			:current-page="current"
			@pagechange='pagechange'
		></pages>
	</div>
</template>

<script>
import pages from '@/common/Pages'
export default {
	data() {
		return {
			total: 50,   //记录总条数
			display: 10,  //每页显示条数
			current: 1,   //当前的页数
		}
	},
	components: {
		pages
	},
	methods: {
		pagechange() {

		},
		closeHandle() {
			this.$store.state.moneyRecordToggle = false
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.monerBox
	position: relative
	height: 100%
	>>> nav
		position:absolute
		bottom: 10px
		margin-top: 50px
		width: 100%
	.box-title
		position: relative
		text-align: center
		i
			position: absolute
			right: 20px
			top: 0px
			font-size: 22px
			cursor: pointer
	.box-content
		overflow: auto
		.title
			background: #f2f2f2
			padding: 0 20px
			line-height: 66px	
			font-size: 22px
		ul
			padding: 0 50px
			margin: 0
			li
				padding: 20px 0 5px
				overflow: hidden
				border-bottom: 1px solid #f2f2f2
				.img
					float: left
					background: $bgColor
					border-radius: 50%
					padding: 5px 15px
					i
						font-size: 44px
						color: #fff
				.text
					float: left
					padding-left: 30px
					margin-top: 10px
					h3
						margin: 0
						font-size: 18px
						line-height: 28px
					h6
						margin: 0
						font-size: 14px
						line-height: 20px
					p
						font-size: 14px
						color: #5d5d5d
						line-height: 24px
				.right
					float: right
					h3
						font-size: 24px
					p
						font-size: 14px
</style>