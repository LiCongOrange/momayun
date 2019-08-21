<template>
	<div class="news paddingT2" v-if="this.onoff" :class="classBg">
		<div class="container">
			<div class="title">
				<h3 v-html="modelInfo.modularName"></h3>
			</div>
			<div class="row">
				<ul>
					<li v-for="item in modelInfo.newList" :class="{phoneClass: isPhoneClass}">
						<h3 v-html="item.title"></h3>
						<p v-html="item.past"></p>
						<!-- <p v-if="item.btnToggle">
							<button class="btn btn-default">查看详情</button>
						</p> -->
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
			btnChoice: 1,
			modelInfo: '',
			screenWidth: document.body.clientWidth,
			onoff: true,
			classBg: '',
			bgNum: '',
			isPhoneClass: false,
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
			zBg: ["bgOne", "bgTwo", "bgThree"],
			zImg: [
				"/static/images/news/hides/hide01.png",
				"/static/images/news/hides/hide02.png",
				"/static/images/news/hides/hide03.png"
			],
		}
	},
	methods: {
		cutOut() {
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
		},
		getDataBg(data) {
			this.classBg = data
		}
	},
	computed: {
		bgclassList() {
			return this.$store.state.allClass.bgclassList
		}
	},
	mounted() {
		this.cutOut()
	    this.$nextTick(function() {
	      this.classBg = this.bgclassList[parseInt(Math.random()*this.bgclassList.length)]
	    })
	},
	watch: {
		classBg(val) {
			for(let i=0; i<this.$store.state.stepPages.article.length; i++) {
				if(this.$store.state.stepPages.article[i].lmid == this.pid) {
					this.$store.state.stepPages.article[i].bgClass = val
				}
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.news
	position: relative
	transition: all 0.3s
	padding:40px 0
	.title
		margin-bottom: $marginb
		line-height: 40px
		h3
			font-size: $fontsize1
	.container
		ul
			padding: 20px 0
			.phoneClass
				width: auto
				float: none
			li
				width: 50%
				float: left
				padding: 0px 30px
				min-height: 240px
				overflow: hidden
				&:nth-child(even)
					border-left: 2px solid #ccc
				h3
					color: $fontColor
					font-weight: bold
					font-size: $fontsize3
				p
					font-size: $fontsize5
					color: $fontColor
.bgOne
	background: $modelBg02
	.container
		ul
			li
				&:nth-child(even)
					border-left-color: #999
.bgTwo
	background: $modelBg03
	.title
		h3
			color: $textColor
	.container
		ul
			color: $textColor
			li
				h3
					color: $textColor
				p
					color: $textColor
.bgThree
	background: $modelBg01	
</style>