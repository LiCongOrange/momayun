<template>
	<div class="recruit" :class="classBg">
		<div class="container">
			<div class="title">
				<h3 v-html="modelInfo.modularName"></h3>
			</div>
			<div class="content">
				<ul>
					<li v-for="item in modelInfo.recruitList" :class="classLayout">
						<div>
							<h5 v-text="item.title"></h5>
							<h4 v-text="item.titleFn"></h4>
							<p><a href="javascript:;">点击查看 &gt;</a></p>
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
			classLayout: 'layout1',
			classBg: 'imgTwo',
			zLayout: [{
				letter: 'A',
				name: 'layout1'
			}, {
				letter: 'B',
				name: 'layout2'
			}, {
				letter: 'C',
				name: 'layout3'
			}]
		}
	},
	watch: {
		classLayout(val) {
			for(let i=0; i<this.$store.state.stepPages.recruit.length; i++) {
				if(this.$store.state.stepPages.recruit[i].lmid == this.pid) {
					this.$store.state.stepPages.recruit[i].layoutClass = val
				}
			}
		},
		classBg(val) {
			for(let i=0; i<this.$store.state.stepPages.recruit.length; i++) {
				if(this.$store.state.stepPages.recruit[i].lmid == this.pid) {
					this.$store.state.stepPages.recruit[i].bgClass = val
				}
			}
		}
	},
	computed: {
		imgclassList() {
			return this.$store.state.allClass.bgclassList
		}
	},
	mounted() {
		this.getInfo()
		this.classLayout = this.zLayout[parseInt(Math.random()*3)].name
		this.classBg = this.imgclassList[parseInt(Math.random()*this.imgclassList.length)]
	},
	methods: {
		getInfo() {
			for(let i=0; i<this.$store.state.stepPages.recruit.length; i++) {
				if(this.$store.state.stepPages.recruit[i].lmid == this.pid) {
					this.modelInfo = this.$store.state.stepPages.recruit[i]
				}
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.recruit
	position: relative
	padding: 10px 0 20px
	.container
		width: 96%
	.title
		text-align: center	
		h3
			font-size: $fontsize1
			color: $modelTitlecolor
	.content
		li
			width: 100%
			padding: 10px
			div
				background: rgba(255, 255, 255, 0.7)
				border: 1px solid #ccc
				padding: 3px 10px
				h5
					color: #868698
					font-size: 18px
				h4
					color: $modelTitlecolor
					font-size: 24px
				p
					a
						font-size: 16px
		.layout1
			width: 50%
			float: left
		.layout2
			width: 33.333%
			float: left
		.layout3
			width: 25%
			float: left
.bgOne
	background: $modelBg02
.bgTwo
	background: $modelBg03
	.title
		h3
			color: #fff
.bgThree
	background: $modelBg01	
.imgOne
	background: url('../../assets/images/team/hides/hide01.png')	no-repeat
	background-size: cover	
.imgTwo
	background: url('../../assets/images/team/hides/hide02.png')	no-repeat
	background-size: cover	
.imgThree
	background: url('../../assets/images/team/hides/hide03.png')	no-repeat
	background-size: cover		
	.title
		h3
			color: #fff
</style>