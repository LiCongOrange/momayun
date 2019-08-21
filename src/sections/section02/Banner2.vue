<template>
	<div class="banner" v-bind:style="{backgroundImage: 'url(' + classBg + ')'}">
		<div class="bannerNei">
			<div class="title" v-html="modelInfo.title"></div>
			<div class="btnList"><button>按钮</button></div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['pid'],
	data() {
		return {
			classBg: '',
			modelInfo: '',
			zBg: ["bgOne", "bgTwo", "bgThree"],
			classBgNum: 0
		}
	},
	computed: {
		zImg() {
			return this.$store.state.stepPages.beijingList
		}
	},
	watch: {
		classBg(val) {
			this.modelInfo.bgImg = val
			this.modelInfo.bid = this.zImg[this.classBgNum].imgid
		}
	},
	mounted() {
		this.$nextTick(function() {
			for(let i=0; i<this.$store.state.stepPages.banner.length; i++) {
				if(this.$store.state.stepPages.banner[i].lmid == this.pid) {
					this.modelInfo = this.$store.state.stepPages.banner[i]
				}
			}
		})
	},
	updated() {
		this.classBgNum = parseInt(Math.random()*this.zImg.length)
		this.classBg = this.zImg[this.classBgNum].picurl
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.banner
	min-height: 600px
	width: 100%
	background-size: 100% 100%
	position: relative
	transition: all 0.3s
	.bgThree
		.title
			color: #fff
	&:before
		position: absolute
		top: 0
		bottom: 0
		left: 0
		right: 0
		content: ''
		display: block
		background: rgba(0, 0, 0, 0.5)
	.bannerNei
		position: absolute
		left: 0
		right: 0
		top: 0
		bottom: 0
		padding-top: 100px
		transition: all 0.3s
		.layout-btn
			top: 55px
		.title
			margin: 0 20px
			color: #fff
			font-size: $fontsize6
			line-height: 40px
			margin-top:100px
			>>> .ql-editor
				margin: 0 20px
				text-align: center
				font-size: 30px
				color: #fff
		.btnList
			text-align: center
			button
				background: $allbtnbg
				border: $allbtnborder
				border-radius: $allbtnradius
				margin-top: 55px
				padding: $allbtnpadding
				font-size: $allbtnfontsize
				font-weight: $allbtnfontweight
				color: $allbtnfontcolor
.bgOne
	background: $modelBg02
	li
		color: $fontColor
		>>> .ql-editor
			color: $fontColor
.bgTwo
	background: $modelBg03
	.wrapper
		li
			color: #fff
			>>> .ql-editor
				color: #fff
.bgThree
	background: $modelBg01
	li
		color: #000
		>>> .ql-editor
			color: #000
.imgOne
	background: url('../../assets/images/banner/hides/hide01.png')	no-repeat
	background-size: cover	
	.wrapper
		li
			color: #fff
			>>> .ql-editor
				color: #fff
.imgTwo
	background: url('../../assets/images/banner/hides/hide02.png')	no-repeat
	background-size: cover
	.wrapper
		li
			color: #fff
			>>> .ql-editor
				color: #fff	
.imgThree
	background: url('../../assets/images/banner/hides/hide03.png')	no-repeat
	background-size: cover	
	.wrapper
		li
			color: #fff
			>>> .ql-editor
				color: #fff	
</style>