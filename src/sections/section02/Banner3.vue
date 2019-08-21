<template>
	<div class="banner" v-bind:style="{backgroundImage: 'url(' + modelInfo.bgImg + ')'}">
		<!-- <div class="bannerNei">
			<div class="title" v-html="modelInfo.title"></div>
			<div class="btnList"><button>按钮</button></div>
		</div> -->
		<div class="bottom_jiao">
			<div class="jiao1"></div>
			<div class="jiao2"></div>
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
	methods: {
		getDataBg(data) {
			this.classBg = data
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
		filter: blur(2px)	
		background-size: cover
	.bottom_jiao
		position:absolute
		bottom:0
		height:25px
		width:100%
		left:0
		z-index:100
		.jiao1
			position:absolute
			width:50%
			height:0
			border-sizing:border-box
			border-width:25px 25px 25px
			border-style:none solid solid
			border-color:white white white
			border-image:initial
			border-top:none
			left:0
			border-right-color:transparent !important
		.jiao2
			position:absolute
			width:50%
			height:0
			border-sizing:border-box
			border-width:25px 25px 25px
			border-style:none solid solid  
			border-color:white white white
			border-image:initial
			border-top:none
			right:0
			border-left-color:transparent !important
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