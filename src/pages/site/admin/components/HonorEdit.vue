<template>
	<div class="honorEdit">
		<div class="title">
			<h4><i class="iconfont">&#xe6f5;</i>编辑</h4>
			<button class="iconfont" @click="closeHonorEdit">&#xe625;</button>
		</div>
		<div class="text">
			<textarea maxlength="25" :value="this.$store.state.honorText"></textarea>
			<p>最多输入25个字</p>
		</div>
		<div class="upImg">
			<div class="upTitle">
				<h5><i class="iconfont">&#xe607;</i>已上传的图片</h5>
				<button>上传图片</button>
			</div>
			<ul>
				<li>
					<div><img :src="'../'+this.$store.state.honorImg"></div>
					<button>删除</button>
				</li>
				<li>
					<div><i class="iconfont">&#xe6e0;</i></div>
				</li>
			</ul>
			<div class="finish">
				<button>保存</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {

		}
	},
	methods: {
		closeHonorEdit() {
			this.$store.state.honorEditToggle = false
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.honorEdit
	position: absolute
	left: 50%
	top: 50%
	width: 50%
	background: #fff
	transform: translate(-50%, -50%)
	padding: 20px
	.title
		&:after
			clear: both
			content: ''
			display: block
		h4
			float: left
			font-size: 18px
			color: $fontColor
			i
				margin-right: 5px
				font-size: 18px
				color: #44892c
		button
			border: none
			background: none
			float: right
			color: $fontColor
			font-size: 22px
	.text
		padding: 15px
		textarea
			width: 100%
			min-height: 150px
			resize: none
			text-indent: 14px
			line-height: 28px
			font-size: 18px
		p
			line-height: 24px
			text-align: right
	.upTitle
		&:after
			clear: both
			content: ''
			display: block
		h5
			float: left
			font-size: 18px
			color: $fontColor
			i
				margin-right: 5px
				font-size: 22px
				color: #0e71cf
				vertical-align: middle
				font-weight: bold
		button
			background: #f89d7e
			float: right
			border: none
			border-radius: 8px
			padding: 0 15px
			float: right
			font-size: 14px
			line-height: 26px
			color: #fff
	ul
		&:after
			clear: both
			content: ''
			display: block
		li
			width: 33%
			float: left
			text-align: center
			div
				min-height: 135px
			button
				border-radius: 10px
				background: none
				border: 1px solid $inputBorder
				padding: 5px 15px
				margin-top: 20px
			&:last-child
				border: 1px dashed $inputBorder
				cursor: pointer
				i
					position: relative
					top: 30px
					color: #ff9a66
					font-size: 50px
	.finish
		padding: 20px 0
		text-align: center
		button
			border: none
			background: $bgColor
			padding: 5px 25px
			border-radius: 15px
			color: #fff
</style>