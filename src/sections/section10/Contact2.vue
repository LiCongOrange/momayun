<template>
	<div class="contact paddingT2" :class="classBg" v-bind:style="{backgroundImage: 'url(' + bgImg + ')' }">
		<div class="title">
			<h2 v-html="modelInfo.modularName"></h2>
			<p v-html="modelInfo.modularNameFu"></p>
		</div>
		<div class="fromemail" :class="{ displayB: displayToggle }">
			<ul class="fromemailLeft">
				<!-- <li><input type="text" placeholder="名字"></li>
				<li><input type="email" placeholder="邮箱"></li>
				<li><textarea placeholder="留言"></textarea></li>
				<li><button class="btn btn-default">提交</button></li> -->
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
</template>

<script>
export default {
	props: ['pid'],
	data () {
		return {
			modelInfo: '',
			bgImg: '',
			displayToggle: false,
			btnChoice: 1,
			onoff: true,
			classBg: '',
			zBg: ["bgOne", "bgTwo", "bgThree"]
		}
	},
	methods: {
		fromemailFn() {
			if(this.$store.state.threeStep.address != "" || this.$store.state.threeStep.telephone != "" || this.$store.state.threeStep.email != "" || this.$store.state.threeStep.penguin != "" || this.$store.state.threeStep.wechat != "") {
				this.displayToggle = false
			}else {
				this.displayToggle = true
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
  },  
	watch: {
		bgImg(val) {
			for(let i=0; i<this.$store.state.stepPages.contact.length; i++) {
				if(this.$store.state.stepPages.contact[i].lmid == this.pid) {
					this.$store.state.stepPages.contact[i].bgImg = val
				}
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public.styl'
.contact
	background-size:cover!important
	min-height: 250px
	padding: 50px 0
	position: relative
	transition: all 0.3s
	.title
		position: relative
		margin-bottom: $marginb
		z-index: 10
		h2
			font-size: $fontsize1
		p
			font-size: $fontsize2
			color: $gridColor
	.fromemail
		width: 80%
		padding: 10px
		position: relative
		margin-top: 15px
		margin: 0 auto
		z-index: 10
		display: flex
		ul
			flex: 1
			margin: 0
			li
				width: 100%
				margin-bottom: 20px
				text-align: center
				input, textarea
					width: 80%
					border: none
					height: 50px
					text-indent: 18px
					font-size: 18px
					color: #F2F2F2
					// border: 1px solid $inputBorder
					border-radius: 5px
				textarea
					min-height: 150px
					line-height: 34px
				button
					background: $allbtnbg
					border: $allbtnborder
					color: $allbtnfontcolor
					padding: $allbtnpadding
					border-radius: $allbtnradius
					font-size: $allbtnfontweight
					font-weight: $allbtnfontweight
		.fromemailLeft
			li
				text-align: center
				&:last-child
					margin-bottom: 0
		.fromemailRight
			background: rgba(255, 255, 255, 0.6)
			max-height: 360px
			li
				margin-top: 18px
				text-align: left
				text-indent: 24px
				line-height: 32px
				display: flex
				align-items: center
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
.imgOne
	background: url('../../assets/images/contact/hides/hide01.png')	no-repeat
	background-size: cover	
.imgTwo
	background: url('../../assets/images/contact/hides/hide02.png')	no-repeat
	background-size: cover	
.imgThree
	background: url('../../assets/images/contact/hides/hide03.png')	no-repeat
	background-size: cover	
	.container
		color: $textColor
		ul
			li
				h3
					color: $textColor
				p
					color: $textColor						
</style>