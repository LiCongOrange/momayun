<template>
	<div class="introduce paddingT2" :class="classBg" v-if="onoff">
		<div class="container ">
			<div class="title">
				<h2 v-html="modelInfo.modularName"></h2>
				<p v-html="modelInfo.modularNameLetter"></p>
			</div>
			<ul>
				<li class="col-xs-12 list" :class="classLayout" v-for="item in modelInfo.productList">
					<div class="listText">
						<h3 v-html="item.title"></h3>
						<p v-html="item.past"></p>
					</div>
					<div class="listImg">
						<img :src="item.picurl">
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
			btnChoice: 2,
			screenWidth: document.body.clientWidth,
			onoff: true,
			classBg: '',
			zLetter: '',
			layoutNum: '',
			classLayout: '',
			bgNum: '',
			zLayout: [{
				"letter": "A",
				"name": "layout1"
			}, {
				"letter": "B",
				"name": "layout2"
			}, {
				"letter": "C",
				"name": ""
			}],
			zBg: ["bgOne", "bgTwo", "bgThree"]
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
	computed: {
		bgclassList() {
			return this.$store.state.allClass.bgclassList
		}
	},
  mounted() {
  	this.getInfo()
    this.$nextTick(function() {
			this.classBg = this.bgclassList[parseInt(Math.random()*this.bgclassList.length)]
			this.classLayout = this.zLayout[parseInt(Math.random()*3)].name
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.introduce
	position: relative
	transition: all 0.5s
	padding: 75px 0
	.title
		margin-bottom: $marginb
		h2
			font-size: $fontsize1
		p
			font-size: $fontsize2	
	.sumBtn
		position: absolute
		right: 10px
		top: 10px
		div
			position: static
			float: left
			.dropdown-menu
				width: 120px
				float: right
				left: auto
	.container
		.list
			margin-bottom:30px
			.listText
				width: 60%
				float: left
				padding: 2% 50px 0
				position:absolute
				z-index:2
 				h3
					color: $fontColor
					font-size: $fontsize3
				p
					font-size: $fontsize4
			.listImg
				position: relative
				width: 50%
				float: right
				margin-bottom: 10px
				text-align: center
				height:260px
				img
					width: 100%
					height: 100%
					opacity:.5
		.layout0
			.listText
				width: auto !important
				float: none !important
			.listImg
				width: auto
				float: none
.introduce
	.container
		.layout1
			margin-bottom: 30px
			&:nth-child(even)
				.listText
					float: right
					right:0
					text-align:right
				.listImg
					float: left
					margin-bottom: 0px
			&:nth-child(odd)
				.listText
					float: right
				.listImg
					float: right
					margin-bottom: 0px
		.layout2
			&:nth-child(even)
				.listText
					float: right
				.listImg
					float: right
			&:nth-child(odd)
				.listText
					float: right
				.listImg
					float: right
		.layout3
			&:nth-child(even)
				.listText
					float: right
					right:0
				.listImg
					float: left
			&:nth-child(odd)
				.listText
					float: right
					right:0
				.listImg
					float: left					
.bgOne
	background: $modelBg02
.bgTwo
	background: $modelBg03
	.list
		.listText
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