<template>
	<div class="domain-box">
		<div class="inner">
			<font class="iconfont" @click="domainHandle('0')">&#xe6e9;</font>
			<div class="search">
				<!-- <input type="text" v-model="contenter"> -->
				<el-input
					v-model="contenter"
					clearable
				></el-input>
			</div>
			<ul>
				<li><i class="iconfont">&#xe64b;</i>注意：</li>
				<li>1, 建议更换在本网站购买的域名。</li>
				<li>2, 更换非本网站购买的域名可能会造成网站不能正常使用。</li>
				<li class="iconfont"><span>如有疑问，请联系</span>&#xe686; 400-6062-123</li>
			</ul>
			<div class="btnwrap">
				<el-button type="primary" @click="domainHandle('1')">确认</el-button>
				<!-- <button @click="domainHandle('1')">确认</button> -->
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['content'],
	data() {
		return {
			contenter: this.content
		}
	},
	watch: {
		contenter(val) {
			this.contenter = val.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\.]/g, '')
		}
	},
	methods: {
		domainHandle(type) {
			if(type == '0') {
				this.$emit('domainbackHandle', 'false')
			}else {
				this.$emit('domainbackHandle', this.contenter)
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.domain-box
	position: fixed
	left: 0
	top: 0
	width: 100%
	height: 100%
	background: rgba(0, 0, 0, .85)
	z-index: 1500
	.inner
		position: absolute
		left: 50%
		top: 50%
		transform: translate(-50%, -50%)
		background: #fff
		border-radius: 5px
		padding: 20px
		font
			position: absolute
			right: 10px
			top: 5px
			font-size: 20px
			cursor: pointer
		.search
			margin: 20px 0 10px
			input
				width: 100%
				border: 1px solid #333
				border-radius: 3px
				line-height: 32px
				text-indent: 12px
				&:focus
					border-color: $bgColor
		ul
			li
				padding-left: 24px
				margin-bottom: 5px
				font-size: 14px
				&:first-child
					padding: 0
					color: red
					font-weight: 700
					i
						margin-right: 5px
				span
					margin-right: 5px
					color: $bgColor
				&:last-child
					line-height: 40px
		.btnwrap
			text-align: center
			button
				width: 100%
</style>