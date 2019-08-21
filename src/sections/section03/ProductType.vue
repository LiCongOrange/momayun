<template>
    <div class="productType paddingT2" :class="classBg">
        <div class="container">
	    	<div class="title">
	    		<h2 v-html="modelInfo.modularName"></h2>
	    		<p v-html="modelInfo.modularNameLetter"></p>
	    	</div>
            <div class="row">
                <div 
                    class="col-xs-12 col-sm-6 col-md-4 list" 
                    :class="classLayout"
                    v-for="item in modelInfo.productList"
                    :key="item.id"
                >
                    <img :src="item.picurl">
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
	data() {
		return {
			modelInfo: '',
			classLayout: '',
			zLetter: '',
			layoutNum: '',
			bgNum: '',
			classBg: '',
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
		}
	},
	watch: {
		classLayout(val) {
			for(let i=0; i<this.$store.state.stepPages.product.length; i++) {
				if(this.$store.state.stepPages.product[i].lmid == this.pid) {
					this.$store.state.stepPages.product[i].layoutClass = val
				}
			}
		},
		classBg(val) {
			for(let i=0; i<this.$store.state.stepPages.product.length; i++) {
				if(this.$store.state.stepPages.product[i].lmid == this.pid) {
					this.$store.state.stepPages.product[i].bgClass = val
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
.productType
	position: relative
	transition: all 0.5s
	padding: 75px 0
	.title
		margin-bottom: $marginb
		h2
			font-size: $fontsize1
			color: $fontColor
			margin: 0
		p
			font-size: $fontsize2
			color: $gridColor
	.container
		.list
			&:after
				clear: both
				content: ''
				display: block
			img
				width: 30%
				padding: 15px
				transition: all 0.3s
			.text
				width:70%
				padding: 15px
				transition: all 0.3s
				h3
					font-size: $fontsize3
					line-height: 24px
				h6
					font-size: $fontsize4
					color: $gridColor
				p
					font-size: $fontsize5
					color: $fontColor
		.layout0
			text-align: center
			img
				width: 80%
			.text
				margin: 0 auto
		.layout1
			width: 100%
			float: none
			img
				float: left
			.text
				float: left
		.layout2
			float: none
			width: 100%
			img
				float: right
			.text
				float: right
		.layout3
			float: none
			width: 100%
			&:nth-child(even)
				img
					float: left
				.text
					float: left
			&:nth-child(odd)
				img
					float: right
				.text
					float: right	
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