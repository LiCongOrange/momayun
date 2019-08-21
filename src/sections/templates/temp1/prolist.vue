<template>
	<div class="product paddingT" :class="classBg">
		<fn-assembly 
			:btnChoice="btnChoice"
			:zLetter="zLetter" 
			:zLayout="zLayout"
			:zBg="zBg"
			:bgColorNum="bgColorNum"
			@getDataBg="getDataBg"
			@getDataLayout="getDataLayout"
			v-if="this.$store.state.allEditToggle"
		></fn-assembly>
		<div class="container">
			<div class="title">
				<h3 v-if="this.$store.state.allEditToggle">
					<fn-editor :content="modularName"></fn-editor>
				</h3>
				<h3 v-else v-text="modularName"></h3>
			</div>
			<div class="row">
				<ul v-if="this.$store.state.allEditToggle">
					<li 
						class="col-md-3 col-sm-6 col-xs-12" 
						v-for="item in textList"
						:class="classLayout"
					>
						<img :src="item.imgUrl">
						<div class="text">
							<h6><fn-editor :content="item.name"></fn-editor></h6>
							<p><fn-editor :content="item.past"></fn-editor></p>
						</div>
					</li>
				</ul>
				<ul v-else>
					<li 
						class="col-md-3 col-sm-6 col-xs-12"
						v-for="item in textList"
						:class="classLayout"
					>
						<img :src="item.imgUrl">
						<div class="text">
							<h6 v-text="item.name"></h6>
							<!-- <p v-text="item.past"></p> -->
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import navBus from '@/pages/navBus'
import FnAssembly from '@/pages/function/Assembly'
import FnEditor from '@/pages/function/Editor'
export default {
	name: 'prodlsit',
	data() {
		return {
			btnChoice: 0,
			screenWidth: document.body.clientWidth,
			textList: '',
			modularName: '产品介绍',
			section: '',
			zBg: '',
			zImg: '',
			zLetter: '',
			layoutNum: 0,
			classLayout: '',
			classBg: '',
			bgColorNum: '',
			zLayout: ''
		}
	},
	components: {
		FnAssembly,
		FnEditor
	},
	methods: {
		getDataBg(data) {
			this.classBg = data
		},
		getDataLayout(data) {
			this.classLayout = data[0]
			this.zLetter = data[1]
		},
		getProductInfo() {
			this.$axios.get('/api/demoInfo.json')
				.then(this.getProductInfoSucc)
		},
		getProductInfoSucc(res) {
			if(res.data.code == '200') {
				res = res.data.data
				this.textList = res.productTextlist
				this.modularName = res.productName
				this.zLayout = res.zLayout
				this.zBg = res.zBg
				this.zImg = res.zImg
			}
		}
	},
	watch: {
		classLayout(val) {
			if(val == "layout1") {
				this.zLetter = "A"
			}else if(val == "layout2") {
				this.zLetter = "B"
			}else if(val == "layout3") {
				this.zLetter = "C"
			}
		}
	},
	mounted() {
		this.getProductInfo()
		this.classBg = this.$store.state.storage.product.bgClass 
		this.classLayout = this.$store.state.storage.product.layoutClass
	},
	updated() {
		window.screenWidth = document.body.clientWidth
		this.screenWidth = window.screenWidth
		if(this.screenWidth <= 768) {
			this.classLayout = ""
		}
		navBus.$emit('getProductInfoSucc', [this.modularName, this.section])
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.product
	position: relative
	padding: 20px 0
	.title
		h3
			font-size: $titleFontsize 
			text-align: center
			line-height: 40px
			font-weight: bold
			>>> .ql-editor
				padding: 0
				text-align: center
				font-size: $productTitleSize
	.container
		li
			img
				width: 100%
			h6
				font-size: 18px
				font-weight: bold
				text-align:center
				>>> .ql-editor
					padding: 0
					font-size: 16px
			p
				>>> .ql-editor
					padding: 0
					font-size: 14px
		.layout1
			width: 50%
		.layout2
			float: none
			width: 100%
			overflow: hidden
			margin-bottom: 10px
			img
				float: left
				width: 40%
			.text
				float: left
				width: 50%
				padding: 20px
				h6
					text-align:center
.bgOne
	background: #ccc
.bgTwo
	background: #383f48
	.title
		h3
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
	background: #fff
</style>