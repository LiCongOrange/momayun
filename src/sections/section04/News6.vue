<template>
	<div class="schedule paddingT2" :class="classBg">
		<div class="container">
			<div class="title">
				<h2 v-html="modelInfo.modularName"></h2>
				<p v-html="modelInfo.modularNameLetter"></p>
			</div>
			<div class="row">
				<div 
					class="col-xs-12 col-sm-6 col-md-4 list" 
					v-for="(item,index) in modelInfo.newList" 
					:class="classLayout"
				>
					<div class="order" v-text="index"></div>
					<div class="text">
						<h3 v-html="item.timer"></h3>
						<h4 v-html="item.title"></h4>
						<p v-html="item.past"></p>
						<!-- <p v-if="item.btnToggle">
							<button class="btn btn-default">查看详情</button>
						</p> -->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props:['pid'],
	data () {
		return {
			classLayout: '',
			classBg: '',
			zLetter: '',
			znum: null,
			znum1: null,
			screenWidth: document.body.clientWidth,
			modelInfo: '',
			zLayout: [{
				"letter": "A",
				"name": ""
			}, {
				"letter": "B",
				"name": "layout1"
			}, {
				"letter": "C",
				"name": "layout2"
			}],
			zBg: ["bgTwo", "bgThree", "bgOne"],
			zImg: [
				"/static/images/news/hides/hide01.png",
				"/static/images/news/hides/hide02.png",
				"/static/images/news/hides/hide03.png"
			],
		}
	},
	methods: {
		getDataLayout(data) {
			this.classLayout = data[0]
			this.zLetter = data[1]
		},
		getDataBg(data) {
			this.classBg = data
		}
	},
	watch: {
		classBg(val) {
			for(let i=0; i<this.$store.state.stepPages.article.length; i++) {
				if(this.$store.state.stepPages.article[i].lmid == this.pid) {
					this.$store.state.stepPages.article[i].bgClass = val
				}
			}
		},
		classLayout(val) {
			for(let i=0; i<this.$store.state.stepPages.article.length; i++) {
				if(this.$store.state.stepPages.article[i].lmid == this.pid) {
					this.$store.state.stepPages.article[i].layoutClass = val
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
  	for(let i=0; i<this.$store.state.stepPages.article.length; i++) {
  		if(this.$store.state.stepPages.article[i].lmid == this.pid) {
  			this.modelInfo = this.$store.state.stepPages.article[i]
  		}
  	}
		for(let i=0; i<this.modelInfo.newList.length; i++) {
			if(this.modelInfo.newList[i].past.length>150) {
				this.modelInfo.newList[i].past = this.modelInfo.newList[i].past.substring(0, 150) + '...'
			}else {
				this.modelInfo.newList[i].btnToggle = false
			}
		}
		this.modelInfo.newList = this.modelInfo.newList.slice(0, 4)
    this.$nextTick(function() {
			this.classLayout = this.zLayout[parseInt(Math.random()*3)].name
			this.classBg = this.bgclassList[parseInt(Math.random()*this.bgclassList.length)]
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/public.styl'
.schedule
	background: $bgColorGray
	position: relative	
	transition: all 0.3s
	padding:40px 0
	.title
		margin-bottom: $marginb
		h2
			color: $fontColor
			font-size: $fontsize1
		p
			font-size: $fontsize2
			color: $gridColor
	.container
		.list
			width: 100%
			height: auto
			margin: 0 auto 20px
			display: flex
			min-height: 170px
			float: none
			.order
				float: left
				border: 1px solid $fontColor
				color: $gridColor
				border-radius: 50%
				height: 50px
				width: 50px
				font-size: 28px
				text-align: center
				margin-right: 20px
				line-height: 50px
			.text
				float: left	
				flex: 9
				h3
					margin-top: 0
					font-size: $fontsize3
				h4
					font-size: $fontsize4
				p
					font-size: $fontsize5
		.layout1
			width: 47%
			float: left
		.layout2
			width: 33.333333%
			float: left
.bgOne
	background: $modelBg02
.bgTwo
	background: $modelBg03
	.title
		color: $textColor
		h2
			color: $textColor
	.container
		color: $textColor
		.order
			// border-color: $textColor !important
		.text
			color: $textColor
			h4
				color: $textColor
			p
				color: $textColor
.bgThree
	background: $modelBg01
.imgOne
	background: url('../../assets/images/news/hides/hide01.png')	no-repeat
	background-size: cover	
.imgTwo
	background: url('../../assets/images/news/hides/hide02.png')	no-repeat
	background-size: cover	
.imgThree
	background: url('../../assets/images/news/hides/hide03.png')	no-repeat
	background-size: cover	
	.container
		color: $textColor
		h2
			color: #fff
		ul
			li
				h3
					color: $textColor
				p
					color: $textColor						
</style>