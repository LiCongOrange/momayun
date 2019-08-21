<template>
	<div class="header">
		<div class="container">
		  	<nav 
		  		class="navbar navbar-default"
		  		:class="{ active: this.$store.state.isNavToggle, opacityStyle: isOpacity}"
		  	>
		  		<div class="navbar-header">
		  			<button 
		  				class="navbar-toggle" 
		  				type="button" 
		  				data-toggle="collapse"
		  				data-target="#example-navbar-collapse"
		  			>
		  				<span class="sr-only">切换导航</span>
		  				<span class="icon-bar"></span>
		  				<span class="icon-bar"></span>
		  				<span class="icon-bar"></span>
		  			</button>
		  			<div class="nav-logo">
		  				<div class="img-wrap">
		  					<img :src="modelInfo.picurl">
		  				</div>
		  				<div class="text-wrap">
		  					<h5 v-html="modelInfo.wsname || modelInfo.default"></h5>
		  				</div>
		  			</div>
		  		</div>
		  		<div class="collapse navbar-collapse" id="example-navbar-collapse">
		  			<ul class="nav navbar-nav" v-if="pageToggle">
		  				<li v-for="item in this.$store.state.threeStep.columnList" v-if="item.type != 'header' && item.type !='details' && item.type != 'footer'">
		  					<a href="javascript:;">{{item.name}}</a>
		  				</li>
		  			</ul>
		  			<ul class="nav navbar-nav" v-else> 
		  				<li v-for="(item, index) in this.$store.state.threeStep.columnList2" v-if="item.type !== 'header' && item.type != 'details' && item.type != 'footer'" >
		  					<a 
		  						@click="toPageHandel(index, item.name)"
		  						href="javascript:;"
		  					>{{ item.name }}</a>
		  				</li>
		  			</ul>
		  		</div>
		  	</nav>
	  	</div>
	</div>
</template>

<script>
export default {
	props: ['pid'],
	data () {
		return {
			isActive: false,
			isOpacity: false,
			modelInfo: ''
		}
	},
	computed: {
		pageToggle() {
			return this.$store.state.pageToggle
		}
	},
	mounted () {
		for(let i=0; i<this.$store.state.stepPages.head.length; i++) {
			if(this.$store.state.stepPages.head[i].lmid == this.pid) {
				this.modelInfo = this.$store.state.stepPages.head[i]
			}
		}
	    this.$nextTick(function(){
	      window.addEventListener('scroll', this.onScroll);
	      this.onScroll();
	    })
	},
	methods: {
		toPageHandel(index, name) {
			this.$store.commit('pageIndexHandel', index)
			this.$store.commit('pageNameHandel', name)
		},
		onScroll: function () {
			let scrollT = document.documentElement.scrollTop
			if(scrollT > 150) {
				this.isOpacity = true
			}else {
				this.isOpacity = false
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
	.navbar
		overflow: hidden
		background: rgba(255, 255, 255, 0.3) 
		border: none
		// left: 220px
		transition: all 0.3s
		padding: 10px 0
		.navbar-header
			backgrond: #fff
			text-align: center
			.nav-logo
				line-height: 50px
				color: $fontColor
				font-size: 24px
				.img-wrap
					display: inline-block
				.text-wrap
					display: inline-block
					h5
						font-size: 18px
		.navbar-collapse
			overflow: hidden
			.navbar-nav
				float: right
				li
					position: relative
					line-height: 52px
					padding: 0 15px
					&:hover
						p
							opacity: 1
					a
						padding: 0
						color: $fontColor
						line-height: inherit
					p
						position: absolute
						left: 0
						top: 40px
						width: 100%
						text-align: center
						opacity: 0
						transition: all .3s
						a
							display: block
							background: #f1f1f1
							line-height: 24px
					.navbar-btn
						margin: 0
						a
							float: left
							border: 1px solid #ccc
							padding: 3px 15px
							margin: 10px 10px 0 5px 
							color: $fontColor
							border-radius: 5px	
							padding: 0 10px
	.active
		left: 0
	.opacityStyle
		background: rgba(255, 255, 255, 1)
</style>