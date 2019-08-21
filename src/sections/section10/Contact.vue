<template>
	<div class="contact paddingT2" :class="classBg"  v-bind:style="{backgroundImage: 'url(' + bgImg + ')' }">
		<div class="container">
			<div class="title">
				<h2 v-html="modelInfo.modularName"></h2>
				<p v-html="modelInfo.modularNameFu"></p>
			</div>
			<div class="fromemail" :class="{displayB: displayToggle}">
				<ul class="fromemailLeft">
					<li v-if="modelInfo.userList[0].onoff">
						<input type="text" :placeholder="modelInfo.userList[0].bindName">
					</li>
					<li v-if="modelInfo.userList[1].onoff">
						<input type="text" :placeholder="modelInfo.userList[1].bindName">
					</li>
					<li v-if="modelInfo.userList[2].onoff">
						<input type="text" :placeholder="modelInfo.userList[2].bindName">
					</li>
					<li v-if="modelInfo.userList[3].onoff">
						<textarea :placeholder="modelInfo.userList[3].bindName"></textarea>
					</li>
					<li><button>{{ modelInfo.userList[4].bindName }}</button></li>
				</ul>
				<ul class="fromemailRight">
					<li v-for="(item, index) in modelInfo.classList">
						<i class="iconfont" v-html="item.icon"></i>
						<span>{{ item.val || '请填写' + item.name }}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['pid'],
	data() {
		return {
			bgImg: '',
			displayToggle: false,
			btnChoice: 1,
			classBg: '',
			section: 'contact',
			onoff: true,
			bgColorNum: '',
			zBg: ["bgOne", "bgTwo", "bgThree"]
		}
	},
	methods: {
		getDataBg(data) {
			this.classBg = data
		},
		fromemailFn() {
			if(this.$store.state.threeStep.address != "" || this.$store.state.threeStep.telephone != "" || this.$store.state.threeStep.email != "" || this.$store.state.threeStep.penguin != "" || this.$store.state.threeStep.wechat != "") {
				this.displayToggle = false
			}else {
				this.displayToggle = true
			}
		}
	},
	watch: {
		bgImg(val) {
			for(let i=0; i<this.$store.state.stepPages.contact.length; i++) {
				if(this.$store.state.stepPages.contact[i].lmid == this.pid) {
					this.$store.state.stepPages.contact[i].bgImg = val
				}
			}
		}
	},
	computed: {
		imgclassList() {
			return this.$store.state.allClass.bgColorClass
		},
		zImg() {
			return this.$store.state.stepPages.bannerList
		}
	},
  mounted() {
	for(let i=0; i<this.$store.state.stepPages.contact.length; i++) {
		if(this.$store.state.stepPages.contact[i].lmid == this.pid) {
			this.modelInfo = this.$store.state.stepPages.contact[i]
		}
	}
  	// this.fromemailFn()
    this.$nextTick(function() {
      this.bgImg = this.zImg[parseInt(Math.random()*this.zImg.length)]
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.contact
	padding-bottom: 60px
	background-size: cover!important
	background: #ccc
	min-height: 250px
	position: relative
	transition: all 0.3s
	// background-attachment:fixed
	// background-repeat:no-repeat
	&::before
		content: ''
		width: 100%
		height: 100%
		position: absolute
		left: 0
		top: 0
	.title
		position: relative
		margin-bottom: $marginb
		z-index: 10
		h2
			font-size: $fontsize1
	.fromemail
		position: relative
		margin-top: 15px
		margin: 0 auto
		padding: 10px 0
		z-index: 1
		display: flex
		background: rgba(255, 255, 255, 0.6)
		ul
			flex: 1
			margin: 0
			li
				width: 100%
				margin-top: 20px
				text-align: center
				input, textarea
					width: 80%
					border: none
					height: 50px
					text-indent: 18px
					font-size: 18px
					color: #F2F2F2
					border: 1px solid $inputBorder
					border-radius: 5px
				textarea
					min-height: 150px
					line-height: 34px
				button
					padding: $allbtnpadding
					border-radius: $allbtnradius
					font-size: $allbtnfontsize
					background: $allbtnbg
					border: $allbtnborder2
					color: $allbtnfontcolor2
		.fromemailLeft
			li
				text-align: center
		.fromemailRight
			li
				margin-top: 25px
				text-align: left
				text-indent: 24px
				line-height: 36px
				i
					font-size: 26px
				span
					padding-left: 15px
					font-size: 18px
					line-height: 22px
	.displayB
		display: block
.bgOne
	background: $modelBg02
.bgTwo
	background: $modelBg03
	.title
		h2
			color: $textColor
	.container
		color: $textColor
		.row
			color: #fff
			.text
				color: $textColor
				h3
					color: $textColor
				p
					color: $textColor
.bgThree
	background: $modelBg01		
	.fromemail
		ul
			li
				input
					background: #ccc
				textarea
					background: #ccc
</style>