<template>
	<div class="banner" v-bind:style="{backgroundImage: 'url(' + classBg + ')' }">
		<div class="wrapper">
			<h3 v-html="modelInfo.title"></h3>
			<h3 v-html="modelInfo.titleFn"></h3>
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
			classBgNum: ''
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
	position: relative
	min-height: 600px
	background-size: cover
	background-position: 0 0
	background-repeat: no-repeat
	display: flex
	align-items: center
	justify-content: center
	&:before
		content: ''
		display: block
		position: absolute
		left: 0
		top: 0
		right: 0
		bottom: 0
		background: rgba(0, 0, 0, 0.5)
	.wrapper
		// height: 100%
		// min-height: 350px
		// padding-top: 120px
		transition: all 0.3s
		position: relative
		z-index: 1
		h3
			// margin-top: 40px
			font-size: $fontsize6
			color: #fff
			margin: 0
			line-height: 1.42
		li
			margin: 0 20px
			line-height: 50px
			color: $textColor
			font-size: 30px
			text-align: center
			>>> .ql-editor
				padding: 0
				text-align: center
				line-height: 50px
				font-size: 30px
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