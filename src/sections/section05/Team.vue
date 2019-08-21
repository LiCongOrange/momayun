<template>
	<div class="team paddingT2" :class="modelInfo.bgClass">
		<div class="container">
			<div class="title">
				<h3 v-html="modelInfo.modularName"></h3>
				<h6 v-html="modelInfo.modularNameLetter"></h6>
				<p v-html="modelInfo.content"></p>
			</div>
			<div class="shouImg">
				<img :src="modelInfo.picurl">
			</div>
			<div class="introduce">
				<p v-for="item in modelInfo.textList" v-html="item.text"></p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['pid'],
	data() {
		return {
			classLayout: 'layout1',
			modelInfo: '',
			btnChoice: 1,
			onoff: true,
			classBg: '',
			zLayout: [{
				"letter": "A",
				"name": "layout1"
			}, {
				"letter": "B",
				"name": "layout2"
			}, {
				"letter": "C",
				"name": "layout3"
			}]
		}
	},
	watch: {
		classBg(val) {
			for(let i=0; i<this.$store.state.stepPages.single.length; i++) {
				if(this.$store.state.stepPages.single[i].lmid == this.pid) {
					this.$store.state.stepPages.single[i].bgClass = val
				}
			}
		}
	},
	computed: {
		bgclassList() {
			return this.$store.state.allClass.bgclassList
		}
	},
  mounted() {
    this.$nextTick(function() {
      this.classBg = this.bgclassList[parseInt(Math.random()*this.bgclassList.length)]
      for(let i=0; i<this.$store.state.stepPages.single.length; i++) {
      	if(this.$store.state.stepPages.single[i].lmid == this.pid) {
      		this.modelInfo = this.$store.state.stepPages.single[i]
      	}
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.team
	overflow: hidden
	position: relative
	transition: all 0.3s
	.title
		h3
			margin-bottom: $marginb
			font-size: $fontsize8
			color: $fontColor
		h6
			margin-bottom: $marginb
			font-size: $fontsize9
			color: $gridColor
		p
			margin-bottom: $marginb
			font-size: $fontsize10
			display: inline-block
			width: 100%
	.container
		width: 60%
		margin: 0 auto
		padding: 20px 0
		.shouImg
			img
				width: 100%
		.introduce
			width: 80%
			margin: 0 auto
			padding-top: 30px
			>>> .ql-editor
				padding: 0
	.container2
		width: auto
		ul
			text-align: center
			li
				display: inline-block
				float: none
				overflow: hidden
				img
					width: 100%
				&:after
					display: block
					clear: both
					content: ''
				.textWrap
					min-height: 100px
			.layout1
				width: 50%
				padding: 20px
			.layout2
				width: 33.333%
				padding: 10px
			.layout3
				width: 25%
.bgOne
	background: $modelBg02
.bgTwo
	background: $modelBg03
	.title
		h3
			color: #fff
			&::before
				background: #fff
			&::after
				background: #fff
		p
			color: #fff
	.container
		p
			color: #fff
	.imgList
		li
			background: #fff
			border-radius: 5px
			margin: 0 2px
.bgThree
	background: $modelBg01
	h3
		color: #000
.imgOne
	background: url('../../assets/images/team/hides/hide01.png')	no-repeat
	background-size: cover	
.imgTwo
	background: url('../../assets/images/team/hides/hide02.png')	no-repeat
	background-size: cover	
.imgThree
	background: url('../../assets/images/team/hides/hide03.png')	no-repeat
	background-size: cover
	.title
		h3
			color: #fff
			&::before
				background: #fff
			&::after
				background: #fff
		p
			color: #fff
	.container
		p
			color: #fff
	.imgList
		li
			background: #fff
			border-radius: 5px
			margin: 0 2px
</style>