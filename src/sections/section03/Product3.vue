<template>
	<div class="product paddingT2" v-if="onoff" :class="classBg">
		<div class="container">
			<div class="title">
				<h3 v-html="modelInfo.modularName"></h3>
			</div>
			<div class="row">
				<ul>
					<li 
						class="col-md-3 col-sm-6 col-xs-12" 
						v-for="item in modelInfo.productList"
						:class="classLayout"
					>
						<div class="imgWrap"><img :src="item.picurl"></div>
						<div class="text">
							<h6 v-html="item.title"></h6>
							<p v-html="item.past"></p>
						</div>
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
			modelInfo: '',
			btnChoice: 0,
			screenWidth: document.body.clientWidth,
			onoff: true,
			zLetter: '',
			layoutNum: 0,
			classLayout: '',
			classBg: '',
			bgColorNum: '',
			zLayout: [{
				"letter": "A",
				"name": "layout1"
			}, {
				"letter": "B",
				"name": "layout2"
			}],
			zBg: ["bgOne", "bgTwo", "bgThree"]
		}
	},
	methods: {
		getInfo() {
			for(let i=0; i<this.$store.state.stepPages.product.length; i++) {
				if(this.$store.state.stepPages.product[i].lmid == this.pid) {
					this.modelInfo = this.$store.state.stepPages.product[i]
				}
			}
		},
		getDataBg(data) {
			this.classBg = data
		},
		getDataLayout(data) {
			this.classLayout = data[0]
			this.zLetter = data[1]
		}
	},
	watch: {
		classBg(val) {
			for(let i=0; i<this.$store.state.stepPages.product.length; i++) {
				if(this.$store.state.stepPages.product[i].lmid == this.pid) {	
					this.$store.state.stepPages.product[i].bgClass = val
				}
			}
		},
		classLayout(val) {
			for(let i=0; i<this.$store.state.stepPages.product.length; i++) {
				if(this.$store.state.stepPages.product[i].lmid == this.pid) {
					this.$store.state.stepPages.product[i].layoutClass = val
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
		this.getInfo()
		this.$nextTick(function() {
			this.classLayout = this.zLayout[parseInt(Math.random()*3)].name
			this.classBg = this.bgclassList[parseInt(Math.random()*this.bgclassList.length)]
		})
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.product
	position: relative
	padding: 75px 0
	.container
		.title
			margin-bottom: $marginb
			h3
				font-size: $fontsize1 
		.row
			li
				width:25%
				.imgWrap
					height:auto
					overflow:hidden
					width:80%
					padding-bottom:80%
					height:0
					overflow:hidden
					border-radius:50%
					position:relative
					margin:0 auto
					img
						width: 100%
						height:100%
						position:absolute
						left:0
				h6
					font-size: $fontsize3
				p
					font-size: $fontsize5
			.layout1
				width: 25%
				.imgWrap
					height:auto
					overflow:hidden
					width:80%
					padding-bottom:80%
					height:0
					position:relative
					border-radius:50%
					margin:0 auto
					img
						width: 100%
						position:absolute
						height:100%
						left:0
				h6
					font-size: 18px
					font-weight: bold
				p
					line-height:25px
					color:$textColor2
			.layout2
				float: none
				width: 100%
				overflow: hidden
				margin-bottom: 2%
				.imgWrap
					height:auto
					overflow:hidden
					width:20%
					float:left
					height:0
					padding-bottom:20%
					border-radius:50%
					position:relative
					margin-right:2%
					img
						position:absolute
						width: 100%
						height:100%
				.text
					float: left
					width: 70%
					padding: 20px
.bgOne
	background: $modelBg02
.bgTwo
	background: $modelBg03
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
	background: $modelBg01
</style>