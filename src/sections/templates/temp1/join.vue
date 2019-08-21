<template>
	<div class="contact" :class="classBg">
		<fn-assembly
			:btnChoice="btnChoice"
			:zBg="zBg"
			:zImg="zImg"
			@getDataBg="getDataBg"
			v-if="this.$store.state.allEditToggle"
		></fn-assembly>
		<div class="title" v-if="this.$store.state.allEditToggle">
			<h2><fn-editor :content="modularName"></fn-editor></h2>
			<p><fn-editor :content="modularNameLetter"></fn-editor></p>
		</div>
		<div class="title" v-else>
			<h2>{{this.modularName}}</h2>
			<p>{{ this.modularNameLetter }}</p>
		</div>
		<div class="fromemail">
			<ul class="fromemailLeft">
				<li><input type="text" placeholder="姓名"></li>
				<li><input type="email" placeholder="手机号"></li>
				<li><a href="" class="btn">提交</a></li>
			</ul>
		</div>
	</div>
</template>

<script>
import navBus from '@/pages/navBus'
import FnAssembly from '@/pages/function/Assembly'
import FnEditor from '@/pages/function/Editor'
export default {
	name: 'join',
	data () {
		return {
			btnChoice: 1,
			modularName: '加入会员',
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
	background: url("/static/images/contbg.jpg")
	background-size: contain;
	background-size:100%
	min-height: 250px
	padding: 50px 0
	position: relative
	transition: all 0.3s
	.title
		position: relative
		text-align: center
		z-index: 10
		h2
			font-weight: bold
			color:white
			>>> .ql-editor
				padding: 0
				text-align: center
				font-size: $productTitleSize 
				
		p
			color:white
			>>> .ql-editor
				padding: 0
				text-align: center
				font-size: $productTitleSize2
	.fromemail
		width: 32%
		
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
				margin-top: 20px
				text-align: center
				input, textarea
					width: 80%
					border: none
					height: 50px
					text-indent: 16px
					font-size: 18px
					color: black
					background: rgba(255, 255, 255, 0.6)
					border-radius:10px
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
.imgOne
	background: url('https://nzr2ybsda.qnssl.com/images/46/FnY3NSgWxpp6JXUikM1tVbi3hI9Z.jpg?imageMogr2/strip/thumbnail/2000x1500%3E/quality/90!/interlace/1/format/jpg')	no-repeat
	background-size: cover	
.imgTwo
	background: url('https://nzr2ybsda.qnssl.com/images/46/FulrHJXo0o_bbFA6CnGUYe3_1jc6.jpg?imageMogr2/strip/thumbnail/2000x1500%3E/quality/90!/interlace/1/format/jpg')	no-repeat
	background-size: cover	
.imgThree
	background: url('https://nzr2ybsda.qnssl.com/images/46/FkA4Nw_cyso20HBad5zOFIekH_dz.jpg?imageMogr2/strip/thumbnail/2000x1500%3E/quality/90!/interlace/1/format/jpg')	no-repeat
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