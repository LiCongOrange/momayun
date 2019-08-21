<template>
	<div class="header">
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
	  				{{this.$store.state.threeStep.siteName || this.$store.state.threeStep.defaultName}}
	  			</div>
	  		</div>
	  		<div class="collapse navbar-collapse" id="example-navbar-collapse">
	  			<ul class="nav navbar-nav">
	  				<li v-for="(item, index) in this.$store.state.threeStep.columnList" v-if="item.onOff">
	  					<a :href="'#'+index">{{item.name}}</a>
	  				</li>
	  			</ul>
	  		</div>
	  	</nav>
	</div>
</template>

<script>
import navBus from '@/pages/navBus'
export default {
	name: 'Header',
	// props: ['navList'],
	data () {
		return {
			isActive: false,
			isOpacity: false,
			editValue: this.navList
		}
	},
	mounted () {
		navBus.$on('navToggle2', (evalue)=>{
			this.navList[evalue.a].name= evalue.b
		}), 
	    this.$nextTick(function(){
	      window.addEventListener('scroll', this.onScroll);
	      this.onScroll();
	    }),
	    navBus.$on('navToggle',(e)=>{
	      this.isActive = e
	    })
	},
	methods: {
		onScroll: function () {
			let scrollT = document.documentElement.scrollTop
			if(scrollT > 150) {
				this.isOpacity = true
			}else {
				this.isOpacity = false
			}
		}
	},
	activated () {
     	//window.addEventListener('scroll', headHandle)
	}
}
</script>

<style lang="stylus" scoped="">
.header
	max-width:1200px
	margin:0 auto
	.navbar
		overflow: hidden
		background: rgba(255, 255, 255, 0.3) 
		border: none
		// left: 220px
		transition: all 0.3s
		.navbar-header
			backgrond: #fff
			text-align: center
			.nav-logo
				line-height: 50px
				color: $fontColor
				font-size: 24px
		.navbar-collapse
			overflow: hidden
			.navbar-nav
				float: right
				a
					color: $fontColor
				.navbar-btn
					margin: 0
					a
						float: left
						border: 1px solid #ccc
						padding: 3px 15px
						margin: 10px 10px 0 5px 
						color: $fontColor
						border-radius: 5px	
	.active
		left: 0
	.opacityStyle
		background: rgba(255, 255, 255, 1)
</style>