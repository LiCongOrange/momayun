<template>
	<div class="contact" :class="classBg">
		<fn-assembly
			:btnChoice="btnChoice"
			:zBg="zBg"
			:zImg="zImg"
			@getDataBg="getDataBg"
			v-if="this.$store.state.allEditToggle"
		></fn-assembly>
		<div class="top_bg">
			<div class="fromemail">
				<div class="title" v-if="this.$store.state.allEditToggle">
				<h2><fn-editor :content="modularName"></fn-editor></h2>
				</div>
				<div class="title" v-else>
					<h2>{{this.modularName}}</h2>
				</div>
				<ul class="fromemailLeft">
					<li><input type="text" placeholder="姓名"></li>
					<li><input type="email" placeholder="邮箱"></li>
					<li><a href="" class="btn">提交</a></li>
				</ul>
			</div>
		</div>
		<div class="bot-bg"></div>
	</div>
</template>

<script>
import navBus from '@/pages/navBus'
import FnAssembly from '@/pages/function/Assembly'
import FnEditor from '@/pages/function/Editor'
export default {
	name: 'contact',
	data () {
		return {
			btnChoice: 1,
			modularName: '联系我们',
			modularNameLetter:'加入我们的会员，可以获得更多会员专享',
			section: '',
			classBg: '',
			zBg: '',
			zImg: ''
		}
	},
	components: {
		FnAssembly,
		FnEditor
	},
	methods: {
		getDataBg(data) {
			console.log(data)
			this.classBg = data
		},
		bgTab: function(value) {
			if(value === 0) {
				this.bgColor.isGray = false
				this.bgColor.isBlack = false
				this.bgColor.isWhite = true
			}else if(value === 1){
				this.bgColor.isGray = true
				this.bgColor.isBlack = false
				this.bgColor.isWhite = false
			}else if(value ===2) {
				this.bgColor.isGray = false
				this.bgColor.isBlack = true
				this.bgColor.isWhite = false
			}
		},
	},
	watch: {
		classBg(val) {
			this.$store.state.storage.contact.imgClass = val
		}
	},
	mounted() {
		this.getContactInfo()
		this.classBg = this.$store.state.storage.contact.imgClass
	},
	updated() {
		navBus.$emit('getContactInfoSuccses',[this.modularName, this.section])
	}
}
</script>
<style lang="stylus" scoped>
@import '~styles/public.styl'
.contact
	margin-top:50px
	background-size: contain;
	background-size:100%
	min-height: 250px
	padding: 50px 0
	position: relative
	transition: all 0.3s
	padding-bottom:0
	.top_bg
		width:100%;
		background: url("/static/images/bg2.png")
		.fromemail
			width: 32%
			background: rgba(255, 255, 255, 0.6)
			padding: 10px
			position: relative
			margin: 0 auto
			top:150px
			z-index: 10
			// display: flex
			.title
				text-align: center
				z-index: 10
				display:block
				display: flex
				width:100%
				h2
					font-weight: bold
					color:white
					text-align: center
					display:block
					margin:0 auto
					>>> .ql-editor
						padding: 0
						text-align: center
						font-size: $productTitleSize 
						
				p
					color:white
					text-align: center
					>>> .ql-editor
						padding: 0
						text-align: center
						font-size: $productTitleSize2
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
						text-indent: 16px
						font-size: 18px
						color: #666
					.btn
						display:block
						width:100px
						height:40px
						line-height:30px
						color:white
						background:#318642
						margin:0 auto
						font-size:18px
			.fromemailLeft
				li
					text-align: center
			.fromemailRight
				li
					margin-top: 15px
					text-align: left
					text-indent: 24px
					i
						font-size: 22px
					span
						padding-left: 15px
						font-size: 16px
						line-height: 22px
	.bot-bg
		width:100%
		min-height:450px
		background:url("/static/images/bg1.png") 0 0 no-repeat
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