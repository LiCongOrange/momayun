<template>
	<div class="grid paddingT2" :class="classBg" v-if="onoff">
		<div class="container">
			<div class="title">
				<h2 v-html="modelInfo.modularName"></h2>
				<p v-html="modelInfo.modularNameLetter"></p>
			</div>
			<div class="row">
				<div 
					class="col-xs-12 col-sm-6 col-md-4 rowList" 
					v-for="item in modelInfo.productList" 
					:key="item.id"
					:class="classLayout"
				>
					<img :src="item.picurl" />
					<div class="text">
						<h3 v-html="item.title"></h3>
						<h6 v-html="item.nameFn"></h6>
						<p v-html="item.past"></p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['pid'],
	data () {
		return {
			modelInfo: '',
			btnChoice: 0,
			isActive: false,
			classLayout: '',
			classBg: '',
			onoff: true,
			zLetter: 'A',
			znum: null,
			bgColorNum: '',
			screenWidth: document.body.clientWidth,
			zLayout: [{
				"letter": "A",
				"name": "layout1"
			}, {
				"letter": "B",
				"name": "layout2"
			}, {
				"letter": "C",
				"name": "layout3"
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
		getDataLayout(data) {
			this.classLayout = data[0]
			this.zLetter = data[1]
		},
		getDataBg(data) {
			// this.zarr1 = data
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
@import '~styles/public.styl'
.paddingT
	padding: 75px 0
	.container
		max-width: 94%
.grid
	position: relative
	.title
		margin-bottom: $marginb
		text-align: center
		h2
			font-size: $fontsize1
			color: $fontColor
			border: 1px solid rgba(255, 255, 255, 0)
			transition: all 0.3s
		p
			font-size: $fontsize2
			color: 	$gridColor
	.text
		border:1px solid #ccc
		overflow:hidden
		// height:0px
		// padding-bottom:21%
		margin-top:2%
		padding: 5px
	.container
		.rowList
			img
				width: 100%
				max-width: 420px
			.text
				h3
					font-size: $fontsize3
				h6
					font-size: $fontsize4
				p
					font-size: $fontsize5
				.color
					color: $gridColor
		.tabLayout1
			width: 100%
			img
				width: 30%
				float: left
				// padding:0 50px 50px 50px
			.text
				float: left
				width: 68%
				text-align: left
				padding-left: 15px
				margin-left:2%
				margin-top:0
				h4
					>>> .ql-container
						.ql-editor
							text-align: left
				p
					line-height: 28px
					>>> .ql-container
						font-size: 14px
		.tabLayout2
			width: 100%
			margin-bottom: 15px
			img
				width: 30%
				height: 80%
				float: right
				padding:0 10px 10px 10px
			.text
				float: right
				width: 68%
				text-align: left
				padding-left: 15px
				margin-top:0
				h4
					>>> .ql-container
						.ql-editor
							text-align: left
				p
					line-height: 28px
		.col-xs-12
			padding: 20px
			text-align: center
			vertical-align: top
			display: inline-block
			float: none
.bgOne
	background: $modelBg02
	.title
		color: $textColor
.bgTwo
	background: $modelBg03
	.title
		color: $textColor
		h2
			>>> .ql-editor
				color: #fff
	.container
		color: $textColor
		.row
			color: #fff
			.text
				color: $textColor
				h4
					color: $textColor
				p
					color: $textColor
.bgThree
	background: $modelBg01								
</style>